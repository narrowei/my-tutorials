const express = require('express');
const app = express();

let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('db/my-tutorial.db');

// Create the express router object for users
let userRouter = express.Router();
let tutorialRouter = express.Router();
// A GET to the root of a resource returns a list of that resource
userRouter.get('/', function(req, res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    db.all("SELECT ID,name,gender,email FROM user", function(err, rows){
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});
// A POST to the root of a resource should create a new object
userRouter.post('/', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    let newUser = {
        name: req.body.name,
        gender: req.body.gender,
        email: req.body.email,
        mobile: req.body.mobile,
        password: sha1(req.body.password),
        token: createToken(this.email)
    };
    db.run("INSERT INTO user(name,gender,email,mobile,password,token) VALUES (?)", newUser, function (err) {
        if (err) {
            return console.error(err.message);
        }
    });
});
// We specify a param in our path for the GET of a specific object
userRouter.get('/:id', function(req, res) {
    const nameToLookUp = req.params.id;
    db.all("SELECT * FROM user WHERE name=$name",{$name: nameToLookUp},
        (err, rows) => {
            if (err) {
                throw err;
            }
            if(rows.length > 0){
                res.send(rows[0]);
            }else{
                res.send({});
            }
        })
});

// Similar to the GET on an object, to update it we can PATCH
userRouter.patch('/:id', function(req, res) {

});

// Delete a specific object
userRouter.delete('/:id', function(req, res) {
    const nameToLookUp = req.params.id;
    db.all("DELETE FROM user WHERE name=$name",{$name: nameToLookUp},
        (err, rows) => {
            if (err) {
                throw err;
            }
            if(rows.length > 0){
                res.send(rows[0]);
            }else{
                res.send({});
            }
        })
});

// A GET to the root of a resource returns a list of that resource
tutorialRouter.get('/', function(req, res,next) {
    //allowed CSRF
    res.header("Access-Control-Allow-Origin", "*");
    db.all("SELECT * FROM class", function(err, rows){
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});

// when register a class, insert into database
tutorialRouter.post('/', function(req, res) {
    const newClass = {
        tutorID: req.tutorID,
        name: req.name,
        description: req.description,
        maxNumberStudent: req.maxNumberStudent,
        time: req.time,
        price: req.price,
        attachment: req.attachment,
        videoLink: req.videoLink,
    };
    db.run("INSERT INTO class(tutorID, name, description, maxNumberStudent, time, price, attachment, videoLink)VALUES (?)",
        newClass, function (err) {
            if (err) {
                return console.error(err.message);
            }
        });
});

// GET a specific class
tutorialRouter.get('/:id', function(req, res) {
    const nameToLookUp = req.params.id;
    db.all("SELECT * FROM class WHERE name=$name",{$name: nameToLookUp},
        (err, rows) => {
            if (err) {
                throw err;
            }
            if(rows.length > 0){
                res.send(rows[0]);
            }else{
                res.send({});
            }
        })
});

tutorialRouter.patch('/:id', function(req, res) {

});
// delete a class
tutorialRouter.delete('/:id', function(req, res) {
    const nameToLookUp = req.params.id;
    db.all("DELETE FROM class WHERE name=$name",{$name: nameToLookUp},
        (err, rows) => {
            if (err) {
                throw err;
            }
            if(rows.length > 0){
                res.send(rows[0]);
            }else{
                res.send({});
            }
        })
});

// Attach the routers for their respective paths
app.use('/tutorial', tutorialRouter);
app.use('/user', userRouter);
app.get('/', (req, res) => res.send('Server is running'));
app.listen(3000, () => console.log('Example app listening on port 3000!'));

module.exports = app;