var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var AdventureSchema = new Schema({
  location: String,
  image: String,
  date: String,
  typeOfAdventure: String,
  lengthOfAdventure: String
});

var Adventure = mongoose.model('Adventure', AdventureSchema);

module.exports = Adventure;
