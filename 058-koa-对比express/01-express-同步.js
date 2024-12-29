const express = require("express")
const app = express()

app.use((req, res, next) => {
    if (req.url === "/favicon.ico") return//不然会打印两次
    console.log("111")
    next()
    console.log("333")
    res.send("hello taosu")
})
app.use((req, res, next) => {
    console.log("222")
})

//实际来写应该会是线性的，流水作业：完成一个中间件next，next()后面不写代码
// app.use((req, res, next) => {
//     if (req.url === "/favicon.ico") return//不然会打印两次
//     console.log("111")
//     next()
// })
// app.use((req, res, next) => {
//     console.log("222")
//     console.log("333")
//     res.send("hello taosu")
// })

app.listen(3000)

//111
//222
//333