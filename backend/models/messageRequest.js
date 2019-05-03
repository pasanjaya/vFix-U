const mongoose = require('mongoose');

const messageReqSchema = mongoose.Schema({
  vehicalBrand: { type: String, require: true },
  vehicalModel: { type: String, require: true },
  vehicalEngine: { type: String, require: true },
  category: { type: String, require: true },
  itemIdentifier: { type: String },
  itemImage: { type: String, require: true },
  itemNote: { type: String },
  messageCreator: { type: mongoose.Schema.Types.ObjectId, ref: "Consumer", require: true }
});

module.exports = mongoose.model("MessageRequest", messageReqSchema);