const withdrawModal = document.getElementById('withdraw-modal');
const withdrawBtn = document.getElementById('withdraw-btn');
const withdrawInput = document.getElementById('withdraw-input');
const withdrawConfirmBtn = document.getElementById('withdraw-confirm-btn');
const withdrawClose = document.getElementById('withdraw-close-btn');

withdrawBtn.addEventListener('click', () => {
    userOptionsModal.close();
    withdrawModal.showModal();
    console.log('selecteduser:', selectedUser);
});

withdrawConfirmBtn.addEventListener('click', () => {
    const amount = parseFloat(withdrawInput.value);
    let currentBalance = selectedUser.cash;
    const balance = parseFloat(currentBalance.replace('$', '').replace(',', '')); // Convert to a numeric value

    if (!isNaN(amount) && amount > 0 && amount <= balance) {
        const newBalance = balance - amount; // Dto - minus pra ideduct sa cash
        selectedUser.cash = "$" + newBalance.toFixed(2); 

        localStorage.setItem("addUser", JSON.stringify(addUser)); 
        updateTable(addUser); 
        updateTotalUsersCount(addUser);

        withdrawModal.close();
    } else {
        alert('Please enter a valid amount to withdraw.');
    }
});

withdrawClose.addEventListener('click', () => {
    withdrawModal.close();
});
