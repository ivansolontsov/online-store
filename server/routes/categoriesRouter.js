const Router = require('express')
const router = new Router()
const categoriesController = require('../controllers/categoriesController')
const checkRole = require('../middleware/checkRoleMiddleware')


router.post('/', checkRole('ADMIN'),categoriesController.create)
router.get('/', categoriesController.getAll)

module.exports = router