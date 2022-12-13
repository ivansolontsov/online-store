const Router = require('express')
const router = new Router()
const productsRouter = require('./productsRouter')
const userRouter = require('./userRouter')
const brandRouter = require('./brandRouter')
const categoriesRouter = require('./categoriesRouter')


router.use('/user', userRouter)
router.use('/categories', categoriesRouter) 
router.use('/brand', brandRouter)
router.use('/products', productsRouter)

module.exports = router;