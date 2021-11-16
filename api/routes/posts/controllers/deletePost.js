module.exports = async (req, res) => {
  try {
    // получаем id поста из url запроса
    const postId = req.params.postId

    // ищем пост в Бд по его айди
    const post = await db.posts.findOne({ _id: postId })
    if (!post) return res.status(400).send({ success: false, error: 'post not exist' })

    // удаляем файл из поста
    if (post.media) await store.files.actions.DELETE_FILE(post.media)
    
    // удаляем пост
    await post.delete()

    // обновляем пользователя
    req.user.posts = req.user.posts.filter(element => String(element) != String(post._id))
    await req.user.save()

    // отправляем ответ на запрос
    res.send({ success: true, message: 'post was deleted' })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, error: 'Internal server error' })
  }
}