const { Router } = require('express')

const controllers = require('./controllers')
const middlewares = require('../../../middlewares')

const router = Router()

// объявление роутов и подключение контролеров
<<<<<<< HEAD:api/routes/sensors/index.js
router.post('/info/update', middlewares.verifyAuth, controllers.updateInfo)
=======
router.post('/add/:postId', middlewares.verifyAuth, controllers.addLike)
router.delete('/remove/:postId', middlewares.verifyAuth, controllers.removeLike)
>>>>>>> b2e53aabf1cacf0faf3345e0595cadbde2076011:api/routes/likes/index.js

module.exports = router
