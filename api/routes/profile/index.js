const { Router } = require('express')
const multer = require('multer')
const uuid = require('uuid')

const controllers = require('./controllers')
const middlewares = require('../../../middlewares')

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'static/uploads/temp/'),
  filename: (req, file, cb) => cb(null, uuid.v4() + '.' + file.originalname.split('.')[1])
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype != 'image/jpeg' || file.mimetype != 'image/png') cb(null, false)
  cb(null, true)
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
})

const router = Router()

// объявление роутов и подключение контролеров
router.put('/change/avatar', [middlewares.verifyAuth, upload.single('avatar')], controllers.changeAvatar)
router.put('/change/description', middlewares.verifyAuth, controllers.changeDescription)

module.exports = router
