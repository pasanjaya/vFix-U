const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  messageCreator: { type: String, require: true },
  category: { type: String, require: true },
  itemName: { type: String },
  itemImage: { type: String },
  itemNote: { type: String }
});

module.exports = mongoose.model("Message", messageSchema);