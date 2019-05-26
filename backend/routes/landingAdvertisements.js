const express = require("express");

const Advertisements = require("../models/advertisement");

const router = express.Router();

router.get("/newarrival", (req, res, next) => {
  Advertisements.find({})
    .sort({ created_at: -1, modified_at: -1 })
    .limit(5)
    .exec((err, docs) => {
      if (err) {
        res.status(500).json({
          error: err
        });
      }
      if (docs) {
        res.status(201).json({
          message: "Sucessful",
          result: docs
        });
      }
      if (!docs) {
        res.status(404).json({
          message: "No content"
        });
      }
    });
});

module.exports = router;
