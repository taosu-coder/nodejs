const server = require("./server")

const route = require("./route")
const api = require("./api")
//注册路由（在use方法中合并对象）
server.use(route)
server.use(api)
server.start()