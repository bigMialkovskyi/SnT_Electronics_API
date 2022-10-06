module.exports = function (mongoose, connection) {
  // создание модели представляения продукта в БД
  const schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    img_src: {
      type: String,
      required: true
    },

  }, { timestamps: true })

  // возвращаем модель
  return connection.model('products', schema)
}
