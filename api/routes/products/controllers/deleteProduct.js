module.exports = async (req, res) => {
  try {
    // получаем id продукта из url запроса
    const productId = req.params.productId

    // проверяем что продукт есть в нашей БД
    const product = await db.products.findOneAndRemove({ _id: productId }).select('_id title description img_src product_type createdAt updatedAt')
    if (!product) return res.status(400).send({ success: false, message: 'product not exist' })

    res.send({ success: true, message: 'product deleted', product })
  } catch (error) {
    console.error(error)
    res.status(500).send({ success: false, error: 'Internal server error' })
  }
}