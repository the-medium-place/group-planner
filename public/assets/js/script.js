// console.log("connected");
// Make sure we wait to attach our handlers until the DOM is fully loaded.

$(function () {
  // Initiates post request to database to login
  // Attaches submit listener to the login form (not the button click)
  $("#login").on("submit", function (event) {
    event.preventDefault();
    const usernameInput = $("#username").val().trim();
    const passwordInput = $("#password").val().trim();
    const userLogin = {
      username: usernameInput,
      password: passwordInput,
    };
    $.ajax({
      url: "/login",
      method: "POST",
      data: userLogin,
    }).then(function (results) {
      window.location.href = "/view-events";
    });
  });

  // shows the create account form upon click
  $("#newaccBTN").on("click", () => {
    $("#newAccount").css("display", "block");
    // $("#openCreateForm").text("here:")
  });

  // Initiates post request to database to create an account
  // Attaches submit listener to the new account form (not the button click)
  $("#newAccount").on("submit", function (event) {
    event.preventDefault();
    // CAPTURE USER INPUT
    const newUser = $("#new-user").val().trim();
    const newFirst = $("#new-first").val().trim();
    const newLast = $("#new-last").val().trim();

    const newPass = $("#new-pass").val().trim();
    const newPassConfirm = $("#new-pass-confirm").val().trim();
    const newEmail = $("#new-email").val().trim();
    const newPhone = $("#new-phone").val().trim();

    // check if password matches confirm value
    // if yes send data request
    // if no alert/modal
    let checkPass = newPass === newPassConfirm ? true : false;
    if (checkPass === false) {
      alert("Passwords did not match, please try again");
      // location.reload();
      return;
    }

    // CREATE OBJECT OF USER INPUT
    const newAccount = {
      username: newUser,
      first_name: newFirst,
      last_name: newLast,
      password: newPass,
      email: newEmail,
      phone: newPhone,
    };

    // SEND POST REQUEST TO API-ROUTES PAGE
    $.ajax({
      url: "/signup",
      method: "POST",
      data: newAccount,
    }).then(() => {
      // CREATE OBJECT OF USERNAME/PASSWORD FOR LOGIN REQUEST
      const newObj = {
        username: newUser,
        password: newPass,
      };
      $.ajax({
        // LOGIN SENT AS POST SO THAT OBJECT CAN BE SENT (GET CANNOT ACCEPT OBJECT - NOT SECURE AS IT WOULD NEED TO SEND THROUGH URL)
        url: "/login",
        method: "POST",
        data: newObj,
      }).then(() => {
        location.href = "/view-events";
      });
    });
  });

  // Initiates put request to database to update an account associated with an email
  // Attaches submit listener to the new account form (not the button click)
  $("#invitedUser").on("submit", function (event) {
    event.preventDefault();
    // CAPTURE USER INPUT
    const newUser = $("#invited-user").val().trim();
    const newFirst = $("#invited-first").val().trim();
    const newLast = $("#invited-last").val().trim();
    const newPass = $("#invited-pass").val().trim();
    const newPassConfirm = $("#invited-pass-confirm").val().trim();
    // const newEmail = $("#new-email").val().trim();
    const newPhone = $("#invited-phone").val().trim();

    // check if password matches confirm value
    // if yes send data request
    // if no alert/modal
    let checkPass = newPass === newPassConfirm ? true : false;
    if (checkPass === false) {
      alert("Passwords did not match, please try again");
      // location.reload();
      return;
    }

    // CREATE OBJECT OF USER INPUT
    const invitedAccount = {
      username: newUser,
      first_name: newFirst,
      last_name: newLast,
      password: newPass,
      // email: newEmail,
      phone: newPhone,
    };

    // SEND POST REQUEST TO API-ROUTES PAGE
    $.ajax({
      url: "/signup",
      method: "PUT",
      data: invitedAccount,
    }).then(() => {
      // CREATE OBJECT OF USERNAME/PASSWORD FOR LOGIN REQUEST
      const newObj = {
        username: newUser,
        password: newPass,
      };
      $.ajax({
        // LOGIN SENT AS POST SO THAT OBJECT CAN BE SENT (GET CANNOT ACCEPT OBJECT - NOT SECURE AS IT WOULD NEED TO SEND THROUGH URL)
        url: "/login",
        method: "POST",
        data: newObj,
      }).then(() => {
        location.href = "/view-events";
      });
    });
  });

  // Initiates post request to database to create an event
  // Attaches submit listener to the new account form (not the button click)
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
      date_time: `${eventDate} ${eventTime}`,
    };
    // console.log(newEvent)
    // console.log(document.cookie);

    $.ajax({
      // LOGIN SENT AS POST SO THAT OBJECT CAN BE SENT
      // (GET CANNOT ACCEPT OBJECT -
      // NOT SECURE AS IT WOULD NEED TO SEND THROUGH URL)
      url: "/api/events",
      method: "POST",
      data: newEvent,
    }).then((callback) => {
      location.href = "/view-events";
    });
  });

  $(".edit-event-button").on("click", function(){
    const eventToUpdate = $(this).attr("id");
    console.log(eventToUpdate);
    location.href = `/update-event/${eventToUpdate}`
    // $.ajax({
    //   url: `/api/events/${eventToUpdate}`,
    //   method: "GET"
    // }).then(function(err, data){
    //   if (err) throw err;
    //   console.log(data)
    //   render("update-event",data)
    // })
  })

  // update events submit
  $("#update-event").on("submit", (event) => {
    event.preventDefault();

    const updateObj = {};
    const newName = $("#new-name").val().trim();
    const newDesc = $("#new-desc").val().trim();
    const newLocation = $("#new-location").val().trim();
    const newDate = $("#new-date").val().trim();
    const newTime = $("#new-time").val().trim();
    updateObj.name = newName;
    updateObj.description = newDesc;
    updateObj.location = newLocation;
    if (newDate && newTime) {
      updateObj.date_time = `${newDate} ${newTime}`;
    }

    $.ajax({
      url: "/api/events/:id",
      method: "PUT",
      data: updateObj,
    }).then((response) => {});

    // add collab submit
    $("#add-collab").on("submit", (event) => {
      event.preventDefault();
      const collabObj = {};

      
      const newName = $("#new-name").val().trim();
      const newEmail = $("#new-email").val().trim();

      collabObj.new_name = newName;
      collabObj.email = newEmail;

      $.ajax({
        url: "/add-collab",
        method: "POST",
        data: collabObj,
      }).then((response) => {});
    });
  });
});


$('.timerSpan').each(function () {


  // capture event time
  const eventTime = $(this).data("countdown");
  var countDownDate = new Date(eventTime).getTime()
  console.log(eventTime);

  const countdownTimer = setInterval(() => {
    const now = new Date().getTime();
  
    // Find the distance between now and the count down date
    let distance = countDownDate - now;
  
    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  if (distance >= 0){
    $(this).text(days + "Days " + hours + "Hours "
    + minutes + "m " + seconds + "s ");

    // $(this).text(`${days} Days, `)

  } else {
    clearInterval(countdownTimer);
    $(this).text("PARTY TIME!!");   
  }


  }, 1000)

  // Nov 11, 2111 11:11 AM
});

