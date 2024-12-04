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
            //做客户端 去小米有品要数据
            httppost((data) => {
                res.end(data)
            })
            break;
        default:
            res.end("404")
    }
}).listen(3000)

//1、httpget 函数被定义为接受一个回调函数 cb：
function httppost(cb) {
    var data = ""
    //2、在 https.post 的响应事件中，数据被累积到变量 data 中。

    //小米有品网站移动端network-fetch/xhr-placeholder-header里的general-request url
    //https://m.xiaomiyoupin.com/mtop/market/search/placeHolder
    var options = {
        hostname: "m.xiaomiyoupin.com",
        post: "443",
        path: "/mtop/market/search/placeHolder",
        method: "POST",
        headers: {
            "content-Type": "application/json"
            //"content-Type": "x-www-from-urlencoded"
            // 下面的req.write格式为("name=hh&age=100")
        }
    }
    var req = https.request(options, (res) => {
        res.on("data", (chunk) => {
            data += chunk
        }),
            //3、当响应结束时（res.on("end", () => { ... })），httppost 函数调用回调函数 cb 并将累积的数据 data 传递给它：
            res.on("end", () => {
                console.log(data)
                cb(data)
            })
    })
    //payload,要带去的数据，post请求必须发送post数据才会响应
    req.write(JSON.stringify([{}, { baseParam: { ypClient: 1 } }]))
    req.end()
}