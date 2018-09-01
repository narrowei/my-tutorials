const express = require('express')
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('db/my-tutorial.db');
const userRouter = express.Router()
let cors = require('cors')
const createToken = require('../middleware/createToken.js')
const bcrypt = require('bcrypt')
const checkToken = require('../middleware/checkToken.js')
const saltRounds = 10;
const jwt = require('jsonwebtoken')
let bodyParser = require('body-parser')
userRouter.use( bodyParser.json() );       // to support JSON-encoded bodies
userRouter.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
userRouter.use(cors());

userRouter.get('/',checkToken ,function(req, res,next) {
    //res.header("Access-Control-Allow-Origin", "*");
    if(req.headers['authorization']){
        let token = req.headers['authorization'];
        let decoded = jwt.decode(token, 'secret');
        res.json({token: createToken(decoded.name)});
    }
    res.json({});
});
// create a new user
userRouter.post('/register', function(req, res) {
    //res.header("Access-Control-Allow-Origin", "*");

    console.log(req.body);
    bcrypt.hash(req.body.password, saltRounds, function(err, hash){
        let newUser = [
            req.body.name,
            req.body.gender,
            req.body.email,
            req.body.phoneNumber,
            hash,
            createToken(this.email)
        ];
        db.run("INSERT INTO user(name,gender,email,mobile,password,token) VALUES (?,?,?,?,?,?)",newUser , function (err) {
            if (err) {
                return console.error(err.message);
            }else{

                res.json({success: 'success',

                });
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
                console.log("User exists in the database.");
                bcrypt.compare(enteredPassword, rows[0].password, function(err, result){
                    console.log(result);
                	if(result){
                		console.log("password matches! Redirecting...")
                        res.json({success: 'success',
                            token: createToken(rows[0].email),
                            email: rows[0].email
                        });
					}else{
                        res.json({success: 'failed'});
                    }
				});

            }else{
                console.log("Password did not match...")
                res.json({success: 'failed'});
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