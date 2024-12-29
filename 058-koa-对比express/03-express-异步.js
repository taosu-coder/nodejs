const express = require("express")
const app = express()

app.use(async (req, res, next) => {
    if (req.url === "/favicon.ico") return//不然会打印两次
    console.log("111")
    await next()//加了await等待next()完成，代码顺序还是1243
    console.log("444", res.token)
    res.send("hello taosu")
})
app.use(async (req, res, next) => {
    console.log("222")
    //异步
    await delay(1000)
    res.token = "akjfhas"
    console.log("333")
})

//实际写代码会把console.log("444", res.token) res.send("hello taosu")放到后面
function delay(time) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, time)
    })

}

app.listen(3000)

// 111
// 222
// 444
// 333