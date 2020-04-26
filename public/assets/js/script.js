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
  $(".update-form").on("submit", function(event) {
    event.preventDefault();
    const eventId = $(this).attr("id")
    const updateObj = {};
    const updateName = $("#update-name").val().trim();
    const updateDesc = $("#update-desc").val().trim();
    const updateLocation = $("#update-location").val().trim();
    const updateDate = $("#update-date").val().trim();
    const updateTime = $("#update-time").val().trim();
    if (updateName) {
      updateObj.name = updateName;
    }
    if (updateDesc) {
      updateObj.description = updateDesc;
    }
    if (updateLocation) {
      updateObj.location = updateLocation;
    }
    if (updateDate && updateTime) {
      updateObj.date_time = `${updateDate} ${updateTime}`;
    } 
    
    $.ajax({
      url: `/api/events/${eventId}`,
      method: "PUT",
      data: updateObj,
    }).then((response) => {
      location.href = "/view-events"
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
        data: collabObj,
      }).then((response) => {});
    });
  });

  // create tasks
  // $(".update-form").on("submit", function(event) {
  //   event.preventDefault();
  //   const updateTaskTitle = $("#update-task-title").val().trim();
  //   const updateTaskBody = $("#update-task-body").val().trim();
  //   const updateCostTitle = $("#update-cost-title").val().trim();
  //   const updateCostAmount = $("#update-cost-amount").val().trim();
  //   if (updateTaskTitle && updateTaskBody) {
  //     updateObj.task_title = updateTaskTitle;
  //     updateObj.task_body = updateTaskBody;
  //   } 
  //   if (updateCostTitle && updateCostAmount) {
  //     updateObj.cost_title = updateCostTitle;
  //     updateObj.cost_amount = updateCostAmount;
  //   } 
  // })
});




// $('[data-countdown]').each(function() {
//   var $this = $(this), finalDate = $(this).data('countdown');
//   $this.countdown(finalDate, function(event) {
//     $this.html(event.strftime('%D days %H:%M:%S'));
//   });
// });


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


// $('[data-countdown]').each(setInterval(function () {
//   // const countdown = 
//   // Get today's date and time

//   console.log($("#timerSpan").data("countdown"))
//   // console.log($(this).data("countdown"));
//   const now = new Date().getTime();

//   // Find the distance between now and the count down date
//   const distance = countDownDate - now;

//   // Time calculations for days, hours, minutes and seconds
//   const days = Math.floor(distance / (1000 * 60 * 60 * 24));
//   const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//   const seconds = Math.floor((distance % (1000 * 60)) / 1000);

//   if (distance >= 0){
//     $this.html = days + "d " + hours + "h "
//       + minutes + "m " + seconds + "s ";

//   } else {
//     clearInterval(timerFunc);
//     $this.html = "PARTY TIME!!";   
//   }
//   console.log(distance);
// }, 1000));



            // // Set the date we're counting down to
            // const countDownDate = new Date(document.getElementById("date-time").innerText).getTime();

            // // Update the count down every 1 second
            // const timerFunc = setInterval(function () {

            //   // Get today's date and time
            //   const now = new Date().getTime();

            //   // Find the distance between now and the count down date
            //   const distance = countDownDate - now;

            //   // Time calculations for days, hours, minutes and seconds
            //   const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            //   const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            //   const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            //   const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            //   if (distance >= 0){
            //     document.getElementById("timer-span").innerHTML = days + "d " + hours + "h "
            //       + minutes + "m " + seconds + "s ";
            //       // console.log(timerOutput);


            //   } else {
            //     clearInterval(timerFunc);
            //     document.getElementById("timer-span").innerHTML = "PARTY TIME!!";   
            //   }
            // }, 1000); 
