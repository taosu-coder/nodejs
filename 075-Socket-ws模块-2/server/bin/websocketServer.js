
//websocket响应  npm上simple server
const WebSocket = require('ws');
const WebSocketServer = WebSocket.WebSocketServer
const wss = new WebSocketServer({ port: 8080 });
const JWT = require("../util/JWT")
//服务端
wss.on('connection', function connection(ws, req) {
    // console.log(req.url)
    const myURL = new URL(req.url, "http://127.0.0.1:3000")//原生自带获取地址数据的方法

    // console.log(myURL.searchParams)//拿到数据
    // console.log(myURL.searchParams.get("token"))
    //校验token
    const payload = JWT.verify(myURL.searchParams.get("token"))
    if (payload) {
        ws.send(createMessage(WebSocketType.GroupChat, null, "欢迎来到聊天室"));
        // console.log(payload)//payload就是解析后的token，可以对应是哪个用户
        ws.user = payload//自定义一个属性user/aaa都行
        sendAll()//群发一下从一登录就告诉有几个用户在线sendAll方法
    } else {
        ws.send(createMessage(WebSocketType.Error, null, "token过期"))

    }
    ws.on('error', console.error);

    //客户端ws.send发信息，服务端接收到
    ws.on('message', function message(data) {
        console.log('received: %s', data);

        // //群发功能，转发给其他人
        // wss.clients.forEach(function each(client) {
        //     if (client !== ws && client.readyState === WebSocket.OPEN) {
        //         client.send(data, { binary: false });
        //     }//自己也会收到客户端群发ws.send的消息，加上client !==ws,排除自己
        // });
        const msgObj = JSON.parse(data)
        switch (msgObj.type) {
            case WebSocketType.GroupList:
                console.log(Array.from(wss.clients).map(item => item.user))//把一个类数组转换为数组
                ws.send(createMessage(WebSocketType.GroupList, null, JSON.stringify(Array.from(wss.clients).map(item => item.user))))
                break;
            case WebSocketType.GroupChat:
                console.log(msgObj.data)
                wss.clients.forEach(function each(client) {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(createMessage(WebSocketType.GroupChat, ws.user, msgObj.data), { binary: false });
                    }
                });
                break;
            case WebSocketType.SingleChat:
                wss.clients.forEach(function each(client) {
                    if (client.user.username === msgObj.to && client.readyState === WebSocket.OPEN) {
                        client.send(createMessage(WebSocketType.SingleChat, ws.user, msgObj.data), { binary: false });
                    }
                });
                break;

        }
    });
    //下线
    ws.on("close", () => {
        wss.clients.delete(ws.user)
        // console.log(ws.user)
        sendAll()
    })

});

//标示type对象
const WebSocketType = {
    Error: 0,//错误
    GroupList: 1,//获取群组列表
    GroupChat: 2,//群聊
    SingleChat: 3//私聊
}

//因为ws.send只能传字符串不能传对象，所有将对象转换为字符串
function createMessage(type, user, data) {
    return JSON.stringify({
        type,
        user,
        data
    })
}

function sendAll() {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(createMessage(WebSocketType.GroupList, null, JSON.stringify(Array.from(wss.clients).map(item => item.user))))
        }
    });

}