const UserService = require("../services/UserService")

const UserController = {
    addUser: async (req, res) => {
        console.log(req.body)
        //插入数据库
        //nodejs操作数据库
        //1、创建一个模型（user,为了复用和限制filed类型），一一对应数据库的集合（users）
        //user.create,user.find,user.delete,user.update

        const { username, password, age } = req.body//解构
        await UserService.addUser(username, password, age)
        res.send({
            ok: 1
        })
    },

    updateUser: async (req, res) => {
        //req.params拿到id值
        console.log(req.body, req.params.myid)
        //updateOne和updateMany的区别
        const { username, password, age } = req.body
        await UserService.updateUser(req.params.myid, username, password, age)
        res.send({
            ok: 1
        })
    },

    deleteUser: async (req, res) => {
        //deleteOne和deleteMany的区别
        await UserService.deleteUser(req.params.id)
        res.send({
            ok: 1
        })
    },

    getUser: async (req, res) => {
        console.log(req.query)
        //直接find()的话password也会传给前端，所以改为第一个参数是查全部，第二个参数只传["username","age"]
        //sort({age:1})按年龄排序正序，-1倒序
        //数据分页：skip和limit配合,并且需要前端传参数fetch("/api/user/list?page=1&limit=2")
        const { page, limit } = req.query
        const data = await UserService.getUser(page, limit)
        res.send(data)
    },

    login: async (req, res) => {
        console.log('处理登录');
        const { username, password } = req.body
        const data = await UserService.login(username, password)
        if (data.length === 0) {
            res.send({
                ok: 0
            })
        } else {
            //设置session
            req.session.user = data[0]//设置session对象，挂一个字段做标记，布尔值true都行
            //默认存在内存
            res.send({
                ok: 1
            })
        }
    },

    loginOutUser: async (req, res) => {
        //摧毁后端session生命周期（过期），前端cookie还在（钥匙还在房间被摧毁了）
        req.session.destroy(() => {
            res.send({ ok: 1 })
        })
    }
}

module.exports = UserController