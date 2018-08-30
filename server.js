'use strict';

// Author Muhaimenul Islam (www.linkedin.com/in/muhaimenul)
var express = require('express');
var cors = require('cors');

// require body-parser middleware for form submit post request req.body
// var bodyParser = require('body-parser')
// require and use "multer"... configure multer and req.file...body-parser not needer
const multer = require('multer')

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// app.use(bodyParser.urlencoded({extended: true}))

const UPLOAD_PATH = 'public';
const upload = multer({ dest: `${UPLOAD_PATH}/` }); // simple multer configuration

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post('/api/fileanalyse', upload.single('upfile'), function(req, res){
  const outPut = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  }
  res.json(outPut);
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
