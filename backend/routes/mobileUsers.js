const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/mobileUser");

const router = express.Router();

router.post("/register", (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        mobileNumber: req.body.mobileNumber,
        password: hash,
        created_at: Date.now()
      });
      user
        .save()
        .then(result => {
          res.status(201).json({
            message: "User Created!",
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            message: "Error in user creation",
            error: err
          });
        });
    })
    .catch(err => {
      res.status(500).json({
        message: "Invalid authentication credentials"
      });
    });
});

router.post("/login", (req, res, next) => {
  User.findOne({ email: req.body.email })
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
        {
          email: fetchedUser.email,
          userId: fetchedUser._id
        },
        "this_is_must_be_longer_string",
        { expiresIn: "2h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 7200
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Authentication Failed!"
      });
    });
});

module.exports = router;
