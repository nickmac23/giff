var express = require('express');
var router = express.Router();
var fs = require('fs');
var fs = require('fs');
var GIFEncoder = require('gifencoder');
var encoder = new GIFEncoder(854, 480);
var pngFileStream = require('png-file-stream');

var gif = fs.createReadStream('database.txt');

var arr =[]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/gif', function(req, res, next) {
  var pic = fs.readFile('database.txt')
  console.log(pic);
  res.render('gif', { title: pic });
});
router.post('/gif', function(req, res, next) {
  arr.push(req.body.pic);
  console.log(arr.length);

  fs.appendFile('database.txt', req.body.pic )
})
router.get('/gifmaker', function(req, res, next) {
    // encoder.startFile("images/download.pgn ")
    // encoder.addFrame('images/download.pgn')
    // encoder.setDelay( 1000 )
    // encoder.finish()

    res.render('gif', {title: 'src='+ 'images/download.pgn'+''})
})


module.exports = router;
