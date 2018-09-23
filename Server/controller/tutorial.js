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
    db.all("SELECT * FROM class", function(err, rows){
        if (err) {
            throw err;
        }
        res.json(rows);
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
            return res.json({success: 'failed'});
        }else{
            userID = row.ID;

            let newClass = [
                userID,
                req.body.name,
                req.body.description,
                req.body.maxNumberStudent,
                req.body.date[0]+','+req.body.date[1],
                req.body.price,
                req.body.attachment,
                req.body.video_link,
            ];
            console.log(newClass);
            db.run("INSERT INTO 'class'(tutorID, name, description, maxNumberStudent, time, price, attachment, videoLink)VALUES (?,?,?,?,?,?,?,?)",
                newClass, function (err) {
                    if (err) {
                        console.log(err);
                        return res.json({success: 'failed'});
                    }else{
                        return res.json({success: 'success'});
                    }
                });
        }
    });
});

// view a specific tutorial
tutorialRouter.get('/:id', function(req, res) {
    const id = req.params.id;
    db.all("SELECT * FROM class WHERE ID=$id",{$id: id},
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

// delete a tutorial
tutorialRouter.delete('/:id',checkToken, function(req, res) {
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
                    return res.json({success: 'failed'});
                }else if(typeof(row) === "undefined"){
                    return res.json({success: 'tutorial not found'});
                }else {
                    let id = req.params.id;
                    db.run("DELETE FROM tutorial WHERE WHERE ID=$id",{$id: id},
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
    const id = req.params.id;
    db.run("UPDATE class SET finish_ind = 1 WHERE ID=$id",{$id: id},
        (err, rows) => {
            if (err) {
                throw err;
            }else{
                res.json({success: 'success'});
            }
        })
});

module.exports = tutorialRouter
