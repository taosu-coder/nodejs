const fs = require("fs")

//重命名
fs.rename("./avatar", "./avatar2", (err) => {
    console.log(err)
    if (err && err.code === "ENOENT") {
        console.log("目录不存在")
    }
})

//再次执行代码显示code: 'ENOENT'：目录不存在，所以if判断