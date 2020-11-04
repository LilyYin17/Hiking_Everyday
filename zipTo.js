// CS361 Team Project:Hiking Everyday
// Author: Chang Li
// Reference: https://developers.google.com/maps/documentation/javascript/examples/geocoding-simple#all

function initMap() {
    
    const geocoder = new google.maps.Geocoder();
    document.getElementById("submit").addEventListener("click", () => {
      geocodeAddress(geocoder);
    });
  }
  
function geocodeAddress(geocoder) {
    const address = document.getElementById("address").value;
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === "OK") {
        
        latitude = results[0].geometry.location.lat();
        longitude = results[0].geometry.location.lng();
        document.getElementById('lat').textContent = latitude;
        document.getElementById('lng').textContent = longitude;
        
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }