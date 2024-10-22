const express = require("express");

const Category = require("../models/category");

const router = express.Router();

router.post("/create", (req, res, next) => {
  const category = new Category({
    catName: req.body.catName
  });
  category
    .save()
    .then(result => {
      res.status(201).json({
        message: "Category Created",
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "Category not created"
      });
    });
});

router.get("/retrive", (req, res, next) => {
  Category.find()
    .then(document => {
      res.status(200).json({
        message: "Category fetched Successfully!",
        categories: document
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "Category fetching failed"
      });
    });
});

router.delete("/delete/:id", (req, res, next) => {
  Category.deleteOne({ _id: req.params.id })
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "Category deleted!"
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "Category deleting error"
      });
    });
});

module.exports = router;
