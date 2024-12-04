const fs = require("fs")

//删除文件
fs.unlink("./avatar/b.txt", err => {
    console.log(err)
    if (err && err.code === 'ENOENT') {
        console.log("文件不存在")
    }
})

//删除成功null后再执行，显示 code: 'ENOENT' 文件不存在，可以if判断

//若目录下有文件，执行删除目录代码是删除不了目录的，显示code："ENOTEMPTY",需要先删除目录里的所有文件才能删除目录