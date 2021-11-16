module.exports = async (req, res) => {
  try {
    // получаем строку аватара из запроса
    const { description } = req.body

    if (!description) return res.status(400).send({ success: false, error: '"description" parameter is required' })

    req.user.description = description
    await req.user.save()
    
    res.send({ success: true, message: 'description changed', description: req.user.description })
  } catch (error) {
    console.error(error)
    res.status(500).send({ success: false, error: 'Internal server error' })
  }
}
