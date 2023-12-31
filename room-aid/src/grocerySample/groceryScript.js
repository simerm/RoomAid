document.addEventListener('DOMContentLoaded', () => {
    loadGroceries();
});

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
    groceries.splice(index, 1);
    localStorage.setItem('groceries', JSON.stringify(groceries));
    loadGroceries();
}

function clearTasks() {
    localStorage.removeItem('groceries');
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
