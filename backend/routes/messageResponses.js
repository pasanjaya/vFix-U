const express = require('express');
const multer = require('multer');

const checkAuth = require('../middleware/check-auth');

const Response = require('../models/messageResponse');

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
    cb(error, 'backend/images/sellerResponseImages');
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

router.post('/create', checkAuth, multer({storage: storage}).single('image'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const messageResponse = new Response({
    requestId: req.body.requestId,
    oemNumber: req.body.oemNumber,
    remanufactured: req.body.remanufactured,
    condition: req.body.condition,
    unitPrice: req.body.unitPrice,
    imagePath: url + "/images/sellerResponseImages/" + req.file.filename,
    material: req.body.material,
    model: req.body.model,
    brand: req.body.brand,
    note: req.body.note,
    responseCreator: req.userData.userId
  });
  messageResponse.save()
    .then((result) => {
      res.status(200).json({
        message: 'message response created',
        result: result
      });
    }).catch((err) => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
