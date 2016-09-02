// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var ashleyVernon = {
  name: "Ashley Vernon",
  githubLink: "https://github.com/ashleyvernon",
  githubProfileImage: "https://avatars3.githubusercontent.com/u/18171761?v=3&u=17603bb1d77ea6110b97d2362bcbf3d4e66fb481&s=140",
  personalSiteLink: "https://ashleyvernon.github.io",
  currentCity: "San Francisco"
};

var myAdventures = [{
	location: "Rockbound Lake, Desolation Wildnerness",
	date: "June 8th, 2016",
	typeOfAdventure: "Backpacking",
	lengthOfAdventure: "2 days, 14.5 miles"
},
{
	location: "Rockbound Lake, Desolation Wildnerness",
	date: "June 8th, 2016",
	typeOfAdventure: "Backpacking",
	lengthOfAdventure: "2 days, 14.5 miles"
}]




db.Adventure.remove({}, function(err, adventures){
  if(err) {
    console.log('Error occurred in remove', err);
  } else {
    console.log('removed all adventures');
	}
    db.Adventure.create(myAdventures, function(err, adventures){
      if (err) { return console.log('err', err); }
      console.log("created", adventures.length, "adventures");
      process.exit();
    });	
});

db.Profile.remove({}, function(err, profile){
  if(err) {
    console.log('Error occurred in remove', err);
  } else {
    console.log('removed all profile');
	}
    db.Profile.create(ashleyVernon, function(err, profile){
      if (err) { return console.log('err', err); }
      console.log("created profile: " + profile);
      process.exit();
    });	
});



// var new_campsite = {description: "Sharp rocks. Middle of nowhere."}

// db.Campsite.create(new_campsite, function(err, campsite){
//   if (err){
//     return console.log("Error:", err);
//   }

//   console.log("Created new campsite", campsite._id)
//   process.exit(); // we're all done! Exit the program.
// })
