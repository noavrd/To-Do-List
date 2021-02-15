 // Assign this variable to your JSONBIN.io API key if you choose to use it.
const DB_NAME = "my-todo";
const url = "https://api.jsonbin.io/v3/b/602a88f2f460fe73a196fc47";

// Gets data from persistent storage by the given key and returns it
async function getPersistent(key) {
  const init = {
    headers: {
    "Content-Type": "application/json",
    "X-Master-key": key	
  }};
  const response = await fetch(url + "/latest", init);
  const data = await response.json();
  return data.record[DB_NAME];
}
// Saves the given data into persistent storage by the given key.
// Returns 'true' on success.
async function setPersistent(key, data) {
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
  let response = await fetch(url, init);
  return response.ok;
}

async function setup(key) {
  let todo = {};
  const todoArray = [todo];
  setPersistent(key ,todoArray);
  await getPersistent(key);
}