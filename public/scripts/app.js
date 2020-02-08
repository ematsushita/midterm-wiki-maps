$(document).ready(function() {

});

function initMap() {
  const lhl = {lat: 49.281228, lng: -123.114669};
  const map = new google.maps.Map(document.getElementById('map'), {zoom: 8, center: lhl});
  const marker = new google.maps.Marker({position: lhl, map: map});
}
