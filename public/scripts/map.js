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

  const displayPoints = function() {
    $.get(`/points/${listId}`, function(data) {
      const $table = $("#points-table-body");

      console.log(data);

      for (let i = 0; i < data.length; i++) {
        $table.append(`<tr id=list-item-${i}>`);
        const $tableRow = $table.last();

        console.log($tableRow);

        $tableRow.append(`<td>${data[i].title}</td>`);
        $tableRow.append(`<td><a href="">edit</a></td>`);
        $tableRow.append(`<td><a href=""><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></a></td>`);

        $table.append("</tr>");
      }
    });
  };

  displayPoints();

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
