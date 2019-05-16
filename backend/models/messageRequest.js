const mongoose = require('mongoose');

const messageReqSchema = mongoose.Schema({
  vehicalMaker: { type: String, require: true },
  vehicalModel: { type: String, require: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", require: true },
  sparePartName: { type: String },
  itemImagePath: { type: String, require: true },
  itemNote: { type: String },
  messageCreator: { type: mongoose.Schema.Types.ObjectId, ref: "Consumer", require: true },
  rensponses: [{ type: mongoose.Schema.Types.ObjectId, ref: "MessageResponse"}],
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("MessageRequest", messageReqSchema);