var express = require('express');
var ac = require('../module/crawler')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '欢迎来到德莱联盟'});
});
router.get('/f5', function(req, res, next) {
  ac.Acfun();
  	
  res.json({
  	a: 'asasa'
  })	
});

module.exports = router;
