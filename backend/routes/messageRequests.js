const express = require('express');

const Message = require('../models/messageRequest');

const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post('/create', checkAuth, (req, res, next) => {
  const message = new Message({
    vehicalBrand: req.body.brand,
    vehicalModel: req.body.model,
    vehicalEngine: req.body.engine,
    category: req.body.category,
    itemName: req.body.itemName,
    itemImage: req.body.itemImage,
    itemNote: req.body.itemNote,
    messageCreator: req.userData.userId
  });
  message.save()
    .then(result => {
      res.status(201).json({
        message: 'Message Created',
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
