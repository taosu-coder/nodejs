const Koa = require("koa")
const app = new Koa()
const static = require("koa-static")//静态资源
const path = require("path")//修正路径
const bodyParser = require("koa-body-parser")
const router = require("./routes")//index.js可以省略

app.use(bodyParser())//获取post参数
app.use(static(path.join(__dirname, "public")))//静态资源//path.join方法：\/自动转义
//应用级
app.use(router.routes()).use(router.allowedMethods())//router.routes()意思是把路由级中间件router里的所有路由放在应用级中间件注册使用;router.allowedMethods()表示list只响应哪个(post、get...)请求,不报404错误，报405错误Method Not Allowed
app.listen(3000)