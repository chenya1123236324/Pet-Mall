// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router')
cloud.init({
  env: "todaynews-bj9yd",
})

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({
    event,
  });
  // 获取轮播图图片
  app.router('banner',async(ctx,next)=>{
    ctx.body = await db.collection("bannerList")
    .get()
    .then(res=>{
      console.log("11",res)
      return res
    })
    .catch(err=>{
      return err
    })
  })
  // 获取分类图片
  app.router('classification',async(ctx,next)=>{
    ctx.body = await db.collection("classification")
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