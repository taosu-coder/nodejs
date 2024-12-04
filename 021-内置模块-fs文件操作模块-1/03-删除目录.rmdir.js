const fs = require("fs")

//删除
fs.rmdir("./avatar2", (err) => {
    if (err && err.code === 'ENOENT') {
        console.log("目录不存在")
    }
})