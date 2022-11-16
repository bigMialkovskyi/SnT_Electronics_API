require('dotenv').config()
const { Types } = require('mongoose')
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')


const state = {
  _ROOT: path.dirname(require.main.filename)
}

const getters = {
}

const actions = {
  SAVE_FILE: async function(file, authorId, format) {
    return new Promise(async (resolve, reject) => {
      try {
        const fileRecord = new db.files({
          _id: Types.ObjectId(),
          path: file.path.replace('static/', ''),
          size: file.size,
          author: authorId
        })
        await fileRecord.save()
  
        const admin = await db.admins.findOne({ _id: authorId })
        admin.files.push(fileRecord._id)
        await admin.save()
  
        resolve(fileRecord)
      } catch (error) {
        console.error(error)
        reject(error)
      }
    })
  },
  DELETE_FILE: async function(fileId) {
    return new Promise(async (resolve,reject) => {
      try {
        const file = await db.files.findOne({ _id: fileId})
        const deletePath = `${state._ROOT}/static/${file.path}`

        if (await fs.existsSync(deletePath))await fs.unlinkSync(deletePath)
        await file.remove()

        resolve(true)
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  },
  FORMAT_TO_AVATAR: async function(relativePath, fileId) {
    return new Promise(async (resolve, reject) => {
      try {
        const sourceFile = `${state._ROOT}/static/${relativePath}`
        console.log(sourceFile);
        const destFile = relativePath.replace('temp', 'avatars')

        const formatedFile = await sharp(sourceFile).resize({ width: 200, cover: true }).toFile(`${state._ROOT}/static/${destFile}`)
        await db.files.updateOne({ _id: fileId }, { path: destFile.replace('/static', '') })
        if (await fs.existsSync(sourceFile))await fs.unlinkSync(sourceFile)

        resolve({ path: destFile, _id: fileId })
      } catch (error) {
        console.error(error)
        reject(error)
      }
    })
  }
}

module.exports = {
  state,
  getters,
  actions
}
