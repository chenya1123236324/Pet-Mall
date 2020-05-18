// 云函数入口文件
const cloud = require("wx-server-sdk");
const TcbRouter = require("tcb-router");
cloud.init({
  env: "todaynews-bj9yd",
});

const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({
    event,
  });
  // 查询文章列表 
  app.router('articleList',async(ctx,next)=>{
    console.log(event)
    const { start,count } = event.data
    ctx.body = await db.collection("article")
    .skip(start)
    .limit(count)
    .orderBy("createTime","desc")  // createTime 字段排序
    .get()
    .then(res=>{
      return res
    })
    .catch(err=>{
      return err
    })
  })
  // 根据openId查询文章列表 
  app.router('openIdArticleList',async(ctx,next)=>{
    console.log(event)
    const { start,count,openId } = event.data
    ctx.body = await db.collection("article")
    .where({openId:openId})
    .skip(start)
    .limit(count)
    .orderBy("createTime","desc")  // createTime 字段排序
    .get()
    .then(res=>{
      return res
    })
    .catch(err=>{
      return err
    })
  })
  // 添加文章
  app.router("addArticle", async (ctx, next) => {
    console.log(event)
    event.data.createTime= new Date().getTime()
    event.data.showTime=db.serverDate();
    console.log(event.data)
    ctx.body = await db
      .collection("article")
      .add({
        data:event.data
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  });
  // 删除文章
  app.router("delArticle", async (ctx, next) => {
    console.log(event)
    console.log(event.id)
    ctx.body = await db
      .collection("article")
      .where({
        _id:event.id
      })
      .remove()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  });
  return app.serve();
};
