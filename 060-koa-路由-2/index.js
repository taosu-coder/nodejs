const Koa = require("koa")
const app = new Koa()
const router = require("./routes")//index.js可以省略


//应用级
app.use(router.routes()).use(router.allowedMethods())//router.routes()意思是把路由级中间件router里的所有路由放在应用级中间件注册使用;router.allowedMethods()表示list只响应哪个(post、get...)请求,不报404错误，报405错误Method Not Allowed
app.listen(3000)