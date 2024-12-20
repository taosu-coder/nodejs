const express = require("express")
const router = express.Router()

//路由级中间件,响应前端的get请求
router.get("/", (req, res) => {
    // console.log(req.query)
    // res.send("login-success")//这些都是不是基于后端渲染的
    //res.send("<b>dwa</b>")//send方法支持模板也支持json数据（接口数据）
    //res.json()//json只支持json数据
    console.log(req.query)
    res.render("login")


})
router.post("/", (req, res) => {
    const { username, password } = req.body
    if (username === "taosu" && password === "123456") {
        console.log("登录成功")
        //重定向到home
        res.redirect("/home")
    } else {
        console.log("登录失败")
        res.redirect("login")
    }
})



module.exports = router