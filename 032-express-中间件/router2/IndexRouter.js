const express = require("express")
const router = express.Router()


//路由级中间件：挂在router上，最后要挂载到应用级上
router.get("/home", (req, res) => {
    res.send("home")
})
//路由级中间件
router.get("/login", (req, res) => {
    res.send("login")
})
//home和login没有上面关联，以后代码多了很乱，优化一下，index3和homeRouter、loginRouter优化，相关接口放一个路由级中间件管理更清晰
module.exports = router