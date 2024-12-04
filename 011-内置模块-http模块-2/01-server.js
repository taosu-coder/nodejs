var modulerenderHTML = require("./module/renderHTML")
var modulerenderStatus = require("./module/renderStatus")
var http = require("http")
//创建服务器
//写法一：
// http.createServer((req, res) => {
//     //req 接收浏览器传的参数
//     //res 返回渲染的内容（给浏览器的响应）

//     if (req.url === "/favicon.ico") {
//         //不响应这个请求，todo读取本地图标
//         return
//     }
//     console.log(req.url)
//     res.writeHead(modulerenderStatus.renderStatus(req.url), { "content-type": "text/html;charset=utf-8" })
//     res.write(modulerenderHTML.renderHTML(req.url))

//     res.end()
// }).listen(3000, () => {
//     console.log("server start")
// })

//写法二：
var server = http.createServer()
server.on("request", (req, res) => {
    //req 接收浏览器传的参数
    //res 返回渲染的内容（给浏览器的响应）

    if (req.url === "/favicon.ico") {
        //不响应这个请求，todo读取本地图标
        return
    }
    console.log(req.url)
    res.writeHead(modulerenderStatus.renderStatus(req.url), { "content-type": "text/html;charset=utf-8" })
    res.write(modulerenderHTML.renderHTML(req.url))

    res.end()
})
server.listen(3000, () => {
    console.log("server start")
})