const Router = require("koa-router")
const router = new Router()

router.get('/', async (ctx, next) => {

    //等待模板解析完，再往前端传解析完的数据
    await ctx.render("home", { username: "taosu" })//自动找views/home.ejs
})

module.exports = router