//show button
function hideElement(element){
	element.style.display = 'none';
}
//hide button
function showElement(element, style){
	var displayStyle = style ? style : 'block';
    element.style.display = displayStyle;
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

/**
 * List recommendation items based on the data received
 * @params items - An array of item JSON objects
 */
function listItems(items){
	var itemList = document.querySelector('#item-list');
	itemList.innerHTML = ''; //clear current results;
	
	for(var i = 0; i < items.length; i++){
		addItem(itemList, items[i]);
	}
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
	var item_id = item.id;
	
	//create the <li> tag and specify the id and class attributes
	var li = $create('li', {
		id: 'item-' + item_id,
		className: 'item'
	});
	
	//set the data attributes <li data-item_id="xxxxx">
	li.dataset.item_id = item_id;

	//item image
	if(item.imgSmallMed){
		li.appendChild($create('img', {
			src : item.imgSmallMed
		}));
	} else{
		li.appendChild($create('img', {
			src : 'https://via.placeholder.com/100'
		}));
	}
	
	//section
	var section = $create('div');
	
	//title
	var title = $create('a', {
		className : 'item-title',
		href : "http://localhost:8080/HikingEveryday/", //need to be changed
		target : '_blank'
	});
	title.innerHTML = item.name;
	section.appendChild(title);
	
	// trial name
//	var name = $create('p', {
//		className : 'item-name'
//	});
//	name.innerHTML = item.name;
//	section.appendChild(name);
	
	li.appendChild(section);
	
	// address
	var address = $create('p', {
		className : 'item-address'
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
function $create(tag, options){
	var element = document.createElement(tag);
	for(var key in options){
		if(options.hasOwnProperty(key)){
			element[key] = options[key];
		}
	}
	return element;
}

/**
 * A helper function that makes a navigation button active
 * @param btnId - The id of navigation button
 */
function activeBtn(btnId){
	var btns = document.querySelectorAll('.main-nav-btn');
	
	//de-active all navigation buttons
	for(var i = 0; i < btns.length; i++){
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
function ajax(method, url, data, successCallback, errorCallback){
	//step1: create an XMLHttpRequest object
	var xhr = new XMLHttpRequest(); 
	
	//step2: send the request to the server
	xhr.open(method, url, true); 
	console.log(method);
	xhr.onload = function(){
		if(xhr.status === 200){
			successCallback(xhr.responseText);
		} else{
			errorCallback();
		}
	};
	
	xhr.onerror = function(){
		console.log("The requext couldn't be completed.");
		errorCallback();
	};
	
	if(data === null){
		xhr.send();
	} else{
		xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
		xhr.send(data);
	}
}