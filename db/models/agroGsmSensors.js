// module.exports = function (mongoose, connection) {
//   // создание модели представляения пользователя в БД
//   // console.log(mongoose.Schema.Types)
//   const schema = new mongoose.Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     identity: {
//       type: String,
//       unique: true,
//       required: true
//     },
//     name: {
//       type: String,
//     },
//     measurements: [{
//       airTemperature: Number,
//       soilTemperature: Number,
//       humidity: Number,
//       pressure: Number,
//       updateTime: String
//     }],
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'users'
//     }
//   }, { timestamps: true })

//   // возвращаем модель
//   return connection.model('agroGsmSensors', schema)
// }
const { Types } = require('mongoose')

module.exports = (mongoose, connection) => {
  const schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    identity: {
      type: String,
      unique: true,
      required: true
    },
    name: {
      type: String,
    },
    measurements: [{
      airTemperature: Number,
      soilTemperature: Number,
      humidity: Number,
      pressure: Number,
      updateTime: String
    }],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    }
  }, { timestamps: true })

  // возвращаем модель
  return connection.model('agroGsmSensors', schema)
}