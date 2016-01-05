var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '欢迎来到德莱联盟'});
});
// router.get('/pages/phone-detail', function(req, res, next) {
//   res.render("phone-detail", {title: '艾希'});
// })

module.exports = router;
