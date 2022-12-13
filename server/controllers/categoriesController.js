const { Categories } = require('../models/models')
const ApiError = require('../error/ApiError')


class CategoriesController {
    async create(req, res) {
        const { name } = req.body
        const categories = await Categories.create({ name })
        return res.json(categories)
    }
    async getAll(req, res) {
        const categories = await Categories.findAll()
        return res.json(categories)
    }
}

module.exports = new CategoriesController()