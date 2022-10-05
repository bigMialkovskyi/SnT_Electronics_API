module.exports = async (req, res) => {
  try {
    const products = await db.products.find().select('_id title description createdAt updatedAt')
    if (!products || !products.length) return res.status(400).send({ success: false, message: 'no devics find' })
    return res.send({ success: true, message: 'products received', products })
  } catch (error) {
    console.error(error)
    res.status(500).send({ success: false, error: 'Internal server error' })
  }
}
