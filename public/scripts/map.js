const initMap = function(mapBounds, markerPoints) {
  const bounds = new google.maps.LatLngBounds(mapBounds[0], mapBounds[1]);
  const centre = bounds.getCenter();

  const map = new google.maps.Map(document.getElementById('map'), {zoom: 10, center: centre});

  const placeMarker = function(marker) {
    new google.maps.Marker({position: marker, map: map});
  };

  markerPoints.forEach((element, index) => {
    const marker = {lat: element.latitude, lng: element.longitude};
    placeMarker(marker, index);
    bounds.extend(marker);
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
      console.log(coords, value);
      initMap(coords, value);
    });



});
