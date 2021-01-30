let viewSection = document.getElementById("view-section");
let input = document.getElementById("text-input");
let select = document.getElementById("priority-selector");
let button = document.getElementById("add-button");
let counter = document.getElementById("counter");
let countTask = 0;
let sort = document.getElementById("sort-button");
let option = document.getElementsByTagName("option");
let arrInArr = [];
let arr = [];
let deleteAll = document.getElementById("Delete all");
let listText = document.createElement("div");




//add a task to the list
button.onclick = () => {
    if (input.value === "") { //check that the input is not empty
        alert("Add a task");
        return;
    }
    listText = document.createElement("div");
    listText.className = "todo-container";
    viewSection.appendChild(listText);
    deleteTask(listText);
    addSelect(listText);
    addValue(listText);

    addPriority(listText);
    addDate(listText);
    countIncrease();
    arr.push(listText);

};
sort.onclick = () => {
    for (let i = 1; i < arrInArr.length; i++) {
        if(i % 5 === 0) {
            for (let j = 1; j < option.length ; j++) {
                if (i === option[j]) {
                    arr.push(i-1, i, i+1,i+2,i+3);
                }
            }
        }
    }
    console.log(arr);
    viewSection.append(arr);

    
}


function addSelect(listText) {
    let checkBox = document.createElement("input");
    checkBox.type = "checkBox";
    checkBox.className = "check";
    listText.appendChild(checkBox);
}



//delete task
function deleteTask(listText) {
    let deleteButton = document.createElement("button");
    listText.appendChild(deleteButton);
    deleteButton.className = "delete";
    deleteButton.textContent = "delete";
    deleteButton.onclick = function () {
        viewSection.removeChild(listText);
        countTask--;
        counter.textContent = countTask;
    };
}

//add priority
function addPriority(listText) {
    let selectValue = document.createElement("div");
    selectValue.textContent = select.value;
    selectValue.className = "todo-priority";
    select.value = 1;
    listText.appendChild(selectValue);
}

//add value
function addValue(listText) {
    let inputValue = document.createElement("div");
    inputValue.textContent = input.value;
    inputValue.className = "todo-text";
    input.value = "";
    input.focus();
    listText.appendChild(inputValue);

}

//add date
function addDate(listText) {
    let timeValue = document.createElement("div");
    let time = new Date();
    time = time.toISOString().split('T')[0] + " " + time.toTimeString().split(" ")[0];
    timeValue.textContent = time;
    timeValue.className = "todo-created-at";
    listText.appendChild(timeValue);
    


}

//add count
function countIncrease() {
    countTask++;
    counter.textContent = countTask;
}

