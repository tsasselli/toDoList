var data = (localStorage.getItem("todoList")) ? JSON.parse(localStorage.getItem("todoList")) : {
  todos: [],
  completedTodos: []
}
// console.log(JSON.parse(localStorage.getItem("todoList"))); //PARSING the JSON will return it back into object form back in the console

var removeSVG = `<svg class="removeButton" version="1.1"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 774.266 774.266" style="enable-background:new 0 0 774.266 774.266;" xml:space="preserve"><g><g><path class="fill" d="M640.35,91.169H536.971V23.991C536.971,10.469,526.064,0,512.543,0c-1.312,0-2.187,0.438-2.614,0.875C509.491,0.438,508.616,0,508.179,0H265.212h-1.74h-1.75c-13.521,0-23.99,10.469-23.99,23.991v67.179H133.916c-29.667,0-52.783,23.116-52.783,52.783v38.387v47.981h45.803v491.6c0,29.668,22.679,52.346,52.346,52.346h415.703c29.667,0,52.782-22.678,52.782-52.346v-491.6h45.366v-47.981v-38.387C693.133,114.286,670.008,91.169,640.35,91.169z M285.713,47.981h202.84v43.188h-202.84V47.981z M599.349,721.922c0,3.061-1.312,4.363-4.364,4.363H179.282c-3.052,0-4.364-1.303-4.364-4.363V230.32h424.431V721.922z M644.715,182.339H129.551v-38.387c0-3.053,1.312-4.802,4.364-4.802H640.35c3.053,0,4.365,1.749,4.365,4.802V182.339z"/><rect class="fill" x="475.031" y="286.593" width="48.418" height="396.942"/><rect class="fill"x="363.361" y="286.593" width="48.418" height="396.942"/><rect class="fill"x="251.69" y="286.593" width="48.418" height="396.942"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>`;
var completeSVG = `<svg clsss="completeButton" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 612.005 612.005" style="enable-background:new 0 0 612.005 612.005;" xml:space="preserve"><g><g id="tick"><g><path class="fill" d="M595.601,81.553c-21.892-21.891-57.362-21.891-79.253,0L183.03,414.87l-88.629-76.133c-21.592-21.593-56.596-21.593-78.207,0c-21.592,21.592-21.592,56.614,0,78.206l132.412,113.733c21.592,21.593,56.596,21.593,78.207,0c2.167-2.166,3.979-4.576,5.716-6.985c0.317-0.299,0.672-0.505,0.99-0.804l362.083-362.101C617.473,138.914,617.473,103.425,595.601,81.553z"/></g></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>`;
rednerTodoList()
var addButton = document.getElementById("addButton").addEventListener("click", function() {
  var value = document.getElementById("toDoInputField").value;
  //if there's text inside of toDoInputField.
  if (value) {
    addTodoListToDom(value);
    //reset's the input field when user adds a new value
    document.getElementById("toDoInputField").value = "";
    data.todos.push(value);
    updateDataObject();

  }
});

document.getElementById("toDoInputField").addEventListener("keydown", function(e) {
  var value = this.value;
  if (e.code === "Enter" && value) {
    addInputFieldValue(value);
  }
});

function rednerTodoList() {
  // if both arrays are empty it will just hit return
  if (!data.todos.length && !data.completedTodos.length) return;

  for (var i = 0; i < data.todos.length; i++) {
    var value = data.todos[i];
    addTodoListToDom(value);
    console.log(value);
  }

  for (var c = 0; c < data.completedTodos.length; c++) {
    var value = data.completedTodos[i];
    addTodoListToDom(value, true);
  }
}

//create a function that updates the data model for add delete and remove/move.
function updateDataObject() {
  localStorage.setItem("todoList", JSON.stringify(data)); ///JSON stringify converts the object into text so it can be stored
}

function addInputFieldValue(value) {
  addTodoListToDom(value);
  //reset's the input field when user adds a new value
  document.getElementById("toDoInputField").value = "";
  data.todos.push(value);
  updateDataObject();
}

function addTodoListToDom(text, completedTodos) {
  var list = (completedTodos) ? document.getElementById("completedTodo") : document.getElementById("todo"); //ternary's are awesome!
  var item = document.createElement("li");
  item.innerText = text;

  var buttons = document.createElement("div");
  buttons.classList.add("listActionButtons");

  var removeButton = document.createElement("button");
  removeButton.classList.add('removeButton');
  removeButton.innerHTML = removeSVG;
  removeButton.addEventListener("click", removeTodo);

  var completeButton = document.createElement('button');
  completeButton.classList.add("completeButton");
  completeButton.innerHTML = completeSVG;

  //adds click event to removeButton for removing items
  completeButton.addEventListener("click", completeTodo);
  buttons.appendChild(completeButton);
  buttons.appendChild(removeButton);
  item.appendChild(buttons);
  // inserts the value at the first index[0] https://www.w3schools.com/jsref/met_node_insertbefore.asp
  list.insertBefore(item, list.childNodes[0]);
  // for (var i = 0; i < toDoItem.length; i++) { ///Loops through all the list items in the array returned from querySelectorAll
  //   // toDoItem[i].addEventListener("mouseenter", function() { //
  //   //   this.classList.add("selected"); // this refers to the parent in scope.. so in this case thats toDoItem
  //   // });
  //   // toDoItem[i].addEventListener("mouseout", function() { // removes the css class for styling the color of text for hilight effect.
  //   //   this.classList.remove("selected");
  //   // });
  //   this[i].addEventListener("click", function(){  //if mouse clickes the li, it will toggle a css class method that changes the style to class selected done
  //     this.classList.toggle("done");  //toggle is awesome!
  //   });
  // }
};

function removeTodo() {
  var item = this.parentNode.parentNode; //grabs the list item from parent class....INCEPTION
  var parent = item.parentNode;
  var parentsId = parent.id;
  var value = item.innerText // have to get the innerText value otherwise it would grab the html elements with it
  // removes from parent value
  console.log(value);
  if (parentsId === "todo") {
    data.todos.splice(data.todos.indexOf(value), 1);
  } else {
    data.completedTodos.splice(data.completedTodos.indexOf(value), 1); //removes 1 based on the innerText value of..
  }
  updateDataObject();
  parent.removeChild(item); // this uses the parent var item to
  console.log(data);
}

function completeTodo() {
  var item = this.parentNode.parentNode;
  var value = item.innerText
  // console.log(item);
  var parent = item.parentNode;
  var parentsId = parent.id;
  // pushes the arrays araound based on value
  if (parentsId === "todo") {
    data.todos.splice(data.todos.indexOf(value), 1); //removes 1 based on the innerText value of..
    data.completedTodos.push(value);
  } else {
    data.completedTodos.splice(data.completedTodos.indexOf(value), 1); //removes 1 based on the innerText value of..
    data.todos.push(value);
  }
  updateDataObject();
  //DATA TEST: console.log(data);
  // checks which list to add it too.. if statment as a ternary operator :) MAGIC
  var target = (parentsId === "todo") ? document.getElementById("completedTodo") : document.getElementById("todo");
  parent.removeChild(item)
  target.insertBefore(item, target.childNodes[0]);
}
