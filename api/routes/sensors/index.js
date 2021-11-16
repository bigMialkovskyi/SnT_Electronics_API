const { Router } = require('express')

const controllers = require('./controllers')
const middlewares = require('../../../middlewares')

const router = Router()

// объявление роутов и подключение контролеров
router.post('/info/update', middlewares.verifyAuth.device, controllers.updateInfo)
router.get('/info/get/:deviceId', middlewares.verifyAuth.user, controllers.getInfo)

module.exports = router
