let viewSection = document.getElementById("view-section");
let input = document.getElementById("text-input");
let select = document.getElementById("priority-selector");
let button = document.getElementById("add-button");
let counter = document.getElementById("counter");
let countTask = 0;
let sort = document.getElementById("sort-button");
let option = document.getElementsByTagName("option");
let deleteAll = document.getElementById("Delete all");
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
    viewSection.appendChild(listText);
    obj = {
        select: addSelect(listText),
        delete: deleteTask(listText),
        priority: addPriority(listText),
        value: addValue(listText),
        dateTime: addDate(listText)
    };
    arr.push(obj);
    countIncrease();
}
let newArr = [];
sort.onclick = () =>{
    for (let i = 0; i < arr.length; i++){
        for(let j = 1; j <= option.length; j++) {
            if (arr[i].priority === j) {
                newArr.push(arr[i]);
            }
        }
    }
console.log(newArr);
    for (let n = 0; n < newArr.length; n++) {
        arr.push(newArr.unshift());
    }
}



function addSelect(listText) {
    let checkBox = document.createElement("input");
    checkBox.type = "checkBox";
    checkBox.className = "check";
    return listText.appendChild(checkBox);

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
    };
    return listText.appendChild(deleteButton);;

}

//add priority
function addPriority(listText) {
    let selectValue = document.createElement("div");
    selectValue.textContent = select.value;
    selectValue.className = "todo-priority";
    select.value = 1;
  return listText.appendChild(selectValue);
    

}

//add value
function addValue(listText) {
    let inputValue = document.createElement("div");
    inputValue.textContent = input.value;
    inputValue.className = "todo-text";
    input.value = "";
    input.focus();
    return listText.appendChild(inputValue);


}

//add date
function addDate(listText) {
    let timeValue = document.createElement("div");
    let time = new Date();
    time = time.toISOString().split('T')[0] + " " + time.toTimeString().split(" ")[0];
    timeValue.textContent = time;
    timeValue.className = "todo-created-at";
 return listText.appendChild(timeValue);
    
    


}

//add count
function countIncrease() {
    countTask++;
    counter.textContent = countTask;
}
