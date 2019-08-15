const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const supportSchema = mongoose.Schema({
  fullName: {type: String, require: true },
  email: { type: String, require: true },
  phoneNo: { type: Number, require: true },
  message: { type: String, require: true }

});

supportSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Support", supportSchema);
