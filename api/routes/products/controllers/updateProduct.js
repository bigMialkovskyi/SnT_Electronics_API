module.exports = async (req, res) => {
  try {
    const { productId, title, title_en, description, description_en, product_type } = req.body

    console.log(req.body)

    // console.log(productId)
    // console.log(title)

    if (!productId) return res.status(400).send({ success: false, error: '"ID" is required' })
    const product = await db.products.findOne({ _id: productId })
    if (!product) return res.status(400).send({ success: false, message: 'product not exist' })

    // при наявності даних в запиті - редагуємо відповідне поле в документі
    if (title) {
      if (title.length < 6) return res.status(400).send({ success: false, error: 'title lenght must be bigger then 6 symbols' })
      await db.products.updateOne({ _id: productId }, { title })
    }
    if (title_en) {
      if (title_en.length < 6) return res.status(400).send({ success: false, error: 'en title lenght must be bigger then 6 symbols' })
      await db.products.updateOne({ _id: productId }, { title_en })

    }
    if (description) {
      if (description.length < 8) return res.status(400).send({ success: false, error: 'description length must be bigger then 8 symbols' })
      await db.products.updateOne({ _id: productId }, { description })
    }
    if (description_en) {
      if (description_en.length < 8) return res.status(400).send({ success: false, error: 'en description length must be bigger then 8 symbols' })
      await db.products.updateOne({ _id: productId }, { description_en })
    }
    if (product_type) await db.products.updateOne({ _id: productId }, { product_type })

    const updatedProduct = await db.products.findOne({ _id: productId })

    res.send({ success: true, message: 'product updated', updatedProduct })
  } catch (error) {
    console.error(error)
    res.status(500).send({ success: false, error: 'Internal server error' })
  }
}
