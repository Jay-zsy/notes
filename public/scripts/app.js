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
    if ($(this).hasClass("far")) {
      $.ajax({
        method: "POST",
        url: `/api/resources/${this.id}/likes`
      }).done(data => {
        $(`#${this.id}`).text(data.number_of_likes);
        $(`#${this.id}`)
          .removeClass("far")
          .addClass("fas");
      });
    } else if ($(this).hasClass("fas")) {
      $.ajax({
        method: "POST",
        url: `/api/resources/${this.id}/likes/delete`
      }).done(data => {
        $(`#${this.id}`).text(data.number_of_likes);
        $(`#${this.id}`)
          .removeClass("fas")
          .addClass("far");
      });
    }
  });
});
