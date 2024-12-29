const Router = require("koa-router")
const JWT = require("../until/JWT")
const router = new Router()

//增
router.post("/", (ctx, next) => {
    console.log(ctx.request.body)//获取前端传来的参数,不能简写request，ctx.body是响应给前端的数据
    ctx.body = {
        ok: 1,
        info: "add list success"
    }
})
//查
router.get("/", (ctx, next) => {
    //获取前端传来的数据
    console.log(ctx.query, ctx.queryString)
    ctx.body = ["111", "222", "333"]
})
//改
router.put("/:id", (ctx, next) => {
    console.log(ctx.params)//获取参数
    ctx.body = {
        ok: 1,
        info: "put list success"
    }
})
//删
router.del("/:id", (ctx, next) => {
    ctx.body = {
        ok: 1,
        info: "del list success"
    }
})

router.post("/login", (ctx) => {
    console.log(ctx.request.body)
    const { username, password } = ctx.request.body
    //没有数据库，先这样验证账号密码
    if (username === "taosu" && password === "123") {
        //设置header 设置token 
        const token = JWT.generate({
            _id: "111",
            password: "taosutoken"
        }, "10s")

        //token返回在header中给前端，前端给token传回来也放在header中传输（不成文的规范）
        // res.header("Authorization", token)
        ctx.set("Authorization", token)//koa直接用ctx.set

        ctx.body = {
            ok: 1
        }
    } else {
        ctx.body = {
            ok: 0
        }
    }

})
module.exports = router