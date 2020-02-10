const getQuery = function() {

  //select the search box
  const $searchBox = $("div>div>input");

  //This object is what the search API uses to process a search
  return {
    query: $searchBox.val(),
    fields: ['name', 'geometry']
  };
};



/*
const placeMarkersFromQuery = function() {
  const request = getQuery();

  const service = new google.maps.places.PlacesServices(map);

  service.findPlaceFromQuery(request, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
      map.setCenter(results[0].geometry.location);
    }
  });
};

*/
$(document).ready(function() {


  /*
  const $searchBox = $("form>div>div");

  $searchBox.click(getQuery());
  */
});
