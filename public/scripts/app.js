$(() => {
  // $.ajax({
  //   method: "GET",
  //   url: "/api/users"
  // }).done((users) => {
  //   for(user of users) {
  //     $("<div>").text(user.name).appendTo($("body"));
  //   }
  // });
  $(".far").click(function() {
    $.ajax({
      method: "POST",
      url: `/api/resources/${this.id}/likes`
    }).done(data => {
      $(`#${this.id}`).text(data.number_of_likes);
      $(`#${this.id}`)
        .removeClass("far")
        .addClass("fas");
    });
  });

  $(".fas").click(function() {
    $.ajax({
      method: "POST",
      url: `/api/resources/${this.id}/likes/delete`
    }).done(data => {
      $(`#${this.id}`).text(data.number_of_likes);
      $(`#${this.id}`)
        .removeClass("fas")
        .addClass("far");
    });
  });
});
