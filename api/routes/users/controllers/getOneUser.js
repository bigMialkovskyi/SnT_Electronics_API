module.exports = async (req, res) => {
  try {
    // получаем id пользователя из url запроса
    const userId = req.params.userId

    // проверяем что пользователь есть в нашей БД
    const user = await db.users.findOne({ _id: userId })
    if (!user) return res.status(400).send({ success: false, message: 'user not exist' })
    
    res.send({ success: true, message: 'user received', user })
  } catch (error) {
    if (error.name == 'CastError') return res.status(400).send({ success: false, error: 'Incorrect user id' })
    console.error(error)
    res.status(500).send({ success: false, error: 'Internal server error' })
  }
}