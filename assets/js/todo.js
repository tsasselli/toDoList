var toDoItem = document.querySelectorAll("li"); // grabs all li's.. dangerous method in larger projects... will fix later

for(var i = 0; i < toDoItem.length; i++) {    ///Loops through all the list items in the array returned from querySelectorAll
  toDoItem[i].addEventListener("mouseenter", function() { //
    this.classList.add("selected"); // this refers to the parent in scope.. so in this case thats toDoItem
  });
  toDoItem[i].addEventListener("mouseout", function() { // removes the css class for styling the color of text for hilight effect.
    this.classList.remove("selected");
  });

  toDoItem[i].addEventListener("click", function(){  //if mouse clickes the li, it will toggle a css class method that changes the style to class selected done
    this.classList.toggle("done");  //toggle is awesome!
  });
}
