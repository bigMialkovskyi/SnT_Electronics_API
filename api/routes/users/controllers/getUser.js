module.exports = async (req, res) => {
    try {
        res.status(200).send(req.user)
    } catch (error) {
        console.error(error)
        res.status(500).send({ success: false, error: 'Internal server error' })
    }
}