// for now, default location info

var lat = 40.0274;
var lon = -105.2519;

init();

//entry
function init(){
	//select nearby
//	document.querySelector('#nearby-btn').addEventListener('click', loadNearbyItems);
	//recommend
//	document.querySelector('#recommend-btn').addEventListener('click', loadRecommendedItems);
	
	validateSession();
};

//session validation
function validateSession(){
	var itemNav = document.querySelector('#item-nav');
	var itemList = document.querySelector('#item-list');
	var avatar = document.querySelector('#avatar');
	var welcomeMsg = document.querySelector('#welcome-msg');
	
	welcomeMsg.innerHTML = 'welcome to HikingEveryday! ';
	
	//display loading message
	showLoadingMessage('Validating session...');
	
	//fetch current location
	iniGeolocation();
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
	console.warm('navigator.geolocation is not avaliable');
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
			console.warm('Getting location by IP failed.');
		}
		loadNearbyItems();
	});	
}