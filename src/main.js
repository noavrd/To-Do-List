let viewSection = document.getElementById("view-section");
let input = document.getElementById("text-input");
let select = document.getElementById("priority-selector");
let button = document.getElementById("add-button");
let counter = document.getElementById("counter");
let countTask = 0;
let sort = document.getElementById("sort-button");
let deleteAll = document.getElementById("Delete-all");
let listText = document.createElement("div");
let obj = {};
let arr = [];

button.onclick = () => {
    if (input.value === "") { //check that the input is not empty
        alert("Add a task");
        return;
    }
    listText = document.createElement("div");
    listText.className = "todo-container";
    viewSection.append(listText);
    addSelect(listText);
    obj = {
        "deleteToDo" : deleteTask(listText),
        "priority": addPriority(listText),
        "value": addValue(listText),
        "dateTime": addDate(listText)
    };
    arr.push(obj); //set all the objects in one array
    countIncrease();
}
let task;
sort.onclick = () =>{ //a function that will check the priority in each object and than if the priority = to the option(1-5) it will enter to a new array, than takes the new array and put it in the original array after sort
    let priority1 = [];
    let priority2 = [];
    let priority3 = [];
    let priority4 = [];
    let priority5 = [];
    
    for (let i = 0; i < arr.length; i++) {
         task = arr[i].priority;
         if(task === "1") {
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
    arr = [];
    let newArr = [priority1, priority2, priority3, priority4, priority5];
    for (let x= 0; x < newArr.length; x++){
        let enterBySort = newArr[x];
        for (let j = 0; j <= priority1.length; j++) {
            if (enterBySort[j] !== undefined) {
                arr.push(enterBySort[j]);
            }
        }
    }
    viewSection.innerHTML = ""; //delete the current list
    for(let i = 0; i < arr.length; i++) { //add the new list by sort
        listText = document.createElement("div");
        listText.className = "todo-container";
        viewSection.append(listText);
        addSelect(listText);
        deleteTask(listText);
        let selectValue = document.createElement("div");
        selectValue.textContent = arr[i].priority;
        selectValue.className = "todo-priority";
        listText.append(selectValue);

        let inputValue = document.createElement("div");
        inputValue.textContent = arr[i].value;
        inputValue.className = "todo-text";
        listText.append(inputValue);

        let timeValue = document.createElement("div");
        timeValue.textContent = arr[i].dateTime;
        timeValue.className = "todo-created-at";
        listText.append(timeValue);
    }
    
} 


localStorage.setItem("view-section", "arr");

function addSelect(listText) {
    let checkBox = document.createElement("input");
    checkBox.type = "checkBox";
    checkBox.className = "check";
    return listText.append(checkBox);
}
let arrayNew = [];
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
                console.log(arr);
            }
        }
    };
    return listText.append(deleteButton), false;
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
