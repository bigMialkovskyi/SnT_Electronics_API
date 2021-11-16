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
      }
    }

    const records = await db.comments.paginate({ author: userId }, options)

    res.send({
      success: true,
      message: 'comments received',
      comments: records.docs,
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
