const mongoosePaginate = require('mongoose-paginate-v2')


module.exports = function (mongoose, connection) {
  // создание модели представляения лайка в БД
  const schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    path: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'users'
    }
  }, { timestamps: true })

  schema.plugin(mongoosePaginate)

  // возвращаем модель
  return connection.model('files', schema)
}
