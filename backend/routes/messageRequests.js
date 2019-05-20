const express = require('express');
const multer = require('multer');

const Message = require('../models/messageRequest');

const checkAuth = require('../middleware/check-auth');

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mime type');
    if(isValid) {
      error = null;
    }
    cb(error, 'backend/images/buyerRequestImages');
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

router.post('/create', checkAuth, multer({storage: storage}).single('image'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const message = new Message({
    vehicalMaker: req.body.maker,
    vehicalModel: req.body.model,
    categoryId: req.body.categoryId,
    sparePartName: req.body.sparePartName,
    itemImagePath: url + "/images/buyerRequestImages/" + req.file.filename,
    itemNote: req.body.note,
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

router.get('/retrive', checkAuth, (req, res, next) => {
  Message.find({ messageCreator: req.userData.userId }).then(documents => {
    res.status(200).json({
      message: "MessageRequestData fetched successfully!",
      messageDataCollections: documents
    });
  });
});

router.get('/retrive-seller', checkAuth, (req, res, next) => {
  Message.find().then(documents => {
    res.status(200).json({
      message: "MessageRequestData fetched successfully!",
      messageDataCollections: documents
    });
  });
});

module.exports = router;