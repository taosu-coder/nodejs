const Koa = require("koa")
const app = new Koa()

app.use((ctx, next) => {
    if (ctx.url === "/favicon.ico") return//不然会打印两次
    console.log("111")
    next()
    console.log("333")
    ctx.body = "hello taosu"
})
app.use((ctx, next) => {
    console.log("222")
})

app.listen(3000)

//111
//222
//333