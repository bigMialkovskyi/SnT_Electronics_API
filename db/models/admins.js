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
        files: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'files'
            }
        ],

    }, { timestamps: true })

    // возвращаем модель
    return connection.model('admins', schema)
}