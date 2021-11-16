const mongoosePaginate = require('mongoose-paginate-v2')


module.exports = function (mongoose, connection) {
  // создание модели представляения комментария в БД
  const schema = new mongoose.Schema({
    _id: {
      type: mongoose.Schema.Types.ObjectId
    },
    temperature: {
      type: String,
    },
    airQuality: {
      type: String,
    },
    humidity: {
      type: String,
    },
    device: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'devices'
    }
  }, { timestamps: true })

  schema.plugin(mongoosePaginate)

  // возвращаем модель
  return connection.model('sensors', schema)
}
