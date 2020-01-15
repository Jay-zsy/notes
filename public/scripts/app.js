$(() => {
  // $.ajax({
  //   method: "GET",
  //   url: "/api/users"
  // }).done((users) => {
  //   for(user of users) {
  //     $("<div>").text(user.name).appendTo($("body"));
  //   }
  // });
  $(".fa-heart").click(function() {
    $.ajax({
      method: "POST",
      url: `/api/resources/${this.id}/likes`
    }).done(data => {
      $(`#${this.id}`).empty();
      $(`#${this.id}`).text(data.number_of_likes);
    });
  });
});
