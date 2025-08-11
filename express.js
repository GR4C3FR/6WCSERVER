import express from 'express';
const __dirname = import.meta.dirname;
const app = express();
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/pages/home.html');
});

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
    }

    console.log("Response is ", response),
    res.end(`Admin Info: ${JSON.stringify(response)}`);
})










const server = app.listen(5000, () => {
    const host = server.address().address;
    const port = server.address().port;
    // console.log("Server running at http://%s:%s", host, port);
    // console.log("Server running at http://" + host + ":" + port);
    console.log(`Server running at http://${host}:${port}`);
})