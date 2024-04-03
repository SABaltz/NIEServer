var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require('fs');
/* GET home page. */

const directoryPath = path.join(__dirname, '../public/files');
let fileArray = []
fs.readdir(directoryPath, function (err, files) {
    files.forEach(file => {
        fileArray.push(file.replace(/\.pdf$/, ""))
    });
});

router.use((req, res, next) => {
    // Log the IP address of the visitor
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Log the visit to a file for tracking
    fs.appendFileSync('visits.log', `${ip}\n`);

    next();
});

router.get('/', function (req, res, next) {
    res.render('index', {title: 'US National Intelligence Estimates', fileArray: fileArray});

});


router.get('/robots.txt', function (req, res) {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: /");
});

fs.readdir(directoryPath, function (err, files) {
    files.forEach(file => {
        let file_without_extension = file.replace(/\.pdf$/, "")
        let file_location = 'files/' + file
        router.get(`/${file_without_extension}`, function (req, res, next) {
            res.render('pdf', {title: `${file_without_extension}`, pdfLocation: file_location});
        });
    })
});


module.exports = router;
