let viewSection = document.getElementById("view-section");
let input = document.getElementById("text-input");
let select = document.getElementById("priority-selector");
let button = document.getElementById("add-button");
let counter = document.getElementById("counter");
let countTask = 0;
let sort = document.getElementById("sort-button");
let sortOpposite = document.getElementById("sort-button-opposite");
let deleteAll = document.getElementById("delete-all");
let listText = document.createElement("div");
let darkMode = document.getElementById("dark-button");
let obj = {};
let arr = [];
let task;

darkMode.onclick = () => {
    document.body.classList.toggle("dark");
}
document.addEventListener("DOMContentLoaded", putOnScreenLocalStorage);
function putOnScreenLocalStorage() {
    if (localStorage.getItem("arr") === null) {
        arr = []; //check if the local storage id empty
    } else {
        arr = JSON.parse(localStorage.getItem("arr"));
    }
    for (let i = 0; i < arr.length; i++) {
        showArrayOnScreen(i);
        countTask++;
    }
    counter.textContent = countTask;
}

button.onclick = () => { //add a ToDo
    if (localStorage.getItem("arr") === null) {
        arr = [];
    } else {
        arr = JSON.parse(localStorage.getItem("arr"));
    }
    if (input.value === "") { //checks that the input is not empty
        alert("Add a task");
        return;
    }
    listText = document.createElement("div");
    listText.className = "todo-container";
    viewSection.append(listText);
    addSelect(listText);
    deleteTask(listText);
    arr.push( {
        "priority": addPriority(listText),
        "value": addValue(listText),
        "dateTime": addDate(listText)
    });
   // arr.push(obj); //set all the objects in one array
    countIncrease();
    localStorage.setItem("arr", JSON.stringify(arr));
}
sortOpposite.onclick = () => {
    let { priority1, priority2, priority3, priority4, priority5 } = addArrayToSort();
    arr = []; //order the ToDos in array according to the sort
    let newArr = [priority1, priority2, priority3, priority4, priority5];
    for (let x = 0; x < newArr.length; x++){
        let enterBySort = newArr[x];
        for (let j = 0; j <= enterBySort.length; j++) {
            if (enterBySort[j] !== undefined) {
                arr.push(enterBySort[j]);
            }
        }
    }
    viewSection.innerHTML = ""; //delete the current list from the screen
    for(let i = 0; i < arr.length; i++) { //show the new list by sort to the screen
        showArrayOnScreen(i);

    }
    localStorage.setItem("arr", JSON.stringify(arr));
}
sort.onclick = () => { 
    let { priority1, priority2, priority3, priority4, priority5 } = addArrayToSort();
    arr = []; //order the ToDos in array according to the sort
    let newArr = [priority5, priority4, priority3, priority2, priority1];
    for (let x = 0; x < newArr.length; x++){
        let enterBySort = newArr[x];
        for (let j = 0; j <= enterBySort.length; j++) {
            if (enterBySort[j] !== undefined) {
                arr.push(enterBySort[j]);
            }
        }
    }
    viewSection.innerHTML = ""; //delete the current list from the screen
    for(let i = 0; i < arr.length; i++) { //show the new list by sort to the screen
        showArrayOnScreen(i);
    }
    localStorage.setItem("arr", JSON.stringify(arr));
}

deleteAll.onclick= () => {
    arr = [];
    viewSection.innerHTML = "";
    countTask = 0;
    counter.textContent = countTask;
    localStorage.clear();
}

function addArrayToSort() {
    let priority1 = [];
    let priority2 = [];
    let priority3 = [];
    let priority4 = [];
    let priority5 = [];

    for (let i = 0; i < arr.length; i++) {
        task = arr[i].priority;
        if (task === "1") {
            priority1.push(arr[i]);
        } else if (task === "2") {
            priority2.push(arr[i]);
        } else if (task === "3") {
            priority3.push(arr[i]);
        } else if (task === "4") {
            priority4.push(arr[i]);
        } else {
            priority5.push(arr[i]);
        }
    }
    return { priority1, priority2, priority3, priority4, priority5 };
}

function showArrayOnScreen(i) {
    listText = document.createElement("div");
    listText.className = "todo-container";
    viewSection.append(listText);
    addSelect(listText);
    deleteTask(listText);
    let selectValue = document.createElement("div");
    selectValue.innerText = arr[i]["priority"];
    selectValue.className = "todo-priority";
    listText.append(selectValue);
    let inputValue = document.createElement("div");
    inputValue.innerText = arr[i]["value"];
    inputValue.className = "todo-text";
    listText.append(inputValue);
    inputValue.innerText;
    let timeValue = document.createElement("div");
    timeValue.className = "todo-created-at";
    timeValue.innerText = arr[i]["dateTime"];
    listText.append(timeValue);
}

function addSelect(listText) {
    let checkBox = document.createElement("input");
    checkBox.type = "checkBox";
    checkBox.className = "check";
    checkBox.onclick = function () {
        if (listText.className === "todo-container") {
            listText.className = "finish";
        } else {
            listText.className = "todo-container";
        }
    }
    return listText.append(checkBox);
}
//delete task
function deleteTask(listText) {
    let deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.textContent = "delete";
    deleteButton.onclick = function () {
        viewSection.removeChild(listText);
        countTask--;
        counter.textContent = countTask;
        let count = arr.length;
        for (let i = 0; i < count; i++) { //delete the ToDo from the main array (arr)
            if (listText.querySelector(".todo-created-at").innerText === arr[i]["dateTime"]) {
                arr.splice(i, 1);
                localStorage.setItem("arr", JSON.stringify(arr));
            } 
        }
    };
    return listText.append(deleteButton);
}

//add priority
function addPriority(listText) {
    let selectValue = document.createElement("div");
    selectValue.textContent = select.value;
    selectValue.className = "todo-priority";
    select.value = 1;
    listText.append(selectValue);
    return selectValue.innerText;
}

//add value
function addValue(listText) {
    let inputValue = document.createElement("div");
    inputValue.textContent = input.value;
    inputValue.className = "todo-text";
    input.value = "";
    input.focus();
    listText.append(inputValue);
    return inputValue.innerText;
}

//add date
function addDate(listText) {
    let timeValue = document.createElement("div");
    let time = new Date();
    time = time.toISOString().split('T')[0] + " " + time.toTimeString().split(" ")[0];
    timeValue.textContent = time;
    timeValue.className = "todo-created-at";
    listText.append(timeValue);
    return timeValue.innerText;
}

//add count
function countIncrease() {
    countTask++;
    counter.textContent = countTask;
}
