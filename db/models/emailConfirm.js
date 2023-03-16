module.exports = function (mongoose, connection) {

    const schema = new mongoose.Schema({
      _id: mongoose.Schema.Types.ObjectId,
      userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      },
      link: {
        type: String,
        require: true
      }
    }, { timestamps: true })
  
    // возвращаем модель
    return connection.model('emailConfirm', schema)
  }
  