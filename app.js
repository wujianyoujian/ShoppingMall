var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var RedisClient = require('./db/redis')
const fs = require('fs')

var goodRouter = require('./routes/good');
var userRouter = require('./routes/user');
var cartRouter = require('./routes/cart');
var adminRouter = require('./routes/admin')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

const  logname = path.join(__dirname, 'logs', 'access.log');
const writestream = fs.createWriteStream(logname, {
  flags: 'a'
});
const ENV = process.env.NODE_ENV;
if(ENV == 'dev') {
  app.use(logger('dev'));
} else {
  app.use(logger('combined', {
    stream: writestream
  }))
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './ShoppingMall')));

const sessionStore = new RedisStore({
  client: RedisClient
})

app.use(session({
  secret: 'xsxaxa#1A20oBSU_12',
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  },
  store: sessionStore
}));

app.use('/shop/good', goodRouter);
app.use('/shop/user', userRouter);
app.use('/shop/cart', cartRouter);
app.use('/shop/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
