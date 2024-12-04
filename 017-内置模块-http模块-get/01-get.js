var http = require("http")
var https = require("https")
var url = require("url")

http.createServer((req, res) => {
    var urlobj = url.parse(req.url, true)
    // console.log(urlobj.query.callback)

    res.writeHead(200, {
        "Content-Type": "application/json;charset=utf-8",
        //cors头
        "access-control-allow-origin": "*"
    })

    switch (urlobj.pathname) {
        case "/api/aaa":
            //做客户端 去猫眼要数据
            httpget((data) => {
                res.end(data)
            })
            break;
        default:
            res.end("404")
    }
}).listen(3000)

//1、httpget 函数被定义为接受一个回调函数 cb：
function httpget(cb) {// callBack 回调函数
    var data = ""
    //2、在 https.get 的响应事件中，数据被累积到变量 data 中。
    https.get(`https://i.maoyan.com/api/mmdb/movie/v3/list/hot.json?ct=%E5%8C%97%E4%BA%AC&ci=1&channelId=4`, (res) => {
        res.on("data", (chunk) => {
            data += chunk
        }),
            //3、当响应结束时（res.on("end", () => { ... })），httpget 函数调用回调函数 cb 并将累积的数据 data 传递给它：
            res.on("end", () => {
                console.log(data)
                cb(data) // （）
            })
    })
}
