var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ProfileSchema = new Schema({
  description: String
});

var Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;