var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var AdventureSchema = new Schema({
  description: String
});

var Adventure = mongoose.model('Adventure', AdventureSchema);

module.exports = Adventure;
