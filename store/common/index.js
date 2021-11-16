require('dotenv').config()
const bcrypt = require('bcrypt')


const state = {
  _SECRET_KEY: process.env.SECRET_KEY
}

const getters = {
  GET_SECRET_KEY: () => state._SECRET_KEY
}

const actions = {
  ENCRYPT_PASSWORD: async function (password) {
    return await bcrypt.hash(password, 10)
  },
  CHECK_ENCRYPTED_PASSWORD: async function (password, encryptedPassword) {
    return await bcrypt.compare(password, encryptedPassword)
  }
}

module.exports = {
  state,
  getters,
  actions
}