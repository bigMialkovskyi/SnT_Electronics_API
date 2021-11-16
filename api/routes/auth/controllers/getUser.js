module.exports = async (req, res) => {
  try {
    if (!req.user) return res.status(400).send({ success: false, message: 'user not exist' })
    
    res.send({ success: true, message: 'user received', user: req.user })
  } catch (error) {
    console.error(error)
    res.status(500).send({ success: false, error: 'Internal server error' })
  }
}
