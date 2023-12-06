import React from 'react'
import {useEffect} from 'react'
import "./Grocery.css"

const Grocery = () => {

  useEffect(() => loadGroceries(), [])

  const validKeyForQuanity = ["0","1","2","3","4","5","6","7","8","9","Backspace"];

  return (
    <div className="container">
      <h1>Grocery</h1>
      <ul id="groceryList"></ul>
      <div>
        <input type="text" id="GroceryInput" placeholder="New Grocery Item..."/>
        <input type="text" onKeyDown= {(evt) => {
          if (!validKeyForQuanity.includes(evt.key)){
            evt.preventDefault();
          }
        }}
        id="QuantityInput" placeholder="Quantity..."/>
        <button onClick={addTask}>Add Item</button>
        <button onClick={clearTasks}>Clear All</button>
        <button onClick={undoDelete}>Undo Deletion</button>
      </div>
    </div>
  )
}

function addTask() {
  const groceryInput = document.getElementById('GroceryInput');
  const quantityInput = document.getElementById('QuantityInput');
  
  const grocery = groceryInput.value;
  const quantity = quantityInput.value;

  if (grocery.trim() === "") {
      alert("Grocery name cannot be empty");
      return;
  }

  const groceryObject = {
      grocery: grocery,
      quantity: quantity
  };

  let groceries = JSON.parse(localStorage.getItem('groceries')) || [];
  groceries.push(groceryObject);
  localStorage.setItem('groceries', JSON.stringify(groceries));

  groceryInput.value = '';
  quantityInput.value = '';
  loadGroceries();
}

function editGrocery(index) {
  let groceries = JSON.parse(localStorage.getItem('groceries')) || [];
  const editedGrocery = prompt("Edit grocery:", groceries[index].grocery);
  const editedQuantity = prompt("Edit quantity:", groceries[index].quantity);

  if (editedGrocery !== null && editedQuantity !== null) {
      groceries[index].grocery = editedGrocery;
      groceries[index].quantity = editedQuantity;
      localStorage.setItem('groceries', JSON.stringify(groceries));
      loadGroceries();
  }
}

function deleteTask(index) {
  let groceries = JSON.parse(localStorage.getItem('groceries')) || [];
  let deletedGroceries = JSON.parse(localStorage.getItem('deletedGroceries')) || [];


  const deletedGrocery = groceries.splice(index, 1)[0];
  deletedGroceries.push(deletedGrocery);

  localStorage.setItem('groceries', JSON.stringify(groceries));
  localStorage.setItem('deletedGroceries', JSON.stringify(deletedGroceries));

  loadGroceries();
}

function undoDelete(){
  let deletedGroceries = JSON.parse(localStorage.getItem('deletedGroceries')) || [];
  if (deletedGroceries.length > 0){
    let groceries = JSON.parse(localStorage.getItem('groceries')) || [];
    const lastDeletedGrocery = deletedGroceries.pop();
    groceries.push(lastDeletedGrocery);

    localStorage.setItem('groceries', JSON.stringify(groceries));
    localStorage.setItem('deletedGroceries', JSON.stringify(deletedGroceries));

    loadGroceries();
  } else {
    alert("No task deletion to undo")
  }
}

function clearTasks() {
  localStorage.removeItem('groceries');
  localStorage.removeItem('deletedGroceries');
  loadGroceries();
}

function loadGroceries() {
  const groceryList = document.getElementById('groceryList');
  groceryList.innerHTML = '';

  const groceries = JSON.parse(localStorage.getItem('groceries')) || [];

  groceries.forEach((groceryObject, index) => {
      const li = document.createElement('li');
      li.textContent = `"${groceryObject.grocery}" Quantity: ${groceryObject.quantity}`;
      
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', () => editGrocery(index));

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => deleteTask(index));

      li.appendChild(editButton);
      li.appendChild(deleteButton);

      groceryList.appendChild(li);
  });
}


export default Grocery