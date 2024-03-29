var express = require('express');
const {readdir} = require("fs");
const {join} = require("path");
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'US National Intelligence Estimates'});
});

const directoryPath = join(__dirname, 'files/');
readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    files.forEach(function (file) {
        // console.log(file.replace(/\.pdf$/, ""))
        router.get(`/${file.replace(/\.pdf$/, "")}`, function (req, res, next) {
            res.render('index', {title: 'US National Intelligence Estimates'});
        });
    })
})

module.exports = router;
