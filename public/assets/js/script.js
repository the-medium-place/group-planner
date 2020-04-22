// console.log("connected");
// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
  $("#login").on("submit", function (event) {
    event.preventDefault();

    const usernameInput = $("#username").val().trim();
    const passwordInput = $("#password").val().trim();

    const userLogin = {
      username: usernameInput,
      password: passwordInput
    }

    console.log(userLogin)

    $.ajax({
      url: "/login",
      method: "POST",
      data: userLogin
    })
  });

  $("#newAccount").on("submit", function (event) {
    event.preventDefault();

    // CAPTURE USER INPUT
    const newUser = $("#new-user").val().trim();
    const newFirst = $("#new-first").val().trim();
    const newLast = $("#new-last").val().trim();
    
    const newPass = $("#new-pass").val().trim();
    // const newPassConfirm = $("#new-pass-confirm").val().trim();
    const newEmail = $("#new-email").val().trim();
    const newPhone = $("#new-phone").val().trim();

    // CREATE OBJECT OF USER INPUT
    const newAccount = {
      username: newUser,
      first_name: newFirst,
      last_name: newLast,
      password: newPass,
      // confirm: newPassConfirm,
      email: newEmail,
      phone: newPhone
    }

    // check if password matches confirm value
    // if yes send data request
    // if no alert/modal

    // SEND POST REQUEST TO API-ROUTES PAGE
    $.ajax({
      url: "/signup",
      method: "POST",
      data: newAccount
    }).then(() => {
      // CREATE OBJECT OF USERNAME/PASSWORD FOR LOGIN REQUEST
      const newObj = {
        username: newUser,
        password: newPass
      };
      $.ajax({
        // LOGIN SENT AS POST SO THAT OBJECT CAN BE SENT (GET CANNOT ACCEPT OBJECT - NOT SECURE AS IT WOULD NEED TO SEND THROUGH URL)
        url: "/login",
        method: "POST",
        data: newObj
      }).then(() => {
        location.href = "/view-events";
      })

      
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
