const Koa = require("koa")
const app = new Koa()

app.use(async (ctx, next) => {
    if (ctx.url === "/favicon.ico") return
    console.log("111")
    // await next()
    // console.log("444", ctx.token)
    var myToken = await next()//可以直接拿到参数
    console.log("444", myToken)
    ctx.body = "hello zhuozhuo"
})
app.use(async (ctx, next) => {
    console.log("222")
    await delay(1000)
    ctx.token = "akjfhas"
    console.log("333")
    return "akjfhas"
})

function delay(time) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, time)
    })
}

app.listen(3000)