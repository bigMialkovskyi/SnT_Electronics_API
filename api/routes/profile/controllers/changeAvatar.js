const { Types } = require('mongoose')


module.exports = async (req, res) => {
  try {
    // получаем файл аватара из запроса
    const avatarFile = req.file

    // удаляем прошлый аватар
    if (req.user.avatar) store.files.actions.DELETE_FILE(req.user.avatar)
    if (req.user.files) req.user.files = req.user.files.filter(element => String(element) != String(req.user.avatar))
    await req.user.save()
    
    // записываем данные о файле в БД
    const file = await store.files.actions.SAVE_FILE(avatarFile, req.user._id)
    console.log('15', file);

    const formatedAvatar = await store.files.actions.FORMAT_TO_AVATAR(file.path, file._id)
    console.log(formatedAvatar);

    // обновляем аватар пользователя в БД
    await db.users.updateOne({ _id: req.user._id }, { avatar: formatedAvatar._id })
    
    res.send({ success: true, message: 'avatar changed', avatar: formatedAvatar.path })
  } catch (error) {
    console.error(error)
    res.status(500).send({ success: false, error: 'Internal server error' })
  }
}
