const mongoose = require('mongoose');

const messageResSchema = mongoose.Schema({
  requestId: { type: mongoose.Schema.Types.ObjectId, ref: 'MessageRequest', require: true },
  oemNumber: { type: String, require: true },
  remanufactured: { type: Boolean, require: true },
  condition: { type: String, require: true },
  unitPrice: { type: String, require: true },
  imagePath: { type: String, require: true },
  material: { type: String },
  model: { type: String },
  brand: { type: String, require: true },
  note: { type: String },
  responseCreator: { type: mongoose.Schema.Types.ObjectId, ref: 'Merchant', require: true },
  created_at: { type: Date }
});

module.exports = mongoose.model("MessageResponse", messageResSchema);