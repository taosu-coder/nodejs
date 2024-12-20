var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  // res.send('respond with a resource');

  //app.js里的app.use(cookieParser())
  //获取前端的cookie值
  console.log(req.cookies)
  //设置前端的cookie值，（控制台也能设置document.cookie="fanshu"）
  res.cookie("gender", "male")

  res.send({ name: "taosu" });
});

module.exports = router;
