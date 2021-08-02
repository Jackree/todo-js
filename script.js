const inputField = document.querySelector(".input-field");
const addButton = document.querySelector(".input-button");
const todoList = document.querySelector(".todo-list");

function createPost(message, currentTime) {
  let li = document.createElement("li");

  li.id = currentTime.toString();
  li.className = "todo-item";
  li.innerHTML = `<p>
    ${message}
  </p>
  <button type="button">x</button>`;

  return li;
}

function addPost(message) {
  let currentTime = Date.now();
  localStorage.setItem(currentTime, message);
  todoList.prepend(createPost(message, currentTime));
}

if (localStorage.length > 0) {
  let keys = Object.keys(localStorage);
  for(let key of keys) {
    todoList.prepend(createPost(localStorage.getItem(key), key));
  }
}

addButton.addEventListener("click", () => {
  if (inputField.value.length > 0) {
    addPost(inputField.value);
    inputField.value = "";
  }
});

todoList.addEventListener("click", (e) => {
  if (e.target && e.target.tagName == "BUTTON") {
    localStorage.removeItem(e.target.parentNode.id);
    e.target.parentNode.remove();
  }
});
