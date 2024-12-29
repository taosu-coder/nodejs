const Router = require("koa-router")
//引入路由模块
const userRouter = require('./user.js')
const listRouter = require('./list.js')
const homeRouter = require('./home.js')
const router = new Router()

//如果想改成/api/user和/api/list可以统一加前缀，还可以再子路由组件加
// router.prefix('/api')

//先注册成路由级组件，再注册成应用级组件
router.use('/user', userRouter.routes(), userRouter.allowedMethods())
router.use('/list', listRouter.routes(), userRouter.allowedMethods())

//重定向
router.use('/home', homeRouter.routes(), homeRouter.allowedMethods())
router.redirect('/', '/home')//重定向,http://localhost:3000重定向到http://localhost:3000/home

module.exports = router