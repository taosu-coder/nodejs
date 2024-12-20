var express = require('express');
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

module.exports = router;
