// console.log("connected");
// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
  $("#login").on("submit", function () {
    const username = $("#username").val();
    const password = $("#password").val();

    const userLogin = {
      username,
      password
    }

    console.log(userLogin)

    // $.ajax()
  });

  $("#newAccount").on("submit", function (event) {
    event.preventDefault();
    const newUser = $("#new-user").val().trim();
    const newFirst = $("#new-first").val().trim();
    const newLast = $("#new-last").val().trim();
    
    const newPass = $("#new-pass").val().trim();
    // const newPassConfirm = $("#new-pass-confirm").val().trim();
    const newEmail = $("#new-email").val().trim();
    const newPhone = $("#new-phone").val().trim();

    const newAccount = {
      username: newUser,
      first_name: newFirst,
      last_name: newLast,
      password: newPass,
      // confirm: newPassConfirm,
      email: newEmail,
      phone: newPhone
    }
    console.log(newAccount);

    // check if password matches confirm value
    // if yes send data request
    // if no alert/modal

    $.ajax({
      url: "/signup",
      method: "POST",
      data: newAccount
    }).then((response) => {
      console.log(response);
      window.location.replace("/view-events");

    })

  });

  $("#create-event").on("submit", function () {
    const eventName = $("#event-name").val();
    const eventDate = $("#event-date").val();
    const invitees = $("#invitees").val();

    const newEvent = {
      eventName,
      eventDate,
      invitees
    }

    console.log(newEvent)

    // $.ajax()
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
