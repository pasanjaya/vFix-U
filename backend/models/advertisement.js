const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const advertisementSchema = new Schema({
  title: {type: String, require: true },
  description: { type: String, require: true },
  advImage: { type: String, require: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'Merchant', require: true },
  created_at: { type: Date },
  modified_at: { type: Date }
});

module.exports = mongoose.model('Advertisement', advertisementSchema);
