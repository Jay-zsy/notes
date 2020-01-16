$(() => {
  //load comments

  // $.ajax({
  //   method: "GET",
  //   url: "/api/users"
  // }).done((users) => {
  //   for(user of users) {
  //     $("<div>").text(user.name).appendTo($("body"));
  //   }
  // });
  // $(".fa-trash-alt").click(function() {
  //   console.log(this.id);
  //   $.ajax({
  //     method: "POST",
  //     url: `/api/resources/delete/${this.id}`}).done();
  // });

  //edit profile pages
  $("#edit-name").click(function() {
    $(".user-name-input").toggle(400);
  });
  $("#edit-email").click(function() {
    $(".user-email-input").toggle(400);
  });
  $("#edit-password").click(function() {
    $(".user-password-input").toggle(400);
  });
});
