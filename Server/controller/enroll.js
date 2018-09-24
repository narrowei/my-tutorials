const express = require('express');
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('db/my-tutorial.db');
const enrollRouter = express.Router();
let cors = require('cors');
const createToken = require('../middleware/createToken.js');
const bcrypt = require('bcrypt');
const checkToken = require('../middleware/checkToken.js');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
let bodyParser = require('body-parser');
enrollRouter.use( bodyParser.json() );       // to support JSON-encoded bodies
enrollRouter.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
enrollRouter.use(cors());

enrollRouter.get('/',checkToken ,function(req, res, next) {
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
// enroll tutorial
enrollRouter.post('/',checkToken ,function(req, res) {
    //res.header("Access-Control-Allow-Origin", "*");
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

            let enroll = [
                req.body.id,
                userID,
            ];
            db.get("select * from enrollment where classID = ? and studentID = ?", enroll ,function (err,row) {
                if(err){
                    console.log(err);
                    return res.json({success: 'failed'});
                }else if(typeof(row) === "undefined"){
                    db.run("INSERT INTO 'enrollment'(classID,studentID) VALUES (?,?)",
                        enroll, function (err) {
                            if (err) {
                                console.log(err);
                                return res.json({success: 'failed'});
                            }else{
                                return res.json({success: 'success'});
                            }
                        });
                }else {
                    return res.json({success: 'failed'});
                }
            });


        }
    });

});

// Similar to the GET on an object, to update it we can PATCH
enrollRouter.patch('/:id', function(req, res) {

});

// withdraw an enrollment
enrollRouter.delete('/:id',checkToken, function(req, res) {
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

            let enroll = [
                req.body.id,
                userID,
            ];
            db.get("select * from enrollment where classID = ? and studentID = ?", enroll ,function (err,row) {
                if(err){
                    console.log(err);
                    return res.json({success: 'failed'});
                }else if(typeof(row) === "undefined"){
                    return res.json({success: 'enrollment not found'});
                }else {
                    const id = req.params.id;
                    db.run("DELETE FROM enrollment WHERE WHERE ID=$id",{$id: id},
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
module.exports = enrollRouter;
