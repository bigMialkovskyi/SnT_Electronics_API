module.exports = async (req, res) => {
    try {
        const deviceId = req.params.deviceId

        if (!req.user.device) return res.status(400).send({ success: false, error: 'User dont have device' })
        if (req.user.device != deviceId) return res.status(401).send({ success: false, error: 'No access' })
        const info = await db.sensors.find({ device: deviceId }).select('_id temperature airQuality humidity createdAt updatedAt')

        if (!info || !info.length) return res.status(400).send({ success: false, message: 'no sensors info' })
        return res.send({ success: true, message: 'info received', info })
    } catch (error) {
        console.error(error)
        res.status(500).send({ success: false, error: 'Internal server error' })
    }
}