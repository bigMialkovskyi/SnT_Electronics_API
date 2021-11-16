const mongoosePaginate = require('mongoose-paginate-v2');


module.exports = function (mongoose, connection) {
  // создание модели представления пользователя в БД
  const schema = new mongoose.Schema({
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      require: true
    },
    login: {
      type: String,
      unique: true,
      required: true
    },
    avatar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'files'
    },
    description: {
      type: String,
      required: false
    },
    password: {
      type: String,
      required: true
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts'
      }
    ],
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
      },
    ],
    files: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'files'      }
    ]
  }, { timestamps: true })

  // подключаем плагин
  schema.plugin(mongoosePaginate)

  // возвращаем модель
  return connection.model('users', schema)
}
