var http = require("http")
var url = require("url")

http.createServer((req, res) => {
    var urlobj = url.parse(req.url, true)
    //cors头：解决跨域
    res.writeHead(200, {
        "content-Type": "application/json;charset=utf-8",
        //允许所有域通过控制
        "access-control-allow-origin": "*"
    })


    switch (urlobj.pathname) {
        case "/api/aaa":
            res.end(`
                ${JSON.stringify({
                name: "taosu",
                age: 100
            })}`)
            break;
        default: res.end("404")
    }
}).listen(3000)