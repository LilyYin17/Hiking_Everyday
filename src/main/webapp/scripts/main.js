// for now, default location info

//var lat = 40.0274;
//var lng = -105.2519;
var lat;
var lng;
var user_Id = 'empty';
var user_filter = 'no';

init();

// entry
function init() {
	//add search by zip code feature
	document.querySelector('#search-btn').addEventListener('click', initMap);
	document.querySelector('#profile-btn').addEventListener('click', showProfileForm);
	document.querySelector('#home-btn').addEventListener('click', showHomePage);
	document.querySelector('#nearby-btn').addEventListener('click', showHomePage);
	document.querySelector('#recommend-btn').addEventListener('click', showJustForYou);
	document.querySelector('.close').addEventListener('click', hideModal);
	
	//logic for user to disable/enable filter selection and save the choice
	document.querySelector('#Chill-btn').addEventListener('click', changeFilter_Chill);
	document.querySelector('#Challenge-btn').addEventListener('click', changeFilter_Challenge);
	document.querySelector('#Exhausted-btn').addEventListener('click', changeFilter_Exhausted);
	document.querySelector('#Myfitness-btn').addEventListener('click', changeFilter_Myfitness);
	document.getElementById('submit-filter').addEventListener('click', saveFilter);
	document.getElementById('Enable-Filter').addEventListener('click',changeFilterOption);
}

//initMap function
function initMap() {
	var profileForm = document.querySelector('#profile-form');
	hideElements(profileForm);
    const geocoder = new google.maps.Geocoder();
    document.getElementById("search-btn").addEventListener("click", () => {
      geocodeAddress(geocoder);
    });

	//display loading message
    showErrorMessage('No nearby trails. Please enter zipcode or city name.');
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

    hideElements(searchForm, itemNav, itemList, avatar, welcomeMsg);
    clearRegisterResult();
    showElements(profileForm);
}

//function to go back to home page
function showHomePage(){
	var searchForm = document.querySelector('#search-form');
    var itemNav = document.querySelector('#item-nav');
    var itemList = document.querySelector('#item-list');
    var avatar = document.querySelector('#avatar');
    var welcomeMsg = document.querySelector('#welcome-msg');
    var profileForm = document.querySelector('#profile-form');

    showElements(searchForm, itemNav, itemList, avatar, welcomeMsg);
    hideElements(profileForm);
    loadNearbyItems();
}

//function to show the trailInfo page
function showTrailInfo() {
	loadTrailInfo();
}

//function to show just for you page
function showJustForYou() {
  showModal();
  loadJustForYouItems(user_Id);
}

//function to calculate recommended trail level
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
//    displayLevel(sum);
    register(displayLevel(sum));
}

//function to display recommended trail level
function displayLevel(sum) {
	var level_1 = "Easy";
    var level_2 = "Intermediate";
    var level_3 = "Difficult";
    var error = "Calculation misfunction";
    var fitnessLevel;
    if (sum >= 3) {
        document.getElementById('displayLevel').innerHTML = level_3;
        document.getElementById('levelReason').innerHTML = 'Because you do exercise almost everyday and do not have joint/obese problem.';
        fitnessLevel = level_3;
    } else if (sum == 2) {
        document.getElementById('displayLevel').innerHTML = level_2;
        document.getElementById('levelReason').innerHTML = 'Because you do moderate exercise or you might have joint/obese problem.';
        fitnessLevel = level_2;
    } else if (sum <= 1) {
        document.getElementById('displayLevel').innerHTML = level_1;
        document.getElementById('levelReason').innerHTML = 'Because you do not exercise enough or you have joint/obese problem';
        fitnessLevel = level_1;
    } else {
        document.getElementById('displayLevel').innerHTML = error;
    }
    return fitnessLevel;
}

function changeFilterOption() {
	var checkBtn = document.getElementById("Enable-Filter");
	var check = !(checkBtn.dataset.check === 'true');
	checkBtn.dataset.check = check;
	if(check === 'true') user_filter = 'default';
	else user_filter = 'no';
}

function changeFilter_Chill() {
	user_filter = document.getElementById('Chill-btn').value;
}

function changeFilter_Challenge() {
	user_filter = document.getElementById('Challenge-btn').value;
}

function changeFilter_Exhausted() {
	user_filter = document.getElementById('Exhausted-btn').value;
}

function changeFilter_Myfitness() {
	user_filter = document.getElementById('Myfitness-btn').value;
}

function hideModal() {
	var modal = document.getElementById("myModal");
	hideElements(modal);
}