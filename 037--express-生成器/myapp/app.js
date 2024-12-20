var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));//根据环境自动区别/\拼成完整路径
app.set('view engine', 'ejs');//设置模板引擎为ejs模板

app.use(logger('dev'));//引入morgan，用于记录请求，操作记录
app.use(express.json());//1
app.use(express.urlencoded({ extended: false }));//2；1、2是为了获取前端post过来的数据做的中间件设置
app.use(cookieParser());//给前端读取设置cookies的第三方中间件
app.use(express.static(path.join(__dirname, 'public')));//把public文件夹做成静态资源文件夹，路径更严谨（绝对路径）

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
  res.render('error');//上面res.locals.message、res.locals.error就相当于res.render('error'，{message：，error：})的第二种写法，在error。ejs中可以定制个性错误页面
});

module.exports = app;
