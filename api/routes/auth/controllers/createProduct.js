const { Types } = require('mongoose')
var fs = require('fs');
var path = require('path');
// const { types } = require('mongoose')
// const jwt = require('jsonwebtoken')


module.exports = async (req, res) => {
  try {
    // получаем данные из body запроса
    const { title, description, img_name, product_type } = req.body

    // проверяем наличие нужных данных
    if (!title) return res.status(400).send({ success: false, error: '"title" is required' })
    if (!description) return res.status(400).send({ success: false, error: '"description" is required' })
    if (!img_name) return res.status(400).send({ success: false, error: '"img_src" is required' })
    // проверяем валидность данных
    if (title.length < 6) return res.status(400).send({ success: false, error: 'title lenght must be bigger then 6 symbols' })
    if (description.length < 8) return res.status(400).send({ success: false, error: 'description length must be bigger then 8 symbols' })
    if (img_name.length < 3) return res.status(400).send({ success: false, error: 'img_src lenght must be bigger then 3 symbols' })
    if (product_type.length < 3) return res.status(400).send({ success: false, error: 'product_type lenght must be bigger then 3 symbols' })

    const img = fs.readFileSync(path.join(__dirname + '../../../../../uploads/' + img_name))
    // создаем новий продукт
    const newProduct = new db.products({
      _id: Types.ObjectId(),
      title,
      description,
      img,
      product_type
    })
    await newProduct.save()

    // из записи продукта в БД формируем объект продукта который будет показывать
    const product = {
      _id: newProduct._id,
      title: newProduct.title,
      description: newProduct.description,
      img: newProduct.img,
      product_type: newProduct.product_type
    }

    // отправляем информацию о созданом продукте в качестве ответа на запрос
    res.send({ success: true, message: 'product created', product })
  } catch (error) {
    console.error(error)
    res.status(500).send({ success: false, error: 'Internal server error' })
  }
}
