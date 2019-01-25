const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const massive = require('massive');
const contrlr = require('./controllers/controller');

const app = express();
app.use(bodyParser.json());
massive(process.env.CONNECTION_STRING).then((db) => 
//Question: where does the .then come from and how does it get information form
// its attached function?// from the proto_type.promise architecture
//the connection string in the first argument of massive() is to set up where
// massive is looking for the data base that it is going to be
// doing all of the requests and functions for.
{
    app.set('db', db);
})
.catch((error) =>
{
    console.log("error", error);
})
// i dont really understand what that line is doing. im guessing that it is 
// creating an object variable with-in app called 'db' with the object value of db
// which comes from the object returned form the massive() invokation;

app.get('/api/products/:id',contrlr.getOne);
app.get('/api/products', contrlr.getAll);
app.post('/api/products', contrlr.create);
app.delete('/api/products/:id', contrlr.delete);
app.put('/api/products/:id', contrlr.update);


const port = process.env.PORT;
app.listen(port, () =>
{
    console.log("Im listening on port", port);
})