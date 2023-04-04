module.exports = function (mongoose, connection) {

  const schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      unique: true,
    },
    link: {
      type: String,
      require: true,
      unique: true,
    },
    encryptedEmail: {
      type: String,
      require: true,
      unique: true
    },
    sensorID: {
      type: String,
      require: true,
      unique: true
    }
  }, { timestamps: true })

  // возвращаем модель
  return connection.model('emailConfirm', schema)
}
