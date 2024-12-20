const express = require("express")
const app = express()
const IndexRouter = require("./router2/IndexRouter")

//应用级中间件：挂在app上
app.use(function (req, res, next) {
    console.log("验证token")
    next()
})

//应用级中间件
// app.use("/", IndexRouter)
//这里应用级中间件""控制一级匹配，路由级中间件里控制二匹配甚至三级四级匹配
app.use("/api", IndexRouter)


app.listen(3000, () => {
    console.log("server start")
})