var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');

//引入session
var session = require("express-session")
var MongoStore = require("connect-mongo");
const JWT = require('./util/JWT');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 注册session中间件
app.use(session({
  name: "taosusystem",
  secret: "taosu123",
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 10,
    secure: false
  },
  rolling: true,
  store: MongoStore.create({
    mongoUrl: "mongodb://127.0.0.1:27017/taosu_session",//新创建一个数据库
    ttl: 1000 * 60 * 10,//过期时间，跟上面 maxAge保持一致
  })
}))

//设置中间件。token过期校验
app.use((req, res, next) => {
  //排除login相关的路由和接口
  if (req.url.includes("login")) {
    next()
    return
  }
  //校验token
  // console.log(req.headers)
  //es支持？语法规则表示前面为真才走后面，不是三目
  // console.log(req.headers["authorization"]?.split(" ")[1])
  const token = req.headers["authorization"]?.split(" ")[1]
  if (token) {
    console.log(token)
    const payload = JWT.verify(token)
    if (payload) {
      //重新计算token过期时间，重新生成一个token
      const newToken = JWT.generate({
        _id: payload._id,
        username: payload.username
      }, "1h")
      res.header("Authorization", newToken)
      next()
    } else {
      res.status(401).send({ errCode: -1, errInfo: "token过期" })
    }

  } else {
    next()
  }

})

app.use('/', indexRouter); // render 后端页面服务 ssr 技术
app.use('/api', usersRouter); // send 后端纯数据接口服务
app.use('/login', loginRouter); // render 后端页面服务 ssr 技术

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
