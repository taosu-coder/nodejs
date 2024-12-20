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
//多个中间件写法一：
// app.get("/home", (req, res, next) => {
//     //1、验证token/验证cookie
//     console.log("验证token")
//     const isVaild = true//false
//     if (isVaild) {
//         next()
//     } else {
//         //返回错误
//         res.send("error")
//     }
//     // next()
//     //没有next参数就不会往下走
// }, (req, res) => {
//     //2、查询数据库
//     //3、返回内容给前端
//     res.send({ list: [1, 2, 3] })
// })

//数组中间件写法二：比上面的美观
const func1 = (req, res, next) => {
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
const func2 = (req, res) => {
    //2、查询数据库
    //3、返回内容给前端
    console.log(res.taosu)
    res.send({ list: [1, 2, 3] })
}
app.get("/home", [func1, func2])
app.get("/list", [func1], (req, res) => {
    res.send("list")
})//写法自由

app.listen(3000, () => {
    console.log("server start")
})