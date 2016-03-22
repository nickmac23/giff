var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  var arr = fs.readFile('txt').join('')
  res.json(arr);
  // res.render('index', { title: 'Express' });
});


module.exports = router;
