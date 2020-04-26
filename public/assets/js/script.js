$(function () {
  console.log("connected")
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


  $("#editAccount").on("submit", function (event) {
    event.preventDefault();
    // CAPTURE USER INPUT
    const editUser = $("#current-user").val().trim();
    const editFirst = $("#update-first").val().trim();
    const editLast = $("#update-last").val().trim();
    // const editPass = $("#current-pass").val().trim();
    // const editPassConfirm = $("#invited-pass-confirm").val().trim();
    const editEmail = $("#update-email").val().trim();
    const editPhone = $("#update-phone").val().trim();

    // check if password matches confirm value
    // if yes send data request
    // if no alert/modal
    // let checkPass = newPass === newPassConfirm ? true : false;
    // if (checkPass === false) {
    //   alert("Passwords did not match, please try again");
    //   // location.reload();
    //   return;
    // }

    // CREATE OBJECT OF USER INPUT
    const editedAccount = {
      username: editUser,
      first_name: editFirst,
      last_name: editLast,
      // password: editPass,
      email: editEmail,
      phone: editPhone,
    };

    // SEND POST REQUEST TO API-ROUTES PAGE
    $.ajax({
      url: "/signup",
      method: "PUT",
      data: editedAccount,
    }).then(() => {
      // CREATE OBJECT OF USERNAME/PASSWORD FOR LOGIN REQUEST
      const newObj = {
        username: editUser,
        // password: editPass,
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
    // console.log(eventDate + eventTime);

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

  // Editing a specific event
  $(".edit-event-button").on("click", function () {
    const eventToUpdate = $(this).attr("id");
    location.href = `/update-event/${eventToUpdate}`;
  });

  // Deleting a specific event
  $(".delete-event-button").on("click", function () {
    const eventToDelete = $(this).attr("id");
    $.ajax({
      url: `/api/events/${eventToDelete}`,
      method: "delete",
    }).then((response) => {
      location.reload();
    });
  });

  // update events submit
  $(".update-form").on("submit", function (event) {
    event.preventDefault();
    const eventId = $(this).attr("id");
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
      location.href = "/view-events";
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
  $(".create-tasks").on("submit", function (event) {
    event.preventDefault();
    const eventId = $(this).attr("id");
    const taskObj = {};
    const updateTaskTitle = $("#update-task-title").val().trim();
    const updateTaskBody = $("#update-task-body").val().trim();
    if (updateTaskTitle && updateTaskBody) {
      taskObj.name = updateTaskTitle;
      taskObj.description = updateTaskBody;
    }
    taskObj.event_id = eventId;
    $.ajax({
      url: `/api/tasks/`,
      method: "POST",
      data: taskObj,
    }).then((response) => {
      location.href = "/view-events";
    });
  });

  // edit tasks
  $(".edit-task-button").on("click", function () {
    const taskId = $(this).attr("id");
    location.href = `/update-task/${taskId}`;
  });

  // update tasks submit
  $(".update-task").on("submit", function (event) {
    event.preventDefault();
    console.log("edit this task bitch");
    const taskId = $(this).attr("id");
    const taskObj = {};
    const updateTaskName = $("#update-task-name").val().trim();
    const updateTaskDesc = $("#update-task-desc").val().trim();
    const updateTaskComplete = $("[name=update-completed]:checked")
      .val()
      .trim();
    if (updateTaskName && updateTaskDesc && updateTaskComplete) {
      taskObj.name = updateTaskName;
      taskObj.description = updateTaskDesc;
      taskObj.completed = updateTaskComplete;
    }
    $.ajax({
      url: `/api/tasks/${taskId}`,
      method: "PUT",
      data: taskObj,
    }).then((response) => {
      location.href = "/view-events";
    });
  });

  // delete tasks
  $(".delete-task-button").on("click", function () {
    const taskId = $(this).attr("id");
    $.ajax({
      url: `/api/tasks/${taskId}`,
      method: "delete",
    }).then((response) => {
      location.reload();
    });
  });

  // create costs
  $(".create-costs").on("submit", function (event) {
    event.preventDefault();
    const eventId = $(this).attr("id");
    console.log(eventId);
    const costObj = {};
    const updateCostTitle = $("#update-cost-title").val().trim();
    const updateCostDesc = $("#update-cost-desc").val().trim();
    const updateCostAmount = $("#update-cost-amount").val().trim();
    const updatePurchasedStatus = $("[name=update-cost-purchased]:checked")
      .val()
      .trim();
    if (
      updateCostTitle &&
      updateCostDesc &&
      updateCostAmount &&
      updatePurchasedStatus
    ) {
      costObj.name = updateCostTitle;
      costObj.description = updateCostDesc;
      costObj.cost = updateCostAmount;
      costObj.purchased = updatePurchasedStatus;
      costObj.event_id = eventId;
    }
    // console.log(costObj)
    $.ajax({
      url: `/api/costs/`,
      method: "POST",
      data: costObj,
    }).then((response) => {
      location.href = "/view-events";
    });
  });

  // edit costs
  $(".edit-cost-button").on("click", function () {
    const costId = $(this).attr("id");
    // console.log(costId)
    location.href = `/update-cost/${costId}`;
  });

  // update costs submit
  $(".update-cost").on("submit", function (event) {
    event.preventDefault();
    console.log("edit this cost bitch");
    const costId = $(this).attr("id");
    const costObj = {};
    const updateCostName = $("#update-cost-name").val().trim();
    const updateCostDesc = $("#update-cost-desc").val().trim();
    const updateCostAmount = $("#update-cost-amount").val().trim();
    const updateCostPurchased = $("[name=update-purchased]:checked")
      .val()
      .trim();
    if (
      updateCostName &&
      updateCostDesc &&
      updateCostAmount &&
      updateCostPurchased
    ) {
      costObj.name = updateCostName;
      costObj.description = updateCostDesc;
      costObj.cost = updateCostAmount;
      costObj.purchased = updateCostPurchased;
    }
    $.ajax({
      url: `/api/costs/${costId}`,
      method: "PUT",
      data: costObj,
    }).then((response) => {
      location.href = "/view-events";
    });
  });

  // <<<<<<< zgs-bug-checks
  $(".timerSpan").each(function () {
    // capture event time
    const eventTime = $(this).data("countdown");
    var countDownDate = new Date(eventTime).getTime();
    console.log(eventTime);

    const countdownTimer = setInterval(() => {
      const now = new Date().getTime();

      // Find the distance between now and the count down date
      let distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance >= 0) {
        $(this).text(
          days + "Days " + hours + "Hours " + minutes + "m " + seconds + "s "
        );
      } else {
        clearInterval(countdownTimer);
        $(this).text("PARTY TIME!!");
      }
    }, 1000);
  });

  //   if (distance >= 0){
  //     document.getElementById("timer-span").innerHTML = days + "d " + hours + "h "
  //       + minutes + "m " + seconds + "s ";
  //       // console.log(timerOutput);

  // limit phone number input to numbers and auto format
  $(function () {
    $("#new-phone").keydown(function (e) {
      var key = e.charCode || e.keyCode || 0;
      $text = $(this);
      if (key !== 8 && key !== 9) {
        if ($text.val().length === 3) {
          $text.val($text.val() + "-");
        }
        if ($text.val().length === 7) {
          $text.val($text.val() + "-");
        }
      }
      return (
        key == 8 ||
        key == 9 ||
        key == 46 ||
        (key >= 48 && key <= 57) ||
        (key >= 96 && key <= 105)
      );
    });
  });
});
