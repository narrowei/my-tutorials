const express = require('express');
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('db/my-tutorial.db');
const myinfoRouter = express.Router();
let cors = require('cors');
const createToken = require('../middleware/createToken.js');
const bcrypt = require('bcrypt');
const checkToken = require('../middleware/checkToken.js');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
let bodyParser = require('body-parser');
myinfoRouter.use( bodyParser.json() );       // to support JSON-encoded bodies
myinfoRouter.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
myinfoRouter.use(cors());

myinfoRouter.get('/',checkToken ,function(req, res, next) {
    //res.header("Access-Control-Allow-Origin", "*");
    let email;
    if(req.headers['authorization']){
        let token = req.headers['authorization'];
        let decoded = jwt.decode(token, 'secret');
        email = decoded.name;
    }
    let userID='';

    db.get("select ID from user where email=$email",{$email: email}, (err,row)=> {
        if (err) {
            return res.json({success: 'failed'});
        } else {
            userID = row.ID;

        }
    });
});

// get enrolled tutorial
myinfoRouter.get('/enrolled',checkToken ,function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    let email;
    if(req.headers['authorization']){
        let token = req.headers['authorization'];
        let decoded = jwt.decode(token, 'secret');
        email = decoded.name;
    }
    let userID='';

    db.get("SELECT ID FROM user WHERE email=$email",{$email:email}, (err,row)=>{
        if(err){
            console.log(err);
            return res.json({success: 'user not found'});
        }else{
            userID = row.ID;

            db.all("select * from class inner join enrollment on class.ID = enrollment.classID where enrollment.studentID = $userID"
                , {$userID: userID}, function(err, rows){
                if (err) {
                    throw err;
                }else if(rows.length > 0) {
                    console.log(rows);
                    res.json(rows);
                }else {
                    return res.json({success: 'You haven\'t enrolled any tutorial'});
                }
            });
        }
    });
});

// get finished tutorial
myinfoRouter.get('/finished',checkToken ,function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    let email;
    if(req.headers['authorization']){
        let token = req.headers['authorization'];
        let decoded = jwt.decode(token, 'secret');
        email = decoded.name;
    }
    let userID='';

    db.get("SELECT ID FROM user WHERE email=$email",{$email:email}, (err,row)=>{
        if(err){
            console.log(err);
            return res.json({success: 'user not found'});
        }else{
            userID = row.ID;

            db.all( "select * from class inner join enrollment on class.ID = enrollment.classID where enrollment.studentID = $userID AND class.finish_ind = 1"
                , {$userID: userID}, function(err, rows){
                if (err) {
                    throw err;
                }else if(rows.length > 0) {
                    console.log(rows);
                    res.json(rows);
                }else {
                    return res.json({success: 'You haven\'t finished any tutorial'});
                }
            });
        }
    });
});

// get created tutorial
myinfoRouter.get('/created',checkToken ,function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    let email;
    if(req.headers['authorization']){
        let token = req.headers['authorization'];
        let decoded = jwt.decode(token, 'secret');
        email = decoded.name;
    }
    let userID='';

    db.get("SELECT ID FROM user WHERE email=$email",{$email:email}, (err,row)=>{
        if(err){
            console.log(err);
            return res.json({success: 'user not found'});
        }else{
            userID = row.ID;

            db.all("select * from class where tutorID = $userID", {$userID: userID}, function(err, rows){
                if (err) {
                    throw err;
                }else if(rows.length > 0) {
                    res.json(rows);
                }else {
                    return res.json({success: 'You haven\'t created any tutorial'});
                }
            });
        }
    });
});

// Similar to the GET on an object, to update it we can PATCH
myinfoRouter.patch('/:id', function(req, res) {

});


module.exports = myinfoRouter;