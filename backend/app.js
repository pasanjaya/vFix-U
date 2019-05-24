const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const consumerRoutes = require("./routes/consumers");
const categoryRoutes = require("./routes/categories");
const userRoutes = require("./routes/users");
const merchantRoutes = require("./routes/merchants");
const merchantProfiles = require("./routes/merchant-profiles");
const messageRequestRoutes = require("./routes/messageRequests");
const messageResponseRoute = require('./routes/messageResponses');
// const carDataRoutes = require("./routes/carData")


const app = express();

// mongodb connection initination

mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);

mongoose
.connect("mongodb+srv://vfixu:OD7NtyVogn7ygY7T@cluster-vfixu-lxl1o.mongodb.net/vfixu?retryWrites=true")
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection Failed!!');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/images", express.static(path.join("backend/images")));

// handling the cors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.use('/api/consumer', consumerRoutes);
app.use('/api/merchant', merchantRoutes);
app.use('/api/profile/merchant', merchantProfiles);
app.use('/api/user', userRoutes);
app.use('/api/admin/category', categoryRoutes);
app.use('/api/message', messageRequestRoutes);
app.use('/api/message/response', messageResponseRoute);
// app.use('/api/car-data', carDataRoutes);

module.exports = app;
