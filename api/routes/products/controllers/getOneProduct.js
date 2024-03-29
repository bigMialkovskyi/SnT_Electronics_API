module.exports = async (req, res) => {
  try {
    // получаем id продукта из url запроса
    const productId = req.params.productId

    // проверяем что продукт есть в нашей БД
    const product = await db.products.findOne({ _id: productId }).select('_id title description title_en description_en createdAt product_type updatedAt specifications').populate('media')
    if (!product) return res.status(400).send({ success: false, message: 'product not exist' })

    res.send({ success: true, message: 'product received', product })
  } catch (error) {
    console.error(error)
    res.status(500).send({ success: false, error: 'Internal server error' })
  }
}