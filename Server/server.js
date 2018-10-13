const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
//controller
const userRoute = require('./controller/user.js');
const tutorialRoute = require('./controller/tutorial.js');
const enrollRouter = require('./controller/enroll.js');
const myinfoRouter = require('./controller/myinfo.js');

//init
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//define route
app.use('/enroll',enrollRouter);
app.use('/user', userRoute);
app.use('/tutorial', tutorialRoute);
app.use('/myinfo',myinfoRouter);

//set port
app.listen(3000, function () {
    console.log(`Server running in port 3000}`)
});
