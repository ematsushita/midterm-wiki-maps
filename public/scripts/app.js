$(document).ready(function() {

  const createTableRow = function(row) {
    const $title = $("<h6>")
      .text(row.title);

    const $heart = $("<i>")
      .addClass("fas fa-heart");

    const $button = $("<button>")
      .attr("value", "View")
      .attr("href", `/lists/${row.id}`);

    const $article = $("<article>")
      .addClass("list-item")
      .append($title, $heart, $button);

    return $article;
  };

  const renderTableItems = function(lists, container) {
    for (const list of lists) {
      const $newPoint = createTableRow(list);
      container.append($newPoint);
    }
  };

  const loadTableItems = function(container) {
    container.empty();
    $.get("/lists", (data) => {
      console.log(data);
      renderTableItems(data.favs, container);
    });
  };

  const $favsContainer = $("#favs-container");
  loadTableItems($favsContainer);

});

$("#create-map-button").click(function() {
  $("#new-map").slideToggle(500);
});


