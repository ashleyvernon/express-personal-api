var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ProfileSchema = new Schema({
  name: String,
  githubLink: String,
  githubProfileImage: String,
  personalSiteLink: String,
  currentCity: String,
  pets: String
})

var Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;