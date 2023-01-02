const { Router } = require('express')
const controllers = require('./controllers')

const router = Router()

// объявление роутов и подключение контролеров
router.post('/users/register', controllers.register)
router.post('/users/login', controllers.login)
router.post('/admins/register', controllers.adminRegister)
router.post('/admins/login', controllers.adminLogin)
router.post('/devices/register', controllers.deviceRegister)
router.post('/device/login', controllers.deviceLogin)
router.post('/agro-gsm/register', controllers.agroGsmSensorRegister)

module.exports = router
