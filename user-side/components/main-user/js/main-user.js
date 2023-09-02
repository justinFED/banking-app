function logout() {
    window.location.href = '/index.html';
}

function registerUser() {
    // Get user input data
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
    
    depositButton.addEventListener("click", function() {
        const depositAmount = parseFloat(prompt("Enter the amount to deposit:"));
    
        if (!isNaN(depositAmount) && depositAmount > 0) {
            currentBalance += depositAmount;
            balanceAmount.innerText = "$" + currentBalance.toFixed(2);
    
            // Record the deposit transaction in the history
            const currentDate = new Date().toLocaleString();
            addTransactionRow(currentDate, "Deposit", depositAmount);
    
            localStorage.setItem("balance", currentBalance.toString());
        } else {
            alert("Please enter a valid positive number for the deposit.");
        }
    });
    
    withdrawButton.addEventListener("click", function() {
        const withdrawAmount = parseFloat(prompt("Enter the amount to withdraw:"));
    
        if (!isNaN(withdrawAmount) && withdrawAmount > 0 && currentBalance >= withdrawAmount) {
            currentBalance -= withdrawAmount;
            balanceAmount.innerText = "$" + currentBalance.toFixed(2);
    
            // Record the withdrawal transaction in the history
            const currentDate = new Date().toLocaleString();
            addTransactionRow(currentDate, "Withdrawal", withdrawAmount);
    
            localStorage.setItem("balance", currentBalance.toString());
        } else if (currentBalance < withdrawAmount) {
            alert("Insufficient balance to withdraw.");
        } else {
            alert("Please enter a valid positive number for the withdrawal.");
        }
    });
    



