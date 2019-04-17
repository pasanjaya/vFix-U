const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Consumer = require("../models/consumer");

const router = express.Router();

router.post('/register', (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const consumer = new Consumer({
        fullName: req.body.fullName,
        email: req.body.email,
        mobileNumber: req.body.mobileNumber,
        password: hash
      });
      consumer.save()
        .then(result => {
          res.status(201).json({
            message: 'Consumer Created!',
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    });
});

router.post('/login', (req, res, next) => {
  let fetchedUser;
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
        'this_is_must_be_longer_string',
        { expiresIn: '1h' }
        );
      res.status(200).json({
        token: token
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Authentication Failed!"
      });
    });
});

module.exports = router;