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

// Set Budget App

totalAmountButton.addEventListener("click", () => {
    tempAmount = totalAmount.value;
    // empty or negats
    if(tempAmount === "" || tempAmount < 0) {
        errorMessage.classList.remove("hide")
    }
    else{
        errorMessage.classList.add("hide");
        // Set budget
        amount.innerHTML = tempAmount;
        // Set Balance
        balanceValue.innerText = tempAmount - expenditureValue.innerText;
        // Clear
        totalAmount.value = "";
    }

});

// Function To Disable Edit and Delete Button

const disableButtons = (bool) => {
    let editButton = document.getElementsByClassName("edit");
    Array.from(editButton).forEach(element => {
        element.disabled = bool;
    });
};

// Function to Modify List

const modifyElement = (element, edit=false) => {
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

// Function Create List

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
        modifyElement(deleteButton);} );
 
    sublistContent.appendChild(editButton);
    sublistContent.appendChild(deleteButton);
    document.getElementById("list").appendChild(sublistContent);
    
};

// Fuction to Add Expense

checkAmountButton.addEventListener("click", () => {
    if(!userAmount.value || !productTitle.value) {
        productTitleError.classList.remove("hide");
        return false;
    }

    disableButtons(false);
    
    //Expense
    let expenditure = parseInt(userAmount.value);

    // Total Expense

    let sum = parseInt(expenditureValue.innerText) + expenditure;
    expenditureValue.innerText = sum;
    

    // Total Balance
    const totalBalance = tempAmount - sum;
    balanceValue.innerText = totalBalance;

    // Create List
    listCreator(productTitle.value, userAmount.value);
    productTitle.value = "";
    userAmount.value = "";
});



























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
