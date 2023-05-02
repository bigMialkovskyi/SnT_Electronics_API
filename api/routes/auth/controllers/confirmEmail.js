module.exports = async (req, res) => {
    try {
        // отримуєемо зашифровану електронну пошту з тіла запиту
        const email = req.params.encryptedEmail

        // шукаємо в БД запис для активації користувача
        const confirmElement = await db.emailConfirm.findOne({ encryptedEmail: email }).select('userID')
        if (!confirmElement) return res.status(400).send({ success: false, message: 'DB error. Try again later or try create new account.' })

        const identity = confirmElement.sensorID
        const existSensor = await db.agroGsmSensors.findOne({ identity })
        if (!existSensor) return res.status(400).send({ success: false, error: 'sensor with this identity does not exist' })
        // створємо фільтр пошуку та параметр редагування запису користувача
        const filter = { _id: confirmElement.userID }
        const update = { confirmed: true }

        // активація користувача
        const confirmedUser = await db.users.findOneAndUpdate(filter, update, { new: true })
        confirmedUser.devices = [existSensor._id, ...confirmedUser.devices]

        existSensor.user = confirmedUser._id
        existSensor.name = identity

        await confirmedUser.save()
        await existSensor.save()

        // видаляємо документ активації так як користувача уже активовано
        const deleteDocument = await db.emailConfirm.findOneAndDelete({ encryptedEmail: email })

        res.send({ success: true, message: 'Email confirmed. You can now go to your personal account.' })
    } catch (error) {
        console.error(error)
        res.status(500).send({ success: false, error: 'Internal server error' })
    }
}