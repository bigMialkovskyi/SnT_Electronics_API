const { Types } = require('mongoose')


module.exports = async (req, res) => {
  try {
    // получаем файл из запроса
    const mediaFile = req.file
    // получаем данные из body запроса
    const { description } = req.body
    // достаем пользователя из запроса
    const userId = req.user._id

    // проверяем наличие нужных данных
    if (!mediaFile) return res.status(400).send({ success: false, error: '"media" is required' })

    // записываем данные о файле в БД
    const file = await store.files.actions.SAVE_FILE(mediaFile, userId)

    // создаем пустой объект для добавления поста в БД
    const postData = {}
    postData.media = file._id
    if (description) {
      if (description.length > 100) return res.status(400).send({ success: false, error: 'description lenght must be less then 100 symbols' })
      postData.description = description
    }

    // создаем новый пост
    const newPost = new db.posts({
      _id: Types.ObjectId(),
      author: userId,
      ...postData
    })
    await newPost.save()

    // обновляем пользователя
    req.user.posts.push(newPost._id)
    await req.user.save()

    // из записи поста в в БД формируем объект поста который будет показывать
    const post = {
      _id: newPost._id,
      media: newPost.media,
      description: newPost.description
    }

    // отправляем ответ на запрос
    res.send({ success: true, message: 'post created', post })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, error: 'Internal server error' })
  }
}
