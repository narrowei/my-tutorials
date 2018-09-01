const express = require('express');

const app = express();

let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('db/my-tutorial.db');

// Create the express router object for users
let userRouter = require('./controller/user.js');
let tutorialRouter = require('./controller/tutorial.js');
// A GET to the root of a resource returns a list of that resource

// Attach the routers for their respective paths
app.use('/tutorial', tutorialRouter);
app.use('/user', userRouter);
app.get('/', (req, res) => res.send('Server is running'));
app.listen(3000, () => console.log('Example app listening on port 3000!'));

module.exports = app;