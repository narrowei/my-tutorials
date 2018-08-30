const express = require('express')
const db = require('../db/db.js')
const userRouter = express.Router()
const createToken = require('../middleware/createToken.js')
const bcrypt = require('bcrypt')
const checkToken = require('../middleware/checkToken.js')
const saltRounds = 10

userRouter.get('/', function(req, res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    db.all("SELECT ID,name,gender,email FROM user", function(err, rows){
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});
// create a new user
userRouter.post('/register', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");

    bcrypt.hash(req.body.password, saltRounds, function(err, hash){
        let newUser = {
            name: req.body.name,
            gender: req.body.gender,
            email: req.body.email,
            mobile: req.body.mobile,
            password: hash,
            token: createToken(this.email)
        };
        db.run("INSERT INTO user(name,gender,email,mobile,password,token) VALUES (?)", newUser, function (err) {
            if (err) {
                return console.error(err.message);
            }
        });
	});


});
// We specify a param in our path for the GET of a specific object
userRouter.post('/login', function(req, res) {
    let username = req.body.name;
    let enteredPassword = req.body.password;

    db.all("SELECT * FROM user WHERE name=$name",{$name: username},
        (err, rows) => {
            if (err) {
                throw err;
            }
            if(rows.length > 0){
                res.send(rows[0]);
                console.log("User exists in the database.");
                bcryp.compare(enteredPassword, rows[0].password, function(err, res){
                	if(res){
                		console.log("password matches! Redirecting...")
						res.redirect('/')
					}
				});

            }else{
                console.log("Password did not match...")
            }
        })
});

// Similar to the GET on an object, to update it we can PATCH
userRouter.patch('/:id', function(req, res) {

});

// Delete a specific object
userRouter.delete('/delUser/:id', function(req, res) {
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

module.exports = userRouter