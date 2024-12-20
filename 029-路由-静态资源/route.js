const fs = require("fs")
const path = require("path")
var mime = require('mime-types')

function render(res, path, type = "text/html"
) {
    //课件为type = "","content-type": `${type?type:"text/html"};charset=utf-8`
    res.writeHead(200, { "content-type": `${type};charset=utf-8` })
    res.write(fs.readFileSync(path), "utf-8")
    res.end()
}
const route = {
    "/home": (req, res) => {
        render(res, "./static/home.html")
    },
    "/login": (req, res) => {
        render(res, "./static/login.html")
    },
    "/": (req, res) => {
        render(res, "./static/home.html")
    },
    "/404": (req, res) => {
        //判断有没有文件,是不是静态资源，如login.css
        if (readStaticFile(req, res)) {
            return
        }
        res.writeHead(404, { "content-type": "text/html;charset=utf-8" })
        res.write(fs.readFileSync("./static/404.html"), "utf-8")

        res.end()
    },
    // "/favicon.ico": (req, res) => {
    //     // "content-type"后面有小组件帮忙
    //     render(res, "./static/favicon.ico", "image/x-icon")
    // }
}

//静态资源管理
//目前使用的路径都是相对路径（当前文件夹为基础找），绝对路径（根目录下找）
function readStaticFile(req, res) {
    //获取路径
    const myURL = new URL(req.url, "http://127.0.0.1:3000")
    //__dirname是node中的全局变量，当前执行命令的绝对路径
    // console.log(__dirname, myURL.pathname)//请求css就能获取绝对路径C:\Node.js\029-路由-静态资源 /css/login.css，因为有/和\拼起来是乱的，引入path小模块，按系统所需格式把路径拼起来
    // console.log(path.join(__dirname, "/static", myURL.pathname))
    const pathname = path.join(__dirname, "/static", myURL.pathname)
    //这里有个问题http://localhost:3000/时会无法访问，因为按上面拼接路径是一个文件夹。解决方法：1、if (myURL.pathname === "/") return false;2、在上面加个"/":()=>{}

    //判断这个完整路径存不存在（即文件存不存在）
    if (myURL.pathname === "/") return false
    if (fs.existsSync(pathname)) {
        //处理显示返回
        //npmjs.com仓库里mime-types小模块"content-type",课件mime不好用
        // render(res, pathname, "text/css")
        render(res, pathname, mime.lookup(myURL.pathname.split(".")[1]))
        return true

    } else {
        return false
    }
}
module.exports = route