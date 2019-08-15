const express = require("express");

const Summary = require("../models/summaryModel");

const router = express.Router();

var sendJSONresponse = function (res, req, content) {
    res.status(status)
    res.content(content)
};

router.post('/summarize', (req, res, next) => {
    if (!req.body.unitPrice || !req.body.deleveryCost || !req.body.quantity ||
        !req.body.seller_id || !req.body.order_id || !req.body.recipient_name ||
         !req.body.recipient_address ||!req.body.recipient_city ||!req.body.recipient_contact) {
        sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }
    const summary = new Summary({
        unitPrice: req.body.unitPrice,
        deleveryCost: req.body.deleveryCost,
        quantity: req.body.quantity,
        seller_id: req.body.seller_id,
        order_id: req.body.order_id,
        recipient_name: req.body.recipient_name,
        recipient_address: req.body.recipient_address,
        recipient_city: req.body.recipient_city,
        recipient_contact: req.body.recipient_contact,
        
    });

    summary.save().then(result => {
        res.status(201).json({
            message: "Saved",
            result: result
        });
    });
});

module.exports = router;