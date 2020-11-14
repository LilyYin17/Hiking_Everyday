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
 *
 * @param item - The item user choose to check
 *
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
	showLoadingMessage('Loading trial information...');
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
