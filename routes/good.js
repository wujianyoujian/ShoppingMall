var express = require('express');
var router = express.Router();
const { getList, getDetail, newcart, modify, Addgood} = require('../controller/good');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const Checklogin = require('../middleware/Checklogin');

/* GET home page. */
router.get('/list', function(req, res, next) {
  //搜索框用到的
  let keyword = req.query.keyword || ''
  keyword = decodeURI(keyword)
  const result = getList(keyword)
  return result.then(listdata => {
    res.json(
      new SuccessModel(listdata)
    )
  })
});

router.get('/detail', (req, res, next) => {
  const result = getDetail(req.query.id);
  return result.then(data => {
    res.json(
      new SuccessModel(data)
    )
  })
});

router.post('/newcart', Checklogin, (req, res, next) => {
  const result = newcart(req.body, req.session.username)
  result.then(data => {
    res.json(
      new SuccessModel(data)
    )
  })
})
router.post('/modify', (req, res, next) => {
  const result = modify(req.body)
  return result.then(data => {
    if(data) {
      res.json(
        new SuccessModel()
      )
    } else {
      res.json(
        new ErrorModel()
      )
    }
  })
})

router.post('/Addgood', (req, res, next) => {
  const result = Addgood(req.body)
  return result.then(Id => {
    if(Id) {
      res.json(
        new SuccessModel({id:Id})
      )
    } else {
      res.json(
        new ErrorModel('添加失败')
      )
    }
  })
})
module.exports = router;
