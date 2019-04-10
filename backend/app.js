const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

// mongodb connection initination
mongoose.connect("mongodb+srv://vfixu:OD7NtyVogn7ygY7T@cluster-vfixu-lxl1o.mongodb.net/test?retryWrites=true")
.then(() => {
  console.log('Connected to database!');
})
.catch(() => {
  console.log('Connection Failed!!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// handling the cors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Allow-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

//

app.use('', (req, res, next) => {
  res.send('Hello from express');
});

module.exports = app;