const { Router } = require('express')

const controllers = require('./controllers')
const middlewares = require('../../../middlewares')

const router = Router()

// объявление роутов и подключение контролеров
router.get('/get/all', controllers.getAllUsers)
router.get('/get/:userId', controllers.getOneUser)
router.get('/get/posts/:userId', controllers.getUserPosts)
router.get('/get/comments/:userId', controllers.getUserComments)
router.get('/get/likes/:userId', controllers.getUserLikes)

module.exports = router
