const express = require('express');
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('db/my-tutorial.db');
const tutorialRouter = express.Router();
const checkToken = require('../middleware/checkToken.js');
let cors = require('cors');
const jwt = require('jsonwebtoken');
tutorialRouter.use(cors());
let bodyParser = require('body-parser');
tutorialRouter.use( bodyParser.json() );       // to support JSON-encoded bodies
tutorialRouter.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
// get all tutorial
tutorialRouter.get('/', function(req, res, next) {
    //allowed CSRF
    res.header("Access-Control-Allow-Origin", "*");
    db.all("SELECT class.*, user.name AS tutorName FROM class INNER JOIN user ON class.tutorID = user.ID", function(err, rows){
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});
// get tutorials by offset
tutorialRouter.get('/page/:pageId', function(req, res, next) {
    //allowed CSRF
    res.header("Access-Control-Allow-Origin", "*");
    let pageId = req.params.pageId;
    let offset = (pageId*6) - 6;
    db.all("SELECT class.*, user.name AS tutorName FROM class INNER JOIN user ON class.tutorID = user.ID limit 6 offset $offset ",{$offset:offset}, function(err, rows){
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});

//count tutorial
tutorialRouter.get('/size', function(req, res, next) {
    //allowed CSRF
    res.header("Access-Control-Allow-Origin", "*");
    db.all("SELECT count(*) as size from class", function(err, rows){
        if (err) {
            throw err;
        }
        res.json(rows[0]);
    });
});

// create tutorial
tutorialRouter.post('/',checkToken, function(req, res) {
    let email;
    if(req.headers['authorization']){
        let token = req.headers['authorization'];
        let decoded = jwt.decode(token, 'secret');
        email = decoded.name;
    }
    let userID='';

    db.get("select ID,name from user where email=$email",{$email:email}, (err,row)=>{
        if(err){
            return res.json({success: 'user not found'});
        }else{
            userID = row.ID;

            let newClass = [
                userID,
                req.body.name,
                req.body.description,
                req.body.maxNumberStudent,
                req.body.date[0]+' - '+req.body.date[1],
                req.body.price,
                req.body.attachment,
                req.body.video_link
            ];
            console.log(newClass);
            db.run("INSERT INTO 'class'(tutorID, name, description, maxNumberStudent, time, price, attachment, videoLink) VALUES (?,?,?,?,?,?,?,?)",
                newClass, function (err) {
                    if (err) {
                        console.log(err);
                        return res.json({success: 'failed creating tutorial'});
                    }else{
                        return res.json({success: 'success'});
                    }
                });
        }
    });
});

// view tutorial info
tutorialRouter.get('/info/:id', function(req, res) {
    const id = req.params.id;
    console.log(id);
    db.all("SELECT class.*, user.name AS tutorName FROM class INNER JOIN user ON class.tutorID = user.ID WHERE class.ID=$id",{$id: id},
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

// get reviews of a specific tutorial
tutorialRouter.get('/review/:id', function(req, res) {
    const id = req.params.id;
    console.log(id);
    db.all("SELECT comments.*, user.name AS reviewer FROM comments INNER JOIN user ON comments.userID = user.ID WHERE comments.classID=$id",{$id: id},
        (err, rows) => {
            if (err) {
                throw err;
            }else if(rows.length > 0) {
                console.log(rows);
                res.json(rows);
            }else {
                return res.json({success: 'null'});
            }
        })
});
// delete a tutorial
tutorialRouter.get('/delete/:id',checkToken, function(req, res) {
    let email;
    if(req.headers['authorization']){
        let token = req.headers['authorization'];
        let decoded = jwt.decode(token, 'secret');
        email = decoded.name;
    }
    let userID='';

    db.get("select ID from user where email=$email",{$email: email}, (err,row)=>{
        if(err){
            return res.json({success: 'user not found'});
        }else{
            userID = row.ID;

            let tutorial = [
                req.params.id,
                userID,
            ];
            db.get("select * from class where ID = ? and tutorID = ?", tutorial ,function (err,row) {
                if(err){
                    console.log(err);
                    return res.json({success: 'user not found'});
                }else if(typeof(row) === "undefined"){
                    return res.json({success: 'tutorial not found'});
                }else {
                    let id = req.params.id;
                    db.run("DELETE FROM class WHERE ID=$id",{$id: id},
                        (err, rows) => {
                            if (err) {
                                throw err;
                            }else{
                                res.json({success: 'success'});
                            }
                        })
                }
            });
        }
    });
});

// finish a specific tutorial
tutorialRouter.get('/finish/:id', function(req, res) {
    let email;
    if(req.headers['authorization']){
        let token = req.headers['authorization'];
        let decoded = jwt.decode(token, 'secret');
        email = decoded.name;
    }
    let userID='';

    db.get("select ID from user where email=$email",{$email: email}, (err,row)=>{
        if(err){
            return res.json({success: 'user not found'});
        }else{
            userID = row.ID;
            const id = req.params.id;

            db.run("UPDATE enrollment SET isFinished = 1 WHERE ID=$id and studentID=$sid",{$sid: userID,$id: id},
                (err, rows) => {
                    if (err) {
                        throw err;
                    }else{
                        res.json({success: 'success'});
                    }
                })
        }
    });
});

//add feedback
tutorialRouter.post('/feedback', function(req, res) {

    let email;
    if(req.headers['authorization']){
        let token = req.headers['authorization'];
        let decoded = jwt.decode(token, 'secret');
        email = decoded.name;
    }
    let userID='';

    db.get("select ID from user where email=$email",{$email: email}, (err,row)=>{
        if(err){
            return res.json({success: 'user not found'});
        }else{
            userID = row.ID;
            let feedback = [
                userID,
                req.body.description,
                req.body.id,
                req.body.rate
            ];
            db.run("INSERT INTO 'comments'(userID, description, classID, rating)VALUES (?,?,?,?)",
                feedback, function (err) {
                    if (err) {
                        console.log(err);
                        return res.json({success: 'failed'});
                    }else{
                        db.run("UPDATE enrollment SET isFeedback = 1 WHERE studentID=$sid and classID=$cid",{$sid: userID,$cid: req.body.id},
                            (err, rows) => {
                                if (err) {
                                    throw err;
                                }else{
                                    res.json({success: 'success'});
                                }
                            });
                        //return res.json({success: 'success'});
                    }
            });
        }
    });
});

module.exports = tutorialRouter
