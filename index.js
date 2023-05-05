var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');

const multerConfig = {
    //specify diskStorage (another option is memory)
    storage: multer.diskStorage({
        //specify destination
        destination: function (req, file, next) {
            next(null, './public/upload');
        },

        //specify the filename to be unique
        filename: function (req, file, next) {
            console.log(file);
            const ext = file.mimetype.split('/')[1];
            //set the file fieldname to a unique name containing the original name, current datetime and the extension.
            next(null, file.fieldname + '-' + Date.now() + '.' + ext);
        }
    }),

    // filter out and prevent non-image files.
    fileFilter: function (req, file, next) {
        if (!file) {
            next();
        }
        // only permit zip mimetypes
        const zip = file.mimetype.startsWith('application');
        const image = file.mimetype.startsWith('image');
        console.log(file.mimetype);
        if (zip || image) {
            console.log('zip or image uploaded');
            next(null, true);
        } else {
            console.log("file not supported")
            errorReq = true;
            return next();
        }
    }
};

var upload = multer(multerConfig);
var app = express();


app.use(bodyParser.urlencoded({ extended: true }));

app.use(upload.any());
app.use(express.static('public')); // Folder public static file
//setting view engine to ejs
app.set("view engine", "ejs");

app.get('/', function (req, res) {
    res.render("index");
});

app.post("/", function (req, res) {
    res.send(req.body);
});

app.listen(3000);