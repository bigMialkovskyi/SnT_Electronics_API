module.exports = async (req, res) => {
  try {
    // получаем id пользователя из url запроса
    const deviceId = req.params.deviceId

    if (!req.user.device) return res.status(400).send({ success: false, error: 'User dont have device' })
    if (req.user.device != deviceId) return res.status(401).send({ success: false, error: 'No access' })

    // проверяем что пользователь есть в нашей БД
    const device = await db.devices.findOne({ _id: deviceId }).select('_id identity createdAt updatedAt')
    if (!device) return res.status(400).send({ success: false, message: 'device not exist' })

    res.send({ success: true, message: 'device received', device })
  } catch (error) {
    console.error(error)
    res.status(500).send({ success: false, error: 'Internal server error' })
  }
}