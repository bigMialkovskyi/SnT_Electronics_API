const { Router } = require('express')
const controllers = require('./controllers')

const router = Router()

// объявление роутов и подключение контролеров
router.post('/update-measurement', controllers.update)
router.post('/connect/user', controllers.connect)
router.post('/get/measurements', controllers.measurements)

module.exports = router
