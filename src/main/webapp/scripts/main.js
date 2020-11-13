// for now, default location info

var lat = 40.0274;
var lon = -105.2519;

// var trailId;
init();

// entry
function init(){
	//add search by zip code feature
	document.querySelector('#search-btn').addEventListener('click', initMap);
	document.querySelector('#profile-btn').addEventListener('click', showProfileForm);
	document.querySelector('#home-btn').addEventListener('click', showHomePage);
};

// initMap function
function initMap() {
	var profileForm = document.querySelector('#profile-form');
	hideElement(profileForm);
    const geocoder = new google.maps.Geocoder();
    document.getElementById("search-btn").addEventListener("click", () => {
      geocodeAddress(geocoder);
    });
	
	// display loading message
    showErrorMessage('No nearby trials. Please enter zipcode or city name.');
  }


// geocodeAddress function
function geocodeAddress(geocoder) {
	var address = document.querySelector('#address').value;
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === "OK") {
        
        lat = results[0].geometry.location.lat();
        lng = results[0].geometry.location.lng();
        console.log('In google maps api');
        console.log(lat, lng);
        loadNearbyItems(); // load nearby items
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
 }

// function to list user profile form
function showProfileForm(){
	console.log("in show profile form function");
	var searchForm = document.querySelector('#search-form');
    var itemNav = document.querySelector('#item-nav');
    var itemList = document.querySelector('#item-list');
    var avatar = document.querySelector('#avatar');
    var welcomeMsg = document.querySelector('#welcome-msg');
    var profileForm = document.querySelector('#profile-form');
    
    hideElement(searchForm);
    hideElement(itemNav);
    hideElement(itemList);
    hideElement(avatar);
    hideElement(welcomeMsg);
    showElement(profileForm);
}

// function to go back to homepage 
function showHomePage(){
	var searchForm = document.querySelector('#search-form');
    var itemNav = document.querySelector('#item-nav');
    var itemList = document.querySelector('#item-list');
    var avatar = document.querySelector('#avatar');
    var welcomeMsg = document.querySelector('#welcome-msg');
    var profileForm = document.querySelector('#profile-form');
    
    showElement(searchForm);
    showElement(itemNav);
    showElement(itemList);
    showElement(avatar);
    showElement(welcomeMsg);
    hideElement(profileForm);
    loadNearbyItems();
}


// function to show the trailInfo page
function showTrailInfo(){
	loadTrailInfo();
}
