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
module.exports = router;
