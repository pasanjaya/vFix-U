const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Consumer = require("../models/consumer");
const Merchant = require('../models/merchant');
const Role = require("../models/role");

const router = express.Router();

router.post("/login", (req, res, next) => {
  let fetchedUser;

  Role.findOne({ email: req.body.email }).then(foundUser => {
    if (!foundUser) {
      return res.status(401).json({
        message: "Authentication Failed!"
      });
    }

    if (foundUser.role === "consumer") {

      Consumer.findOne({ email: req.body.email })
        .then(user => {
          if (!user) {
            return res.status(401).json({
              message: "Authentication Failed!"
            });
          }
          fetchedUser = user;
          return bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {
          if (!result) {
            return res.status(401).json({
              message: "Authentication Failed!"
            });
          }
          const token = jwt.sign(
            { email: fetchedUser.email, userId: fetchedUser._id },
            "this_is_must_be_longer_string",
            { expiresIn: "2h" }
          );
          res.status(200).json({
            token: token,
            role: 'consumer',
            id: fetchedUser._id
          });
        })
        .catch(err => {
          return res.status(401).json({
            message: "Authentication Failed!"
          });
        });

    } else if (foundUser.role === "merchant") {

      Merchant.findOne({email: req.body.email})
        .then(user => {
          if(!user) {
            res.status(401).json({
              message: "Authentication Failed"
            });
          }
          fetchedUser = user;
          return bcrypt.compare(req.body.password, user.password)
        })
        .then(result => {
          if(!result) {
            res.status(401).json({
              message: "Authentication Failed"
            });
          }
          const token = jwt.sign(
            { email: fetchedUser.email, userId: fetchedUser._id },
            "this_is_must_be_longer_string",
            { expiresIn: "2h" }
          );
          res.status(201).json({
            token: token,
            role: 'merchant',
            id: fetchedUser._id
          });
        })
        .catch(err => {
          return res.status(401).json({
            message: "Authentication Failed!"
          });
        });

    } else {
      console.log("role meatching error");
    }
  });
});

router.get('/usercount', (req, res, next) => {

  Promise.all([
    Role.where('role', 'consumer').countDocuments((err, consumerCount) => {
      if(err) console.log('error in consumer counting');
    }),
    Role.where('role', 'merchant').countDocuments((err, count) => {
      if(err) console.log('error in merchant counting');
    })
  ])
  .then(results => {
    console.log(results);
    res.status(200).json({
      consumer: results[0],
      merchant: results[1]
    });
  })
  .catch(err => {
    res.status(500).json({
      message: 'Error occured'
    });
  });


  // Role.find().then(result => {
  //   if(!result) {
  //     res.status(404).json({
  //       message: "No users"
  //     });
  //   }
  //   console.log(result);
  // })
  // .catch(err => {
  //   res.status(404).json({
  //     message: "Error",
  //     error: err
  //   });
  // });
});

module.exports = router;
