// for now, default location info

var lat = 40.0274;
var lng = -105.2519;
var user_Id = 'empty';
init();

// entry
function init(){
	//add search by zip code feature
	document.querySelector('#search-btn').addEventListener('click', initMap);
	document.querySelector('#profile-btn').addEventListener('click', showProfileForm);
	document.querySelector('#home-btn').addEventListener('click', showHomePage);
	document.querySelector('#nearby-btn').addEventListener('click', showHomePage);
	document.querySelector('#recommend-btn').addEventListener('click', showJustForYou);
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

//function to list user profile form
function showProfileForm(){
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

    clearRegisterResult();
    showElement(profileForm);
}

//function to go back to home page
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

//function to show the trailInfo page
function showTrailInfo(){
	loadTrailInfo();
}

//function to show just for you page
function showJustForYou(){
	loadJustForYouItems();
}

//function to calculate the user's fitness level
function calculateLevel() {
	var userName = document.getElementById('user-name').value;
	console.log(document.getElementById('user-name').value);
    var age = document.getElementById("age").value;
    document.getElementById('displayName').innerHTML = userName;
    var actLevel = document.getElementById("exercise").value;
    var joint = document.getElementById("joint").value;
    var obese = document.getElementById("obese").value;
    var sum = parseInt(actLevel,10) + parseInt(joint,10) + parseInt(obese,10);
    // Check age range
    if (age <= 14) {
        sum -= 1;
    } else if (age >= 60 || age <= 70) {
        sum -= 1;
    } else if (age > 70) {
        sum -= 2;
    }
    // Finalize sum and display message
    var level_1 = "Easy";
    var level_2 = "Intermediate";
    var level_3 = "Difficult";
    var error = "Calculation misfunction";
    var fitnessLevel;
    if (sum >= 3) {
        document.getElementById('displayLevel').innerHTML = level_3;
        fitnessLevel = level_3;
    } else if (sum == 2) {
        document.getElementById('displayLevel').innerHTML = level_2;
        fitnessLevel = level_2;
    } else if (sum <= 1) {
        document.getElementById('displayLevel').innerHTML = level_1;
        fitnessLevel = level_1;
    } else {
        document.getElementById('displayLevel').innerHTML = error;
    }
    register(fitnessLevel);
}
