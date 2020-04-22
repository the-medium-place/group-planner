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

    $.ajax({
      url: "/login",
      method: "POST",
      data: userLogin
    }).then(function(results){

      window.location.href = "/view-events";
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

  $("#create-event").on("submit", function (event) {
    event.preventDefault();

    const eventName = $("#event-name").val().trim();
    const eventDescription = $("#event-desc").val().trim();
    const eventLocation = $("#event-location").val().trim();
    const eventDate = $("#event-date").val().trim();
    const eventTime = $("#event-time").val().trim();
    console.log(eventDate + eventTime);


    const newEvent = {
      name: eventName,
      description: eventDescription,
      location: eventLocation,
      date_time: `${eventDate} ${eventTime}`
    }

    // console.log(newEvent)
    // console.log(document.cookie);

    $.ajax({
      // LOGIN SENT AS POST SO THAT OBJECT CAN BE SENT (GET CANNOT ACCEPT OBJECT - NOT SECURE AS IT WOULD NEED TO SEND THROUGH URL)
      url: "/api/events",
      method: "POST",
      data: newEvent
    }).then(() => {
      location.href = "/view-events";
    })
  });
});
