const withdrawModal = document.getElementById('withdraw-modal');
const withdrawBtn = document.getElementById('withdraw-btn');
const withdrawInput = document.getElementById('withdraw-input');
const withdrawConfirmBtn = document.getElementById('withdraw-confirm-btn');
const withdrawClose = document.getElementById('withdraw-close-btn');
const withdrawCheckModal = document.getElementById('confirm-withdraw-modal')
const withdrawYes = document.getElementById('yes-withdraw')
const withdrawNo = document.getElementById('no-withdraw')
const withdrawAmount = document.getElementById('withdraw-amount');
const withdrawEmail = document.getElementById('withdraw-email')

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
        withdrawAmount.innerHTML = `$${withdrawInput.value}`
        withdrawEmail.innerHTML = selectedUser.email
        withdrawCheckModal.showModal();
        const newBalance = balance - amount;
        selectedUser.cash = "$" + newBalance.toFixed(2); 
        withdrawModal.close();
    } else {
        alert('Please enter a valid amount to withdraw.');
    }
});

withdrawYes.addEventListener('click', () => {
    localStorage.setItem("addUser", JSON.stringify(addUser));
    updateTable(addUser);
    withdrawCheckModal.close()
})

withdrawNo.addEventListener('click', () => {
    withdrawCheckModal.close()
})

withdrawClose.addEventListener('click', () => {
    withdrawModal.close();
});
