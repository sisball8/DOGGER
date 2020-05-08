// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();
exports.main =async (event, context) => {
  return await db.collection("pets").add({
    data: {
      content: event.content,
      dog: event.dog,
      dogimage: event.dogimage
      // dogimage: {}
      // src: res.tempFilePaths[0]
    }
  })
}

// 云函数入口函数
// exports.main = async (event, context) => {
//   const wxContext = cloud.getWXContext()

//   return {
//     event,
//     openid: wxContext.OPENID,
//     appid: wxContext.APPID,
//     unionid: wxContext.UNIONID,
//   }
// }