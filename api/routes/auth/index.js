const { Router } = require('express')
const controllers = require('./controllers')

const router = Router()

// объявление роутов и подключение контролеров
router.post('/users/register', controllers.register)
router.post('/users/login', controllers.login)
router.post('/devices/register', controllers.deviceRegister)
router.post('/device/login', controllers.deviceLogin)

module.exports = router
