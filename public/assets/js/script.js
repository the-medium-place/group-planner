console.log("connected");
// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
  $("#login").on("submit", function(){
    const username = $("#username").val();
    const password = $("#password").val();

    const userLogin = {
      username,
      password
    }

    console.log(userLogin)

    // $.ajax()
  });

  $("#newAccount").on("submit", function(){
    const newUser = $("#new-user").val();
    const newPass = $("#new-pass").val();
    const newPassConfirm = $("#new-pass-confirm").val();
    const newEmail = $("#new-email").val();
    const newPhone = $("#new-phone").val();

    const newAccount = {
      username: newUser,
      password: newPass,
      confirm: newPassConfirm,
      email: newEmail,
      phone: newPhone
    }

    console.log(newAccount)
  });


  /*
  $(".change-sleep").on("click", function (event) {
    var id = $(this).data("id");
    var newSleep = $(this).data("newsleep");

    var newSleepState = {
      sleepy: newSleep,
    };

    // Send the PUT request.
    $.ajax("/api/cats/" + id, {
      type: "PUT",
      data: newSleepState,
    }).then(function () {
      console.log("changed sleep to", newSleep);
      // Reload the page to get the updated list
      location.reload();
    });
  });

  $(".create-form").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newCat = {
      name: $("#ca").val().trim(),
      sleepy: $("[name=sleepy]:checked").val().trim(),
    };

    // Send the POST request.
    $.ajax("/api/cats", {
      type: "POST",
      data: newCat,
    }).then(function () {
      console.log("created new cat");
      // Reload the page to get the updated list
      location.reload();
    });
  });

  $(".delete-cat").on("click", function (event) {
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/cats/" + id, {
      type: "DELETE",
    }).then(function () {
      console.log("deleted cat", id);
      // Reload the page to get the updated list
      location.reload();
    });
  });


  */
});
