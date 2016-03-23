var express = require('express');
var router = express.Router();
var fs = require('fs');
// var video = require('../public/javascripts/app.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



module.exports = router;
