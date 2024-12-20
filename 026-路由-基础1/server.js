const http = require("http")
// const fs = require("fs")优化后不需要在这使用
const route = require("./route")

//最基础代码，下面有优化后的结果

// http.createServer((req, res) => {
//     //拿到当前路径
//     const myURL = new URL(req.url, "http://127.0.0.1")
//     // console.log(myURL.pathname)
//     switch (myURL.pathname) {
//         case "/home":
//             res.writeHead(200, { "content-type": "text/html;charset=utf-8" })
//             res.write(fs.readFileSync("./static/home.html"), "utf-8")
//             //不break就会走到default分支
//             break;
//         case "/login":
//             res.writeHead(200, { "content-type": "text/html;charset=utf-8" })
//             res.write(fs.readFileSync("./static/login.html"), "utf-8")
//             break;
//         default:
//             res.writeHead(404, { "content-type": "text/html;charset=utf-8" })
//             res.write(fs.readFileSync("./static/404.html"), "utf-8")
//     }
//     res.end()
// }).listen(3000, () => {
//     console.log("server start")
// })

//优化：
//1、将switch放进route.js文件调用，更整洁
//2、将route中switch方法优化更简洁
http.createServer((req, res) => {
    //拿到当前路径
    const myURL = new URL(req.url, "http://127.0.0.1")

    // route(res, myURL.pathname)
    //route方法改为大对象后要用[]找到对应的对象，再()调用把res传进去，     ps：不能用.(变量不能用.)
    route[myURL.pathname](res)
    //这里的404方案，只能在网址输404才能用，输不存在的http://localhost:3000/asdhk会有问题，后面改try catch

    res.end()
}).listen(3000, () => {
    console.log("server start")
})