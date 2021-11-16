const jwt = require('jsonwebtoken')


module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) return res.status(401).send({ success: false, message: 'No auth token in headers' })

    const token = req.headers.authorization.split(' ')[1]
    if (!token) return res.status(401).send({ success: false, message: 'No auth token in headers' })
    req.token = token

    const payload = await jwt.verify(token, store.common.getters.GET_SECRET_KEY())
    if (!payload) return res.status(401).send({ success: false, message: "Incorrect token", token, payload })

    const device = await db.devices.findOne({ _id: payload._id })
    if (!device) return res.status(401).send({ success: false, message: "device not exist" })
    req.device = device

    next()
  } catch (error) {
    console.error(error)
    res.status(401).send({ success: false, message: 'No authorization' })
  }
}
