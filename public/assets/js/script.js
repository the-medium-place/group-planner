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
      password: passwordInput
    }
    $.ajax({
      url: "/login",
      method: "POST",
      data: userLogin

    }).then(function (results) {

      window.location.href = "/view-events";
    })
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
    if (checkPass===false){
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
      phone: newPhone
    }
    
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
    if (checkPass===false){
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
      phone: newPhone
    }
    
    // SEND POST REQUEST TO API-ROUTES PAGE
    $.ajax({
      url: "/signup",
      method: "PUT",
      data: invitedAccount
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
      date_time: `${eventDate} ${eventTime}`
    }
    // console.log(newEvent)
    // console.log(document.cookie);

    $.ajax({
      // LOGIN SENT AS POST SO THAT OBJECT CAN BE SENT 
      // (GET CANNOT ACCEPT OBJECT - 
      // NOT SECURE AS IT WOULD NEED TO SEND THROUGH URL)
      url: "/api/events",
      method: "POST",
      data: newEvent
    }).then(() => {
      location.href = "/view-events";

    })
  });
});


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
  if ((newDate) && (newTime)) {
    updateObj.date_time = `${newDate} ${newTime}`;
  }

  $.ajax({
    url: "/api/events/:id",
    method: "PUT",
    data: updateObj
  }).then((response) => {

  })


});


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
    data: collabObj
  }).then((response) => {


  })


});
