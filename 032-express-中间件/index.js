const express = require("express")

const app = express()

app.get("/", (req, res) => {
    //req是前端给我们的数据，res是我们返回给前端内容可以用write end用法也可以send
    res.send("hello world")
})
app.get("/login", (req, res) => {
    res.send({
        name: "taosu",
        age: 100
    })
})

//场景：前端请求home页面数据
//1、后端验证用户token是否过期/cookie是否过期
//2、查询数据库
//3、返回内容给前端

//多个回调函数=多个中间件=中间件栈

//数组中间件写法二：比上面的美观
const func1 = (req, res, next) => {
    //1、验证token/验证cookie
    console.log("验证token")
    const isVaild = true//false
    if (isVaild) {
        //扩展：可以往func2传数据，func2接收一下
        res.taosu = "这是func1的计算结果"
        next()
    } else {
        //返回错误
        res.send("error")
        //send结束，后面放东西没用
    }
}
//应用级中间件,要注意摆放（注册中间件）的位置（例单纯访问时不需要验证）
app.use(func1)//万能匹配应用级中间件，所有请求都响应
// app.use("/home", func1)//只响应/home的中间件

const func2 = (req, res) => {
    //2、查询数据库
    //3、返回内容给前端
    console.log(res.taosu)
    res.send({ list: [1, 2, 3] })
}
app.get("/home", [func2])
app.get("/list", (req, res) => {
    res.send("list")
})//写法自由

app.listen(3000, () => {
    console.log("server start")
})