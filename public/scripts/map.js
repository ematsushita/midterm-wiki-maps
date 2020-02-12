let map;
let service;
let infoWindow = null;
let mapCentre;
let bounds;
let searchBox;


let defaultPos = {}

const userLocation = function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      defaultPos["lat"] = position.coords.latitude;
      defaultPos["lng"] = position.coords.longitude;
    })
  }
}

userLocation();



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
const initMap = function(mapCentre = defaultPos, markerPoints) {
  //sets map variable to map class
  map = new google.maps.Map(document.getElementById('map'), {zoom: 10, center: mapCentre});


  //loops through points and places a marker for each
  if (markerPoints.length) {
    markerPoints.forEach(point => {
      const location = {lat: point.latitude, lng: point.longitude};
      placeMarker(location, point, map);

      //extends bounds of all points
      bounds.extend(location);
    });

    //sets map bounds
    map.fitBounds(bounds, 5);
  }

};

const getBounds = function() {
  return $.get(`/lists/${listId}/bounds`, data => data);
};

$(document).ready(function() {
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
        initMap(defaultPos, value)
      } else {
        initMap(bounds.getCenter(), value);
      }
    });

  //sets the search box
  searchBox = new google.maps.places.SearchBox(document.getElementById('autocomplete'), {bounds: bounds});

  //sets the Places service for searching
  service = new google.maps.places.PlacesService(map);
});
