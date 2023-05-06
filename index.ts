import express, { Application, Request, Response } from 'express'
import bodyParser from 'body-parser';
import multer from 'multer';
import { api } from './routes/api';

const multerConfig = {
    //specify diskStorage (another option is memory)
    storage: multer.diskStorage({
        //specify destination
        destination: function (req: Request, file: any, next: any) {
            next(null, './public/upload');
        },

        //specify the filename to be unique
        filename: function (req: Request, file: any, next: any) {
            console.log(file);
            const ext = file.mimetype.split('/')[1];
            //set the file fieldname to a unique name containing the original name, current datetime and the extension.
            next(null, file.fieldname + '-' + Date.now() + '.' + ext);
        }
    }),

    // filter out and prevent non-image files.
    fileFilter: function (req: Request, file: any, next: any) {
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
            return next();
        }
    }
};

var upload = multer(multerConfig);
var app: Application = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

app.use(upload.any());
app.use(express.static('public')); // Folder public static file
//setting view engine to ejs
app.set("view engine", "ejs");

app.get('/', function (req: Request, res: Response) {
    res.render("index");
});

app.post("/", function (req: Request, res: Response) {
    res.send(req.body);
});

app.use("/api", api);

app.listen(3000);