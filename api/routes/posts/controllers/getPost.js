module.exports = async (req, res) => {
  try {
    // получаем id поста из url запроса
    const postId = req.params.postId

    const options = {
      select: '_id media description likes comments createdAt updatedAt',
      populate: { path: 'media', select: '_id path size' }
    }

    const post = await db.posts.findOne({ _id: postId }, options)

    res.send({
      success: true,
      message: 'posts received',
      post
    })
  } catch (error) {
    console.error(error)
    res.status(500).send({ success: false, error: 'Internal server error' })
  }
}
