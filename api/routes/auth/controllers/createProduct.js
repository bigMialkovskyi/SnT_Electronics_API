const { Types } = require('mongoose')
// const { Types } = require('mongoose')
// const jwt = require('jsonwebtoken')


module.exports = async (req, res) => {
  try {
    // получаем данные из body запроса
    const { title, description } = req.body

    // проверяем наличие нужных данных
    if (!title) return res.status(400).send({ success: false, error: '"title" is required' })
    if (!description) return res.status(400).send({ success: false, error: '"description" is required' })
    // проверяем валидность данных
    if (title.length < 6) return res.status(400).send({ success: false, error: 'title lenght must be bigger then 6 symbols' })
    if (description.length < 8) return res.status(400).send({ success: false, error: 'description length must be bigger then 8 symbols' })
    // проверяем что никнейм не занят
    // const existDevice = await db.devices.findOne({ title })
    // if (existDevice) return res.status(400).send({ success: false, error: 'device with this title already exist' })

    // шифруем пароль
    // const encrypteddescription = await store.common.actions.ENCRYPT_description(description)

    // создаем нового пользователя
    const newProduct = new db.products({
      _id: Types.ObjectId(),
      title,
      description
    })
    await newProduct.save()

    // создаем токен доступа для созданного пользователя
    // const token = await jwt.sign({ _id: newProduct._id }, store.common.getters.GET_SECRET_KEY())

    // из записи пользователя в БД формируем объект пользователя который будет показывать
    const product = {
      _id: newProduct._id,
      title: newProduct.title,
      description : newProduct.description,
    }

    // отправляем информацию о созданом пользователя в качестве ответа на запрос
    res.send({ success: true, message: 'product created', product})
  } catch (error) {
    console.error(error)
    res.status(500).send({ success: false, error: 'Internal server error' })
  }
}
