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


    // Balance
const depositButton = document.getElementById("depositBtn");
const balanceAmount = document.getElementById("balanceAmount");


let currentBalance = parseFloat(localStorage.getItem("balance")) || 0;


balanceAmount.innerText = "$" + currentBalance.toFixed(2);


depositButton.addEventListener("click", function() {
  
    const depositAmount = parseFloat(prompt("Enter the amount to deposit:"));
    

    if (!isNaN(depositAmount) && depositAmount > 0) {
 
        currentBalance += depositAmount;

    
        balanceAmount.innerText = "$" + currentBalance.toFixed(2);

      
        localStorage.setItem("balance", currentBalance.toString());
        
    } else {
        alert("Please enter a valid positive number for the deposit.");
    }
});


