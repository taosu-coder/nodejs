const Koa = require("koa")
const app = new Koa()

app.use((ctx) => {
    ctx.body = "<h1>hello</h1>"//测代码片段，还可以测json接口
})
// app.listen(3000)

module.exports = app