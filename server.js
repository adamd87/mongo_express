const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const MongoClient = require('mongodb').MongoClient;
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
mongoClientOptions = {serverSelectionTimeoutMS: 50000};


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

MongoClient.connect('mongodb://admin:password@localhost:27017')
    .then(client => {
        console.log('Connected to Database');
        const db = client.db('user-account');
        const usersCollection = db.collection('users');

        app.post('/users', (req, res) => {
            usersCollection.insertOne(req.body)
                .then(() => {
                    res.redirect('/')
                    console.log(req.body);
                })
                .catch(error => console.error(error));
        });

        app.get('/users', (req, res) => {
            usersCollection.find().toArray()
                .then(results => {
                    res.send(results);
                })
                .catch(error => console.error(error));
        });

        app.listen(3000, function (){
            console.log("app listening on port 3000!");
        });
    })




