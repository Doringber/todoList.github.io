
//Select
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOptions = document.querySelector('.filter-todo');

//EventListeners 
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck)
filterOptions.addEventListener('click', filterTodo)

//Functions 
function addTodo(event)
{
    //Prevent form sumitting
    event.preventDefault();

    //Todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //Create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //Add todo to localstoreage 
    saveLocalTodos(todoInput.value);

    //Check mark button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="far fa-check-square"></i>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);

    const trashButton  = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    todoList.appendChild(todoDiv);
    
    todoInput.value = "";
}

//delete 
function deleteCheck(e){
    const item = e.target;

    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        //animation
        todo.classList.add("fall");
        removeLocalTodos(todo); 
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }

    //Check mark
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed")
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
      switch (e.target.value) {
        case "all":
          todo.style.display = "flex";
          break;
        case "completed":
          if (todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
        case "uncompleted":
          if (!todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
      }
    });
  }

  function saveLocalTodos(todo){
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    }else{
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function getTodos(){
    console.log("hello");
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    }else{
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
      //Todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //Create li
    const newTodo = document.createElement('li');
    console.log(todo)
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    console.log(newTodo);

    //Check mark button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="far fa-check-square"></i>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);
    
    //check trash button
    const trashButton  = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //append to list
    todoList.appendChild(todoDiv);
    });
  }

  function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    }else{
      todos = JSON.parse(localStorage.getItem("todos"));
    }

    console.log(todo.childNodes);
    const todoIndex = todo.childNodes[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function sendEmail() {
    var d= new Date();

    Email.send({
    Host: "smtp.gmail.com",
    Username : "****@gmai.com",
    Password : "********",
    To : 'nibuzuku@acrossgracealley.com',
    From : "****@gmail.com",
    Subject : "Dor's Todo List" + "-" + d.getUTCDate() + '/' + d.getMonth(),
    Body : JSON.parse(localStorage.getItem("todos")),
    }).then(
      message => alert("mail sent successfully")
    );
  }

