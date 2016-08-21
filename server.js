var express = require('express');
var path = require('path');
var multer  = require('multer')
var upload = multer();

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/get-file-size', upload.single('target'), function(req, res) {
  var fileSize = typeof req.file === "undefined" ? 0 : req.file.size;
  var output = {size: fileSize};
  res.json(output);
});

app.listen(process.env.PORT || 3000);
