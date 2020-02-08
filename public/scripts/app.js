$(document).ready(function() {

  const createTableItem = function(obj){
    const $title = $("<h6>")
    .text(obj.title);

    const $heart = $("<i>")
    .addClass("fas fa-heart");

    const $button = $("<button>")
    .attr("value", "View")
    .attr("href", `/lists/${obj.id}`);

    const $article = $("<article>")
    .addClass("list-item")
    .append($title, $heart, $button);

    return $article;
  }

  const renderTableItems = function(data, containerId) {
    for (const item of data) {
      const $newPoint = createTableItem(item)
    $(`#${containerId}`).append($newPoint)
    }
  }

  const loadTableItems = function(containerId) {
    $(`#${containerId}`).empty();
    $.get("/lists", (data) => {
      JSON.parse(data);
      renderTableItems(data);
    })
  }

  loadTableItems();

});

$("#create-map-button").click(function() {
  $("#new-map").slideToggle(500)
})


