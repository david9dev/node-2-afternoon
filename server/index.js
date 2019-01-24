const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const massive = require('massive');
const contrlr = require('./controllers/controller');

const app = express();
app.use(bodyParser.json());
massive(process.env.CONNECTION_STRING).then((db) => 
//Question: where does the .then come from and how does it get information form
// its attached function?
//the connection string in the first argument of massive() is to set up where
// massive is looking for the data base that it is going to be
// doing all of the requests and functions for.
{
    app.set('db', db);
})
// i dont really understand what that line is doing. im guessing that it is 
// creating an object variable with-in app called 'db' with the object value of db
// which comes from the object returned form the massive() invokation;


const port = process.env.PORT;
app.listen(port, () =>
{
    console.log("Im listening on port", port);
})