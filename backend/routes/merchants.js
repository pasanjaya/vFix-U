const express = require("express");
const bcrypt = require("bcrypt");

const Merchant = require('../models/merchant');
const Role = require('../models/role');

const router = express.Router();

router.post('/register', (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const merchant = new Merchant({
      fullName: req.body.fullName,
      email: req.body.email,
      mobileNumber: req.body.mobileNumber,
      password: hash,
      created_at: Date.now()
    });
    merchant
      .save()
      .then(result => {
        const role = new Role({
          email: req.body.email,
          role: req.body.role
        });
        role
          .save()
          .then(roleResult => {
            res.status(201).json({
              message1: "Merchant Created!",
              message2: "Role Created",
              result1: result,
              result2: roleResult
            });
          })
          .catch(err => {
            res.status(500).json({
              message: "Error in role creation",
              error: err
            });
          });
      })
      .catch(err => {
        res.status(500).json({
          message: 'Invalid authentication credentials'
        });
      });
  });
});

module.exports = router;