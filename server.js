var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var multer = require('multer');

var app = express();
var upload = multer({ dest: 'uploads/' }); //destination folder tells multer where to upload files

app.use(bodyParser.json());

//access style.css
app.use(express.static('public'));

// get index.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

//use the same file input name from index.html in upload.single() 
//function to upload file and return file size in json response
app.post('/upload', upload.single('fileName'), function(req, res, next){
  var fileSize = req.file.size;
     console.log(req.file.size);
     return res.json({size: fileSize});
});//post upload


// listen port requests 
var listener = app.listen(process.env.PORT, function () {
  console.log('Listening on port ' + listener.address().port);
});
