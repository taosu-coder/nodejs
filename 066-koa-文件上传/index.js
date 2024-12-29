const Koa = require("koa")
const app = new Koa()
const static = require("koa-static")//静态资源
const path = require("path")//修正路径
const bodyParser = require("koa-body-parser")
const router = require("./routes")//index.js可以省略
const views = require("koa-views")
const convert = require('koa-convert');
const session = require("koa-session-minimal")
const JWT = require("./until/JWT")


app.use(convert(bodyParser()))//获取post参数
app.use(static(path.join(__dirname, "public")))//静态资源//path.join方法：\/自动转义
//配置模板引擎
app.use(views(path.join(__dirname, "views"), { extension: "ejs" }))//调用ejs引擎解析模板

//session配置
app.use(session({
    key: "taosuSessionId",
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}))

//token判断拦截
app.use(async (ctx, next) => {
    if (ctx.url.includes("login")) {
        await next()
        return
    }
    const token = ctx.headers["authorization"]?.split(" ")[1]//?可选链：前面有才执行后面的
    if (token) {
        const payload = JWT.verify(token)
        if (payload) {
            //重新计算过期时间
            const newToken = JWT.generate({
                _id: payload._id,
                username: payload.username
            }, "10s")
            ctx.set("Authorization", newToken)
            await next()
        } else {
            //401
            ctx.status = 401
            ctx.body = { errCode: -1, errInfo: "token过期" }
        }
    } else {
        await next()
    }
})

//应用级
app.use(router.routes()).use(router.allowedMethods())//router.routes()意思是把路由级中间件router里的所有路由放在应用级中间件注册使用;router.allowedMethods()表示list只响应哪个(post、get...)请求,不报404错误，报405错误Method Not Allowed
app.listen(3000)