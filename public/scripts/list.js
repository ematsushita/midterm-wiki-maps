$(document).ready(function() {

  const updatePointForm = function(formData, url) {
    console.log("clicked");
    console.log("updated");
    console.log("url: ", url);
    console.log("form data: ", formData);


    $.post(url, formData, () => {
      getPoints()
        .then(value => {
          displayPoints(value);
        });
    });
  };


  const setListAttr = function() {
    $.get(`/lists/${listId}/attributes`, function(data) {
      $("#list-title").text(data.title);
      $("#list-desc").text(data.description);

      //adds toggler to heart icon
      $(".heart-icon")
        .on("click", () => {
          const mapFavIcon = $('.heart-icon');
          mapFavIcon.toggleClass("favourited-heart");
          return toggleFav(listId, data.owner_id);
        });
    });
  };

  setListAttr();

  const buildEditForm = function(pointId) {

    const form = `
    <tr class="new-row">
    <td colspan="1">
    <div class=“update-point-form my-3">
      <form class="update-point" action="/points/${listId}/update/${pointId}" type="submit">

        <div class="form-group">
          <input required name="title" type="text" class="form-control" placeholder="Title">
        </div>

        <div class="form-group">
          <textarea required name="description" class="form-control" placeholder="Description"></textarea>
        </div>

        <div class=“update-point-button-container">
          <button class="btn btn-purple text-white my-2">Update!</button>
        </div>
      </form>
    </div>
    </td>
    </tr>
    `;
    return form;
  };

  const appendForm = function(form, i) {
    $(".new-row").remove();
    console.log($("#points-table-body tr").eq(i));
    $("#points-table-body tr").eq(i + 1).after(form);
    $(".update-point").submit((event) => {
      event.preventDefault();
      const serialData = $('.update-point').serialize();
      const post_url = $('.update-point').attr("action");

      updatePointForm(serialData, post_url);
    });
  };


  const displayPoints = function(data) {
    const $table = $("#points-table-body");
    $table.empty();

    for (let i = 0; i < data.length; i++) {
      $table.append(`<tr id=list-item-${i}>`);
      const $tableRow = $table.last();

      $tableRow.append(`<td>${data[i].title}</td>`);
      $tableRow.append(`<td><button id='edit-form-${i}' class="edit-point btn btn-purple text-white my-2">Edit</button></td>`);
      $(`#edit-form-${i}`).click(() => {
        appendForm(buildEditForm(data[i].id), i);
      });
      $tableRow.append(`<td><svg id='delete-btn-${i}' action="/points/${data[i].list_id}/remove/${data[i].id}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></td>`);
      $(`#delete-btn-${i}`).click(() => {
        event.preventDefault();
        const post_url = $(`#delete-btn-${i}`).attr("action");
        $.post(post_url, () => {
          getPoints()
          .then(value => {
            displayPoints(value);
          });
        })
      })
      $table.append("</tr>");
    }
  };


  getPoints()
    .then(value => {
      displayPoints(value);
    });

  //post request to create a new point
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
});
