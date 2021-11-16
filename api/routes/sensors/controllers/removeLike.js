module.exports = async (req, res) => {
  try {
    // получаем данные из url запроса
    const { postId } = req.params
    // получаем id пользователя из мидлвары
    const userId = req.user._id

    // проверяем наличие нужных данных
    if (!postId) return res.status(400).send({ success: false, error: '"postId" is required' })
    if (!userId) return res.status(400).send({ success: false, error: '"userId" is required' })

    // находим лайк в БД
    const like = await db.likes.findOne({ post: postId, user: userId })
    if (!like) return res.status(400).send({ success: false, error: 'like not exist' })

    // удаляем лайк из БД
    await like.remove()

    // обновляем пользователя
    req.user.likes = req.user.likes.filter(element => String(element) != String(like._id))
    await req.user.save()

    // отправляем ответ на запрос
    return res.send({ success: true, message: 'like was deleted', like: like._id })
  }
  catch (error) {
    console.error(error)
    res.status(500).send({ success: false, error: 'Internal server error' })
  }
}
