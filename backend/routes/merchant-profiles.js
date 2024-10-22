const express = require("express");

const checkAuth = require("../middleware/check-auth");

const Merchant = require("../models/merchant");
const MerchantProfile = require("../models/merchant-profile");

const router = express.Router();

// create profile
router.post("/save", checkAuth, (req, res, next) => {
  const profile = new MerchantProfile({
    merchantId: req.userData.userId,
    shopName: req.body.shopName,
    shopReg: req.body.shopReg,
    address: req.body.address,
    city: req.body.city,
    contactNo: req.body.contactNo,
    geometry: { type: "Point", coordinates: [req.body.longitude, req.body.latitude] },
    about: req.body.about,
    created_at: Date.now(),
    modified_at: Date.now()
  });
  profile
    .save()
    .then(savedResult => {
      Merchant.findOne({ _id: req.userData.userId }, (err, merchant) => {
        if (err) console.log("Error occured");
        merchant.profile = savedResult._id;
        merchant.save().then(updatedMerchant => {
          res.status(200).json({
            message: "profile Saved",
            result: [savedResult, updatedMerchant]
          });
        });
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Profile creating error'
      });
    });
});

// get fullName and profile
router.get("/user", checkAuth, (req, res, next) => {
  Merchant.findOne({ email: req.userData.email }).select('fullName profile').then(user => {
    res.status(200).json({
      message: "data retrive succusesfully",
      result: user
    });
  }).catch(err => {
    res.status(500).json({
      message: 'Data retriving error'
    });
  });
});

router.get("/retrive", checkAuth, (req, res, next) => {
  Merchant.findOne({ email: req.userData.email })
    .populate("profile")
    .select('fullName mobileNumber profile')
    .exec((err, merchant) => {
      if (err) {
        res.status(500).json({
          message: 'Data retiving error'
        });
      }
      if (merchant) {
        res.status(200).json({
          message: "data retrive succusesfully",
          result: merchant
        });
      }
    });
});

router.put('/update/:id', checkAuth, (req, res, next) => {
  const profile = new MerchantProfile({
    _id: req.body.id,
    merchantId: req.userData.userId,
    shopName: req.body.shopName,
    shopReg: req.body.shopReg,
    address: req.body.address,
    city: req.body.city,
    contactNo: req.body.contactNo,
    geometry: { type: "Point", coordinates: [req.body.longitude, req.body.latitude] },
    about: req.body.about,
    modified_at: Date.now()
  });
  MerchantProfile.updateOne({_id: req.params.id}, profile)
    .then(result => {
      res.status(200).json({
        message: "updated profile"
      });
  }).catch(err => {
    res.status(500).json({
      message: 'Profile couldn\'t update'
    });
  });
});

module.exports = router;
