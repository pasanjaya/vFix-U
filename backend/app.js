const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const consumerRoutes = require("./routes/consumers");
const categoryRoutes = require("./routes/categories");
const userRoutes = require("./routes/users");
const merchantRoutes = require("./routes/merchants");
const merchantProfiles = require("./routes/merchant-profiles");
const advertisementRoutes = require("./routes/advertisements");
const messageRequestRoutes = require("./routes/messageRequests");
const messageResponseRoute = require('./routes/messageResponses');
const landingRoutes = require('./routes/landingAdvertisements');
const supportRoutes = require("./routes/supports");

// const carDataRoutes = require("./routes/carData")


const app = express();

// mongodb connection initination

mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);

const dbURI = "mongodb+srv://vfixu:OD7NtyVogn7ygY7T@cluster-vfixu-lxl1o.mongodb.net/vfixu?retryWrites=true";

mongoose
.connect(dbURI)
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection Failed!!');
    res.status(501).json({
      message: 'Connction Failed'
    });
  });

// // CONNECTION EVENTS
// // When successfully connected
// mongoose.connection.on('connected', function () {
//   console.log('Mongoose default connection open');
// });

// // If the connection throws an error
// mongoose.connection.on('error',function (err) {
//   console.log('Mongoose default connection error: ' + err);
//   res.status(501).json({
//     message: 'Mongoose default connection error'
//   });
// });

// // When the connection is disconnected
// mongoose.connection.on('disconnected', function () {
//   console.log('Mongoose default connection disconnected');
//   res.status(501).json({
//     message: 'Mongoose default connection disconnected'
//   });
// });

// // If the Node process ends, close the Mongoose connection
// process.on('SIGINT', function() {
//   mongoose.connection.close(function () {
//     console.log('Mongoose default connection disconnected through app termination');
//     process.exit(0);
//   });
// });

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
app.use('/api/merchant/adver', advertisementRoutes);
app.use('/api/landing', landingRoutes);
app.use('/api/support', supportRoutes);
// app.use('/api/car-data', carDataRoutes);

module.exports = app;
