var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log('io', io);
  res.render('index', { title: 'Express' });
});

router.get('/test_bloom_payload', function(req, res, next) {
  io.emit('bloom_payload', {_signatory: '0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1'});
  res.status(200).send();
});


router.post('/bloom_payload', function(req, res, next) {
  const resp = {
  	'success': true,
  	'token': '0x8f31e48a585fd12ba58e70e03292cac712cbae39bc7eb980ec189aa88e24d043'
   }
  io.emit('bloom_payload', req.body);
  res.status(200).json(resp);
});

module.exports = router;
