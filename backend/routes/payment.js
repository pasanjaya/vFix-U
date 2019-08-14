const express = require("express");

var Payment = require('../models/paymentModel');

const router = express.Router();

var sendJSONresponse = function (res, req, content) {
    res.status(status)
    res.content(content)
};

router.post('/pay', (req, res, next) => {
    if (!req.body.first_name || !req.body.last_name || !req.body.address ||
        !req.body.city || !req.body.country || !req.body.email || !req.body.amount) {
        sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }


    const payment = new Payment({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        address: req.body.address,
        city: req.body.city,
        country: req.body.country,
        email: req.body.email,
        pnumber: req.body.pnumber,
        amount: req.body.amount,
        orderId: req.body.orderId,
        status: 0
    });

    payment.save().then(result => {
        res.status(201).json({
            message: "Saved",
            result: result
        });
    });
});

module.exports = router;