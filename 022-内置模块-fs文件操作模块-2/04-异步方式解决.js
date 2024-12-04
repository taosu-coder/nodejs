const fs = require("fs").promises

//删除目录和文件，因为异步，所以代码会同时运行，就会导致文件还没删完，目录就开始删除，就会报错，显示code："ENOTEMPTY"目录下不为空
//用异步解决上面问题  
fs.readdir("./avatar2").then(async (data) => {
    // let arr = []
    // data.forEach(item => {
    //     arr.push(fs.unlink(`./avatar2/${item}`))
    // })
    // //promise.all()等待所有执行完再执行,这里可以用数组，数组里是一个给promise对象
    // await Promise.all(arr)
    // await fs.rmdir("./avatar2")

    //简化优化为：
    await Promise.all(data.map(item => fs.unlink(`./avatar2/${item}`)))
    await fs.rmdir("./avatar2")

}).catch(err => { console.log(err) })
