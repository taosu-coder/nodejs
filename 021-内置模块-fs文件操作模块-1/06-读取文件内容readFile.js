const fs = require("fs")

//读取文件内容
fs.readFile("./avatar/a.txt", "utf-8", (err, data) => {
    if (!err) {
        console.log(data)
    }
})

//(err, data)回调函数的error-first风格，err在前