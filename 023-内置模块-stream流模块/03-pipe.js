const fs = require("fs")

const readStream = fs.createReadStream("./1.txt")
const writeStream = fs.createWriteStream("./2.txt")
readStream.pipe(writeStream)
//把可读流的文件复制到可写流文件中，高性能复制文件的方法
