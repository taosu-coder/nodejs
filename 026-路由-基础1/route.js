const fs = require("fs")

// function route(res, pathname) {
//     switch (pathname) {
//         case "/home":
//             res.writeHead(200, { "content-type": "text/html;charset=utf-8" })
//             res.write(fs.readFileSync("./static/home.html"), "utf-8")
//             //不break就会走到default分支
//             break;
//         case "/login":
//             res.writeHead(200, { "content-type": "text/html;charset=utf-8" })
//             res.write(fs.readFileSync("./static/login.html"), "utf-8")
//             break;
//         default:
//             res.writeHead(404, { "content-type": "text/html;charset=utf-8" })
//             res.write(fs.readFileSync("./static/404.html"), "utf-8")
//     }
// }

//优化：改造为一个大对象,把路径作为k值，：后面用回调函数和 res.writeHead作为value
const route = {
    "/home": (res) => {
        res.writeHead(200, { "content-type": "text/html;charset=utf-8" })
        res.write(fs.readFileSync("./static/home.html"), "utf-8")
        //不break就会走到default分支
    },
    "/login": (res) => {
        res.writeHead(200, { "content-type": "text/html;charset=utf-8" })
        res.write(fs.readFileSync("./static/login.html"), "utf-8")
    },
    "/404": (res) => {
        res.writeHead(404, { "content-type": "text/html;charset=utf-8" })
        res.write(fs.readFileSync("./static/404.html"), "utf-8")
        //这里的404方案，只能在网址输404才能用，输不存在的http://localhost:3000/asdhk会有问题，后面有方法改
    }

}
module.exports = route