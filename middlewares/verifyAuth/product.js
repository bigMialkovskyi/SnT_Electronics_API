// const jwt = require('jsonwebtoken')


module.exports = async (req, res, next) => {
  try {
    const product = await db.products.findOne({ _id: payload._id })
    if (!product) return res.status(401).send({ success: false, message: "product not exist" })
    req.product = product

    next()
  } catch (error) {
    console.error(error)
    res.status(401).send({ success: false, message: 'No authorization' })
  }
}
