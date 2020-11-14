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
		showErrorMessage('Cannot load nearby trails.');
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
 * API #3 Load justForYou items API end point: [GET]
 * /recommendation?user_id=1111
 */
function loadJustForYouItems() {
	console.log('in load just for you function');
	activeBtn('recommend-btn');
	
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
		showErrorMessage('Cannot load nearby trails.');
	}
	); //end of ajax function
}

/**
 * API #4 register the user 
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
		showRegisterResult('Please enter a valid p');
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
 * API #5 Toggle filter selections
 *
 * @param userFilter 
 *
 * API end point: [POST] /filter request json data: {
 * userId, filter: }
 */
function changeFilter(userFilter){
	//request parameters
	var url = './filter';
	var req = JSON.stringify({
		userId: user_Id,
		filter: userFilter
	});
	ajax('POST', url, req,
		//successful callback
		function(res){
			var result = JSON.parse(res);
			if(result.status === 'OK' || result.result === 'SUCCESS'){
				loadJustForYouItems(userId);
			}
	});
}

/**
 * API #6 Load the just for you trial info API end point: [GET]
 * @param userId
 * API end point: [GET]
 * /filter?userId=xxxx
 */
function loadJustForYouItems(userId){
	console.log('loadJustForYouItems');
	activeBtn('recommend-btn');
	if(userId == null || userId == 'empty'){
	    showErrorMessage('Please fill the form by clicking Profile to get the best trails for you.');
	    return
	}
	//request parameters
	var url = './filter' + '?' + 'userId=' + userId;
	var data = null;
	// display loading message
    showLoadingMessage('Loading recommended trail...');
    
    //make ajax call
    ajax('GET', url, data,
    	//successful callback
    	function(res){
    		var items = JSON.parse(res);
    		if(!items || items.length === 0){
    			showWarningMessage('No recommended item. Make sure you have set the filter or filled the profile form.');
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
 * API #7 insert new row to nearbys db 
 *
 * @param user_id, item_id
 *
 * API end point: [POST] /nearby request json data: {
 * userId, trailId: }
 */
function setNearbys(user_Id, item_id){
	//request parameters
	var url = './nearby';
	var req = JSON.stringify({
		userId: user_Id,
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
