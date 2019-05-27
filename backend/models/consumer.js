const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const consumerSchema = mongoose.Schema({
  fullName: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  mobileNumber: { type: Number, require: true },
  password: { type: String, require: true },
  created_at: { type: Date }
});

consumerSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Consumer", consumerSchema);
