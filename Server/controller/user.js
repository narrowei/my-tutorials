const express = require('express');
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('DB/my-tutorial.db');
const userRouter = express.Router();
let cors = require('cors');
const createToken = require('../middleware/createToken.js');
const bcrypt = require('bcrypt');
const checkToken = require('../middleware/checkToken.js');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
let bodyParser = require('body-parser');
userRouter.use( bodyParser.json() );       // to support JSON-encoded bodies
userRouter.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
userRouter.use(cors());

//get user
userRouter.get('/',checkToken ,function(req, res, next) {
    //res.header("Access-Control-Allow-Origin", "*");
    if (req.headers['authorization']) {
        let token = req.headers['authorization'];
        let decoded = jwt.decode(token, 'secret');
        let email = decoded.name;
        db.get("select ID, name from user where email=$email", {$email: email}, (err, row) => {
                if (err) {
                    return res.json({success: 'user not found'});
                } else {
                    res.json({token: createToken(decoded.name), id: row.ID});
                }
            }
        )
    }
});



// create a new user
userRouter.post('/register', function(req, res) {
    //res.header("Access-Control-Allow-Origin", "*");
    db.get("select * from user where name = ?", req.body.name ,function (err,row) {
        if(err){
            console.log(err);
            return res.json({success: 'error'});
        }else if(typeof(row) === "undefined"){
            bcrypt.hash(req.body.password, saltRounds, function(err, hash){
                let newUser = [
                    req.body.name,
                    req.body.gender,
                    req.body.email,
                    req.body.mobile,
                    hash,
                    new Date()
                    // createToken(this.email)
                ];
                db.run("INSERT INTO user(name,gender,email,mobile,password,regDate ) VALUES (?,?,?,?,?,?)",newUser , function (err) {
                    if (err) {
                        return console.error(err.message);
                    }else{
                        res.json({success: 'success',
                            token: createToken(req.body.email),
                            email: req.body.email
                        });
                    }
                });
            })
        }else {
            return res.json({success: 'Already exists'});
        }
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
            else if(rows.length > 0){
                bcrypt.compare(enteredPassword, rows[0].password, function(err, result){
                	if(result){
                        res.json({success: 'success',
                            token: createToken(rows[0].email),
                            email: rows[0].email,
                            id: rows[0].ID
                        });
					}else{
                        res.json({success: 'failed'});
                    }
				});
            }else{
                res.json({success: 'failed'});
            }
        })
});

// Delete a specific object
userRouter.delete('/delUser/:id', function(req, res) {
    const nameToLookUp = req.params.id;
    db.all("DELETE FROM user WHERE name=$name",{$name: nameToLookUp},
        (err, rows) => {
            if (err) {
                throw err;
            }else{
                res.json({success: 'success'});
            }
        })
});

// view a specific tutor
userRouter.get('/:id', function(req, res) {
    const userID = req.params.id;
    db.all("SELECT * FROM user WHERE ID=$id",{$id: userID},
        (err, rows) => {
            if (err) {
                throw err;
            }else if(rows.length > 0){
                res.send(rows[0]);
            }else{
                res.send({});
            }
        })
});

// get reviews of a specific tutor
userRouter.get('/review/:id', function(req, res) {
    const userID = req.params.id;
    db.all("SELECT comments.*, user.name AS reviewer FROM comments INNER JOIN class ON comments.classID = class.ID INNER JOIN user on user.ID = comments.userID WHERE class.tutorID=$id",{$id: userID},
        (err, rows) => {
            if (err) {
                throw err;
            }else if(rows.length > 0) {
                res.json(rows);
            }else {
                return res.json({success: 'null'});
            }
        })
});

// get created tutorials for a specific tutor
userRouter.get('/created/:id',function(req, res, next) {

    const userID = req.params.id;
    db.all("select * from class where tutorID = $userID", {$userID: userID}, function(err, rows){
        if (err) {
            throw err;
        }else if(rows.length > 0) {
            res.json(rows);
        }else {
            return res.json({success: 'null'});
        }
    });
});
module.exports = userRouter;
