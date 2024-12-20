const express = require("express")
const router = express.Router()


//路由级中间件：挂在router上，最后要挂载到应用级上
//自己模块自己管理
router.get("/", (req, res) => {
    var list = ["aaa", "bbb", "ccc", "ddd"]
    var myhtml = "<b>我是加粗</b>"
    res.render("home", { list: list, myhtml: myhtml })
})



module.exports = router