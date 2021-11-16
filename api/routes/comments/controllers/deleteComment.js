module.exports = async (req, res) => {
  try {
    // получаем id поста из url запроса
    const commentId = req.params.commentId

    // ищем пост в Бд по его айди
    const comment = await db.comments.findOne({ _id: commentId })
    if (!comment) return res.status(400).send({ success: false, error: 'comment not exist' })

    // удаляем пост
    await comment.delete()

    // обновляем пользователя
    req.user.comments = req.user.comments.filter(element => String(element) != String(comment._id))
    await req.user.save()

    // отправляем ответ на запрос
    res.send({ success: true, message: 'comment was deleted' })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, error: 'Internal server error' })
  }
}
