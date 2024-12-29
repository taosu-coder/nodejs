const express = require("express")
const app = express()

app.use(express.static("./public"))

//http响应
app.get("/", (req, res) => {

    res.send({ ok: 1 })
})

app.listen(3000)

//websocket响应  npm上simple server
const WebSocket = require('ws');
const WebSocketServer = WebSocket.WebSocketServer
const wss = new WebSocketServer({ port: 8080 });
//服务端
wss.on('connection', function connection(ws) {
    ws.on('error', console.error);
    //客户端send发信息，服务端可以接收到
    ws.on('message', function message(data) {
        console.log('received: %s', data);

        //群发功能，转发给其他人
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: false });
            }//自己也会收到客户端群发ws.send的消息，加上client !==ws,排除自己
        });
    });

    ws.send('欢迎来到聊天室');
});