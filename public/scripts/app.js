console.log("sanity check JS is working")

var template;
var adventureTemplate;
var $adventuresList;
var allAdventures = [];
console.log(allAdventures);


$(document).ready(function(){
	var source = $('#profile-template').html();
	template = Handlebars.compile(source);

	var source2 = $('#adventure-template').html();
	adventureTemplate = Handlebars.compile(source2);

	$.ajax({
		method: 'GET',
		url: '/api/profile',
		dataType: 'json',
		success: onProfileSuccess,
		error: handleError
	});

	$.ajax({
		method: 'GET',
		url: '/api/adventure',
		dataType: 'json',
		success: onAdventureSuccess,
		error: handleAdventureError
	});


  $('#newAdventureForm').on('submit', function(e) {
    e.preventDefault();
    // alert('this is not working');
   // var location = $(this).find('input').val();

   // createAdventure(location)
    console.log('new adventure serialized', $(this).serialize());
    $.ajax({
      method: 'POST',
      url: '/api/adventure',
      data: $(this).serialize(),
      dataType: 'json',
      success: newAdventureSuccess,
      error: newAdventureError
    });
  });

// your code
	

});

function render () {
  $adventuresList.empty();
  var adventureHtml = adventureTemplate({ adventures: adventures });
  $adventuresList.append(adventureHtml);
}


function onProfileSuccess(json){
    var profileHtml = template({
  		name: json.name,
  		githubLink: json.githubLink,
  		githubProfileImage: json.githubProfileImage,
  		personalSiteLink: json.personalSiteLink,
  		currentCity: json.currentCity,
  		pets: json.pets
  		})
    $('#profileTarget').prepend(profileHtml);
    // console.log(json);
};

function onAdventureSuccess(adventures){
    var adventureHtml = adventureTemplate({ adventures: adventures })
    $('#adventureTarget').append(adventureHtml);
    // console.log(json);
};

function newAdventureSuccess(json) {
  $('#newAdventureForm input').val('');
  // console.log(newAdventure);
  allAdventures.push(json);
  render();
};
  // function createAdventure(locationOfAdventure){}
  // var adventure = $('form input');

   //  var newAdventure = { location: location.val(),
   //   date: date.val(),
   //   typeOfAdventure: typeOfAdventure.val(),
   //   lengthOfAdventure: lengthOfAdventure.val() 
   // };

// function newAdventureSuccess(json){
//     // var adventureHtml = adventureTemplate({ profile: json });
//       $('#entireAdventures').append(adventureHtml)

// };

function handleError(e) {
  console.log('Boo for profile!');
  $('#profileTarget').text('Failed to load profile, what up with that?');
};

function handleAdventureError(e) {
  console.log('Boo for adventures');
  $('#adventureTarget').text('Failed to load adventures, what up with that?');
};

function newAdventureError(e) {
  console.log('Boo for no new adventures');
  $('#adventureTarget').text('Failed to load new adventures, lame!');
};



// function updateProfile(color){

// 	$.ajax({
// 		method: 'put',
// 		url: '/api/profile',
// 		data: {
// 			color: color
// 		},
// 		success: onSuccess,
// 		error: handleError
// 	});
// }

