const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const categorySchema = mongoose.Schema({
  catName: { type: String, require: true, unique: true }
});

categorySchema.plugin(uniqueValidator);

module.exports = mongoose.model('Category', categorySchema);