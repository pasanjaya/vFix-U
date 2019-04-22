const express = require('express');

const Message = require('../models/message');

const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post('/create', checkAuth, (req, res, next) => {
  const message = new Message({
    messageCreator: req.body.messageCreator,
    category: req.body.category,
    itemName: req.body.itemName,
    itemImage: req.body.itemImage,
    itemNote: req.body.itemNote
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
