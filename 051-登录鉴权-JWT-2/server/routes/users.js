var express = require('express');
const UserController = require('../controllers/Usercontroller');
var router = express.Router();

/* GET users listing. */

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

//响应前端post请求-增加用户
router.post("/user", UserController.addUser)

//响应前端post请求-更新用户
router.post("/user/:myid", UserController.updateUser)

//响应前端post请求-删除用户
router.delete("/user/:id", UserController.deleteUser)

//响应前端post请求-查询用户数据
router.get("/user", UserController.getUser)


//登录校验
router.post("/login", UserController.login)
//退出，摧毁后端session生命周期（过期），前端cookie还在（钥匙还在房间被摧毁了）
router.get("/loginout", UserController.loginOutUser)

module.exports = router;