var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require('fs');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'US National Intelligence Estimates'});
});


router.get('/test', function (req, res, next) {
    console.log()
    res.render('pdf', {title: 'title', pdfLocation: 'files/test.pdf'});

});

const directoryPath = path.join(__dirname, '../public/files');

fs.readdir(directoryPath, function (err, files) {
    files.forEach(file => {
        let file_without_extension = file.replace(/\.pdf$/, "")
        router.get(`/${file_without_extension}`, function (req, res, next) {
            res.render('pdf', {title: `${file_without_extension}`, pdfLocation: 'files/test.pdf'});
        });
    })
});


module.exports = router;
