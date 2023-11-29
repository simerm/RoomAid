import React from 'react'
import "./TaskBoard.css"

const TaskBoard = () => {
  return (
    <div className="container">
      <ul id="todoList"/>
      <div>
        <input type="text" id="taskInput" placeholder="New Task..."></input>
        <input type="date" id="dueDate"></input>
        <input type="text" id="roomate" placeholder="Assigned roomate"></input>
        <button onClick={addTask}>Add Task</button>
        <button onClick={clearTasks}>Clear All</button>
      </div>
    </div>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
});

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
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  loadTasks();
}

function clearTasks() {
  localStorage.removeItem('tasks');
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