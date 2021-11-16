const { Router } = require('express')

const controllers = require('./controllers')
const middlewares = require('../../../middlewares')

const router = Router()

// объявление роутов и подключение контролеров
router.get('/get/all', controllers.getAllDevices)
router.get('/get/:deviceId', middlewares.verifyAuth.user, controllers.getOneDevice)

module.exports = router
