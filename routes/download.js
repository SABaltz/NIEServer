var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

router.get('/', function (req, res, next) {
    const filePath = path.join(__dirname, 'files/NIE_Master_PDF_Files.zip');
    fs.exists(filePath, (exists) => {
        if (exists) {
            res.setHeader('Content-Type', 'application/zip');
            res.setHeader('Content-Disposition', 'attachment; filename=NIE_Master_PDF_Files.zip');

            const fileStream = fs.createReadStream(filePath);
            fileStream.pipe(res);
        } else {
            res.status(404).send('File not found');
        }
    });
});

module.exports = router;
