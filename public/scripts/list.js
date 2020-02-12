$(document).ready(function() {



  //Post request to create a new point
  $(".new-point").submit(function(event) {
    event.preventDefault();
    const serialData = $(this).serialize();
    const post_url = $(this).attr("action");

    $.post(post_url, serialData, () => {
      $(".new-point")[0].reset();
      $(".add-new-point").slideUp();
      getPoints()
        .then(value => {
          displayPoints(value);
        });

    });
  });

  //Function to send post request to edit point data when Update button is clicked
  const updatePointForm = function(url, data) {
    $.post(url, data, () => {
      getPoints()
        .then(value => {
          displayPoints(value);
        })
    });
  };

  //Function to append Edit Point button to table when Edit button is clicked
  const appendForm = function(form, i) {
    $(".new-row").remove();
    $("#points-table-body tr").eq(i + 1).after(form);
    $(".update-point").submit(function(event) {
      event.preventDefault();
      const data = $('.update-point').serialize();
      const url = $('.update-point').attr("action");

      updatePointForm(url, data)
    });
  };

  //Function to send delete post request when delete button is clicked
  const deletePointButton = function (i) {
    event.preventDefault();
        const post_url = $(`#delete-btn-${i}`).attr("action");
        $.post(post_url, () => {
          getBounds()
          getPoints()
          .then(value => {
            clearMarkers(activePoints)
            placeMarkersPoints(value)
            displayPoints(value)
          });
        })
  }

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

  const buildEditForm = function(point) {

    const $inputTitle = $("<input>")
      .addClass("form-control")
      .val(point.title)
      .attr("name", "title");
    const $titleForm = $("<div>")
      .addClass("form-group")
      .append($inputTitle);

    const $inputDescription = $("<textarea>")
      .attr("placeholder", "Description")
      .attr("name", "description")
      .val(point.description)
      .addClass("form-control");
    const $descriptionForm = $("<div>")
      .addClass("form-group")
      .append($inputDescription);

    const $inputImage = $("<input>")
      .addClass("form-control")
      .val(point.img_url)
      .attr("name", "imgUrl");
    const $imageForm = $("<div>")
      .addClass("form-group")
      .append($inputImage);

    const $button = $("<button>")
      .addClass("btn btn-purple text-white my-2")
      .html("Update!");

    const $buttonContainer = $("<div>")
      .addClass("update-point-button-container")
      .append($button);

    const $innerForm = $("<form>")
      .addClass("update-point")
      .attr("type", "submit")
      .attr("action", `/points/${listId}/update/${point.id}`)
      .append($titleForm, $descriptionForm, $imageForm, $buttonContainer);

    const $outerForm = $("<div>")
      .addClass("update-point-form my-3")
      .append($innerForm);

    const $tableCell = $("<td>")
      .attr("colspan", "3")
      .append($outerForm);

    const $tableRow = $("<tr>")
      .addClass("new-row")
      .append($tableCell);

    return $tableRow;
  };


  //Function to loop through array of Points objects and display them in a table
  const displayPoints = function(data) {
    console.log("Hello")
    const $table = $("#points-table-body");
    $table.empty();

    for (let i = 0; i < data.length+1; i++) {
      $table.append(`<tr id=list-item-${i}>`);
      const $tableRow = $table.last();

      $tableRow.append(`<td>${data[i].title}</td>`);
      $tableRow.append(`<td><button id='edit-form-${i}' class="edit-point btn btn-purple text-white my-2">Edit</button></td>`);
      $(`#edit-form-${i}`).click(() => {
        appendForm(buildEditForm(data[i]), i);
      });
      $tableRow.append(`<td><svg id='delete-btn-${i}' action="/points/${data[i].list_id}/remove/${data[i].id}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></td>`);
      $(`#delete-btn-${i}`).click(() => {
        deletePointButton(i);
      })
      $table.append("</tr>");
    }
  };

  //Run this function to display the table
  getPoints()
    .then(value => {
      displayPoints(value);
    });
});
