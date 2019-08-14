const express = require("express");
const multer = require("multer");

const Support   = require("../models/support");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post(
  "/create",
  checkAuth,
  (req, res, next) => {
    const support = new Support({
      fullName: req.body.fullName,
      email: req.body.email,
      phoneNo: req.body.phoneNo,
      message: req.body.message,
    });
    support
      .save()
      .then(result => {
        res.status(201).json({
          message: "Message Created",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          message: "Message creating failed"
        });
      });
  }
);

router.get("/retrive", (req, res, next) => {
  Support.find()
    .then(documents => {
      if (documents) {
        res.status(200).json({
          message: "SupportRequestData fetched successfully!",
          supportDataCollections: documents
        });
      } else {
        res.status(404).json({
          message: "No request data found!"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "Fatching Data failed"
      });
    });
});

module.exports = router;





