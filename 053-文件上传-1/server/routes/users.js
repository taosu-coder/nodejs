var express = require('express');
const UserController = require('../controllers/Usercontroller');
var router = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'public/uploads/' })

/* GET users listing. */

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

//响应前端post请求-增加用户
//中间件支持中间件栈的写法，第一个运行才到下一个，函数也可以router.post("/user",function(){},function(){})
router.post("/user", upload.single("avatar"), UserController.addUser)

//响应前端post请求-更新用户
router.post("/user/:myid", UserController.updateUser)

//响应前端post请求-删除用户
router.delete("/user/:id", UserController.deleteUser)

//响应前端post请求-查询用户数据
router.get("/user", UserController.getUser)


//登录校验
router.post("/login", UserController.login)
router.get("/loginout", UserController.loginOutUser)

module.exports = router;