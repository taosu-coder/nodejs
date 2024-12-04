const fs = require("fs")

//读取目录信息
fs.readdir("./avatar", (err, data) => {
    if (!err) {
        console.log(data)
    }
})