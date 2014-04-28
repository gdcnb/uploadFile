var express = require('express');
var router = express.Router();
var path = require('path');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var formidable = require('formidable');
var fs = require('fs');

/* GET users listing. */
router.post('/', multipartMiddleware, function(req, res) {
    console.log('body=%j', req.body);
    console.log('file=%j', req.files);
    var forms = Object.keys(req.files);
    forms.forEach(function(form) {
        var filepath = req.files[form].path;
        fs.readFile(filepath, function(err, data){
            var destPath = path.join(__dirname, 'private/')+ req.files[form].name;
            console.log('destPath=%s', destPath);
            fs.writeFile(destPath, data, function(err){
                res.send('success');
            })
        });
    });
    res.send('success');
});

module.exports = router;
