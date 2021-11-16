module.exports = function (mongoose, connection) {
  // создание модели представляения пользователя в БД
  const schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    identity: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },

  }, { timestamps: true })

  // возвращаем модель
  return connection.model('devices', schema)
}
