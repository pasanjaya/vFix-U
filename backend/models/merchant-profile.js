const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const profileSchema = Schema({
  shopName: { type: String, require: true },
  shopReg: { type: String, require: true },
  address: { type: String, require: true },
  city: { type: String, require: true },
  contactNo: { type: String, require: true },
  latitude: { type: String, require: true },
  longitude: { type: String, require: true },
  about: { type: String },
  created_at: { type: Date, default: Date.now() },
  modified_at: { type: Date, default: Date.now() }
});

profileSchema.plugin(uniqueValidator);

module.exports = mongoose.model('MerchantProfile', profileSchema);

