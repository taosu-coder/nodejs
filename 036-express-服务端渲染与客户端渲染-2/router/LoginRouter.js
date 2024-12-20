const express = require("express")
const router = express.Router()

//路由级中间件,响应前端的get请求
router.get("/", (req, res) => {
    // console.log(req.query)
    // res.send("login-success")//这些都是不是基于后端渲染的
    //res.send("<b>dwa</b>")//send方法支持模板也支持json数据（接口数据）
    //res.json()//json只支持json数据

    //渲染模板后返回给前端
    // res.render("login")//自动找views文件夹下的login.ejs文件；render只支持send模板
    // res.render("login", { title: "11111" })
    res.render("login", { error: "", isShow: false })//方法一error:""；方法二布尔值isShow控制是否显示处理
})
router.post("/", (req, res) => {
    if (req.body.username === "taosu" && req.body.password === "123456") {
        console.log("登录成功")
        //重定向到home
        res.redirect("/home")
    } else {
        console.log("登录失败")
        res.render("login", { error: "用户名密码不匹配", isShow: true })//加上方法二布尔值,在ejs中控制
    }
})



module.exports = router