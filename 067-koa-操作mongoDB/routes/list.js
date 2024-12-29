const Router = require("koa-router")
const router = new Router()

//增
router.post("/", (ctx, next) => {
    ctx.body = {
        ok: 1,
        info: "add list success"
    }
})
//查
router.get("/", (ctx, next) => {
    ctx.body = {
        ok: 1,
        info: "get list success"
    }
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

module.exports = router