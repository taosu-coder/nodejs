var express = require('express');
const JWT = require('../util/JWT');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });


  // if (req.session.user) {
  //   res.render('index', { title: 'Express' });
  // } else {
  //   res.redirect("/login")
  // }

});


//测试token加密与验证过程
// const token = JWT.generate({ username: "taosu" }, "10s")
// console.log(JWT.verify(token))
// setTimeout(() => {
//   console.log(JWT.verify(token))
// }, 9000);

// setTimeout(() => {
//   console.log(JWT.verify(token))
// }, 11000);

module.exports = router;
