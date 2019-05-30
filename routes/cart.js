var express = require('express');
var router = express.Router();
const { cartlist, delcart, addcart, reducecart, cartcheck } = require('../controller/cart');
const { SuccessModel, ErrorModel } = require('../model/resModel')
const Checklogin = require('../middleware/Checklogin');

/* GET users listing. */
//显示用户购物车里面的商品
router.get('/list', Checklogin , (req, res ,next) => {
  const result = cartlist(req.session.username);
  return result.then(datalist => {
    if(datalist.length > 0){
      res.json(
        new SuccessModel(datalist)
      )
    } else {
      res.json
    }
  })
});
router.post('/check', Checklogin, (req, res, next) => {
  const result = cartcheck(req.body.imgURL, req.session.username)
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
//删除用户购物车里面的某一商品
router.post('/del', Checklogin, (req, res, next) => {
  const result = delcart(req.query.id, req.session.username)
  return result.then(data => {
    res.json(
      new SuccessModel()
    )
  })
})
//增加购物车商品的数量
router.post('/add', Checklogin, (req, res, next) => {
  const result = addcart(req.query.id, req.session.username)
  return result.then(data => {
    res.json(
      new SuccessModel()
    )
  })
})
//删除购物车商品的数量
router.post('/reduce', Checklogin, (req, res, next) => {
  const result = reducecart(req.query.id, req.session.username)
  return result.then(data => {
    res.json(
      new SuccessModel()
    )
  })
})
// router.post('/del', Checklogin, (req, res, next) => {

// })
module.exports = router;