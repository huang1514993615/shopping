const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
  try {
    return await db.collection('site').where({
      default: true 
    })
    .update({
      data: {
        default: false
      },
    })
  } catch(e) {
    console.error(e)
  }
}