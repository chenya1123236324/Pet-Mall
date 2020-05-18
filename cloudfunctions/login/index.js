// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "todaynews-bj9yd"
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var user = event.userInfo
  // var userInfo = event.userInfo
  console.log(event)
  user.openId = wxContext.OPENID
  user.appId = wxContext.APPID

  db.collection("user").where({
    openid: user.openId
  }).get().then(res => {
    console.log(res)
    var length = res.data.length
    if (length == 0) {
      db.collection("user").add({
        data: {
          name: user.nickName,
          img: user.avatarUrl,
          province:user.province,
          openId: user.openId,
        }
      })
    }
  }).catch(err => {
    console.log(err);
  })

  return user
}
