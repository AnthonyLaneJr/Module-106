const iconImportant = "iImportant fa-solid fa-bug";
const iconNonImportant = "iImportant fa-solid fa-bug-slash";
var important = false;
var inputPanel = true;
const hide = "hidden";

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
    inputPanel = false;
  } else {
    console.log(`revealing`);
    $(`#form`).removeClass(hide);
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
  console.log(task);
  displayTask(task);
  $(`input`).val(``);
  $(`textarea`).val(``);
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
function init() {
  console.log(`task manager page`);
  $(`#saveBtn`).click(saveTask);
  //assign event and load data -init purpose
  $(`#iImportant`).click(toggleImportance);
}

window.onload = init;
