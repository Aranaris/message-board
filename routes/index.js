var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/messageboard');
  // res.render('index', { title: 'Message Board', messages: messages });
});

module.exports = router;
