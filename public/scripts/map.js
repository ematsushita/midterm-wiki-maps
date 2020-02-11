let infoWindow = null;

const buildInfoWindow = function(title, desc, imgUrl) {
  infoWindow = null;

  const contentString = '<div id="content">' +
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

// pin.addListener("click", function() {
//   info.open(map, pin);
// });

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

const initMap = function(mapBounds, markerPoints) {
  const bounds = new google.maps.LatLngBounds(mapBounds[0], mapBounds[1]);
  const mapCentre = bounds.getCenter();

  const map = new google.maps.Map(document.getElementById('map'), {zoom: 10, center: mapCentre});

  markerPoints.forEach(point => {
    const location = {lat: point.latitude, lng: point.longitude};
    placeMarker(location, point, map);
    bounds.extend(location);
  });

  map.fitBounds(bounds, 5);

  const autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'));
};

const getBounds = function() {
  return $.get(`/lists/${listId}/bounds`, data => data);
};

$(document).ready(function() {

  //the coords array will be passed to the initMap function
  const coords = [];

  getBounds()
    .then(value => {
      coords.push({lat: value["south"], lng: value["west"]});
      coords.push({lat: value["north"], lng: value["east"]});
      return;
    })
    .then(() => {
      return getPoints();
    })
    .then(value => {
      initMap(coords, value);
    });



});
