const mongoosePaginate = require('mongoose-paginate-v2')


module.exports = function (mongoose, connection) {
  // создание модели представляения комментария в БД
  const schema = new mongoose.Schema({
<<<<<<< HEAD:db/models/sensors.js
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
=======
    _id: mongoose.Schema.Types.ObjectId,
    content: {
      type: String
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'posts'
    },
    author: {
>>>>>>> b2e53aabf1cacf0faf3345e0595cadbde2076011:db/models/comments.js
      type: mongoose.Schema.Types.ObjectId,
      ref: 'devices'
    }
  }, { timestamps: true })

  schema.plugin(mongoosePaginate)

  // возвращаем модель
  return connection.model('sensors', schema)
}
