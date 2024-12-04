const fs = require("fs")

//读取文件信息
// fs.stat("./avatar", (err, data) => {
//     console.log(data)
//     console.log(data.isFile())//是否为文件false
//     console.log(data.isDirectory())//是否为目录true
// })

fs.stat("./avatar/a.txt", (err, data) => {
    console.log(data)
    console.log(data.isFile())//是否为文件true
    console.log(data.isDirectory())//是否为目录false
})