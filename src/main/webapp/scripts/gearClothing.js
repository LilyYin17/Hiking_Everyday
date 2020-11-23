// Create variables to hold the query elements
var apiKey = "b8daf7f3c6f5e5a79b546a1822e3856c";
var openweathermapAPIURL = "https://api.openweathermap.org/data/2.5/onecall";
var units = "metric";
var exclusion = "minutely,hourly,alerts";

document.addEventListener("DOMContentLoaded", getWeather);

/**
** @param item - The item user choose to check
** API end point: [GET]
** as mentioned in function loadTrailInfo(item) in apis.js
**/

function getWeather(){

  // ? How to get the chosen trail's lat and lng
  //var lat = item.lat;
  //var lng = item.lng;

  // temprarily hard code the latitude and longitude for test
  var lat = 43;
  var lng = 70;


  var finalQuery = openweathermapAPIURL+"?lat="+lat+"&lon="+lng+"&units="+units+"&exclude="+exclusion+"&appid="+apiKey;
  console.log(finalQuery);
  var req = new XMLHttpRequest();
  req.open('GET', finalQuery, true);
  req.addEventListener('load',function(){
    if(req.status >= 200 && req.status < 400){
      var response = JSON.parse(req.responseText);

      // store the response elements for later calculation

      var temp = response.daily[0].temp.day;
      var wind = response.daily[0].wind_speed + "metre/sec";
      var uvIndex = response.daily[0].uvi;
      var pop = response.daily[0].pop;
      var weatherDescription = response.daily[0].weather[0].description;
      var imgUrl = "http://openweathermap.org/img/wn/" + response.current.weather[0].icon + "@2x.png";

      // show the local daily weather
      document.getElementById('todays-temperature').textContent = temp;
      document.getElementById('temp').textContent = temp;
      document.getElementById('wind').textContent = wind;
      document.getElementById('UV').textContent = uvIndex;
      document.getElementById('pop').textContent = pop;
      document.getElementById('Description').textContent = weatherDescription;
      document.getElementById('weather-image').src=imgUrl;
      document.getElementById('weather-description-text').textContent = weatherDescription;

    } else {
        console.log("Error in network request: " + req.statusText);
      }});
    req.send();
    event.preventDefault();
}


/**
function gearClothingRec(){
  // recommend gear and clothing according to temperature
}
**/