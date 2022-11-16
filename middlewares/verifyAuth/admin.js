require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
  try {
    const { token } = req.cookies
    if (!token) throw Error('Unauthorized')

    const parsedToken = token.split(' ')[0]
    const payload = await jwt.verify(parsedToken, process.env.SECRET_KEY)
    if (!payload) throw Error('Invalid token')

    const admin = await db.admins.findOne({ _id: payload._id })
    // console.log(admin)
    if (!admin) throw Error('admin not exist')
    // if (!admin.admin) throw Error('Invalid permission')
    req.admin = admin

    next()
  } catch (error) {
    console.error(error)
    return res.redirect('/login', { error: error.message })
  }
}