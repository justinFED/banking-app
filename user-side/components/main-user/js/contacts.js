if (!localStorage.getItem("balance")) {
    localStorage.setItem("balance", "0");
}


function updateBalanceDisplay(newBalance) {
    const balanceAmount = document.getElementById("balanceAmount");
    balanceAmount.textContent = `$${newBalance.toFixed(2)}`;
}


function updateLocalStorageBalance(newBalance) {
    localStorage.setItem("balance", newBalance.toFixed(2));
}


function searchContactByEmail(email) {
    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    
    for (const contact of contacts) {
        if (contact.email === email) {
            return contact; 
        }
    }

    return null; 
}


let availableBalance = parseFloat(localStorage.getItem("balance")) || 0;


function updateBalanceDisplay() {
    const balanceAmount = document.getElementById("balanceAmount");
    balanceAmount.textContent = `$${availableBalance.toFixed(2)}`;
}


updateBalanceDisplay();

const transferButton = document.getElementById("transferBtn");
transferButton.addEventListener("click", transferMoney);

function transferMoney() {
    const amount = parseFloat(prompt("Enter the amount to transfer:"));

    if (isNaN(amount) || amount <= 0) {
        alert("Invalid amount. Please enter a valid amount.");
        return;
    }

    if (amount > availableBalance) {
        alert("Insufficient balance.");
        return;
    }

    const transferToEmail = prompt("Enter the contact's email to transfer to:");

    if (!isValidEmail(transferToEmail)) {
        alert("Invalid email. Please enter a valid email address.");
        return;
    }

    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    const contactIndex = contacts.findIndex(contact => contact.email === transferToEmail);

    if (contactIndex !== -1) {
        const contact = contacts[contactIndex];
        const newBalance = contact.balance + amount;
        addTransactionRow(new Date().toLocaleString(), `Transfer to ${transferToEmail}`, -amount);

        let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
        transactions.push({ date: new Date().toLocaleString(), description: `Transfer to ${transferToEmail}`, amount: -amount });
        localStorage.setItem("transactions", JSON.stringify(transactions));

        contact.balance = newBalance;
        localStorage.setItem(`contactBalance_${contact.email}`, newBalance.toString());

        availableBalance -= amount;
        localStorage.setItem("balance", availableBalance.toFixed(2));

        localStorage.setItem("contacts", JSON.stringify(contacts));

        updateBalanceDisplay();
        updateBalanceInTable(transferToEmail, newBalance);

        alert(`Successfully transferred $${amount} to ${contact.name}. New balance: $${newBalance.toFixed(2)}`);
    } else {
        alert("Contact not found. Please check the email address.");
    }
}





function updateBalanceInTable(email, newBalance) {
    const emailCells = document.querySelectorAll('td:nth-child(2)');
    for (const emailCell of emailCells) {
        const emailInCell = emailCell.textContent.trim();
        if (emailInCell === email) {
            const row = emailCell.parentElement;
            const balanceCell = row.cells[2];
            balanceCell.textContent = `$${newBalance.toFixed(2)}`;
            break;
        }
    }
}


function initializeBalance() {
    const balance = parseFloat(localStorage.getItem("balance")) || 0;
    updateBalanceDisplay(balance);
}

initializeBalance();

function addContactToTable() {
    const name = prompt("Enter the contact's name:");
    let email;
    let balance;

    do {
        email = prompt("Enter the contact's email:");
    } while (!isValidEmail(email));

    do {
        balance = parseFloat(prompt("Enter the contact's balance:"));
    } while (isNaN(balance));

    if (name && email && !isNaN(balance)) {
        const table = document.getElementById("contactsTable").getElementsByTagName('tbody')[0];
        const newRow = table.insertRow(-1);
        const nameCell = newRow.insertCell(0);
        const emailCell = newRow.insertCell(1);
        const balanceCell = newRow.insertCell(2);
        const deleteCell = newRow.insertCell(3);

        nameCell.innerHTML = name;
        emailCell.innerHTML = email;
        balanceCell.innerHTML = "$" + balance.toFixed(2);

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.addEventListener("click", function () {
            deleteContact(this);
        });

        deleteCell.appendChild(deleteButton);

        saveContactToLocalStorage(name, email, balance, true);
    }
}

function saveContactToLocalStorage(name, email, balance, hasDeleteButton = true) {
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    contacts.push({ name, email, balance, hasDeleteButton });
    localStorage.setItem("contacts", JSON.stringify(contacts));
}

function loadContactsFromLocalStorage() {
    const tableBody = document.getElementById("contactsTableBody");
    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    for (const contact of contacts) {
        const newRow = tableBody.insertRow(-1);
        const nameCell = newRow.insertCell(0);
        const emailCell = newRow.insertCell(1);
        const balanceCell = newRow.insertCell(2);
        const deleteCell = newRow.insertCell(3);

        nameCell.innerHTML = contact.name;
        emailCell.innerHTML = contact.email;
        balanceCell.innerHTML = "$" + contact.balance.toFixed(2);

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
    const emailCell = row.cells[1];

    const email = emailCell.textContent.trim();

    row.remove();

    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    contacts = contacts.filter(contact => contact.email !== email);
    localStorage.setItem("contacts", JSON.stringify(contacts));
}



const addContactIcon = document.getElementById("addContactIcon");
addContactIcon.addEventListener("click", addContactToTable);

window.addEventListener("load", loadContactsFromLocalStorage);
