const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catchitIgnoreSchema = Schema({
  merchantId: { type: String, require: true },
  requestId: { type: String, require: true },
  status: { type: String, require: true },
});

module.exports = mongoose.model('MerchantCatchItIgnore', catchitIgnoreSchema);
