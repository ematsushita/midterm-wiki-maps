$(document).ready(function() {

  //Post request to create a new point
  $(".new-point").submit(function(event) {
    event.preventDefault();
    const serialData = $(this).serialize();
    const postUrl = $(this).attr("action");

    $.post(postUrl, serialData, () => {
      $(".new-point")[0].reset();
      $(".add-new-point").slideUp();
      getPoints()
        .then(value => {
          clearMarkers(activePoints);
          clearMarkers(tempPoints);
          placeMarkersPoints(value[0]);
          displayPoints(value[0], value[1]);
        });
    });
  });

  //Function to send post request to edit point data when Update button is clicked
  const updatePointForm = function(url, data) {
    $.post(url, data, () => {
      getPoints()
        .then(value => {
          clearMarkers(activePoints);
          placeMarkersPoints(value[0]);
          displayPoints(value[0], value[1]);
        });
    });
  };

  const toggleEditForm = (pointId, i) => {
    const $card = $(`#point-card-${pointId}`);

    const $editButton = $card.find(".edit-button-container");
    const $notEditFields = $card.find(".point-not-editable");
    const $editFields = $card.find(".point-editable");

    if ($notEditFields.length) {
      $notEditFields.removeClass("point-not-editable");
      $notEditFields.removeAttr("readonly");
      $notEditFields.addClass("point-editable");

      const $urlField = $notEditFields.first();
      $urlField.slideDown();

      $editButton.empty();
      const $editIcon = $(`<svg id='edit-btn-${pointId}' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-square"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>`)
        .addClass("editButton")
        .click(() => {
          const newTitle = $(`#visible-card-title-${pointId}`).html();
          $(`#hidden-card-title-${pointId}`).val(newTitle);

          toggleEditForm(pointId);
        });
      $editButton.append($editIcon);

    } else {
      $editFields.removeClass("point-editable");
      $editFields.attr("readonly", true);
      $editFields.addClass("point-not-editable");

      const $urlField = $notEditFields.find($("[name='imgUrl']"));
      $urlField.hide();

      $editButton.empty();
      const $editIcon = $(`<svg id='edit-btn-${pointId}' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`)
        .addClass("editButton")
        .click(() => {
          toggleEditForm(pointId);
        });
      $editButton.append($editIcon);

      $;

      const data = $card.find($('.update-point')).serialize();

      console.log($('.update-point'));
      const url = $(`#point-card-${pointId} .update-point`).attr("action");

      console.log("url: ", url, "data: ", data);

      updatePointForm(url, data);
    }
  };

  //Function to send delete post request when delete button is clicked
  const deletePointButton = function(i) {
    event.preventDefault();
    const postUrl = $(`#delete-btn-${i}`).attr("action");
    $.post(postUrl, () => {
      getBounds();
      getPoints()
        .then(value => {
          clearMarkers(activePoints);
          placeMarkersPoints(value[0]);
          displayPoints(value[0], value[1]);
        });
    });
  };

  //Fetches the Map List Attributes (title, desc, likes, favourite status)
  const setListAttr = function() {
    $.get(`/lists/${listId}/attributes`, function(data) {
      $("#list-title").text(data.title);
      $("#list-desc").text(data.description);
      const $heartIcon = $(".heart-icon");
      if (data.fave_id) $heartIcon.addClass("favourited-heart");

      //adds toggler to heart icon
      $heartIcon
        .on("click", () => {
          const $mapFavIcon = $('.heart-icon');
          $mapFavIcon.toggleClass("favourited-heart");
          return toggleFav(listId, data.owner_id);
        });
    });
  };

  setListAttr();

  //Function to loop through array of Points objects and display them in a table
  const displayPoints = function(data, userId) {
    const $list = $("#point-card-list");
    $list.empty();

    for (let i = 0; i < data.length; i++) {

      const $newCard = $("<div>")
        .attr("id", `point-card-${data[i].id}`)
        .addClass("card")
        .appendTo($list);

      const $cardImg = $("<img>")
        .addClass("card-img-top")
        .attr("src", data[i].img_url)
        .attr("alt", `Image from ${data[i].title}`)
        .appendTo($newCard);

      const $cardBody = $("<div>")
        .addClass("card-body")
        .appendTo($newCard);

      if (userId) {

        const $delButtonContainer = $("<div>")
          .addClass("delButtonContainer")
          .addClass("position-absolute")
          .addClass("d-flex")
          .addClass("justify-content-center")
          .addClass("align-items-center")
          .appendTo($newCard);

        const $delButtonBacking = $("<div>")
          .addClass("delButtonBacking")
          .addClass("d-flex")
          .addClass("justify-content-center")
          .addClass("align-items-center")
          .appendTo($delButtonContainer);

        const $delButton = $(`<svg id='delete-btn-${data[i].id}' action="/points/${data[i].list_id}/remove/${data[i].id}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`)
          .appendTo($delButtonBacking)
          .addClass("text-danger")
          .addClass("delButton")
          .click(() => {
            deletePointButton(data[i].id);
          });
      }

      const $editForm = $("<form>")
        .addClass("update-point")
        .attr("type", "submit")
        .attr("action", `/points/${data[i].list_id}/update/${data[i].id}`)
        .appendTo($cardBody);

      if (userId) {

        const $editButton = $("<div>")
          .addClass("edit-button-container")
          .appendTo($cardBody);

        const $editIcon = $(`<svg id='edit-btn-${data[i].id}' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`)
          .addClass("editButton")
          .appendTo($editButton)
          .click(() => {
            toggleEditForm(data[i].id, i);
          });
      }

      const $cardUrl = $("<input>")
        .attr("readonly", true)
        .val(data[i].img_url)
        .attr("name", "imgUrl")
        .addClass("point-not-editable")
        .css("display", "none")
        .css("width", "100%")
        .css("padding", "2px")
        .css("margin-bottom", "0.85rem")
        .appendTo($editForm);

      const $hiddenCardTitle = $("<input>")
        .attr("name", "title")
        .attr("id", `hidden-card-title-${data[i].id}`)
        .text(data[i].title)
        .css("display", "none")
        .appendTo($editForm);

      const $cardTitle = $("<h3>")
        .attr("id", `visible-card-title-${data[i].id}`)
        .attr("readonly", true)
        .attr("contenteditable", true)
        .text(data[i].title)
        .addClass("card-title")
        .addClass("point-not-editable")
        .appendTo($editForm);

      autosize($cardTitle);

      const $cardDesc = $("<textarea>")
        .attr("readonly", true)
        .text(data[i].description)
        .attr("name", "description")
        .css("width", "100%")
        .css("resize", "none")
        .addClass("card-text")
        .addClass("point-not-editable")
        .appendTo($editForm);

      autosize($cardDesc);
    }
  };

  //Run this function to display the table
  getPoints()
    .then(value => {
      if (value[0].length) {
        displayPoints(value[0], value[1]);
      }
    });
});
