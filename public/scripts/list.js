$(document).ready(function() {

  const setListAttr = function() {
    $.get(`/lists/${listId}/attributes`, function(data) {
      $("#list-title").text(data.title);
      $("#list-desc").text(data.description);
    });
  };

  setListAttr();


  const buildEditForm = function () {
    const form = `
    <div class=“update-point-form my-3" id=”edit-form-${i}>
      <form class="update-point" action="/points/<%= list.id %>/update/<%=point.id%>“ method="POST">

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
    `
    return form;
  }


  const displayPoints = function(data) {
    const $table = $("#points-table-body");
    $table.empty();
    console.log(data);

    for (let i = 0; i < data.length; i++) {
      $table.append(`<tr id=list-item-${i}>`);
      const $tableRow = $table.last();

      console.log($tableRow);

      $tableRow.append(`<td>${data[i].title}</td>`);
      $tableRow.append(`<td><button class="edit-point btn btn-purple text-white my-2">Edit</button></td>`);
      $tableRow.append(`<td><a href=""><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></a></td>`);

      $table.append("</tr>");
    }
  };

  displayPoints(getPoints());

  //post request to create a new point
  $(".new-point").submit(function(event) {
    event.preventDefault();
    const serialData = $(this).serialize();
    const post_url = $(this).attr("action");

    $.post(post_url, serialData, () => {
      displayPoints();
      $(".new-point")[0].reset();
      $(".add-new-point").slideUp();

    })
  });


})
