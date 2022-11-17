const { Router } = require('express')
const multer = require('multer')
const uuid = require('uuid')

const controllers = require('./controllers')
const middlewares = require('../../../middlewares')

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'static/uploads'),
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
router.post('/create', [middlewares.verifyAuth.admin, upload.single('mediaFile')], controllers.createProduct)
router.get('/get/all', controllers.getAllProducts)
router.get('/get/:productId', controllers.getOneProduct)
router.delete('/delete/:productId', controllers.deleteProduct)

module.exports = router
