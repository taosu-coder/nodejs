const fs = require("fs")


//026课优化：改造为一个大对象,把路径作为k值，：后面用回调函数和 res.writeHead作为value

function render(res, path, type = "text/html"
) {
    //课件为type = "","content-type": `${type?type:"text/html"};charset=utf-8`
    res.writeHead(200, { "content-type": `${type};charset=utf-8` })
    res.write(fs.readFileSync(path), "utf-8")
    res.end()
}
const route = {
    "/home": (res) => {
        render(res, "./static/home.html")
    },
    "/login": (res) => {
        render(res, "./static/login.html")
    },
    "/404": (res) => {
        res.writeHead(404, { "content-type": "text/html;charset=utf-8" })
        res.write(fs.readFileSync("./static/404.html"), "utf-8")
        //这里的404方案，只能在网址输404才能用，输不存在的http://localhost:3000/asdhk会有问题，后面有方法改
        res.end()
    },
    "/favicon.ico": (res) => {
        // "content-type"后面有小组件帮忙
        render(res, "./static/favicon.ico", "image/x-icon")
    }

}
module.exports = route