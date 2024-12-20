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
/**
 * 
 * @api {post} /api/user 添加用户
 * @apiName addUser
 * @apiGroup usergroup
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {String} username 用户名
 * @apiParam  {String} password 密码
 * @apiParam  {Number} age 年龄
 * @apiParam  {File} avatar 头像
 * 
 * @apiSuccess (200) {Number} ok 标识成功字段
 * 
 * @apiParamExample  {multipart/form-data} Request-Example:
 * {
 *     username:"taosu",
 *     password:"123",
 *     age:100,
 *     avatar:File,
 * }
 * 
 * 
 * @apiSuccessExample {type} Success-Response:
 * {
 *     ok:1
 * }
 * 
 * 
 */
//中间件支持中间件栈的写法，第一个运行才到下一个，函数也可以router.post("/user",function(){},function(){})
router.post("/user", upload.single("avatar"), UserController.addUser)

//响应前端post请求-更新用户
router.post("/user/:myid", UserController.updateUser)

//响应前端post请求-删除用户
/**
 * 
 * @api {delete} /api/user/:id 删除用户
 * @apiName deleteUser
 * @apiGroup usergroup
 * @apiVersion  1.0.0
 *
 * @apiSuccess (200) {Number} ok 标识成功字段
 * 
 * @apiSuccessExample {type} Success-Response:
 * {
 *     ok:1
 * }
 * 
 * 
 */
router.delete("/user/:id", UserController.deleteUser)

//响应前端post请求-查询用户数据
router.get("/user", UserController.getUser)


//登录校验
router.post("/login", UserController.login)
router.get("/loginout", UserController.loginOutUser)

module.exports = router;