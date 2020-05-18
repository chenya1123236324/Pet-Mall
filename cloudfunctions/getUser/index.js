// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router')
cloud.init({
  env: "todaynews-bj9yd"
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({
    event,
  });
  // 获取火爆商品列表 
  app.router('getUser',async(ctx,next)=>{
    const { openId } = event
    ctx.body = await db.collection("user")
    .where({openid:openId})
    .get()
    .then(res=>{
      return res
    })
    .catch(err=>{
      return err
    })
  })

  return app.serve()
}