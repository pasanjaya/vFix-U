const express = require("express");
const multer = require("multer");

const Message = require("../models/messageRequest");
const CatchItIgnore = require("../models/merchantCatchIgnore");

const checkAuth = require("../middleware/check-auth");

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
    cb(error, "backend/images/buyerRequestImages");
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
    const message = new Message({
      vehicalMaker: req.body.maker,
      vehicalModel: req.body.model,
      categoryId: req.body.categoryId,
      sparePartName: req.body.sparePartName,
      itemImagePath: url + "/images/buyerRequestImages/" + req.file.filename,
      itemNote: req.body.note,
      messageCreator: req.userData.userId,
      created_at: Date.now()
    });
    message
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

router.get("/retrive", checkAuth, (req, res, next) => {
  Message.find({ messageCreator: req.userData.userId })
    .then(documents => {
      if (documents) {
        res.status(200).json({
          message: "MessageRequestData fetched successfully!",
          messageDataCollections: documents
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

// sellers message retrive
router.get("/retrive-seller", checkAuth, (req, res, next) => {
  let messageQuery;

  CatchItIgnore.find({ merchantId: req.userData.userId }).select('requestId')
  .then(oldDoc => {

    if(oldDoc.length !== 0){
      let filterArray = [];
    oldDoc.forEach(element => {
      filterArray.push(element.requestId);
    });
      messageQuery = Message.find({ _id: {$nin: filterArray } });
    }
    else {
      messageQuery = Message.find();
    }

    const pageSize = 4;
    const currentpage = +req.query.page;
    let fetchedMessage;
    if (pageSize && currentpage) {
      messageQuery.skip(pageSize * (currentpage - 1)).limit(pageSize);
    }
    messageQuery
      .then(documents => {
        fetchedMessage = documents;
        return Message.countDocuments();
      })
      .then(count => {
        res.status(200).json({
          message: "MessageRequestData fetched successfully!",
          messageDataCollections: fetchedMessage,
          maxMessage: count
        });
      })
      .catch(err => {
        res.status(500).json({
          message: "Fatching Data failed"
        });
      });

  }).catch(err => {

  });

  // if(notEmpty){
  //   console.log("came here down of while");
  // }
  // else{
  //   messageQuery = Message.find();
  //   console.log("came here");
  //   console.log(oldDoc);
  // }


  // // for(let i=0;i<messageQuery.countDocuments;++i){
  // //   if(messageQuery.){}
  // // }

  // const pageSize = 4;
  // const currentpage = +req.query.page;
  // let fetchedMessage;
  // if (pageSize && currentpage) {
  //   messageQuery.skip(pageSize * (currentpage - 1)).limit(pageSize);
  // }
  // messageQuery
  //   .then(documents => {
  //     fetchedMessage = documents;
  //     return Message.countDocuments();
  //   })
  //   .then(count => {
  //     res.status(200).json({
  //       message: "MessageRequestData fetched successfully!",
  //       messageDataCollections: fetchedMessage,
  //       maxMessage: count
  //     });
  //   })
  //   .catch(err => {
  //     res.status(500).json({
  //       message: "Fatching Data failed"
  //     });
  //   });
});

module.exports = router;
