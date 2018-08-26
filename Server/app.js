const express = require('express');
const app = express();

let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('DB/my-tutorial.db');

// Create the express router object for users
let userRoter = express.Router();
// A GET to the root of a resource returns a list of that resource
userRoter.get('/', function(req, res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    db.all("SELECT ID,name,gender,email FROM user", function(err, rows){
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});
// A POST to the root of a resource should create a new object
userRoter.post('/', function(req, res) {

    res.header("Access-Control-Allow-Origin", "*");

    const newUser = {
        name: req.name,
        gender: req.gender,
        email: req.email,
        phoneNumber: req.phoneNumber,
        type: req.type,
        password: req.password,
    };
    db.run("INSERT INTO user(name,gender,email,phoneNumber, type, password) VALUES (?)", newUser, function (err) {
        if (err) {
            return console.error(err.message);
        }
    });

});
// We specify a param in our path for the GET of a specific object
userRoter.get('/:id', function(req, res) {

});

// Similar to the GET on an object, to update it we can PATCH
userRoter.patch('/:id', function(req, res) {

});

// Delete a specific object
userRoter.delete('/:id', function(req, res) {

});

let classRoter = express.Router();
// A GET to the root of a resource returns a list of that resource
classRoter.get('/', function(req, res,next) {
    //allowed CSRF
    res.header("Access-Control-Allow-Origin", "*");
    db.all("SELECT * FROM class", function(err, rows){
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});
classRoter.post('/', function(req, res) {

});

classRoter.get('/:id', function(req, res) {

});

userRoter.patch('/:id', function(req, res) {

});

classRoter.delete('/:id', function(req, res) {

});

// Attach the routers for their respective paths
app.use('/class', classRoter);
app.use('/user', userRoter);
app.get('/', (req, res) => res.send('Server is running'));
app.listen(3000, () => console.log('Example app listening on port 3000!'));

module.exports = app;