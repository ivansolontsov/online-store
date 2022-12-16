const uuid = require('uuid')
const path = require('path')
const { Op } = require("sequelize");
const { Products, ProductInfo } = require('../models/models')
const ApiError = require('../error/ApiError')


class ProductsController {
    async create(req, res, next) {
        try {
            const { name, price, brandId, categoryId, info } = req.body
            const { image } = req.files
            let imgName = uuid.v4() + ".jpg"
            const product = await Products.create({ name, price, brandId, categoryId, image: imgName })

            if (product) {
                image.mv(path.resolve(__dirname, '..', 'static', imgName))
            }

            if (info) {
                let parsedInfo = JSON.parse(info)
                parsedInfo.forEach(element => {
                    ProductInfo.create({
                        title: element.title,
                        description: element.description,
                        productId: product.id
                    })
                });
            }
            return res.json(product)
        }
        catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
    async getAll(req, res) {
        let { brandId, categoryId, limit, page } = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let selectedCategoryIds;
        let selectedBrandIds;

        if (categoryId) {
            selectedCategoryIds = categoryId.split('');
            selectedCategoryIds = selectedCategoryIds.map(Number)
        }
        if (brandId) {
            selectedBrandIds = brandId.split('');
            selectedBrandIds = selectedBrandIds.map(Number)
        }
        let products;
        products = await Products.findAndCountAll({ limit, offset })
        if (!brandId && !categoryId) {
            products = await Products.findAndCountAll({ limit, offset })
        }
        if (brandId) {
            products = await Products.findAndCountAll({
                where: {
                    brandId: selectedBrandIds
                }, limit, offset
            })
        }
        if (!brandId && categoryId) {
            products = await Products.findAndCountAll({
                where: {
                    categoryId: selectedCategoryIds
                }, limit, offset
            })
        }
        if (categoryId && brandId) {
            products = await Products.findAndCountAll({
                where: {
                    categoryId: selectedCategoryIds,
                    brandId: selectedBrandIds
                }, limit, offset
            })
        }
        return res.json(products);
    }
    async getOne(req, res) {
        const { id } = req.params
        const product = await Products.findOne(
            {
                where: { id },
                include: [{ model: ProductInfo, as: 'info' }]
            },

        )
        return res.json(product)
    }
}

module.exports = new ProductsController()