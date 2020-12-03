// hide elements
function hideElements(...elements) {
	elements.forEach(function (element) {
		element.style.display = 'none';
	})
}
// show elements
function showElements(...elements) {
	elements.forEach(function (element) {
		element.style.display = 'block';
	})
}

function showLoadingMessage(msg) {
	var itemList = document.querySelector('#item-list');
	itemList.innerHTML = '<p class="notice"><i class="fa fa-spinner fa-spin"></i> ' +
		msg + '</p>';
}

function showWarningMessage(msg) {
	var itemList = document.querySelector('#item-list');
	itemList.innerHTML = '<p class="notice"><i class="fa fa-exclamation-triangle"></i> ' + msg + '</p>';
}

function showErrorMessage(msg) {
	var itemList = document.querySelector('#item-list');
	itemList.innerHTML = '<p class="notice"><i class="fa fa-exclamation-circle"></i> ' + msg + '</p>';
}

function showRegisterResult(registerMessage) {
    document.querySelector('#register-result').innerHTML = registerMessage;
}

function clearRegisterResult() {
    document.querySelector('#register-result').innerHTML = '';
}

function showModal() {
	var modal = document.getElementById("myModal");
	showElements(modal);
	$(".filterToggle").click(function(){
		$(".collapse").collapse('toggle');
	});
}

/**
 * List nearby items based on the data received
 * @params items - An array of item JSON objects
 */
function listItems(items) {
	var itemList = document.querySelector('#item-list');
	itemList.innerHTML = ''; //clear current results;

	for (var i = 0; i < items.length; i++) {
		addItem(itemList, items[i]);
	}
}

/**
 * List trial detail information based on the data received
 * @params detail - An array of detail JSON objects
 */
function listDetails(trail){
    var itemList = document.querySelector('#item-list');
    itemList.innerHTML = ''; // clear current results
    addDetails(itemList, trail);
}

function addDetails(itemList, trail){
	var trailLat = trail.latitude;
	var trailLng = trail.longitude;
	
	//create the <li> tag and specify the id and class attributes
	var li = $create('li', {
		id: trail.id,
		className: 'trailDetail'
	});
	//set the data attributes <li data-item_id="xxxxx">
	li.dataset.trail_id = trail.id;

	//trail image
	if(trail.imgSmallMed){
		li.appendChild($create('img', {
			src : trail.imgSmallMed,
			style : 'width:100%; height:500px'
		}));
	} else{
		li.appendChild($create('img', {
			src : 'https://via.placeholder.com/100'
		}));
	}
	linebreak = document.createElement("br");
	li.appendChild(linebreak);
	
	var trailDetail = $create('h2', {
		className : 'trail-details'
	});
	trailDetail.innerHTML = 'Trail Details:';
	li.appendChild(trailDetail);
	
	//trail name
	var trailName = $create('a', {
		className: 'trail-name',
	});
	trailName.innerHTML = 'Name: ' + trail.name;
	li.appendChild(trailName);
	linebreak = document.createElement("br");
	li.appendChild(linebreak);
	
	//trail length
	var trailLength = $create('a', {
		className: 'trail-length',
	});
	trailLength.innerHTML = 'Length: ' + trail.length + ' miles';
	li.appendChild(trailLength);

	// address
	var address = $create('p', {
		className : 'trail-address'
	});
	address.innerHTML = 'Location: ' + trail.location;
	li.appendChild(address);
	
	//add Gear & Clothing section
	var checklist = $create('button', {
		className: 'checklist-btn',
	});
	checklist.innerHTML = 'Click to see checklist:';
	checklist.onclick = function(){
		showChecklist(trail);
	}
	li.appendChild(checklist);

	var section = $create('div', {
		id: 'trail-checklist'
	});
	li.appendChild(section);
	
	// section
	linebreak = document.createElement("br");
	li.appendChild(linebreak);

	var section = $create('div');

	// direction button
	var map_url = 'https://maps.google.com/?q=' + trailLat + ',' + trailLng + '&language=en&region=US';
	var dirButton = $create('button', {
		className: 'trail-direction',
	});
	console.log(trailLat, trailLng);
	dirButton.innerHTML = 'Navigate to the trailhead';
	dirButton.onclick = function(){
		window.open(map_url)
	};
	li.appendChild(dirButton);
	
	// section display trail head map using google map api
	var section = $create('div');
	var trailMap = $create('div', {
		id: 'map',
		className: 'trail-map',
		style : 'width:100%; height:500px',
	});
	$(function(){
		function initTrailMap() {
			const trailHead = {lat: trailLat, lng: trailLng};
			const map = new google.maps.Map(document.getElementById("map"), {
				zoom: 12,
				center: trailHead,
			});
			const marker = new google.maps.Marker({
				position: trailHead,
				map: map,
			});
		}
		initTrailMap()
	});
	li.appendChild(trailMap);

	itemList.appendChild(li);
}

/**
 * Add a single item to the list
 * @params itemList - The <id="item-list"> tag (DOM container)
 * @params item - The item data (JSON object)
 * <li class="item"> <image alt="item image"
 * src="https://cdn2.apstatic.com/photos/hike/7039883_smallMed_1555092747.jpg" />
 * <div> <a class="item-name" href="#" target="_blank">Trail</a>
 * <p class="item-category">black</p>
 * </div>
 * <p class="item-address">Superior, Colorado</p>
 */
function addItem(itemList, item){
	setNearbys(user_Id, item.id); //add row to nearbys db
	var item_id = 'item-' + item.id;

	//create the <li> tag and specify the id and class attributes
	var li = $create('li', {
		id: item_id,
		className: 'item',
		value: item.id
	});

	//set the data attributes <li data-item_id="xxxxx">
	li.dataset.item_id = item.id;
	//item image
	if (item.imgSmallMed) {
		li.appendChild($create('img', {
			src: item.imgSmallMed
		}));
	} else {
		li.appendChild($create('img', {
			src: 'https://via.placeholder.com/100'
		}));
	}

	//section
	var section = $create('div');

	//title
	var title = $create('a', {
		className: 'item-link',
		href : '#',
	});
	title.innerHTML = item.name;
	title.onclick = function(){
		loadTrailInfo(item);
	}
	section.appendChild(title)

	li.appendChild(section);

	// address
	var address = $create('p', {
		className: 'item-address'
	});
	address.innerHTML = item.location;
	li.appendChild(address);

	itemList.appendChild(li);
}

/**
 * A helper function that creates a DOM element
 * @param tag
 * @param options
 * @returns {element}
 */
function $create(tag, options) {
	var element = document.createElement(tag);
	for (var key in options) {
		if (options.hasOwnProperty(key)) {
			element[key] = options[key];
		}
	}
	return element;
}

/**
 * A helper function that makes a navigation button active
 * @param btnId - The id of navigation button
 */
function activeBtn(btnId) {
	var btns = document.querySelectorAll('.main-nav-btn');

	//de-active all navigation buttons
	for (var i = 0; i < btns.length; i++) {
		btns[i].className = btns[i].className.replace(/\bactive\b/, '');
	}
	//active the one that has id = btnId
	var btn = document.querySelector('#' + btnId);
	btn.className += ' active';
}

/**
 * AJAX helper
 *@param method - GET|POST|PUT|DELETE
 *@param url - API end point
 *@param data - Request payload data
 *@param successCallback - Successful callback function
 *@param errorCallback - Error callback function
 */
function ajax(method, url, data, successCallback, errorCallback) {
	//step1: create an XMLHttpRequest object
	var xhr = new XMLHttpRequest();

	//step2: send the request to the server
	xhr.open(method, url, true);
	console.log(method);
	xhr.onload = function () {
		if (xhr.status === 200) {
			successCallback(xhr.responseText);
		} else {
			errorCallback();
		}
	};

	xhr.onerror = function () {
		console.log("The requext couldn't be completed.");
		errorCallback();
	};

	if (data === null) {
		xhr.send();
	} else {
		xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
		xhr.send(data);
	}
}

function addGearsAndClothing(weatheritems, trail) {
	console.log('in addGearsAndClothing function');
	var trailChecklist = document.querySelector('#trail-checklist');
	trailChecklist.innerHTML = '';
	
	var title = $create('h2', {
		className : 'trail-checklist'
	});
	title.innerHTML = 'Checklist for you:';
	trailChecklist.appendChild(title);
	
	//check trail temperature condition and recommend gear and clothing
	var temp = weatheritems[0].temp;
	var wind = weatheritems[0].wind;
	var weatherDes = weatheritems[0].weatherDes;
	var trailLen = trail.length;
	var trailDiff = trail.difficulty;
	var trailHigh = trail.high;
	
	//for clothing and shoes
	trailChecklist.appendChild($create('img', {
		src: 'https://www.pngfind.com/pngs/m/273-2733257_icon-weather-portal-comments-weather-icons-png-white.png',
		style : 'width:50px; height:40px',
	}));
	var clothing = $create('p', {
		className: 'cloth',
	});
	if(temp < 0){
		clothing.innerHTML = 'Temperatue is ' + weatheritems[0].temp + '°C, please wearing gloves, a hat, long sleeve jersey, long underwear, boxer jocks, hardshell or softshell pants, a fleece pullover, a hardshell jacket, warm socks, insulated boots, and high gaiters.'; 
		trailChecklist.appendChild(clothing);
	} else if(temp < 10){
		clothing.innerHTML = 'Temperatue is ' + weatheritems[0].temp + '°C, please bring a base layer with insulating properties such as wool or budget-friendly synthetic materials; an insulating, removable middle layer; and a waterproof/windproof outer layer.'; 
		trailChecklist.appendChild(clothing);
	} else if(temp < 23) {
		clothing.innerHTML = 'Temperatue is ' + weatheritems[0].temp + '°C, a short- or long-sleeved wicking base layer. And a zip-up fleece jacket is a good addition.';
		trailChecklist.appendChild(clothing);
	} else {
		clothing.innerHTML = 'Temperatue is ' + weatheritems[0].temp + '°C, breathable wicking materials (no cotton) are key for shirts, bottoms and hiking socks to keep the sweat off your skin. Lighter colors absorb less heat and can keep you cooler on hot days.';
		trailChecklist.appendChild(clothing);
	}
	//if windy
	if(wind >= 10){
		var windy = $create('p', {
			className: 'windy',
		});
		windy.innerHTML = 'There will be wind, so a jacket might be useful.';
		trailChecklist.appendChild(windy);
	}
	//if rainy
	if(weatherDes === 'light rain' || weatherDes === 'moderate rain' || weatherDes === 'heavy intensity rain' || weatherDes === 'heavy rain'){
		var rainy = $create('p', {
			className: 'rainy',
		});
		rainy.innerHTML = 'The weather will be rainy, please wear waterproof jacket or shirt, and hat might be useful.';
		trailChecklist.appendChild(rainy);
	}
	
	//for food
	var food = $create('p', {
		className: 'food',
	});
	if(trailLen >= 5 && trailLen < 10) {
		trailChecklist.appendChild($create('img', {
			src: 'data:image/png;base64,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',
			style : 'width:50px; height:40px',
		}));
		food.innerHTML = 'This trail length is ' + trailLen + ' miles, a bottle of water would be helpful.';
		trailChecklist.appendChild(food);
	} 
	if(trailLen > 10){
		trailChecklist.appendChild($create('img', {
			src: 'data:image/png;base64,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',
			style : 'width:50px; height:40px',
		}));
		food.innerHTML = 'This trail length is ' + trailLen + ' miles, some water and snacks would be helpful.';
		trailChecklist.appendChild(food);
	}
	
	//for difficult trails
	if(trailDiff === 'blueBlack' || trailDiff === 'black') {
		trailChecklist.appendChild($create('img', {
			src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO629z8O3IJibUjoZxg-FYr6SzRLHC8sgxAw&usqp=CAU',
			style : 'width:50px; height:40px',
		}));
		var pore = $create('p', {
			className: 'pore',
		});
		pore.innerHTML = 'This trail is widely variable and unpredictable, be sure to bring a comfortable pole.';
		trailChecklist.appendChild(pore);
	}
}