import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';

//file path stuff
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



// const __dirname = import.meta.dirname;
const app = express();
const urlEncoderParser = bodyParser.urlencoded({ extended: false });

// storage object, tells multer where to put the file and what name to give it
var storage = multer.diskStorage({
    destination: (req, file, callback ) => {
        callback(null, "uploads/");
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});

var upload = multer({storage: storage}).fields([{ name: 'file', maxCount: 1}]);;

app.use(express.static('public'));

// open form on index (/)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/uploadForm.html');
});

// app.post("/upload", (req, res) => {
//     upload(req, res, (err) => {
//         //check if successful
//         if (err) return res.end(400).send("Error uploading file");

//         // access the text field
//         const username = req.body.username;

//         // access the uploaded file
//         const uploadedFile = req.files['file'][0];

//         console.log(`Username: ${username}`);
//         console.log(`File path: ${uploadedFile.path}`);
//         res.end('File and form data uplaoded successfully!')
//         });
//     });

// user
app.get('/userPage', (req, res) => {
    res.sendFile(__dirname + '/pages/user.html');
});

app.get('/getUser', (req, res) => {
    var response = {
        firstName: req.query.firstName,
        lastName: req.query.lastName,
    }

    console.log("Response is ", response);
    res.end(`Received Data: ${JSON.stringify(response)}`);
})

// student
app.get('/studentForm', (req, res) => {
    res.sendFile(__dirname + '/pages/student.html');
})

app.get('/getStudent', (req, res) => {
    var response = {
        firstname: req.query.firstName,
        lastname: req.query.lastName,
        studentnumber: req.query.studentNumber,
        section: req.query.section,
    }

    console.log("Response is ", response),
    res.end(`Student Info: ${JSON.stringify(response)}`);
})

// admin
app.get('/adminForm', (req, res) => {
    res.sendFile(__dirname + '/pages/admin.html');
})

app.get('/getAdmin', (req, res) => {
    var response = {
        firstname: req.query.firstName,
        lastname: req.query.lastName,
        adminid: req.query.adminId,
        department: req.query.department,
        username: req.query.username,
        file: req.query.file
        
    }
})

// updated aug 18
app.post('/postAdmin', (req, res) => {
    upload(req, res, (err) => {
        //check if successful
        if (err) return res.end(400).send("Error uploading file");

        //access the text file
        const username = req.body.username;

        //access the uploaded file
        const uploadedFile = req.files['file'][0];

        var response = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            adminId: req.body.adminId,
            department: req.body.department,
            username: req.body.username,
            filePath: uploadedFile.path
        }

        // console.log(`File path: ${uploadedFile.path}`);
        console.log("Response is ", response),
        res.end('File and form data uploaded successfully!');
        // res.end(`Admin Info: ${JSON.stringify(response)}`);
    });    
});

const server = app.listen(8080, () => {
    const host = server.address().address;
    const port = server.address().port;
    // console.log("Server running at http://%s:%s", host, port);
    // console.log("Server running at http://" + host + ":" + port);
    console.log(`Server running at http://${host}:${port}`);
})