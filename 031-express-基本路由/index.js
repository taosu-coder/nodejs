const express = require("express")

const app = express()

//字符写法：
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

//字符串写法：?、+、*、(cd)?这几个比较少用，了解即可
app.get("/ab/:id", (req, res) => {
    res.send("ok")
})

//正则表达式
// app.get(/a/, (req, res) => {
//     res.send("/a/")
// })
app.get(/.*fly$/, (req, res) => {
    res.send("/.*fly$/")
})

app.listen(3000, () => {
    console.log("server start")
})