const express = require("express");
const multer = require("multer");

const checkAuth = require("../middleware/check-auth");

const Response = require("../models/messageResponse");
const Request = require("../models/messageRequest");
const CatchItIgnore = require("../models/merchantCatchIgnore");

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images/sellerResponseImages");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

router.post(
  "/create",
  checkAuth,
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
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
      responseCreator: req.userData.userId,
      created_at: Date.now()
    });
    messageResponse
      .save()
      .then(result => {
        Request.findOne({ _id: result.requestId }, (err, request) => {
          if (err) console.log("Error is: " + err);
          if (!request) {
            res.status(404).json({
              message: "valid document not found"
            });
          }
          request.rensponses.push(result._id);
          request.save().then(updatedresult => {
            res.status(200).json({
              message: "message response created",
              result: [result, updatedresult]
            });
          });
        });
      })
      .catch(err => {
        res.status(500).json({
          message: 'Response message not created'
        });
      });
  }
);

// router.get('/retrive/:id', (req, res, next) => {
//   Response.find({ requestId: req.params.id })
//     .then(documents => {
//       if (!documents) {
//         res.status(404).json({
//           message: 'data not found'
//         });
//       }
//       res.status(200).json({
//         message: 'respond found',
//         responseCollection: documents
//       });
//     })
//     .catch(err => {
//       res.status(500).json({
//         message: 'Error occured'
//       });
//     });
// });

router.get("/retrive/:id", (req, res, next) => {
  Response.find({ requestId: req.params.id })
    .populate({path: "responseCreator", select: "profile", populate: {path: "profile", model: "MerchantProfile" } })
    .exec((err, documents) => {
      if (err) {
        res.status(500).json({
          message: 'Response and creator profile population error'
        });
      }
      if (!documents) {
        res.status(404).json({
          message: "data not found"
        });
      }
      res.status(200).json({
        message: "respond found",
        responseCollection: documents
      });
    });
});

// ingnore requested
router.post('/reqIgnore', checkAuth, (req, res, next) => {
  console.log(req.body);
  const catchItIgnore = new CatchItIgnore({
    merchantId: req.userData.userId,
    requestId: req.body.request_id,
    status: req.body.status
  });
  catchItIgnore.save()
    .then(result => {
      res.status(201).json({
        message: 'ignored this message',
        response: result
      });
    })
    .catch(err => {
      res.status(501).json({
        message: 'message not ignored'
      })
    })
})

module.exports = router;
