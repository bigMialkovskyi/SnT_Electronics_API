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
    media: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'files',
      required: true
    },
    product_type: {
      type: String,
      required: true
    },

  }, { timestamps: true })

  // возвращаем модель
  return connection.model('products', schema)
}
