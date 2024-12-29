const Koa = require("koa")
const app = new Koa()

//注册应用级中间件
//ctx=context缩写（上下文），res、req合并
app.use((ctx, next) => {
    // ctx.response.body = "hello world"
    // ctx.response.body = "<b>hello world</b>"
    ctx.response.body = { name: "taosu" }
})
app.listen(3000)