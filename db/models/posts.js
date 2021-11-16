const mongoosePaginate = require('mongoose-paginate-v2')


module.exports = function (mongoose, connection) {
  // создание модели представляения поста в БД
  const schema = new mongoose.Schema({
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      require: true
    },
    media: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'files',
      required: true
    },
    description: {
      type: String,
      require: false,
    },
    views: {
      type: Number,
      require: false,
      default: 0
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'likes'
      }
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comments'
      }
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
  }, { timestamps: true })

  schema.plugin(mongoosePaginate)

  // возвращаем модель
  return connection.model('posts', schema)
}
