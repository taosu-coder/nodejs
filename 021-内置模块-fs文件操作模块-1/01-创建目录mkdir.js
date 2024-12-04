const fs = require("fs")

//创建目录
//创建成功返回null，不成功返回err原因
fs.mkdir("./avatar", err => {
    console.log(err)
    if (err && err.code === "EEXIST") {
        console.log("文件已存在")
    }
})

//创建成功后再次执行这个代码，会显示code："EEXIST"：文件已存在所以可以加上if判断