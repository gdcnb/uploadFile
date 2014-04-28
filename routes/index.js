var express = require('express'),
    router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res) {
    console.log('body=%j', req.body);
    console.log('file=%j', req.files);
});

module.exports = router;
