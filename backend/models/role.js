const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const roleSchema = mongoose.Schema({
  email: { type: String, require: true, unique: true },
  role: { type: String, require: true }
});

roleSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Role", roleSchema);