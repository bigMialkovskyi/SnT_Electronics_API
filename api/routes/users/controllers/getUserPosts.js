module.exports = async (req, res) => {
  try {
    const { page, limit } = req.query
    // получаем id пользователя из url запроса
    const userId = req.params.userId

    const options = {
      page: page ? page : 1,
      limit: limit ? limit : 10,
      sort: {
        createdAt: 1
      },
      select: '_id media description likes comments createdAt updatedAt',
      populate: { path: 'media', select: '_id path size' }
    }

    const records = await db.posts.paginate({ author: userId }, options)

    res.send({
      success: true,
      message: 'posts received',
      posts: records.docs,
      totalDocs: records.totalDocs,
      limit: records.limit,
      page: records.page,
      totalPages: records.totalPages,
      pagingCounter: records.pagingCounter,
      hasPrevPage: records.hasPrevPage,
      hasNextPage: records.hasNextPage,
      prevPage: records.prevPage,
      nextPage: records.nextPage
    })
  } catch (error) {
    console.error(error)
    res.status(500).send({ success: false, error: 'Internal server error' })
  }
}
