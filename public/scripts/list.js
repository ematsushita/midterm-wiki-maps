$(document).ready(function() {

  const setListAttr = function() {
    $.get(`/lists/${listId}/attributes`, function(data) {
      $("#list-title").text(data.title);
      $("#list-desc").text(data.description);
    });
  };

  setListAttr();

  const editPointForm = function() {
    const form = `
    <section class="edit-point">
      <form class="edit-point-form" action="/points/<%= list.id %>/add" type="submit">
        <div class="form-group">
          <label class="form-header">Title</label>
          <input required name="title" type="text" class="form-control" placeholder="Title">
        </div>
        <div class="form-group">
          <label class="form-header">Description</label>
          <textarea required name="description" class="form-control" placeholder="Description"></textarea>
        </div>
        <form>
            <button class="btn btn-purple text-white my-2">Update Point!</button>
        </form>
      </form>
    `
    return form;
  }

  const displayPoints = function() {
    $.get(`/points/${listId}`, function(data) {
      const $table = $("#points-table-body");
      $table.empty();
      console.log(data);

      for (let i = 0; i < data.length; i++) {
        $table.append(`<tr id=list-item-${i}>`);
        const $tableRow = $table.last();

        console.log($tableRow);

        $tableRow.append(`<td>${data[i].title}</td>`);
        $tableRow.append(`<td><button class="btn btn-purple text-white my-2">Edit</button></td>`);
        $tableRow.append(`<td><a href=""><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></a></td>`);

        $table.append("</tr>");
      }
    });
  };

  displayPoints();

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
