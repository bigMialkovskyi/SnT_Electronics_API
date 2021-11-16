const { Router } = require('express')

const controllers = require('./controllers')
const middlewares = require('../../../middlewares')

const router = Router()

// объявление роутов и подключение контролеров
router.get('/get/all', controllers.getAllUsers)
router.get('/get/:userId', controllers.getOneUser)

module.exports = router
