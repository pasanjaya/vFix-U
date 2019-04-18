const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  catName: { type: String, require: true }
});

module.exports = mongoose.model('Category', categorySchema);