module.exports = async (req, res) => {
  try {
    const { page, limit } = req.query

    const options = {
      page: page ? page : 1,
      limit: limit ? limit : 10,
      sort: {
        createdAt: 1
      },
      select: '_id login avatar description'
    }

    const users = await db.users.paginate({ }, options)
    console.log(users);
    if (!users) return res.status(400).send({ success: false, message: 'no users find' })
    return res.send({ success: true, message: 'users received', users })
  } catch (error) {
    console.error(error)
    res.status(500).send({ success: false, error: 'Internal server error' })
  }
}
