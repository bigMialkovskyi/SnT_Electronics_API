const { Types } = require('mongoose')


module.exports = async (req, res) => {
	try {
		const { temperature, airQuality, humidity } = req.body
		const deviceId = req.device._id

		if (!temperature) return res.status(400).send({ success: false, error: '"temperature" is required' })
		if (!airQuality) return res.status(400).send({ success: false, error: '"airQuality" is required' })
		if (!humidity) return res.status(400).send({ success: false, error: '"humidity" is required' })

		const sensorsInfo = new db.sensors({
			_id: Types.ObjectId(),
			temperature,
			airQuality,
			humidity,
			device: deviceId
		})
		await sensorsInfo.save()
		res.send({ success: true, message: 'sensorsInfo was added' })
	}
	catch (error) {
		console.error(error)
		res.status(500).send({ success: false, error: 'Internal server error' })
	}
}