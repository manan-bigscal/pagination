const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());

const URL = 'mongodb+srv://Manan:Manan@manan.dflg9s3.mongodb.net/test?retryWrites=true&w=majority'


let schema = new mongoose.Schema({
    name : String
})

let Users = mongoose.model('users', schema);

mongoose.connect(URL)
    .then(res => console.log("Connected successfully"))
    .catch(err => console.log("Cant connect to database"))

app.use('/', (req, res) => {

    let skip = req.query.skip;
    let limit = req.query.limit;

    Users.find().skip(skip).limit(limit).then( users => res.json(users) )
});

app.listen(8000, () => {
    console.log("Listening to port 8000");
});