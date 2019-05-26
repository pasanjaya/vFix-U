const express = require("express");
const multer = require("multer");

const checkAuth = require("../middleware/check-auth");

const Advertisement = require("../models/advertisement");

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
    cb(error, "backend/images/advertisementImages");
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
    const advertisement = new Advertisement({
      title: req.body.title,
      description: req.body.description,
      advImage: url + "/images/advertisementImages/" + req.file.filename,
      createdBy: req.userData.userId
    });
    advertisement
      .save()
      .then(result => {
        res.status(200).json({
          message: "advertisement posted!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  }
);

router.get("/retrive", checkAuth, (req, res, next) => {
  Advertisement.find({ createdBy: req.userData.userId }).then(document => {
    res.status(200).json({
      message: "Advertisement Fetched Succussfully!",
      documents: document
    });
  });
});

router.put(
  "/update/:id",
  checkAuth,
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    let imagePath = req.body.advertisementPath;
    if (req.file) {
      const url = req.protocol + '://' + req.get('host');
      imagePath = url + "/images/advertisementImages/" + req.file.filename;
    }
    const advertisement = new Advertisement({
      _id: req.body.id,
      title: req.body.title,
      description: req.body.description,
      createdBy: req.userData.userId,
      advImage: imagePath,
      modified_at: Date.now()
    });
    Advertisement.updateOne({_id: req.params.id}, advertisement).then(result => {
      res.status(200).json({
        message: 'Updated Successfully'
      });
    });
  }
);

router.delete('/delete/:id',checkAuth, (req, res, next) => {
  Advertisement.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({
      message: "Advetisement deleted!"
    });
  });
});

module.exports = router;
