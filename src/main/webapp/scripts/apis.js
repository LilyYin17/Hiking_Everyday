/* this file is for API - HikingProjectClient end point :[GET]
 * load nearby trials
 * url: /search?lat=40.0274&lon=-105.2519
 */
function loadNearbyItems(){
	console.log('loadNearbyItems');
	activeBtn('nearby-btn');

	//The request parameters
	var url = './search';
	var params = 'lat=' + lat + '&lon=' + lng;
	var data = null;

	//display loading message
	showLoadingMessage('loading nearby items...');
	//make ajax call
	ajax('GET', url + '?' + params, data,
	//successful callback
	function(res){
		var items = JSON.parse(res);
		if(!items || items.length === 0){
			showWarningMessage('No nearby trials.');
		} else{
			console.log(items);
			listItems(items);
		}
	},
	//failed callback
	function(){
		showErrorMessage('No nearby trails. Please make sure you have entered zipcode or city name.');
	}
	); //end of ajax function
}

/**
 * API #2 Load the trial info API end point: [GET]
 * @param item - The item user choose to check
 * API end point: [GET]
 * /trialInfo?id=xxxx
 */
function loadTrailInfo(item){
	var li = document.querySelector('#item-' + item.id);
	console.log(li);
	var trailId = li.dataset.item_id;
	console.log(trailId);
	var url = './trailInfo';
	var params = 'id=' + trailId;
	var data = null;
	//display loading message
	showLoadingMessage('Loading trail information...');
	//make AJAX call
	ajax('GET', url + '?' + params, data,
		//successful callback
		function(res){
			var trail = JSON.parse(res);
			if(!trail || trail.length === 0){
				showWarningMessage('No trail details found.');
			} else{
				console.log(trail);
				listDetails(trail);
			}
		},
		//failed callback
		function(){
			showErrorMessage('Cannot load trail information');
		}
	);
}

/**
 * API #3 register the user 
 * 
 * @parameter: user's calculated fitnessLevel
 * 
 * API end point: [POST] /register request json data: {
 * 	userId, name, fitnesslevel, filter
 * }
 */
function register(fitnessLevel){
	var user_name = document.getElementById('user-name').value; 
	user_Id = user_name;
	var user_level = fitnessLevel;
	if(user_name === ""){
		showRegisterResult('Please enter a valid name');
    	return
	}
	
	//request parameters
	var url = './register';
	var req = JSON.stringify({
		userId: user_Id,
		name: user_name,
		fitnesslevel: user_level,
		filter: "no"
	});
	ajax('POST', url, req,
		//successful callback
		function(res){
			var result = JSON.parse(res);
			if(result.status === 'OK'){
				showRegisterResult('Succesfully add your fitness level');
			} else{
				showRegisterResult('User name already existed, please try another userName');
			}
		},
		//error
		function(){
			showRegisterResult('Failed to add your fitness level');
		},
	true);
}

/**
 * API #4 Toggle filter selections
 * API end point: [POST] /filter request json data: {
 * userId, filter: }
 */
function saveFilter(){
	console.log('in saveFilter function');
	hideModal();

	//check whether user click to enable the filter
	var checkBtn = document.getElementById("Enable-Filter");
	var check = checkBtn.dataset.check;
	
	if(check === 'false'){ 
		user_filter = 'no';
	} else if(check === 'true' && user_filter === 'no'){
		user_filter = 'default';
	}
	
	//request parameters
	var url = './filter';
	var req = JSON.stringify({
		userId: user_Id,
		filter: user_filter
	});
	
	ajax('POST', url, req,
		//successful callback
		function(res){
			var result = JSON.parse(res);
			if(result.status === 'OK' || result.result === 'SUCCESS'){
				loadJustForYouItems(user_Id);
			}
	});
}

/**
 * API #5 Load the just for you trial info API end point: [GET]
 * @param userId
 * API end point: [GET]
 * /filter?userId=xxxx
 */
function loadJustForYouItems(userId){
	console.log('loadJustForYouItems');
	activeBtn('recommend-btn');
	if(userId == null || userId === 'empty'){
	    showErrorMessage('Please fill the form by clicking Profile to get the best trails for you.');
	    return
	}
	//request parameters
	var url = './filter' + '?' + 'userId=' + userId;
	var data = null;
	// display loading message
    showLoadingMessage('Loading recommended trail...');
    console.log("in loadJustForYouItems " + user_Id);
	console.log("in loadJustForYouItems " + user_filter);
	
    if(user_filter === 'no'){
    	showWarningMessage('No recommended trails. Make sure you have enable just for you.');
    	return;
    }
    //make ajax call
    ajax('GET', url, data,
    	//successful callback
    	function(res){
    		var items = JSON.parse(res);
    		if(!items || items.length === 0){
    			showWarningMessage('No recommended item. Please try another filter.');
    		} else{
    			listItems(items);
    		}
    	},
    	//failed callback
    	function(){
    		showErrorMessage('Cannot load recommended items.');
    	}
    );
}
/**
 * API #6 insert new row to nearbys db 
 *
 * @param user_id
 * @param item_id
 *
 * API end point: [POST] /nearby request json data: {
 * userId, trailId: }
 */
function setNearbys(user_id, item_id){
	//request parameters
	var url = './nearby';
	var req = JSON.stringify({
		userId: user_id,
		trailId: item_id
	});
	
	ajax('POST', url, req,
		//successful callback
		function(res){
			var result = JSON.parse(res);
			if(result.status === 'OK'){
				showRegisterResult('Succesfully add new data to nearby table');
			} else{
				showRegisterResult('Nearbys already existed');
			}
		},
		//error
		function(){
			showRegisterResult('Failed to add the nearby');
		}
	);
}

/** API #7 for feature 5, get the weather condition
** 
** @param lat, lng 
** API end point: [GET]
** as mentioned in function loadTrailInfo(item) in apis.js
**/
function showChecklist(trail) {
	var thisLat = trail.latitude;
	var thisLng = trail.longitude;
	var trailId = trail.id;
	
	//get the temperature condition by call api
	var url = './checklist';
    var params = 'lat=' + thisLat + '&lon=' + thisLng;
    var data = null; 
	
	//make ajax call
    ajax('GET', url + '?' + params, data,
    	//successful callback
    	function(res) {
    		var weatheritems = JSON.parse(res);
    		if(!weatheritems || weatheritems.length === 0) {
    			showWarningMessage('No Gear and Clothing recommendation.');
    		} else {
    			console.log(weatheritems);
    			addGearsAndClothing(weatheritems, trail);
    		}
    	},
    	//failed callback
    	function(){
    		showErrorMessage('Cannot load Gear and Clothing recommendation.');
    	}
    );
}