var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/personal-api");

module.exports.Adventure = require("./adventure.js");
module.exports.Profile = require("./profile.js");