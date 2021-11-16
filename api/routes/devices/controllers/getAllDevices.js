module.exports = async (req, res) => {
  try {
    const devices = await db.devices.find().select('_id identity createdAt updatedAt')
    if (!devices || !devices.length) return res.status(400).send({ success: false, message: 'no devics find' })
    return res.send({ success: true, message: 'devices received', devices })
  } catch (error) {
    console.error(error)
    res.status(500).send({ success: false, error: 'Internal server error' })
  }
}
