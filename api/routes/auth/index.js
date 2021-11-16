const { Router } = require('express')

const controllers = require('./controllers')
const middlewares = require('../../../middlewares')

const router = Router()

// объявление роутов и подключение контролеров
router.post('/register', controllers.register)
router.post('/login', controllers.login)

module.exports = router
