let map;
let service;
let infoWindow = null;
let mapCentre;
let bounds;
let searchBox;
let testMarker;
let defaultPos = {};
let activePoints = [];
let newMarker;


//Function to loop through markers
const placeMarkersPoints = function(markerPoints) {
  markerPoints.forEach(point => {
    const location = {lat: point.latitude, lng: point.longitude};
    newMarker = placeMarker(location, point, map);
    activePoints.push(newMarker);

    //extends bounds of all points
    bounds.extend(location);
  });
  map.fitBounds(bounds);
};

//Function to clear markers
const clearMarkers = function(activePoints) {
  for (let i = 0; i < activePoints.length; i++) {
    activePoints[i].setMap(null);
  }
  activePoints = [];
};

//Get user's location to set map center if there are no active points
const userLocation = function(cb) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      defaultPos["lat"] = position.coords.latitude;
      defaultPos["lng"] = position.coords.longitude;
      cb(defaultPos, []);
    });
  }
};

//builds an infoWindow class for display on a map given data from a point
const buildInfoWindow = function(title, desc, imgUrl) {
  infoWindow = null;

  const contentString =
    '<div id="content">' +
    '<div id="siteNotice">' +
    '</div>' +
    `<img src="${imgUrl}" style="width: 40%; float: right;">` +
    `<h1 id="firstHeading" class="firstHeading">${title}</h1>` +
    '<div id="bodyContent">' +
    `<p>${desc}</p>` +
    '</div>' +
    '</div>';

  infoWindow = new google.maps.InfoWindow({
    content: contentString
  });

  return infoWindow;
};

//places a marker from a list of points on a list
const placeMarker = function(marker, point, map) {

  //newMarker is the marker object
  const newMarker = new google.maps.Marker({position: marker, map: map});

  //adds an event listener on click to craete an info window and display it
  google.maps.event.addListener(newMarker, 'click', function() {
    if (infoWindow) infoWindow.close();
    buildInfoWindow(point.title, point.description, point.img_url);
    infoWindow.open(map, newMarker);
  });

  return newMarker;
};

//renders the map given a centre point and a list of map points
const initMap = function(mapCentre, markerPoints) {
  //sets map variable to map class
  map = new google.maps.Map(document.getElementById('map'), {zoom: 10, center: mapCentre});

  console.log(mapCentre);

  //loops through points and places a marker for each
  if (markerPoints.length) {
    placeMarkersPoints(markerPoints);
    map.fitBounds(bounds, 5);
  }


  /////////////////////autocomplete function////////////////////////
  let input = document.getElementById('autocomplete');

  let autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);

  autocomplete.addListener('place_changed', function() {
    let place = autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }

    if (place.geometry.viewport) {

      map.fitBounds(place.geometry.viewport);
      const newLocation = {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()};

      testMarker = new google.maps.Marker({
        position: newLocation,
        map: map
      });
      activePoints.push(testMarker)
      if (bounds) {
        bounds.extend(newLocation);
      }

      google.maps.event.addListener(testMarker, 'click', function() {
        $(".add-new-point").slideDown();
        $(".form-latitude").val(place.geometry.location.lat());
        $(".form-longitude").val(place.geometry.location.lng());
        $(".form-title").val(place.name);
        $(".form-img-url").val(place.photos[0].getUrl({'maxWidth': 500, 'maxHeight': 500}));
        $(".form-description").val(place.reviews[0]["text"]);

      });

    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }
  });


};

const getBounds = function() {
  return $.get(`/lists/${listId}/bounds`, data => data);
};

$(document).ready(function() {

  $('form input').keydown(function(e) {
    if (e.keyCode == 13) {
      e.preventDefault();
      return false;
    }
  });

  $(".add-point-dropdown").click(function(event) {
    event.preventDefault();
    $(".add-new-point").slideToggle();
  });

  getBounds()
    .then(value => {
      if (value.east !== null) {
        bounds = new google.maps.LatLngBounds({lat: value["south"], lng: value["west"]}, {lat: value["north"], lng: value["east"]});
      }
      return;
    })
    .then(() => {
      return getPoints();
    })
    .then(value => {
      if (bounds === undefined) {
        return userLocation(initMap);
      } else {
        return initMap(bounds.getCenter(), value);
      }

    });
});
