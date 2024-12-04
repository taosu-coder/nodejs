var http = require("http")
//创建服务器
http.createServer((req, res) => {
    //req 接收浏览器传的参数
    //res 返回渲染的内容（给浏览器的响应）
    res.writeHead(200, { "content-type": "text/html;charset=utf-8" })
    res.write(`
        <html>
        <b>hello world</b>
        <div>你好</div> 
        </html>
        `)

    //res.write可以写多个
    // res.write("hello")
    // res.write("taosu")
    //res.end()必须要有，不然浏览器以为还有内容没完会一直等待，网页转圈圈,直到超时。end里也可以传内容，可以不用write直接用一个end。end后面不能再传内容了。end里不能传数组，得是json字符串格式。
    // res.end("[1,2,3]")
    res.end()
}).listen(3000, () => {
    //监听端口号3000
    //()=>回调函数：只要服务器创建成功就调用
    console.log("server start")
})