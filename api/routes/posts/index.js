const { Router } = require('express')
const multer = require('multer')
const uuid = require('uuid')

const controllers = require('./controllers')
const middlewares = require('../../../middlewares')

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'static/uploads/posts/'),
  filename: (req, file, cb) => cb(null, uuid.v4() + '.' + file.originalname.split('.')[1])
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype != 'image/jpeg' || file.mimetype != 'image/png' || file.mimetype != 'video/mp4') cb(null, false)
  cb(null, true)
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 50
  }
})

const router = Router()

// объявление роутов и подключение контролеров
router.post('/create', [middlewares.verifyAuth, upload.single('mediaFile')], controllers.createPost)
router.delete('/delete/:postId', middlewares.verifyAuth, controllers.deletePost)
router.get('/get/:postId', controllers.getPost)
router.put('/update/views/:postId', controllers.updateViews)


module.exports = router
