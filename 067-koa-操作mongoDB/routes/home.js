const Router = require("koa-router")
const router = new Router()

router.get('/', async (ctx, next) => {
    //获取cookie
    // console.log(ctx.cookies.get("name"))
    //写入cookie
    // ctx.cookies.set("name", "zhuozhuo")

    //等待模板解析完，再往前端传解析完的数据
    await ctx.render("home", { username: "taosu" })//自动找views/home.ejs
})
router.get('/list', async (ctx, next) => {
    ctx.body = [
        {
            _id: 1,
            username: "taosu",
            age: 12
        },
        {
            _id: 2,
            username: "zhuozhuo",
            age: 23
        },
        {
            _id: 3,
            username: "hh",
            age: 5
        },
    ]
})
module.exports = router