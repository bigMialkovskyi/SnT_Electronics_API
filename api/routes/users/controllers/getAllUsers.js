module.exports = async (req, res) => {
  try {
    const users = await db.users.find()
    if (!users || !users.length) return res.status(400).send({ success: false, message: 'no users find' })
    return res.send({ success: true, message: 'users received', users })
  } catch (error) {
    console.error(error)
    res.status(500).send({ success: false, error: 'Internal server error' })
  }
}
