var url = require("url")
var http = require("http")
var modulerenderHTML = require("./module/renderHTML")
var modulerenderStatus = require("./module/renderStatus")

//创建服务器
//方法二：
var server = http.createServer()
server.on("request", (req, res) => {
    //req 接收浏览器传的参数
    //res 返回渲染的内容（给浏览器的响应）

    if (req.url === "/favicon.ico") {
        //不响应这个请求，todo读取本地图标
        return
    }

    //parse模块
    // console.log(url.parse(req.url).pathname)
    // var urlobj = url.parse(req.url)
    //url.parse(req.url)传第二个参数true把返回的内容转为json字符串(对象)
    var urlobj = url.parse(req.url, true)
    //对象就可以访问到对象里的内容
    console.log(urlobj.query)
    var pathname = url.parse(req.url).pathname
    res.writeHead(modulerenderStatus.renderStatus(pathname), { "content-type": "text/html;charset=utf-8" })
    res.write(modulerenderHTML.renderHTML(pathname))

    res.end()
})
server.listen(3000, () => {
    console.log("server start")
})

//format模块
// const url=require("url")已经引入了
// const urlString = "http://www.baidu.com:443/ad/ondex.html?id=8&name=mouse#tag=110"
// const parseStr = url.parse(urlString)
// console.log(parseStr)
//用parse解析成下面的对象，再用format格式化为完整的url地址
const urlObject = {
    protocol: 'http:',
    slashes: true,
    auth: null,
    host: 'www.baidu.com:443',
    port: '443',
    hostname: 'www.baidu.com',
    hash: '#tag=110',
    search: '?id=8&name=mouse',
    query: 'id=8&name=mouse',
    pathname: '/ad/ondex.html',
    path: '/ad/ondex.html?id=8&name=mouse',
    href: 'http://www.baidu.com:443/ad/ondex.html?id=8&name=mouse#tag=110'
}

console.log(url.format(urlObject))

//resolve:用于地址拼接
// const url=require("url")已经引入了
var a = url.resolve("/one/two/three", "four")
var a1 = url.resolve("/one/two/three/", "four")
//加不加/的区别
console.log(a, a1)

//带地址的拼接，后面的会替换域名/后的所有
var b = url.resolve("http://example.com/", "/one")
var c = url.resolve("http://example.com/one/aaa/bbb", "/one")
console.log(b)
console.log(c)