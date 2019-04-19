const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Consumer = require("../models/consumer");
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
    } else {
      console.log("role meatching error");
    }
  });
});

module.exports = router;
