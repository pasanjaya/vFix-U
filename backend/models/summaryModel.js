var mongoose =  require('mongoose')

const summarySchema = new mongoose.Schema({
    unitPrice:{
        type:Number,
        required:true

    },
    deleveryCost:{
        type:Number,
        required:true
    },
    quantity:{
        type:String,
        required:true
    },
    seller_id:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Merchant',
         require: true
    },
    order_id:{
        type: mongoose.Schema.Types.ObjectId, ref: 'MessageResponse', 
        require: true
    },
    recipient_name:{
        type:String,
        required: true
    },
    
    recipient_address: {
        type: String,
        required: true
    },
    recipient_city: {
        type: String,
        required: true
    },
    recipient_contact: {
        type: String,
        required: true
    }
   

});

module.exports = mongoose.model("Summary",summarySchema)