const express = require("express")
const app = express()
const HomeRouter = require("./router3/HomeRouter")
const LoginRouter = require("./router3/LoginRouter")

//应用级中间件：挂在app上
app.use(function (req, res, next) {
    console.log("验证token")
    next()
})

//应用级中间件
// app.use("/", IndexRouter)
//这里应用级中间件""控制一级匹配，路由级中间件里控制二匹配甚至三级四级匹配
//相关的路由级中间件管理自己
app.use("/home", HomeRouter)
app.use("/login", LoginRouter)

//错误中间件，放最后使用
//不存在的路径执行，覆盖原始的显示
app.use((req, res) => {
    res.status(404).send("走丢了")
})


app.listen(3000, () => {
    console.log("server start")
})