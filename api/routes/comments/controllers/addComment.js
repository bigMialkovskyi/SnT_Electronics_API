const { Types } = require('mongoose')


module.exports = async (req, res) => {
  try {
    // получаем id поста из url запроса
    const { postId, content } = req.body

    // достаем пользователя из запроса
    const userId = req.user._id

    // создаем новый коммент
    const newComment = new db.comments({
      _id: Types.ObjectId(),
      content,
      post: postId,
      author: userId
    })
    await newComment.save()

    // обновляем пользователя
    req.user.comments.push(newComment._id)
    await req.user.save()

    // из записи постав в БД формируем объект поста который будет показывать
    const comment = {
      _id: newComment._id,
      content: newComment.content,
    }

    // отправляем ответ на запрос
    res.send({ success: true, message: 'comment added', comment })
  } catch (error) {
    console.error(error)
    res.status(500).send({ success: false, error: 'Internal server error' })
  }
}
