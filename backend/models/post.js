const mongoose = require('mongoose');

const SchemaName = mongoose.Schema({
  title: {type: String, required: true }
});

module.exports = mongoose.model('Post', SchemaName);