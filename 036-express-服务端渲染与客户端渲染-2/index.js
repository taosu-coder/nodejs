const express = require("express")
const app = express()
const HomeRouter = require("./router/HomeRouter")
const LoginRouter = require("./router/LoginRouter")
//配置模板引擎
app.set("views", "./views")
app.set("view engine", "ejs")

//配置静态资源
app.use(express.static("public"))
app.use(express.static("static"))

//配置解析post参数的中间件（要放在home和login之前，login才能拿到），不用下载第三方，内置的
app.use(express.urlencoded({ extended: false }))//这代码post参数是username=taosu&password=123456这种form格式（还有json格式的，要用app.use(express.json()）
app.use(express.json())//这个在简易postman不好用

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