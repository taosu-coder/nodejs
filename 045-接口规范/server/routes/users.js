var express = require('express');
const UserModel = require('../model/usermodel');
var router = express.Router();

/* GET users listing. */

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

//响应前端post请求-增加用户
router.post("/user", (req, res) => {
    console.log(req.body)
    //插入数据库
    //nodejs操作数据库
    //1、创建一个模型（user,为了复用和限制filed类型），一一对应数据库的集合（users）
    //user.create,user.find,user.delete,user.update

    const { username, password, age } = req.body//解构
    UserModel.create({
        // username:username,//省略写法：
        username, password, age
    }).then(data => {
        //then里不用res因为上面已经有用res了
        console.log(data)
        res.send({
            ok: 1
        })
    }).catch()
})

//响应前端post请求-修改用户
//:id占位符，占上id的位置
router.post("/user/:myid", (req, res) => {
    //req.params拿到id值
    console.log(req.body, req.params.myid)
    //updateOne和updateMany的区别
    const { username, password, age } = req.body
    UserModel.updateOne({ _id: req.params.myid }, {
        username, password, age
    }).then(data => {
        res.send({
            ok: 1
        })
    })//第一个参数：要匹配的数据，第二个参数：修改内容

})

//响应前端post请求-删除用户
router.delete("/user/:id", (req, res) => {
    //deleteOne和deleteMany的区别
    UserModel.deleteOne({
        _id: req.params.id
    }).then(data => {
        res.send({
            ok: 1
        })
    })
})

//响应前端post请求-查询用户数据
router.get("/user", (req, res) => {
    console.log(req.query)
    //直接find()的话password也会传给前端，所以改为第一个参数是查全部，第二个参数只传["username","age"]
    //sort({age:1})按年龄排序正序，-1倒序
    //数据分页：skip和limit配合,并且需要前端传参数fetch("/api/user/list?page=1&limit=2")
    const { page, limit } = req.query
    UserModel.find({}, ["username", "age"]).sort({ age: 1 }).skip((page - 1) * limit).limit(limit).then(data => {
        res.send(data)
    })
})
module.exports = router;
