const fs = require("fs")

//写入文件
// fs.writeFile("./avatar/a.txt", "hello world", err => {
//     console.log(err)
// })
fs.writeFile("./avatar/a.txt", "你好", err => {
    console.log(err)
})

//若将"hello world"改为"你好"再次执行，你好会覆盖之前的hello
//writeFile在没有这个文件时，创建文件，有时覆盖原来的文件