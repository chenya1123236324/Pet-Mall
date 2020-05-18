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

  // 获取随机商品列表 
  app.router('randomGoodsList',async(ctx,next)=>{
    const { num } = event
    ctx.body = await db.collection('goodLists')
    .aggregate()
    .sample({
      size:num
    })
    .end()
    .then(res=>{
      return res
    })
    .catch(err=>{
      return err
    })
  }),
  // 根据id获取商品 
  app.router('idGood',async(ctx,next)=>{
    const { id } = event
    
    ctx.body = await db.collection('goodLists')
    .where({_id:id})
    .get()
    .then(res=>{
      return res
    })
    .catch(err=>{
      return err
    })
  })
  // 根据类别获取商品 
  app.router('classification',async(ctx,next)=>{
    const { species } = event
    console.log(species)
    ctx.body = await db.collection('goodLists')
    .where({species:species})
    .get()
    .then(res=>{
      return res
      console.log("res")
    })
    .catch(err=>{
      return err
    })
  })

  return app.serve()
}