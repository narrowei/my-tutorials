const express = require('express')
const db = require('../db/db.js')
const tutorialRouter = express.Router()

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
tutorialRouter.post('/', function(req, res) {
    const newClass = {
        tutorID: req.tutorID,
        name: req.name,
        description: req.description,
        maxNumberStudent: req.maxNumberStudent,
        time: req.time,
        price: req.price,
        attachment: req.attachment,
        videoLink: req.videoLink,
    };
    db.run("INSERT INTO class(tutorID, name, description, maxNumberStudent, time, price, attachment, videoLink)VALUES (?)",
        newClass, function (err) {
            if (err) {
                return console.error(err.message);
            }
        });
});

// GET a specific class
tutorialRouter.get('/:id', function(req, res) {
    const nameToLookUp = req.params.id;
    db.all("SELECT * FROM class WHERE name=$name",{$name: nameToLookUp},
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
tutorialRouter.delete('/:id', function(req, res) {
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