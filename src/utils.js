 // Assign this variable to your JSONBIN.io API key if you choose to use it.
 const DB_NAME = "my-todo";
 const url = "https://api.jsonbin.io/v3/b/602a88f2f460fe73a196fc47";

 // Gets data from persistent storage by the given key and returns it
 function getPersistent(key) {
   loader.className = "show"; //add spinner
   const init = { //get the information on jsonBin
     method: "GET",
     headers: {
     "Content-Type": "application/json",
     "X-Master-key": key	
    }};
    fetch(url + "/latest", init)
    .then(res => res.json())
    .then(data => {
      arr = data.record[DB_NAME];
      for (let i in arr) {
        showArrayOnScreen(i, arr);
        countTask++;
      }
      counter.textContent = countTask;
      loader.className = loader.className.replace("show", ""); //remove spinner
    })
    .catch(error => console.log("error ", error))
 }

 // Saves the given data into persistent storage by the given key.
 function setPersistent(key, data) {
   textLoad.innerText = "Saving...";
   const dataObject = {
     [DB_NAME]: data
   };
   const init = {
     method: "PUT",
     headers: {
       "Content-Type": "application/json",
       "X-Master-key": key	
     },
     body: JSON.stringify(dataObject)
   }
   fetch(url, init)
   .then(res => {
    res.ok;
    textLoad.innerText = "";
   })
   .catch(error => console.log("error ", error))
 }
  function setup(key) {
   let todo = {};
   const todoArray = [todo];
   setPersistent(key ,todoArray);
   getPersistent(key);
 }