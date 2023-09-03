// Initialize the balance in localStorage (you can set it to any initial value)
if (!localStorage.getItem("balance")) {
    localStorage.setItem("balance", "1000.00"); // Set an initial balance of $1000.00 if it doesn't exist
}

// Function to update the balance display
function updateBalanceDisplay(newBalance) {
    const balanceAmount = document.getElementById("balanceAmount");
    balanceAmount.textContent = `$${newBalance.toFixed(2)}`;
}

// Function to update the balance in localStorage
function updateLocalStorageBalance(newBalance) {
    localStorage.setItem("balance", newBalance.toFixed(2));
}

// ...

// Add an event listener for the "Transfer" button
const transferButton = document.getElementById("transferBtn");
transferButton.addEventListener("click", transferMoney);

function transferMoney() {
    // Get the amount to transfer from the user
    const amount = parseFloat(prompt("Enter the amount to transfer:"));
    
    // Check if the amount is valid (greater than 0 and available in balance)
    if (isNaN(amount) || amount <= 0) {
        alert("Invalid amount. Please enter a valid amount.");
        return;
    }

    // Check if the user has sufficient balance
    const availableBalance = parseFloat(localStorage.getItem("balance")) || 0;
    if (amount > availableBalance) {
        alert("Insufficient balance.");
        return;
    }

    // Get the contact to transfer to (you can use your existing code for this)
    const contactName = prompt("Enter the contact's name to transfer to:");

    // Update the available balance
    const newBalance = availableBalance - amount;

    // Update the balance in localStorage
    updateLocalStorageBalance(newBalance);

    // Update the balance display
    updateBalanceDisplay(newBalance);

    // Perform the transfer (you can implement this part based on your application's logic)
    // For example, you can update a transaction history, notify the user, etc.

    alert(`Successfully transferred $${amount} to ${contactName}. New balance: $${newBalance.toFixed(2)}`);
}

















function addContactToTable() {
    const name = prompt("Enter the contact's name:");
    let email;

    do {
        email = prompt("Enter the contact's email:");
    } while (!isValidEmail(email));

    if (name && email) {
        const table = document.getElementById("contactsTable").getElementsByTagName('tbody')[0];
        const newRow = table.insertRow(-1);
        const nameCell = newRow.insertCell(0);
        const emailCell = newRow.insertCell(1);
        const deleteCell = newRow.insertCell(2);

        nameCell.innerHTML = name;
        emailCell.innerHTML = email;
        

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.addEventListener("click", function () {
            deleteContact(this);
        });

        deleteCell.appendChild(deleteButton);

        saveContactToLocalStorage(name, email);
    }
}


function saveContactToLocalStorage(name, email, hasDeleteButton = true) {
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    contacts.push({ name, email, hasDeleteButton });
    localStorage.setItem("contacts", JSON.stringify(contacts));
}


function loadContactsFromLocalStorage() {
    const table = document.getElementById("contactsTable").getElementsByTagName('tbody')[0];
    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    for (const contact of contacts) {
        const newRow = table.insertRow(-1);
        const nameCell = newRow.insertCell(0);
        const emailCell = newRow.insertCell(1);
        const deleteCell = newRow.insertCell(2);

        nameCell.innerHTML = contact.name;
        emailCell.innerHTML = contact.email;

        if (contact.hasDeleteButton) {
            const deleteButton = document.createElement("button");
            deleteButton.className = "delete-button";
            deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
            deleteButton.addEventListener("click", function () {
                deleteContact(this);
            });
            deleteCell.appendChild(deleteButton);
        }
    }
}

function isValidEmail(email) {
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.value = email;
    return emailInput.checkValidity();
}

function deleteContact(buttonElement) {
    var row = buttonElement.closest('tr');
    row.remove();
}


const addContactIcon = document.getElementById("addContactIcon");
addContactIcon.addEventListener("click", addContactToTable);


window.addEventListener("load", loadContactsFromLocalStorage);