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
