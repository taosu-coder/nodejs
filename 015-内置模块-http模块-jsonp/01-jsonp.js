var http = require("http")
var url = require("url")

http.createServer((req, res) => {
    var urlobj = url.parse(req.url, true)
    console.log(urlobj.query.callback)
    switch (urlobj.pathname) {
        case "/api/aaa":
            res.end(`${urlobj.query.callback} (${JSON.stringify({
                name: "taosu",
                age: 100
            })})`)
            break;
        default:
            res.end("404")
    }
}).listen(3000)