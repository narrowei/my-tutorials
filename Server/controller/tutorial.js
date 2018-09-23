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
// A GET to the root of a resource returns a list of that resource
tutorialRouter.get('/', function(req, res,next) {
    //allowed CSRF
    res.header("Access-Control-Allow-Origin", "*");
    db.all("SELECT * FROM class", function(err, rows){
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});

// when register a class, insert into database
tutorialRouter.post('/',checkToken, function(req, res) {
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
            let newClass = [
                id,
                name,
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

// GET a specific class
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
// delete a class
tutorialRouter.delete('/:id',checkToken, function(req, res) {
    const nameToLookUp = req.params.id;
    db.all("DELETE FROM class WHERE name=$name",{$name: nameToLookUp},
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

module.exports = tutorialRouter
