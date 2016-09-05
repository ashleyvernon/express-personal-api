console.log("sanity check JS is working")

var template;
var adventureTemplate;
var $adventuresList;
var allAdventures = [];
console.log(allAdventures);


$(document).ready(function(){

  $adventuresList = $('#adventureTarget');

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
    // console.log('new adventure serialized', $(this).serialize());
    var location = $(this).find('input[name="locationAdventure"]').val(),
      type = $(this).find('input[name="typeOfAdventure"]').val();

    $.ajax({
      method: 'POST',
      url: '/api/adventure',
      data: {
        locationAdventure: location,
        typeOfAdventure: type
      },
      success: newAdventureSuccess,
      error: newAdventureError
    });
  });

  $adventuresList.on('click', '.deleteBtn', function() {
    console.log($(this).attr('adventure-id'));

    $.ajax({
      method: 'DELETE',
      url: '/api/adventure/' + $(this).attr('adventure-id'),
      success: deleteAdventureSuccess,
      error: deleteAdventureError
    });
  });

});

function render() {
  $adventuresList.empty();
  var adventureHtml = adventureTemplate({ adventures: allAdventures });
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
    allAdventures = adventures;
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

function deleteAdventureSuccess(adventureId) {

  // $('.newAdventure[adventure-id="'+id+'"]').remove();

  for(var index = 0; index < allAdventures.length; index++) {
    if(allAdventures[index]._id === adventureId) {
      allAdventures.splice(index, 1);
      break;
    }
  }

  // location.reload();
  render();
}


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

function deleteAdventureError(e) {
  console.log('You failed to delete');
  $('#adventureTarget').text('You failed to delete any adventures, try again!');
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

