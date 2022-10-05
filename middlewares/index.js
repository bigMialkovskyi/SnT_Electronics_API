module.exports = {
  verifyAuth: {
    user: require('./verifyAuth/user'),
    device: require('./verifyAuth/device'),
    product: require('./verifyAuth/product'),
  }
}