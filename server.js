// require express and other modules
var express = require('express'),
    // exphbs = require('express-handlebars'),

    app = express();
// app.engine('handlebars', exphbs({defaultLayout: 'main'}));
// app.set('view engine', 'handlebars');

// app.get('/', function (req, res) {
//   res.render('index');
// });

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

var db = require('./models')

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    AshleyVernonEndpoints: true, // CHANGE ME ;)
    message: "Welcome to Ashley's api! Here's what you need to know!",
    documentationUrl: "https://github.com/ashleyvernon/express-personal-api/blob/master/README.md", 
    baseUrl: "https://cryptic-depths-62490.herokuapp.com/", 
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Get to Know Me Better!"}, // CHANGE ME
      //put in information for about me: ie. pets: Sadie
      {method: "POST", path: "/api/Adventures", description: "My Adventures."} // CHANGE ME
    ]
  });
});


// get profile
app.get('/api/profile', function (req, res) {
  // send all books as JSON response
  db.Profile.findOne(function(err, profile){
    if (err) { return console.log("index error: " + err); }
    res.json(profile);  
  });
});

// update profile
// app.put('/api/profile', function (req, res) {
//   // send all books as JSON response
//   db.Profile.findOne(function(err, profile){
//     if (err) { return console.log("index error: " + err); }
//     console.log('Profile',profile);
//     profile.color = req.color;
//     profile.save(function(err, didProfileUpdate){
//       res.json(profile);  
//     });
//   });
// });

// get adventures
app.get('/api/adventure', function (req, res) {
  // send all books as JSON response
  db.Adventure.find(function(err, adventure){
    if (err) { return console.log("index error: " + err); }
    res.json(adventure);  
  });
});

// create a new adventures
app.post('/api/adventure', function(req,res){
  // create new book with form data (`req.body`)

  // console.log('adventures update', req.body);
  // var newAdventure = req.body;
  var newAdventure = new db.Adventure({ 
    location: req.body.location,
    date: req.body.date,
    typeOfAdventure: req.body.typeOfAdventure,
    lengthOfAdventure: req.body.lengthOfAdventure
    });
  adventures.push(newAdventure);
  res.json(newAdventure);

  console.log(newAdventure);
  newAdventure.save(function(err, savedAdventure){
    if(err){
      return res.status(500).send('FAILURE');
    }

    res.send(savedAdventure);

  });

});

//deletes an adventure
app.delete('/api/adventures', function(req,res){

})


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
