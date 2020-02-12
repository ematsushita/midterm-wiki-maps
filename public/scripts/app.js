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

  //toggle pos alters the visible state of favourites by adding or removing them from lists based on user input
  const togglePos = function(row) {
    const $rows = $(`[data-list-id="${row.id}"]`);

    if ($rows.length > 1) {
      $rows[0].remove();
    } else {
      const $newRow = $rows.first().clone(true).hide();
      $newRow.appendTo($("#favs-container"));
      $newRow.slideDown("slow");
    }
  };

  const createAccordionCard = function(card, index, path, container) {

    const $card = $('<div>')
      .addClass("card")
      .addClass("");

    const $cardHeader = $("<div>")
      .addClass("card-header")
      .addClass("py-1")
      .addClass("d-flex")
      .addClass("justify-content-between")
      .addClass("align-items-center")
      .attr('id', `heading-${path}-${card.id}`)
      .appendTo($card);

    const $leftHeadingWrap = $("<div>")
      .appendTo($cardHeader);

    const $cardHeading = $("<h2>")
      .addClass("mb-0")
      .appendTo($leftHeadingWrap);

    const $favBadge = $('<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>')
      .appendTo($cardHeading)
      .on("click", () => {
        toggleFav(card.id, card.owner_id);
        togglePos(card);
      });

    if (card.fave_id) $favBadge.addClass("favourited-heart");

    const $cardButton = $("<button>")
      .addClass("btn")
      .addClass("btn-link")
      .addClass("collapsed")
      .attr('type', 'button')
      .attr('data-toggle', 'collapse')
      .attr('data-target', `#collapse-${path}-${card.id}`)
      .attr('aria-expanded', 'true')
      .attr('area-controls', `collapse-${path}-${card.id}`)
      .text(card.title)
      .appendTo($cardHeading);

    const $rightHeadingWrapper = $("<div>")
      .appendTo($cardHeader);

    const $upArrow = $(`<svg id="up-arrow-${path}-${card.id}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-up"><polyline points="18 15 12 9 6 15"></polyline></svg>`)
      .appendTo($rightHeadingWrapper);

    const $downArrow = $(`<svg id="down-arrow-${path}-${card.id}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>`)
      .appendTo($rightHeadingWrapper);

    const $viewButton = $("<a>")
      .html("View")
      .attr("href", `/lists/${card.id}`)
      .addClass("btn btn-purple text-white my-2")
      .appendTo($rightHeadingWrapper);

    const $cardBodyWrapper = $("<div>")
      .attr('id', `collapse-${path}-${card.id}`)
      .addClass("collapse")
      //.addClass("show")
      .attr("aria-labelledby", `heading-${path}-${card.id}`)
      .attr("data-parent", `#${container[0].id}`)
      .appendTo($card);

    const $cardBody = $("<div>")
      .addClass("card-body")
      .text(card.description)
      .appendTo($cardBodyWrapper);

    return $card;
  };

  const renderAccordion = (lists, path, container) => {
    for (let i = 0; i < lists.length; i++) {
      const $newPoint = createAccordionCard(lists[i], i, path, container);
      container.append($newPoint);
    }
  };

  const loadTableItems = function(container, path) {
    container.empty();
    $.get("/lists", (data) => {
      renderAccordion(data[path], path, container);
    });
  };

  const renderTables = function() {
    //Loop through lists to render on homepage
    const paths = ["favs", "myMaps", "myContributions", "allMaps"];
    const containers = [$("#favs-accordion"), $("#my-maps-container"), $("#my-contributions-container"), $("#all-maps-container") ];

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


