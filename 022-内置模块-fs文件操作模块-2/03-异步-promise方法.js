const fs = require("fs").promises

//异步， promise方法，方法一有回调地狱问题。之前的方法也都可以用异步then兑现承诺 catch拒绝承诺

//异步创建
// fs.mkdir("./avatar").then(err => {
//     console.log(err)
// })
//异步读取
fs.readFile("./avatar/a.txt", "utf-8").then(data => {
    console.log(data)
})
