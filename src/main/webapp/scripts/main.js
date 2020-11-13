// for now, default location info

var lat = 40.0274;
var lon = -105.2519;

// var trailId;
init();

//entry
function init(){
	//add search by zip code feature
	document.querySelector('#search-btn').addEventListener('click', initMap);
	document.querySelector('#profile-btn').addEventListener('click', showProfileForm);
	document.querySelector('#home-btn').addEventListener('click', showHomePage);
};

//initMap function
function initMap() {
	var profileForm = document.querySelector('#profile-form');
	hideElement(profileForm);
    const geocoder = new google.maps.Geocoder();
    document.getElementById("search-btn").addEventListener("click", () => {
      geocodeAddress(geocoder);
    });
	
	//display loading message
    showErrorMessage('No nearby trials. Please enter zipcode or city name.');
  }


//fetch location 
function iniGeolocation(){
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(
		onPositionUpdated, onLoadPositionFailed, {maximumAge: 60000});
	} else{
		onLoadPositionFailed();
	}
}

//update position
function onPositionUpdated(position){
	lat = position.coords.latitude;
	lng = position.coords.longitude;
	console.log(lat, lng);
	
	loadNearbyItems(); //load nearby items
}

//failed to fetch position (user clicked no)
function onLoadPositionFailed(){
	console.warn('navigator.geolocation is not avaliable');
	getLocationFromIP(); 
}

//get location from ip
function getLocationFromIP(){
	var url = 'http://ipinfo.io/json';
	var data = null;
	ajax('GET', url, data, function(res){
		var result = JSON.parse(res);
		if('loc' in result){
			var loc = result.loc.split(',');
			lat = loc[0];
			lng = loc[1];
			loadNearbyItems();
		} else{
			console.warn('Getting location by IP failed.');
		}
		loadNearbyItems();
	});	
}

//initMap function
function initMap() {
    const geocoder = new google.maps.Geocoder();
    document.getElementById("search-btn").addEventListener("click", () => {
      geocodeAddress(geocoder);
    });
  }

//geocodeAddress function
function geocodeAddress(geocoder) {
	var address = document.querySelector('#address').value;
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === "OK") {
        
        lat = results[0].geometry.location.lat();
        lon = results[0].geometry.location.lng();
        console.log('In google maps api');
        console.log(lat, lng);
        loadNearbyItems(); //load nearby items
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
 }