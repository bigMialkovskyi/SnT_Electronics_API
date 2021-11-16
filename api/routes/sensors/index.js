const { Router } = require('express')

const controllers = require('./controllers')
const middlewares = require('../../../middlewares')

const router = Router()

// объявление роутов и подключение контролеров
router.post('/info/update', middlewares.verifyAuth, controllers.updateInfo)

module.exports = router
