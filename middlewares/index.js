module.exports = {
  verifyAuth: {
    user: require('./verifyAuth/user'),
    device: require('./verifyAuth/device'),
    admin: require('./verifyAuth/admin'),
  }
}