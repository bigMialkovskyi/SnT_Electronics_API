module.exports = async (req, res) => {
  try {
    // получаем id пользователя из url запроса
    const productId = req.params.productId

    if (!req.user.product) return res.status(400).send({ success: false, error: 'User dont have product' })
    if (req.user.product != productId) return res.status(401).send({ success: false, error: 'No access' })

    // проверяем что пользователь есть в нашей БД
    const product = await db.products.findOne({ _id: productId }).select('_id title description createdAt updatedAt')
    if (!product) return res.status(400).send({ success: false, message: 'product not exist' })

    res.send({ success: true, message: 'product received', product })
  } catch (error) {
    console.error(error)
    res.status(500).send({ success: false, error: 'Internal server error' })
  }
}