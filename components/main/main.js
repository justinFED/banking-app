// Main
function logout() {
    window.location.href = '/index.html';
}

function registerUser() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const newUser = {
        username: username,
        email: email,
        password: password
    };

 
    let users = JSON.parse(localStorage.getItem('users')) || [];


    users.push(newUser);

 
    localStorage.setItem('users', JSON.stringify(users));

    document.getElementById('username').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';

    alert('User registered successfully!');
}


    // Balance + Deposit + Withdraw 

    const depositButton = document.getElementById("depositBtn");
    const withdrawButton = document.getElementById("withdrawBtn");
    const balanceAmount = document.getElementById("balanceAmount");
    const transactionHistory = document.getElementById("transaction-history");
    
    let currentBalance = parseFloat(localStorage.getItem("balance")) || 0;
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    
    balanceAmount.innerText = "$" + currentBalance.toFixed(2);
    
    function addTransactionRow(date, description, amount) {
        const row = document.createElement("tr");
        const dateCell = document.createElement("td");
        const descriptionCell = document.createElement("td");
        const amountCell = document.createElement("td");
    
        dateCell.innerText = date;
        descriptionCell.innerText = description;
        amountCell.innerText = "$" + amount.toFixed(2);
    
        row.appendChild(dateCell);
        row.appendChild(descriptionCell);
        row.appendChild(amountCell);
    
        transactionHistory.appendChild(row);
    }
    
    function updateLocalStorage() {
        localStorage.setItem("balance", currentBalance.toString());
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }
    
    transactions.forEach(transaction => {
        addTransactionRow(transaction.date, transaction.description, transaction.amount);
    });
    
    depositButton.addEventListener("click", function() {
        const depositAmount = parseFloat(prompt("Enter the amount to deposit:"));
    
        if (!isNaN(depositAmount) && depositAmount > 0) {
            currentBalance += depositAmount;
            balanceAmount.innerText = "$" + currentBalance.toFixed(2);
    
            const currentDate = new Date().toLocaleString();
            addTransactionRow(currentDate, "Deposit", depositAmount);
            
            transactions.push({ date: currentDate, description: "Deposit", amount: depositAmount });
            updateLocalStorage();
        } else {
            alert("Please enter a valid positive number for the deposit.");
        }
    });
    
    withdrawButton.addEventListener("click", function() {
        const withdrawAmount = parseFloat(prompt("Enter the amount to withdraw:"));
    
        if (!isNaN(withdrawAmount) && withdrawAmount > 0 && currentBalance >= withdrawAmount) {
            currentBalance -= withdrawAmount;
            balanceAmount.innerText = "$" + currentBalance.toFixed(2);
    
            const currentDate = new Date().toLocaleString();
            addTransactionRow(currentDate, "Withdrawal", withdrawAmount);
            
            transactions.push({ date: currentDate, description: "Withdrawal", amount: withdrawAmount });
            updateLocalStorage();
        } else if (currentBalance < withdrawAmount) {
            alert("Insufficient balance to withdraw.");
        } else {
            alert("Please enter a valid positive number for the withdrawal.");
        }
    });
    
    
// End of Main

// Budget

let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("user-amount");
const checkAmountButton = document.getElementById("check-amount");
const totalAmountButton = document.getElementById("total-amount-button");
const productTitle = document.getElementById("product-title");
const errorMessage = document.getElementById("budget-error");
const productTitleError = document.getElementById("product-title-error");
const productCostError = document.getElementById("product-cost-error");
const amount = document.getElementById("amount");
const expenditureValue = document.getElementById("expenditure-value");
const balanceValue = document.getElementById("balance-amount");
const list = document.getElementById("list");

let tempAmount = 0;

const saveDataToLocalStorage = () => {
    const dataToSave = {
        tempAmount: tempAmount,
        totalBudget: amount.innerText,
        balance: balanceValue.innerText,
        expenditureValue: expenditureValue.innerText,
        expenses: []
    };

    const expenseItems = list.querySelectorAll(".sublist-content");
    expenseItems.forEach(item => {
        const productName = item.querySelector(".product").innerText;
        const expenseAmount = item.querySelector(".amount").innerText;
        dataToSave.expenses.push({ productName, expenseAmount });
    });

    localStorage.setItem('budgetData', JSON.stringify(dataToSave));
};

window.addEventListener('load', () => {
    const savedData = localStorage.getItem('budgetData');
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        tempAmount = parsedData.tempAmount;
        amount.innerText = parsedData.totalBudget;
        balanceValue.innerText = parsedData.balance;
        expenditureValue.innerText = parsedData.expenditureValue;
        parsedData.expenses.forEach(expense => {
            listCreator(expense.productName, expense.expenseAmount);
        });
    }
});

totalAmountButton.addEventListener("click", () => {
    tempAmount = totalAmount.value;
    if (tempAmount === "" || tempAmount < 0) {
        errorMessage.classList.remove("hide");
    } else {
        errorMessage.classList.add("hide");
        amount.innerText = tempAmount;
        balanceValue.innerText = tempAmount - expenditureValue.innerText;
        totalAmount.value = "";
        saveDataToLocalStorage();
    }
});

const disableButtons = (bool) => {
    let editButton = document.getElementsByClassName("edit");
    Array.from(editButton).forEach(element => {
        element.disabled = bool;
    });
};

const modifyElement = (element, edit = false) => {
    let parentDiv = element.parentElement;
    let currentBalance = balanceValue.innerText;
    let currentExpense = expenditureValue.innerText;
    let parentAmount = parentDiv.querySelector(".amount").innerText;
    if (edit) {
        let parentText = parentDiv.querySelector(".product").innerText;
        productTitle.value = parentText;
        userAmount.value = parentAmount;
        disableButtons(true);
    }
    balanceValue.innerText = parseInt(currentBalance) + parseInt(parentAmount);
    expenditureValue.innerText = parseInt(currentExpense) - parseInt(parentAmount);
    parentDiv.remove();
};

const listCreator = (expenseName, expenseValue) => {
    let sublistContent = document.createElement("div");
    sublistContent.classList.add("sublist-content", "flex-space");
    list.appendChild(sublistContent);
    sublistContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p>`;
    let editButton = document.createElement("button");
    editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
    editButton.style.fontSize = "24px";
    editButton.addEventListener("click", () => {
        modifyElement(editButton, true);
    });
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
    deleteButton.style.fontSize = "24px";
    deleteButton.addEventListener("click", () => {
        modifyElement(deleteButton);
    });
    sublistContent.appendChild(editButton);
    sublistContent.appendChild(deleteButton);
    document.getElementById("list").appendChild(sublistContent);
};

checkAmountButton.addEventListener("click", () => {
    if (!userAmount.value || !productTitle.value) {
        productTitleError.classList.remove("hide");
        return false;
    }
    disableButtons(false);
    let expenditure = parseInt(userAmount.value);
    let sum = parseInt(expenditureValue.innerText) + expenditure;
    expenditureValue.innerText = sum;
    const totalBalance = tempAmount - sum;
    balanceValue.innerText = totalBalance;
    listCreator(productTitle.value, userAmount.value);
    productTitle.value = "";
    userAmount.value = "";
    saveDataToLocalStorage();
});

const clearAllButton = document.getElementById("clear-all-button");

const clearAllData = () => {
    tempAmount = 0;
    amount.innerText = "0";
    balanceValue.innerText = "0";
    expenditureValue.innerText = "0";
    list.innerHTML = "";
    localStorage.removeItem('budgetData');
};

clearAllButton.addEventListener("click", () => {
    const confirmation = confirm("Are you sure you want to clear all data?");
    if (confirmation) {
        clearAllData();
    }
});



// End of Budget

// Contacts

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


// End of Contacts