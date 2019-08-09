var express = require('express')
var router = express.Router()
const {logincheck, register} = require('../controller/user')
const {SuccessModel, ErrorModel} = require('../model/resModel')

router.post('/loginAdmin', function(req, res, next) {
  const { username, password } = req.body
  const result = logincheck(username, password)
  return result.then(data => {
    console.log(data)
    let power = data.power
    if(data.username) {
      req.session.username = data.username;
      if(power > 1) {
        res.json(
          new SuccessModel(data)
        )
      } else {
        res.json(
          new ErrorModel('对不起, 没有权限你无法登录')
        )
      }
      return
    }
    res.json(
      new ErrorModel('信息错误')
    );
  });
  
})
router.get('/good_list', function(req, res, next) {
  res.json(
    new SuccessModel({
      id:1,
      message:'你好'
    })
  )
})
router.get('/user_list', function(req, res, next) {

})
module.exports = router