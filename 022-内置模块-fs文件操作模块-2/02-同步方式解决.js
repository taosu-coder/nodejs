const fs = require("fs")

//删除目录和文件，因为异步，所以代码会同时运行，就会导致文件还没删完，目录就开始删除，就会报错，显示code："ENOTEMPTY"目录下不为空
//用同步解决上面问题  !!不推荐同步，因为同步会阻塞后面代码运行，且同步时，服务器会停止
fs.readdir("./avatar2", (err, data) => {
    data.forEach(item => {
        fs.unlinkSync(`./avatar2/${item}`)
    })
    fs.rmdir("./avatar2", err => {
        console.log(err)
    })
})
