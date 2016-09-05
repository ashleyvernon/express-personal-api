// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var ashleyVernon = {
  name: "Ashley Vernon",
  githubLink: "https://github.com/ashleyvernon",
  githubProfileImage: "https://avatars3.githubusercontent.com/u/18171761?v=3&u=17603bb1d77ea6110b97d2362bcbf3d4e66fb481&s=140",
  personalSiteLink: "https://ashleyvernon.github.io",
  currentCity: "San Francisco",
  pets: "1 cat"
};

var myAdventures = [{
	location: "Yosemite, Ca",
	date: "April 21, 2016",
	typeOfAdventure: "Rock Climbing",
	lengthOfAdventure: "2 days"
},
{
  location: "Rockbound Lake, Desolation Wildnerness",
  // imageLink: "http://i.imgur.com/d1wWTXJ.jpg?1",
  date: "June 8th, 2016",
  typeOfAdventure: "Backpacking",
  lengthOfAdventure: "2 days, 14.5 miles"
},
{
  location: "Big Chief, Lake Tahoe",
  date: "July 1st, 2016",
  typeOfAdventure: "Rock Climbing",
  lengthOfAdventure: "3 days"
},
{
  location: "Russian River, Ca",
  date: "July 9th, 2016",
  typeOfAdventure: "River Rafting",
  lengthOfAdventure: "1 day"
},
{
  location: "Utica Reservior, Ca",
  date: "July 15th, 2016",
  typeOfAdventure: "Kayaking",
  lengthOfAdventure: "3 days"
}
]




db.Adventure.remove({}, function(err, adventures){
  if(err) {
    console.log('Error occurred in remove', err);
  } else {
    console.log('removed all adventures');
	}
    db.Adventure.create(myAdventures, function(err, adventures){
      if (err) { return console.log('err', err); }
      console.log("created", myAdventures.length, "adventures");
      // process.exit();
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
      // process.exit();
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
