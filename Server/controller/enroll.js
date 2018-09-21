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
    let id='';
    let name='';
    db.get("select ID,name from user where email=?",email, (err,row)=> {
        if (err) {
            return res.json({success: 'failed'});
        } else {
            id = row.ID;
            name = row.name;

        }
    });

});
// create a new user
enrollRouter.post('/',checkToken ,function(req, res) {
    //res.header("Access-Control-Allow-Origin", "*");
    let email;
    if(req.headers['authorization']){
        let token = req.headers['authorization'];
        let decoded = jwt.decode(token, 'secret');
        email = decoded.name;
    }
    let id='';
    let name='';
    db.get("select ID,name from user where email=?",email, (err,row)=>{
        if(err){
            return res.json({success: 'failed'});
        }else{
            id = row.ID;
            name = row.name;
            let enroll = [
                id,
                req.body.id,
            ];

            db.get("select * from enrollment where classID = ? and studentID = ?",enroll,function (err,row) {
                if(err){
                    console.log(err);
                    return res.json({success: 'failed'});
                }else if(typeof(row) === "undefined"){
                    db.run("INSERT INTO 'enrollment'(classID,studentID)VALUES (?,?)",
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

// Delete a specific object
enrollRouter.delete('/delUser/:id', function(req, res) {

});

module.exports = enrollRouter;