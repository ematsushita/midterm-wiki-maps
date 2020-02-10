const initMap = function(mapBounds, markerPoints) {
  const bounds = new google.maps.LatLngBounds(mapBounds[0], mapBounds[1]);
  const centre = bounds.getCenter();

  const map = new google.maps.Map(document.getElementById('map'), {zoom: 10, center: centre});

  // for (let i = 0; i < markerPoints.length; i++) {
  //   markers[i] = new google.maps.Marker({position: markerPoints[i], map: map});
  //   bounds.extend(markers[i]);
  // }

  map.fitBounds(bounds, 5);

  const autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'));
};

$(document).ready(function() {

  const setListAttr = function() {
    $.get(`/lists/${listId}/attributes`, function(data) {
      $("#list-title").text(data.title);
      $("#list-desc").text(data.description);
    });
  };

  setListAttr();

  //the coords array will be passed to the initMap function
  const coords = [
    {lat: 49, lng: -123},
    {lat: 50, lng: -122}
  ];

  initMap(coords, []);


  //post request to create a new point
  $(".new-point").submit(function(event) {
    event.preventDefault();
    const serialData = $(this).serialize();
    const post_url = $(this).attr("action");

    $.post(post_url, serialData, () => {
      $(".table").append()
    })
  })

});