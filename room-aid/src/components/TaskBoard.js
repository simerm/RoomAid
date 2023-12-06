import React from 'react'
import {useEffect} from 'react'
import "./TaskBoard.css"

const TaskBoard = () => {

  useEffect(() => loadTasks(), [])

  return (
    <div className="container">
      <h1>Task Board</h1>
      <ul id="todoList"/>
      <div>
        <input type="text" id="taskInput" placeholder="New Task..."></input>
        <input type="date" id="dueDate"></input>
        <input type="text" id="roomate" placeholder="Assigned roomate"></input>
        <button onClick={addTask}>Add Task</button>
        <button onClick={clearTasks}>Clear All</button>
        <button onClick={undoDelete}>Undo Deletion</button>
      </div>
    </div>
  )
}


function addTask() {
  const taskInput = document.getElementById('taskInput');
  const dueDateInput = document.getElementById('dueDate');
  const roomateInput = document.getElementById('roomate');
  
  const task = taskInput.value;
  const dueDate = dueDateInput.value;
  const roomate = roomateInput.value;

  if (task.trim() === "") {
      alert("Task name cannot be empty");
      return;
  }

  const taskObject = {
      task: task,
      dueDate: dueDate,
      roomate: roomate
  };

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(taskObject);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  taskInput.value = '';
  dueDateInput.value = '';
  roomateInput.value = '';
  loadTasks();
}

function editTask(index) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const editedTask = prompt("Edit task:", tasks[index].task);
  const editedDueDate = prompt("Edit due date:", tasks[index].dueDate);
  const editedRoomate = prompt("Edit assigned roomate:", tasks[index].roomate);

  if (editedTask !== null && editedDueDate !== null) {
      tasks[index].task = editedTask;
      tasks[index].dueDate = editedDueDate;
      tasks[index].roomate = editedRoomate;
      localStorage.setItem('tasks', JSON.stringify(tasks));
      loadTasks();
  }
}

function deleteTask(index) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  let deletedTasks = JSON.parse(localStorage.getItem('deletedTasks')) || [];

  const deletedTask = tasks.splice(index, 1)[0];
  deletedTasks.push(deletedTask);

  localStorage.setItem('tasks', JSON.stringify(tasks));
  localStorage.setItem('deletedTasks', JSON.stringify(deletedTasks));
  
  loadTasks();
}

function undoDelete(){
  let deletedTasks = JSON.parse(localStorage.getItem('deletedTasks')) || [];
  if (deletedTasks.length > 0){
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const lastDeletedTask = deletedTasks.pop();
    tasks.push(lastDeletedTask);

    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('deletedTasks', JSON.stringify(deletedTasks));

    loadTasks();
  } else {
    alert("No task deletion to undo")
  }
}

function clearTasks() {
  localStorage.removeItem('tasks');
  localStorage.removeItem('deletedTasks')
  loadTasks();
}

function loadTasks() {
  const todoList = document.getElementById('todoList');
  todoList.innerHTML = ''; //causing type error: "cannot set properties of null"

  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  tasks.forEach((taskObject, index) => {
      const li = document.createElement('li');
      li.textContent = `"${taskObject.task}" Assigned to: ${taskObject.roomate} (Due: ${taskObject.dueDate})`;
      
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', () => editTask(index));

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => deleteTask(index));

      li.appendChild(editButton);
      li.appendChild(deleteButton);

      todoList.appendChild(li);
  });
}


export default TaskBoard