const express = require("express")

const app = express()
// app.get("/", (req, res) => {
//     res.write("hello world")
//     res.end()
// })
// app.get("/login", (req, res) => {
//     res.write("login")
//     res.end()
// })

//官方用法：
app.get("/", (req, res) => {
    //req是前端给我们的数据，res是我们返回给前端内容可以用上面write end用法也可以send
    res.send("hello world")
})
app.get("/login", (req, res) => {
    //send可以对片段和接口直接解析，之前需要res.writeHead(200, { "content-type": "text/html;charset=utf-8" })响应头,send可以传输任何东西（代码片段、接口、js数据）
    // res.send(`
    //     <html>
    //     <h1>hello taosu</h1>
    //     </html>
    //     `)
    res.send({
        name: "taosu",
        age: 100
    })
})

app.listen(3000, () => {
    console.log("server start")
})