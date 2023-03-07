module.exports = function (mongoose, connection) {

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
    batteryStatus: {
      type: String,
    },
    measurements: [{
      airTemperature: Number,
      soilTemperature: Number,
      humidity: Number,
      pressure: Number,
      updateTime: String,
    }],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    }
  }, { timestamps: true })

  // возвращаем модель
  return connection.model('agroGsmSensors', schema)
}
