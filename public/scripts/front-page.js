$(document).ready(function() {

  //toggle pos alters the visible state of favourites by adding or removing them from lists based on user input
  const togglePos = function(row) {
    const $rows = $(`.card-container-${row.id}`);
    const $row1 = $rows[0];

    if ($rows.length > 1) {
      $row1.remove();
    } else {
      const $newRow = $rows.clone(true).hide();
      $newRow.children().removeClass("show");

      console.log($newRow);

      const $newRowHeader = $newRow.children().first();
      $newRowHeader.attr("id", `heading-favs-${row.id}`);

      const $newRowBody = $newRowHeader.next();
      $newRowBody.attr("id", `collapse-favs-${row.id}`);
      $newRowBody.attr("aria-labelledby", `heading-favs-${row.id}`);
      $newRowBody.attr("data-parent", `#favs-accordion`);

      const $newRowHeadingContainer = $newRowHeader.children().first().next();
      $newRowHeadingContainer.attr("data-target", `#collapse-favs-${row.id}`);
      $newRowHeadingContainer.attr("aria-controls", `collapse-favs-${row.id}`);


      const $newRowHeading = $newRowHeadingContainer.children().first();
      const $upArrow = $newRowHeading.children().first().next();
      const $downArrow = $upArrow.next();

      $upArrow.attr("id", `up-arrow-favs-${row.id}`);
      $downArrow.attr("id", `down-arrow-favs-${row.id}`);

      $newRowHeadingContainer.off();
      $newRowHeadingContainer
        .on("click", () => {
          arrowToggle($upArrow);
          arrowToggle($downArrow);
        });

      $newRow.appendTo($("#favs-accordion"));
      $newRow.slideDown("slow");
    }
  };

  const createAccordionCard = function(card, index, path, container) {

    const $card = $('<div>')
      .addClass("card")
      .addClass(`card-container-${card.id}`);

    const $cardHeader = $("<div>")
      .addClass("card-header")
      .addClass("py-1")
      .addClass("d-flex")
      .addClass("justify-content-between")
      .addClass("align-items-center")
      .attr('id', `heading-${path}-${card.id}`)
      .appendTo($card);

    const $favBadge = $('<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>')
      .appendTo($cardHeader)
      .addClass(`heart-icon-${card.id}`)
      .on("click", () => {
        toggleFav(card.id, card.owner_id);
        togglePos(card);
      });

    if (card.fave_id) $favBadge.addClass("favourited-heart");

    const $leftHeadingWrap = $("<div>")
      .addClass("flex-grow-1")
      .attr('data-toggle', 'collapse')
      .attr('data-target', `#collapse-${path}-${card.id}`)
      .attr('aria-expanded', 'true')
      .attr('aria-controls', `collapse-${path}-${card.id}`)
      .appendTo($cardHeader)
      .on("click", () => {
        const $upArrow = $(`#up-arrow-${path}-${card.id}`);
        const $downArrow = $(`#down-arrow-${path}-${card.id}`);
        arrowToggle($upArrow);
        arrowToggle($downArrow);
      });

    const $cardHeading = $("<h2>")
      .addClass("mb-0")
      .addClass("d-flex")
      .addClass("align-items-center")
      .appendTo($leftHeadingWrap);

    const $cardButton = $("<button>")
      .addClass("btn")
      .addClass("btn-link")
      .addClass("collapsed")
      .addClass("card-title")
      .attr('type', 'button')
      .text(card.title)
      .appendTo($cardHeading);

    const $upArrow = $(`<svg id="up-arrow-${path}-${card.id}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-up up-arrow"><polyline points="18 15 12 9 6 15"></polyline></svg>`)
      .addClass("ml-auto")
      .addClass("mr-3")
      .appendTo($cardHeading);

    const $downArrow = $(`<svg id="down-arrow-${path}-${card.id}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down down-arrow"><polyline points="6 9 12 15 18 9"></polyline></svg>`)
      .addClass("ml-auto")
      .addClass("mr-3")
      .appendTo($cardHeading);

    const $rightHeadingWrap = $("<div>")
      .appendTo($cardHeader);

    const $viewButton = $("<a>")
      .html("View")
      .attr("href", `/lists/${card.id}`)
      .addClass("btn btn-purple text-white my-2")
      .appendTo($rightHeadingWrap);

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
    const containers = [$("#favs-accordion"), $("#myMaps-accordion"), $("#myContributions-accordion"), $("#other-accordion") ];

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
});


