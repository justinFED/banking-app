const addUserButton = document.getElementById("add-user");
const popup = document.getElementById("popup");
const closePopup = document.getElementById("close");
const userForm = document.getElementById("user-form");
const userTableBody = document.getElementById("user-list");
const totalUsersElement = document.getElementById("totalUsers");

let addUser = [];

const savedAddUser = localStorage.getItem("addUser");
if (savedAddUser) {
    addUser = JSON.parse(savedAddUser);
    updateTable(addUser);
    updateTotalUsersCount(addUser);
}

document.addEventListener("DOMContentLoaded", () => {
    addUserButton.addEventListener("click", () => {
        popup.style.display = "flex";
    });

    closePopup.addEventListener("click", () => {
        popup.style.display = "none";
    });

    userForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone-input").value;
        const cash = "$" + (document.getElementById("cash-input").value || "0");

        const existingUser = addUser.find(user => user.email === email.toLowerCase());
        if (existingUser) {
            alert("User with this email already exists.");
            return;
        }

        addUser.push({ username, email, phone, cash });

        document.getElementById("username").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone-input").value = "";
        document.getElementById("cash-input").value = "";

        popup.style.display = "none";
        localStorage.setItem("addUser", JSON.stringify(addUser));

        updateTable(addUser);
        updateTotalUsersCount(addUser);
    });

    const searchInput = document.querySelector(".search input");
    searchInput.addEventListener("input", () => {
        const searchQuery = searchInput.value.toLowerCase();
        const filteredData = addUser.filter(user =>
            user.username.toLowerCase().includes(searchQuery) ||
            user.email.toLowerCase().includes(searchQuery) ||
            user.phone.toLowerCase().includes(searchQuery)
        );

        updateTable(filteredData);
    });

    document.addEventListener('updateTableEvent', () => {
        updateTable(addUser);
    })
});

function updateTable(data) {
    userTableBody.innerHTML = "";

    data.forEach((user, index) => {
        const newRow = userTableBody.insertRow();
        const nameCell = newRow.insertCell();
        const emailCell = newRow.insertCell();
        const phoneCell = newRow.insertCell();
        const cashCell = newRow.insertCell();
        const deleteCell = newRow.insertCell();

        nameCell.innerHTML = `<div class="name"><button class="user-btn">${user.username}</button></div>`;
        emailCell.textContent = user.email;
        phoneCell.textContent = user.phone;
        cashCell.textContent = user.cash;

        const trashBinIcon = document.createElement("i");
        trashBinIcon.className = "fas fa-trash-alt delete-icon";
        deleteCell.appendChild(trashBinIcon);

        trashBinIcon.addEventListener("click", () => {
            addUser.splice(index, 1);
            updateTable(addUser);
            updateTotalUsersCount(addUser);
            localStorage.setItem("addUser", JSON.stringify(addUser));
        });
    });
}

function updateTotalUsersCount(data) {
    totalUsersElement.textContent = data.length;

    const totalCash = data.reduce((total, user) => {
        const cashValue = parseFloat(user.cash.replace('$', '').replace(',', '')) || 0;
        return total + cashValue;
    }, 0);

    const totalCashElement = document.getElementById("totalCash");
    totalCashElement.textContent = "$" + totalCash.toFixed(2);
}

const depositModal = document.getElementById('deposit-modal');
const depositBtn = document.getElementById('deposit-btn');
const depositInput = document.getElementById('deposit-input');
const depositConfirmBtn = document.getElementById('deposit-confirm-btn');
const depositClose = document.getElementById('deposit-close-btn');

depositBtn.addEventListener('click', () => {
    userOptionsModal.close();
    depositModal.showModal();
});

depositConfirmBtn.addEventListener('click', () => {
    const amount = parseFloat(depositInput.value);
    let currentBalance = selectedUser.cash;
    const balance = parseFloat(currentBalance.replace('$', '').replace(',', ''));
    
    if (!isNaN(amount) && amount > 0) {
        const newBalance = balance + amount; 
        selectedUser.cash = "$" + newBalance.toFixed(2); 

        localStorage.setItem("addUser", JSON.stringify(addUser)); 
        updateTable(addUser); 
        updateTotalUsersCount(addUser);

        depositModal.close();
    } else {
        alert('Please enter a valid amount to deposit.');
    }
});

depositClose.addEventListener('click', () => {
    depositModal.close();
});

const transferModal = document.getElementById('transfer-modal');
const transferBtn = document.getElementById('transfer-btn');
const transferRecipientInput = document.getElementById('transfer-recipient');
const transferAmountInput = document.getElementById('transfer-amount');
const transferConfirmBtn = document.getElementById('transfer-confirm-btn');
const transferCloseBtn = document.getElementById('transfer-close-btn');

transferBtn.addEventListener('click', () => {
    userOptionsModal.close();
    transferModal.showModal();
});
