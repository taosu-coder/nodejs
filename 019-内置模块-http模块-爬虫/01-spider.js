var http = require("http")
var https = require("https")
var url = require("url")
// var cheerio = require("cheerio")

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
                //返回爬完的有效信息
                // res.end(data)
                res.end(spider(data))
            })
            break;
        default:
            res.end("404")
    }
}).listen(3000)

//1、httpget 函数被定义为接受一个回调函数 cb：
function httpget(cb) {
    var data = ""
    //https://i.maoyan.com/`拿到整个页面的html代码
    https.get(`https://i.maoyan.com/`, (res) => {
        res.on("data", (chunk) => {
            data += chunk
        }),

            res.on("end", () => {
                console.log(data)
                cb(data)
            })
    })


}
function spider(data) {
    // 利用cheerio第三方模块解析数据(将html解析的类似使用jQuery) npm i cheerio
    //cheerio把dom结构解析，返回$
    let $ = cheerio.load(data)
    let $moviewlist = $(".column.content")
    console.log($moviewlist)
    let movies = []
    $moviewlist.each((index, value) => {
        movies.push({
            title: $(value).find("title").text(),
            grade: $(value).find("grade").text(),
            actor: $(value).find("actor").text()
        })

    })
    console.log(movies)
    return JSON.stringify(movies)
    // return data

}