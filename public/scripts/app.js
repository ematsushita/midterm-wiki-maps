$(document).ready(function() {

  const createTableRow = function(row) {
    const $title = $("<h6>")
      .text(row.title);

    const $titleCell = $("<td>")
      .append($title);

    const $heart = $("<i>")
      .addClass("fas fa-heart");

    const $heartCell = $("<td>")
      .append($heart);

    const $button = $("<a>")
      .html("View")
      .attr("href", `/lists/${row.id}`)
      .addClass("btn btn-purple text-white my-2");

    const $buttonCell = $("<td>")
      .append($button)

    const $row = $("<tr>")
      .addClass("list-item")
      .append($titleCell, $heartCell, $buttonCell);

    return $row;
  };

  const renderTableItems = function(lists, container) {
    for (const list of lists) {
      const $newPoint = createTableRow(list);
      container.append($newPoint);
    }
  };

  const loadTableItems = function(container, path) {
    container.empty();
    $.get("/lists", (data) => {
      renderTableItems(data[path], container);
    });
  };


  //Loop through lists to render on homepage
  const paths = ["favs", "myMaps", "myContributions", "allMaps"]
  const containers = [$("#favs-container"), $("#my-maps-container"), $("#my-contributions-container"), $("#all-maps-container") ]

  for (let i=0; i < paths.length; i++) {
    loadTableItems(containers[i], paths[i])
  };


  // Creat new map form slides down
  $(".create-map-dropdown").click(function() {
    $(".submit-new-list").slideToggle()
    $("#down-arrow").css({"display": "none"})
    $("#up-arrow").css({"display": "block"});
  });

});


