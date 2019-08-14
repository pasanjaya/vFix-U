var mongoose =  require('mongoose')

const paymentSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    pnumber: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true,
        default: 0
    },
    orderId: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Payment',paymentSchema)