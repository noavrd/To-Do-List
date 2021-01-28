let viewSection = document.getElementById("view-section");
let input = document.getElementById("text-input");
let select = document.getElementById("priority-selector");
let button = document.getElementById("add-button");
let counter = document.getElementById("counter");
let countTask = 0;
let sort = document.getElementById("sort-button");


//enter a task to the list
button.onclick = () => {
    let listText = document.createElement("div");
    listText.className = "todo-container";
    viewSection.appendChild(listText);

    //enter priority
    let selectValue = document.createElement("div");
    selectValue.textContent = select.value;
    selectValue.className = "todo-priority";
    select.value = 1;
    listText.appendChild(selectValue);

    //enter date
    let timeValue = document.createElement("div");
    let time = new Date();
    time = time.toISOString().split('T')[0] + " " + time.toTimeString().split(" ")[0];
    timeValue.textContent = time;
    timeValue.className = "todo-created-at";
    listText.appendChild(timeValue);

    //enter value
    let inputValue = document.createElement("div");
    inputValue.textContent = input.value;
    inputValue.className = "todo-text";
    input.value = "";
    input.focus();
    listText.appendChild(inputValue);

    //add count
    countTask++;
    counter.textContent = countTask;

}

button.onclick = () => {

}