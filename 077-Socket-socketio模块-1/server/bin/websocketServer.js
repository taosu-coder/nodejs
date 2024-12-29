const JWT = require('../util/JWT');

function start(server) {
    const io = require('socket.io')(server);
    io.on('connection', (socket, req) => {
        console.log("连接")
        // console.log(socket.handshake.query.token)
        const payload = JWT.verify(socket.handshake.query.token)
        if (payload) {
            socket.user = payload//标记user，知道是谁发的消息

            //发送 欢迎
            // socket.emit("aaa", "111")//socket.emit发送自定义aaa方法，客户端socket.on("aaa", (msg) =>接收
            socket.emit(WebSocketType.GroupChat, createMessage(null, "欢迎来到聊天室"))//第一个参数是socket.user是用户发消息，是null就是广播

            //向所有用户发送用户列表
            sendAll(io)
        } else {
            socket.emit(WebSocketType.Error, createMessage(null, "token过期"))
        }

        socket.on(WebSocketType.GroupList, () => {
            // console.log(io.sockets.sockets)//获取当前所有连接的句柄,结果是个map结构
            console.log(Array.from(io.sockets.sockets).map(item => item[1].user))//转为数组结构(一个二维数组)取[1]的user
            // socket.emit()
        })

        socket.on(WebSocketType.GroupChat, (msg) => {
            // console.log(msg)
            //给所有人发
            io.sockets.emit(WebSocketType.GroupChat, createMessage(socket.user, msg.data))
            //给除自己外的所有人发
            // socket.broadcast.emit(WebSocketType.GroupChat, createMessage(socket.user, msg.data))
        })

        socket.on(WebSocketType.SingleChat, (msgObj) => {
            Array.from(io.sockets.sockets).forEach(item => {
                if (item[1].user.username === msgObj.to) {
                    item[1].emit(WebSocketType.SingleChat, createMessage(socket.user, msgObj.data))
                }
            })
        })


        //离线刷新用户列表
        socket.on("disconnect", () => {
            sendAll(io)
        })
    });
}//server在www里，要传进去，所以封装成一个方法，执行把server当成参数传进去

//标示type对象
const WebSocketType = {
    Error: 0,//错误
    GroupList: 1,//获取群组列表
    GroupChat: 2,//群聊
    SingleChat: 3//私聊
}

//因为ws.send只能传字符串不能传对象，所有将对象转换为字符串
function createMessage(user, data) {
    //emit支持传字符串，就不用传type了
    return {
        user,
        data
    }
}

function sendAll(io) {
    io.sockets.emit(WebSocketType.GroupList, createMessage(null, Array.from(io.sockets.sockets).map(item => item[1].user).filter(item => item)))//因为维护中会有undefined，用filter过滤掉
}

module.exports = start