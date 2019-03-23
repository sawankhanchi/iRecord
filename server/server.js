const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const recordRoutes = express.Router();
const PORT = 4000;

let Record = require('./models/record');

app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/records', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

recordRoutes.route('/').get(function(req, res) {
    Record.find(function(err, records) {
        if (err) {
            console.log(err);
        } else {
            res.json(records);
        }
    });
});

recordRoutes.route('/add').post(function(req, res) {
    let record = new Record(req.body);
    record.save()
        .then(record => {
            res.status(200).json({'records': 'records added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});

app.use('/records', recordRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});