
//Select
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOptions = document.querySelector('.filter-todo');
const whatupAppInput = document.querySelector('.whatupApp-input');
const whatupAppbutton = document.querySelector('.whatupApp-button');


//EventListeners 
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck)
filterOptions.addEventListener('click', filterTodo)
filterOptions.addEventListener('click', filterTodo)
whatupAppbutton.addEventListener('click', test);


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

  function newTest()
  {
    var fname = document.getElementById("fname").value;
    var json_data = JSON.parse(localStorage.getItem("todos"))
    var result = [];

    for(var i in json_data)
      result.push(json_data [i]);

    console.log(result)
    for (const child of todoList.children) {
      window.open("mailto:" + fname +"?subject=TODO List&body=" + result);
    }
  }

  function test()
  {
    
    fetch('https://api.whatsapp.com/send?phone=+972507328808&text=hi', {
      mode: 'no-cors',
      }).then(function (response) {
        console.log(response.type); // "opaque"
    });

    var client = new HttpClient();
    client.get('https://api.whatsapp.com/send?phone=+972507328808&text=hi', function(response) {
        // do something with response
});

  }
  // function getLinkWhastapp() {
  //   console.log(whatupAppInput.value)

  //   var url = 'https://api.whatsapp.com/send?phone=' 
  //      + whatupAppInput.value 
  //      + '&text=' 
  //      + encodeURIComponent(JSON.parse(localStorage.getItem("todos")))

  //     console.log(url)

  //   const Http = new XMLHttpRequest();
  //   Http.open("GET", url);
  //   Http.send();

  //   Http.onreadystatechange = (e) => {
  //     console.log(Http.responseText)
      
  // }

