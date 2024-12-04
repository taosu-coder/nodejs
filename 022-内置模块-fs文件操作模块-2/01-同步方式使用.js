const fs = require("fs")

//同步：之前所有的方式都可以用同步，+sync
//同步会阻塞代码，同步期间服务器停止使用，所以不推荐用同步，并且同步代码出错时会使服务器崩溃，所以要自己捕获错误信息try,catch
// fs.mkdirSync("./avatar2",err=>{
//     console.log(err)
// })

try {
    fs.mkdirSync("./avatar2")
} catch (error) {
    console.log("自己捕获", error)
}