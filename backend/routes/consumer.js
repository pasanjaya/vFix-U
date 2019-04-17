const express = require('express');
const bcrypt = require('bcrypt');

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

module.exports = router;