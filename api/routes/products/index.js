const { Router } = require('express')

const controllers = require('./controllers')

const router = Router()

// объявление роутов и подключение контролеров
router.get('/get/all', controllers.getAllProducts)
router.get('/get/:productId', controllers.getOneProduct)
<<<<<<< HEAD
router.delete('/delete/:productId', controllers.deleteProductByID)
=======
router.delete('/delete/:productId', controllers.deleteProduct)
>>>>>>> 678c2d16fc3580cc6cc0b753489fe4cca84c81fd

module.exports = router
