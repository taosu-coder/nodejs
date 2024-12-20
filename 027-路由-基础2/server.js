const http = require("http")
// const fs = require("fs")优化后不需要在这使用
// const route = require("./route")优化成use方法放到index.js里
// const api = require("./api")优化成use方法放到index.js里

const Router = {}
//assign用法var a={x:1},var b={y:1},var c={},object.assign(c,a)、object.assign(c,b),最后c为a和b合并
// Object.assign(Router, route)
// Object.assign(Router, api)
//优化成use方法仔暴露出去
//express use
function use(obj) {
    Object.assign(Router, obj)

}
function start() {
    http.createServer((req, res) => {
        //拿到当前路径
        const myURL = new URL(req.url, "http://127.0.0.1")

        // route(res, myURL.pathname)
        //route方法改为大对象后要用[]找到对应的对象，再()调用把res传进去，     ps：不能用.(变量不能用.)
        //这里的404方案，只能在网址输404才能用，输不存在的http://localhost:3000/asdhk会有问题，用try catch
        // route[myURL.pathname](res)
        try {
            // route[myURL.pathname](res)//改为合并对象Router
            Router[myURL.pathname](res)
        } catch {
            // route["/404"](res)
            Router["/404"](res)
        }

        // res.end()放render里
    }).listen(3000, () => {
        console.log("server start")
    })
}
exports.start = start
exports.use = use

