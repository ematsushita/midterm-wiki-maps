const getQuery = function() {

  //select the search box
  const $searchBox = $("div>div>input");

  //This object is what the search API uses to process a search
  return {
    query: $searchBox.val(),
    locationBias: mapCentre,
    fields: ['name', 'geometry']
  };
};

const placeSearchResult = function(marker) {
  const newMarker = new google.maps.Marker({position: marker.geometry.location, map: map});
  return newMarker;
};

const search = function() {
  service.findPlaceFromQuery(getQuery(), function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {
        placeSearchResult(results[i]);
      }
      map.setCenter(results[0].geometry.location);
    }
  });
};

$(document).ready(function() {

  const $searchBox = $("#search-button");
  $searchBox.click(() => {
    search();
  });
});
