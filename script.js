let input = document.getElementById("input");
let add = document.querySelector(".add");
let result = document.querySelector(".result");
let array = [];

if(localStorage.getItem("task")) {
    array = JSON.parse(window.localStorage.task);
}

saveTask()

add.onclick = function() {
    if(input.value != 0) {
        addTaskToArray(input.value);
        input.value = "";
    }
}
function addTaskToArray(value) {
    const info = {
        id: Date.now(),
        title: value,
    };
    array.push(info);
    createTask(info);
}
function createTask(info) {
    let element = document.createElement("div");
    element.className = "task";
    element.id = info.id;
    element.setAttribute("data-id",info.id);
    let span = document.createElement("span");
    span.className = "text";
    span.append(document.createTextNode(info.title));
    let i = document.createElement("i");
    i.className = "fa-solid fa-xmark";
    i.classList.add("close");
    element.appendChild(span);
    element.appendChild(i);
    result.append(element);
    window.localStorage.setItem("task",JSON.stringify(array))
}
// << Save Tasks Of Locale Storage On Reload Or Close The Page >>
function saveTask() {
    result.innerHTML = "";
    array.forEach((ele) => {
        createTask(ele);
    })
}
// << Remove Task On Click The Delete Boutton >>
document.addEventListener("click",(ele) => {
    if(ele.target.classList.contains("close")) {
        removeTaskFromLocalStorage(ele.target.parentElement.getAttribute("data-id"));
        ele.target.parentElement.remove();
    }
});
function removeTaskFromLocalStorage(idTask) {
    array = array.filter((ele) => ele.id != idTask);
    window.localStorage.setItem("task",JSON.stringify(array));
}
// << Add Task On Click Enter Key >>
input.onkeypress = function(e) {
    if(e.key === "Enter") {
        if(input.value != 0) {
            addTaskToArray(input.value);
            input.value = "";
        }
    }
}