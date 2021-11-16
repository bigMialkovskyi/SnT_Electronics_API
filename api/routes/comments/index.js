const { Router } = require('express')

const controllers = require('./controllers')
const middlewares = require('../../../middlewares')

const router = Router()

// объявление роутов и подключение контролеров
router.post('/add', middlewares.verifyAuth, controllers.addComment)
router.delete('/delete/:commentId', middlewares.verifyAuth, controllers.deleteComment)

module.exports = router
