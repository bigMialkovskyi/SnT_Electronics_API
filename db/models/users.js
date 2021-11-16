module.exports = function (mongoose, connection) {
    // создание модели представляения пользователя в БД
    const schema = new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        login: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        device: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'devices'
        }

    }, { timestamps: true })

    // возвращаем модель
    return connection.model('users', schema)
}