const express = require("express")
const router = express.Router()

//路由级中间件,响应前端的get请求
router.get("/", (req, res) => {
    console.log(req.query)
    res.send("login-success")
})
//路由级中间件，响应前端的post请求
router.post("/", (req, res) => {
    console.log(req.body)//必须配置中间件index.js里
    const { username, password } = req.body//解构
    if (username === "taosu" & password === "123456") {
        res.send({ ok: 1 })
    } else {
        res.send({ ok: 0 })
    }

})
module.exports = router