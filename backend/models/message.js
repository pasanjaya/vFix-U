const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  category: { type: String, require: true },
  itemIdentifier: { type: String },
  itemImage: { type: String, require: true },
  itemNote: { type: String },
  messageCreator: { type: mongoose.Schema.Types.ObjectId, ref: "Consumer", require: true }
});

module.exports = mongoose.model("Message", messageSchema);