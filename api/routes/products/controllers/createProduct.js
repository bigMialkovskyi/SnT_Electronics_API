const { Types } = require('mongoose')
var fs = require('fs');
var path = require('path');



module.exports = async (req, res) => {
  try {
    //get file from req
    const mediaFile = req.file
    // получаем данные из body запроса
    const { title, title_en, description, description_en, product_type } = req.body
    //достаем пользователся из запроса 
    const adminId = req.admin._id


    // проверяем наличие нужных данных
    if (!mediaFile) return res.status(400).send({ success: false, error: '"media" is required' })

    // записываем данные о файле в БД
    const file = await store.files.actions.SAVE_FILE(mediaFile, adminId)

    // проверяем наличие нужных данных
    if (!title) return res.status(400).send({ success: false, error: '"title" is required' })
    if (!title_en) return res.status(400).send({ success: false, error: '"en title" is required' })
    if (!description) return res.status(400).send({ success: false, error: '"description" is required' })
    if (!description_en) return res.status(400).send({ success: false, error: '"en description" is required' })
    // проверяем валидность данных
    if (title.length < 6) return res.status(400).send({ success: false, error: 'title lenght must be bigger then 6 symbols' })
    if (title_en.length < 6) return res.status(400).send({ success: false, error: 'en title lenght must be bigger then 6 symbols' })
    if (description.length < 8) return res.status(400).send({ success: false, error: 'description length must be bigger then 8 symbols' })
    if (description_en.length < 8) return res.status(400).send({ success: false, error: 'en description length must be bigger then 8 symbols' })
    if (product_type.length < 3) return res.status(400).send({ success: false, error: 'product_type lenght must be bigger then 3 symbols' })

    // создаем пустой объект для добавления поста в БД
    const postData = {}
    postData.media = file._id
    if (description) {
      if (description.length > 5000) return res.status(400).send({ success: false, error: 'description lenght must be less then 5000 symbols' })
      postData.description = description
    }
    // создаем новий продукт
    const newProduct = new db.products({
      _id: Types.ObjectId(),
      title,
      title_en,
      description,
      description_en,
      product_type,
      ...postData
    })
    await newProduct.save()

    // из записи продукта в БД формируем объект продукта который будет показывать
    const product = {
      _id: newProduct._id,
      title: newProduct.title,
      title_en: newProduct.title_en,
      description: newProduct.description,
      description_en: newProduct.description_en,
      media: newProduct.media,
      product_type: newProduct.product_type
    }

    // отправляем информацию о созданом продукте в качестве ответа на запрос
    res.send({ success: true, message: 'product created', product })
  } catch (error) {
    console.error(error)
    res.status(500).send({ success: false, error: 'Internal server error' })
  }
}
