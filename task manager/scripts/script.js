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
  console.log(
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
}
function init() {
  console.log(`task manager page`);
  $(`#saveBtn`).click(saveTask);
  //assign event and load data -init purpose
  $(`#iImportant`).click(toggleImportance);
}

window.onload = init;
