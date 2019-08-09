var express = require('express');
var router = express.Router();
const { logincheck, register, check, user_list } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');
/* GET users listing. */
router.get('/list', function(req, res, next) {
  const result = user_list()
  return result.then(data => {
    if(data) {
      res.json(
        new SuccessModel(data)
      )
    } else {
      res.json(
        new ErrorModel()
      )
    }
  })
})
router.get('/check', function(req, res, next) {
  const result = check(req.session.username)
  return result.then(data => {
    if(data) {
      res.json(
        new SuccessModel(data)
      )
    } else {
      res.json(
        new ErrorModel()
      )
    }
  })
})
router.post('/loginStage', function(req, res, next) {
  const { username, password } = req.body;
  const result = logincheck(username, password);
  return result.then(data => {
    if(data.username) {
      req.session.username = data.username
      res.json(
        new SuccessModel(data)
      )
      return
    }
    res.json(
      new ErrorModel('信息错误')
    );
  });
});

router.post('/register', function(req, res, next) {
  const { username, password } = req.body;
  const result = register(username, password);
  return result.then(data => {
    if(data) {
      req.session.username = username;
      res.json(
        new SuccessModel(data)
      )
      return
    }
    res.json( 
      new ErrorModel('注册失败')
    )
  });
});
module.exports = router;
