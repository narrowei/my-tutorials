const express = require('express');
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('DB/my-tutorial.db');
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
//get user info
myinfoRouter.get('/',checkToken ,function(req, res, next) {
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

            db.all("select * from class inner join enrollment on class.ID = enrollment.classID where enrollment.studentID = $userID AND enrollment.isFinished=0"
                , {$userID: userID}, function(err, rows){
                if (err) {
                    throw err;
                }else if(rows.length > 0) {
                    console.log(rows);
                    res.json(rows);
                }else {
                    return res.json({success: 'null'});
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

            db.all( "select * from class inner join enrollment on class.ID = enrollment.classID where enrollment.studentID = $userID AND enrollment.isFinished=1"
                , {$userID: userID}, function(err, rows){
                if (err) {
                    throw err;
                }else if(rows.length > 0) {
                    console.log(rows);
                    res.json(rows);
                }else {
                    return res.json({success: 'null'});
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
                    return res.json({success: 'null'});
                }
            });
        }
    });
});
// get my reviews
myinfoRouter.get('/myReview',checkToken ,function(req, res, next) {
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

            db.all("SELECT comments.*, class.name AS tutorialName, user.name AS tutorName FROM comments " +
                "LEFT JOIN class ON comments.classID = class.ID " +
                "LEFT JOIN user ON class.tutorID = user.ID " +
                "WHERE comments.userID = $userID", {$userID: userID}, function(err, rows){
                if (err) {
                    throw err;
                }else if(rows.length > 0) {
                    res.json(rows);
                }else {
                    return res.json({success: 'null'});
                }
            });
        }
    });
});

// get my received reviews
myinfoRouter.get('/receivedReview',checkToken ,function(req, res, next) {
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

            db.all("SELECT comments.*, class.name AS tutorialName, user.name AS reviewer FROM comments " +
                "LEFT JOIN class ON comments.classID = class.ID " +
                "LEFT JOIN user ON comments.userID = user.ID " +
                "WHERE class.tutorID = $userID", {$userID: userID}, function(err, rows){
                if (err) {
                    throw err;
                }else if(rows.length > 0) {
                    res.json(rows);
                }else {
                    return res.json({success: 'null'});
                }
            });
        }
    });
});
module.exports = myinfoRouter;
