var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var app = express();


app.use(bodyParser.urlencoded({ extended: true }));

app.use(upload.array());
app.use(express.static('public')); // Folder public static file

app.get('/', function (req, res) {
    let html = "<form method='post'><input type='text' name='name'><button type='submit'>Hai</button></form>";

    res.send(html);
});

app.post("/", function (req, res) {
    res.send(req.body);
});

app.listen(3000);