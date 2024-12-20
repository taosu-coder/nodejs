const http = require("http")
const fs = require("fs")
const zlib = require("zlib")

const gzip = zlib.createGzip()
http.createServer((req, res) => {
    //res本身就是可写流
    const readStream = fs.createReadStream("./index.js")
    // res.writeHead(200, { "content-type": "application/x-javascript;charset=utf-8" })
    //加上"content-encoding": "gzip"返回给浏览器的才不是乱码
    res.writeHead(200, { "Content-Type": "application/x-javascript;charset=utf-8", "content-encoding": "gzip" })
    // readStream.pipe(res)
    //压缩.pipe(gzip)
    readStream.pipe(gzip).pipe(res)
}).listen(3000, () => {
    console.log("server start")
})