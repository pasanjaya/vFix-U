const express = require("express");

const Advertisements = require("../models/advertisement");

const router = express.Router();

router.get("/newarrival", (req, res, next) => {
  Advertisements.find({approved: true})
    .sort({ created_at: -1, modified_at: -1 })
    .limit(4)
    .exec((err, docs) => {
      if (err) {
        res.status(500).json({
          message: 'Error fetching data to landing-page'
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

router.get("/adv/approve", (req, res, next) => {
  Advertisements.find()
    .sort({ created_at: -1, modified_at: -1 })
    .limit(4)
    .exec((err, docs) => {
      if (err) {
        res.status(500).json({
          message: 'Error fetching data to landing-page'
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


router.delete('/delete/:id', (req, res, next) => {
  Advertisements.deleteOne({_id: req.params.id})
  .then(result => {
    res.status(200).json({
      message: "Advetisement deleted!"
    });
  }).catch(err => {
    res.status(500).json({
      message: 'Couldn\'t delete advertisment'
    });
  });
});

module.exports = router;
