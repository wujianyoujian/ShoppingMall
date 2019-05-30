var express = require('express');
var router = express.Router();
const { getList, getDetail, newcart } = require('../controller/good');
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

module.exports = router;
