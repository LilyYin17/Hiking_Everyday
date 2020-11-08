/* this file is for API - HikingProjectCliend end point :[GET]
 * load nearby trials
 * url: /search?lat=40.0274&lon=-105.2519
 */
function loadNearbyItems(){
	console.log('loadNearbyItems');
//	console.log('./search' + '?'+'lat=' + lat + '&lon=' + lng);
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