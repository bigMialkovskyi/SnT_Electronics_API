const jwt = require('jsonwebtoken')


module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) return res.status(401).send({ success: false, message: 'No auth token in headers' })

    const token = req.headers.authorization.split(' ')[1]
    if (!token) return res.status(401).send({ success: false, message: 'No auth token in headers' })
    req.token = token

    const payload = await jwt.verify(token, store.common.getters.GET_SECRET_KEY())
    if (!payload) return res.status(401).send({ success: false, message: "Incorrect token", token, payload })

<<<<<<< HEAD
    const device = await db.devices.findOne({ _id: payload._id })
    if (!device) return res.status(401).send({ success: false, message: "device not exist" })
    req.device = device
=======
    const user = await db.users.findOne({ _id: payload._id })
      .select('_id login avatar description files posts createdAt updatedAt')
      .populate({ path: 'avatar', select: 'path' })

    if (!user) return res.status(401).send({ success: false, message: "User not exist" })
    req.user = user
>>>>>>> b2e53aabf1cacf0faf3345e0595cadbde2076011

    next()
  } catch (error) {
    console.error(error)
    res.status(401).send({ success: false, message: 'No authorization' })
  }
}
