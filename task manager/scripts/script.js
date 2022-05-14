const iconImportant = "iImportant fa-solid fa-bug";
const iconNonImportant = "iImportant fa-solid fa-bug-slash";
var important = false;
var inputPanel = true;
const hide = "hidden";
var counter = 0;

function toggleImportance() {
  console.log(`clicked`);
  if (important) {
    //from important to non important
    $(`#iImportant`).removeClass(iconImportant).addClass(iconNonImportant);
    important = false;
  } else {
    //from non imp to imp
    $(`#iImportant`).removeClass(iconNonImportant).addClass(iconImportant);
    important = true;
  }
}
function togglePanel() {
  if (inputPanel) {
    console.log(`hidden`);
    $(`#form`).addClass(hide);
    $(`#hideBtn`).html(`Show`);
    $(`#list`).addClass(`relative`);
    $(`button`).addClass(`btn-relative`);
    inputPanel = false;
  } else {
    console.log(`revealing`);
    $(`#form`).removeClass(hide);
    $(`#hideBtn`).html(`Hide`);
    $(`#list`).removeClass(`relative`);
    $(`button`).removeClass(`btn-relative`);
    inputPanel = true;
  }
}
function saveTask(e) {
  e.preventDefault();
  let title = $(`#txtTitle`).val();
  let description = $(`#txtDescription`).val();
  let dueDate = $(`#txtDueDate`).val();
  let location = $(`#txtLocation`).val();
  let invites = $(`#txtInvites`).val();
  let color = $(`#colorSel`).val();
  let frequency = $(`#stats`).val();
  let state = $(`#status`).val();
  // console.log(
  //   title,
  //   important,
  //   description,
  //   dueDate,
  //   location,
  //   invites,
  //   color,
  //   frequency,
  //   state
  // );

  //create on obect
  let task = new Task(
    title,
    important,
    description,
    dueDate,
    location,
    invites,
    color,
    frequency,
    state
  );

  clearInputs();

  $.ajax({
    type: `post`,
    url: `https://fsdiapi.azurewebsites.net/api/tasks/`,
    data: JSON.stringify(task),
    contentType: `application/json`,
    success: function (res) {
      console.log(`Task Saved`, res);
      displayTask(task);
      counter += 1;
      $(`#pendingLabel`).html(`You have ${counter} Tasks Tracked`);
    },
    error: function (errorDetails) {
      console.error(`Save failed`, errorDetails);
    },
  });
}

function clearInputs() {
  $(`input`).val(``);
  $(`textarea`).val(``);
  $(`select`).val(`0`);
  $(`#colorSel`).val(`#000000`);
  important = true;
  toggleImportance();
}

function getStatusText(state) {
  switch (state) {
    case `1`:
      return `Pending`;
    case `2`:
      return `In Progress`;
    case `3`:
      return `Paused`;
    case `4`:
      return `Completed`;
    case `5`:
      return `Abandoned`;
  }
}
function getFrequency(freq) {
  switch (freq) {
    case `1`:
      return `One Time`;
    case `2`:
      return `Daily`;
    case `3`:
      return `Weekly`;
    case `4`:
      return `Monthly`;
  }
}
function getImportance(value) {
  switch (value) {
    case true:
      return `Important`;
    case false:
      return `Not Important`;
  }
}
function displayTask(task) {
  let iconClass = iconNonImportant;
  if (task.important) {
    iconClass = iconImportant;
  }
  let syntax = `<div class="task-item" style="border-color:${task.color}">
  <div class="icon">
  <i class="${iconClass}"></i>
  </div>
  <div>
  <p class="title"><span>Title</span>:${task.title}</p>
  <p><span>Priority</span>:${getImportance(task.important)}<p>
  </div>
  <div>
  <p><span>Description</span>:${task.description}</p>
  <p><span>Due-Date</span>:${task.dueDate}</p>
  <p><span>Location</span>:${task.location}</p>
  </div>
  <div>
  <p><span>Invites</span>:${task.invites}</p>
  <p><span>Color</span>:${task.color}</p>
  <p><span>Frequency</span>:${getFrequency(task.frequency)}</p>
  <p><span>Status</span>:${getStatusText(task.state)}</p>
  </div>
  </div>`;
  $(`#tasks`).append(syntax);
}

function fetchTasks() {
  $.ajax({
    type: `get`,
    url: `https://fsdiapi.azurewebsites.net/api/tasks`,
    success: function (res) {
      let data = JSON.parse(res); //this is coding form string into object - string are from server repsonse
      console.log(data);
      //for loop over data
      for (let i = 0; i < data.length; i++) {
        //get every element inside the array
        let task = data[i];
        if (task.name === `Anthony`) {
          counter += 1;
          displayTask(task);
          //validate display only if object applies to me-i.e. task name is unique to my task consctructor
        }
        $(`#pendingLabel`).html(`You have ${counter} Tasks Tracked`);
      }
      //send the elemtn to the display
    },
    error: function (err) {
      console.error(`Error retrieving data`, err);
    },
  });
}
//delete req
//api/produts/clear/name
function deleteTasks() {
  $.ajax({
    type: `delete`,
    url: `https://fsdiapi.azurewebsites.net/api/tasks/clear/Anthony`,
    success: function () {
      location.reload();
      console.log(`Tasks Succesfully Deleted`);
      $(`#pendingLabel`).html(``);
    },
    error: function (err) {
      console.error(`Unable to Delete Tasks`, err);
    },
  });
}
function init() {
  console.log(`task manager page`);
  $(`#saveBtn`).click(saveTask);
  //assign event and load data -init purpose
  $(`#iImportant`).click(toggleImportance);

  //load data
  fetchTasks();
}

window.onload = init;
