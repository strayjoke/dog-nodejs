let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let { handleCors } = require('./middlewares/cors')
let { verifyPermission } = require('./middlewares/jwt')
let routes = require('./routes');

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//全局中间件 跨域
app.use(handleCors);
//全局中间件 验证权限
app.use(verifyPermission);
// 路由
app.use(routes);

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
  res.status(err.status || 500).send(err.msg || { msg: "请求地址不正确,请联系管理员" });
});

module.exports = app;
