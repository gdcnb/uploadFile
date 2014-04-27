var express = require('express');
var router = express.Router();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

/* GET users listing. */
router.post('/', function(req, res) {
    console.log('file=%j', req.files);
    fs.readFile(req.files['file'].path, function(err, data){
        fs.writeFile(path.join(__dirname, 'publid') + req.files['file'].filename, data, function(err){
            res.send('success');
        })
    });
});

module.exports = router;
