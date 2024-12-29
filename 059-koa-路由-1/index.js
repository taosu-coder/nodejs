const Koa = require("koa")
const Router = require("koa-router")
const app = new Koa()
const router = new Router()

//增
router.post("/list", (ctx, next) => {
    ctx.body = {
        ok: 1,
        info: "add list success"
    }
})
//查
router.get("/list", (ctx, next) => {
    ctx.body = {
        ok: 1,
        info: "get list success"
    }
})
//改
router.put("/list/:id", (ctx, next) => {
    console.log(ctx.params)//获取参数
    ctx.body = {
        ok: 1,
        info: "put list success"
    }
})
//删
router.del("/list/:id", (ctx, next) => {
    ctx.body = {
        ok: 1,
        info: "del list success"
    }
})


router.post("/user", (ctx, next) => {
    ctx.body = {
        ok: 1,
        info: "add list success"
    }
})
//查
router.get("/user", (ctx, next) => {
    ctx.body = {
        ok: 1,
        info: "get list success"
    }
})
//改
router.put("/user/:id", (ctx, next) => {
    console.log(ctx.params)//获取参数
    ctx.body = {
        ok: 1,
        info: "put list success"
    }
})
//删
router.del("/user/:id", (ctx, next) => {
    ctx.body = {
        ok: 1,
        info: "del list success"
    }
})

app.use(router.routes()).use(router.allowedMethods())//router.routes()意思是把路由级中间件router里的所有路由放在应用级中间件注册使用;router.allowedMethods()表示list只响应哪个(post、get...)请求,不报404错误，报405错误Method Not Allowed
app.listen(3000)