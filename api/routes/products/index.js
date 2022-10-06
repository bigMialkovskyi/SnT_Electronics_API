const { Router } = require('express')

const controllers = require('./controllers')
const middlewares = require('../../../middlewares')

const router = Router()

// объявление роутов и подключение контролеров
router.get('/get/all', controllers.getAllProducts)
// router.get('/get/:productId', middlewares.verifyAuth.product, controllers.getOneProduct)
router.get('/get/:productId', controllers.getOneProduct)

module.exports = router
