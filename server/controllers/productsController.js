const uuid = require('uuid')
const path = require('path')
const { Products, ProductInfo } = require('../models/models')
const ApiError = require('../error/ApiError')

class ProductsController {
    async create(req, res, next) {
        try {
            const { name, price, brandId, categoryId, info } = req.body
            const { image } = req.files
            let imgName = uuid.v4() + ".jpg"
            image.mv(path.resolve(__dirname, '..', 'static', imgName))
            const product = await Products.create({ name, price, brandId, categoryId, image: imgName })

            if (info) {
                info = JSON.parse(info)
                info.forEach(element => {
                    ProductInfo.create({
                        title: element.description,
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
        console.log(req);
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let products;
        products = await Products.findAndCountAll({ limit, offset })
        if (!brandId && !categoryId) {
            products = await Products.findAndCountAll({ limit, offset })
        }
        if (brandId) {
            products = await Products.findAndCountAll({ where: { brandId }, limit, offset })
        }
        if (!brandId && categoryId) {
            products = await Products.findAndCountAll({ where: { categoryId }, limit, offset })
        }
        if (categoryId && brandId) {
            products = await Products.findAndCountAll({ where: { categoryId, brandId }, limit, offset })
        }
        return res.json(products);
    }
    async getOne(req, res) {
        const { id } = req.params
        const product = await Products.findOne(
            {
                where: { id },
                include: [{model: ProductInfo, as: 'info'}]
            },

        )
        return res.json(product)
    }
}


module.exports = new ProductsController()