module.exports = async (req, res) => {
  try {
    // получаем id поста из url запроса
    const postId = req.params.postId

    const post = await db.posts.findOne({ _id: postId })
    if (!post) return res.status(400).send({ success: false, error: 'post not found' })

    post.views++
    post.save()

    res.send({
      success: true,
      message: 'posts views incremented',
      views: post.views
    })
  } catch (error) {
    console.error(error)
    res.status(500).send({ success: false, error: 'Internal server error' })
  }
}
