module.exports = function (mongoose, connection) {
  // создание модели представляения продукта в БД
  const schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: true
    },
    img: {
      data: Buffer,
      contentType: String
    },

  }, { timestamps: true })

// возвращаем модель
return connection.model('Image', schema)
}
