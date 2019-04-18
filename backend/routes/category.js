const express = require('express');

const Category = require('../models/category');

const router = express.Router();

router.post('/create', (req, res, next) => {
  const category = new Category ({
    catName: req.body.catName
  });
  category.save()
    .then(result => {
      res.status(201).json({
        message: "Category Created",
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;