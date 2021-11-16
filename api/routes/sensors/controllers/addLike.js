const { Types } = require('mongoose')


module.exports = async (req, res) => {
	try {
		// получаем данные из url запроса
		const { postId } = req.params
		// получаем id пользователя из мидлвары
		const userId = req.user._id

		// проверяем наличие нужных данных
		if (!postId) return res.status(400).send({ success: false, error: '"postId" is required' })
		if (!userId) return res.status(400).send({ success: false, error: '"userId" is required' })

		// находим лайк в БД
		const existLike = await db.likes.findOne({ post: postId, user: userId })

		// если такой лайк уже есть - удаляем его
		if (existLike) return res.status(400).send({ success: false, error: 'like already exist' })

		// если лайка нет - создаем его
		const like = new db.likes({
			_id: Types.ObjectId(),
			post: postId,
			user: userId
		})
		await like.save()

		// обновляем пользователя
		req.user.likes.push(like._id)
		await req.user.save()

		// отправляем ответ на запрос
		res.send({ success: true, message: 'like was added', like: like._id })
	}
	catch (error) {
		console.error(error)
		res.status(500).send({ success: false, error: 'Internal server error' })
	}
}
