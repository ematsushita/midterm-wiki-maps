$(document).ready(function() {

  // toggleFav toggles the favourite status of a list in the db when the user clicks the heart
  // it also changes the display of the heart
  const toggleFav = function(listId, userId) {
    return $.post(`/favourites/${listId}`, `userId=${userId}`, () => {})
      .then((res) => {
        const favIcon = $('.list-item[data-list-id="' + listId + '"] > td > svg');
        favIcon.toggleClass("favourited-heart");
        return res;
      });
  };

  const togglePos = function(row) {
    const $rows = $(`[data-list-id="${row.id}"]`);
    if ($rows.length > 1) {
      console.log("I should get removed)");
      $rows[0].remove();
    } else {
      console.log("I should be added to favs");
      const $newRow = $rows.first().clone(true).hide();
      $newRow.appendTo($("#favs-container"));
      $newRow.slideDown("slow");
    }
  };

  const createTableRow = function(row) {

    const $title = $("<h6>")
      .text(row.title);

    const $titleCell = $("<td>")
      .addClass("align-middle")
      .append($title);

    const $heart = $('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>')
      .on("click", () => {
        toggleFav(row.id, row.owner_id);
        togglePos(row);
      });

    if (row.fave_id) $heart.addClass("favourited-heart");

    const $heartCell = $("<td>")
      .addClass("align-middle")
      .append($heart);

    const $button = $("<a>")
      .html("View")
      .attr("href", `/lists/${row.id}`)
      .addClass("btn btn-purple text-white my-2");

    const $buttonCell = $("<td>")
      .addClass("align-middle")
      .append($button);

    const $row = $(`<tr data-list-id="${row.id}">`)
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

  const renderTables = function() {
    //Loop through lists to render on homepage
    const paths = ["favs", "myMaps", "myContributions", "allMaps"];
    const containers = [$("#favs-container"), $("#my-maps-container"), $("#my-contributions-container"), $("#all-maps-container") ];

    for (let i = 0; i < paths.length; i++) {
      loadTableItems(containers[i], paths[i]);
    }
  };

  renderTables();

  //Toggles the arrow in the new list form
  const arrowToggle = function(el) {
    (el.css("display") === "none")
      ? el.css("display", "inline-block")
      : el.css("display", "none");
  };

  // Create new map form slides down
  $("#new-list-form-toggler").click(function() {
    $(".submit-new-list").slideToggle();
    arrowToggle($("#down-arrow"));
    arrowToggle($("#up-arrow"));
  });

  $(".add-point-dropdown").click(function(event) {
    event.preventDefault();
    $(".add-new-point").slideToggle();
  });

});


