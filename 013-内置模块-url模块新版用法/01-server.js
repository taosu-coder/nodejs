var url = require("url")
var http = require("http")
var modulerenderHTML = require("./module/renderHTML")
var modulerenderStatus = require("./module/renderStatus")

//创建服务器
var server = http.createServer()
server.on("request", (req, res) => {
    if (req.url === "/favicon.ico") {
        return
    }

    //parse模块,新版用法（在node.js中文网）
    // var urlobj = url.parse(req.url, true)
    // console.log(urlobj.query.name)
    // var pathname = url.parse(req.url).pathname
    //新版模板：const myURL = new URL('/foo', 'https://example.org/');
    const myURL = new URL(req.url, 'https://127.0.0.1:3000');
    // console.log(myURL)
    console.log(myURL.searchParams)
    //for循环可以拿到参数的值
    // for (var obj of myURL.searchParams) {
    //     console.log(obj)
    // }
    //还可以解构拿出来
    for (var [key, value] of myURL.searchParams) {
        console.log(key, value)
    }

    var pathname = myURL.pathname

    res.writeHead(modulerenderStatus.renderStatus(pathname), { "content-type": "text/html;charset=utf-8" })
    res.write(modulerenderHTML.renderHTML(pathname))

    res.end()
})
server.listen(3000, () => {
    console.log("server start")
})

//format模块，新版用法
// const url = require('node:url');
const myURL2 = new URL('https://a:b@測試?abc#foo');
console.log(url.format(myURL2))
//返回:https://a:b@xn--g6w251d/?abc#foo
console.log(url.format(myURL2, { unicode: true }))
//返回:https://a:b@測試/?abc#foo
console.log(url.format(myURL2, { unicode: true, auth: false }))
//返回:https://測試/?abc#foo
console.log(url.format(myURL2, { unicode: true, auth: false, fragment: false }))
//返回:https://測試/?abc
console.log(url.format(myURL2, { unicode: true, auth: false, fragment: false, search: false }))
//返回:https://測試/

//resolve:用于地址拼接 新版用法
//旧版：
// var c = url.resolve("http://example.com/one/aaa/bbb", "/one")
//新版用法：
var c = new URL("/one", "http://example1.com/one/aaa/bbb")
//console.log(c)打印出来是对象，href就是地址
console.log(c.href)

//url.fileURLToPath(url[, options])
//把一个基于file协议的地址转换为正常可用的路径
const { fileURLToPath } = require('node:url');
console.log(new URL('file://c://你好.txt').pathname);      // Incorrect: /%E4%BD%A0%E5%A5%BD.txt
console.log(fileURLToPath('file://c://你好.txt'));         // Correct:   /你好.txt (POSIX)


//url.pathToFileURL(path[, options])
//把一个路径转换为file协议的

//url.urlToHttpOptions(url)
//转换为httpoption的对象
const { urlToHttpOptions } = require('node:url');
const myURL3 = new URL('https://a:b@測試?abc#foo');
console.log(myURL3)
console.log(urlToHttpOptions(myURL3))
//上面两个对比有字段上的区别