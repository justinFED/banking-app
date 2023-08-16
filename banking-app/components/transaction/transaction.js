document.addEventListener("DOMContentLoaded", () => {
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

        const transactionData = addUser.map(user => ({
            name: user.username,
            email: user.email,
            phone: user.phone,
            totalDeposit: parseFloat(user.cash.replace('$', '').replace(',', '')) || 0,
            totalWithdraw: 0,
        }));

        setTransactionData(transactionData);
    }

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

        const transactionData = addUser.map(user => ({
            name: user.username,
            email: user.email,
            phone: user.phone,
            totalDeposit: parseFloat(user.cash.replace('$', '').replace(',', '')) || 0,
            totalWithdraw: 0,
        }));
        setTransactionData(transactionData);
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

    depositBtn.addEventListener('click', openModal);

    function openModal() {
        modalContainer.innerHTML = '';
        modalContainer.innerHTML = '<iframe class="iframe" src="../deposit/deposit.html"></iframe>';
    }

    function updateTable(data) {
        userTableBody.innerHTML = "";

        data.forEach((user, index) => {
            const newRow = userTableBody.insertRow();
            const nameCell = newRow.insertCell();
            const emailCell = newRow.insertCell();
            const phoneCell = newRow.insertCell();
            const cashCell = newRow.insertCell();
            const editCell = newRow.insertCell();

            nameCell.innerHTML = `<div class="name"><h5>${user.username}</h5></div>`;
            emailCell.textContent = user.email;
            phoneCell.textContent = user.phone;
            cashCell.textContent = user.cash;
           
        });


        localStorage.setItem("addUser", JSON.stringify(data));
    }

    function updateTotalUsersCount(data) {
        totalUsersElement.textContent = data.length;

        const totalCash = data.reduce((total, user) => {
            const cashValue = parseFloat(user.cash.replace('$', '').replace(',', '')) || 0;
            return total + cashValue;
        }, 0);

        const totalCashElement = document.getElementById("totalCash");
        totalCashElement.textContent = "$" + totalCash.toFixed(2);
        localStorage.setItem("addUser", JSON.stringify(data));
    }

    function setTransactionData(data) {
        localStorage.setItem('transactionData', JSON.stringify(data));
    }



});
