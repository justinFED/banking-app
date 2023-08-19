const withdrawModal = document.getElementById('withdraw-modal');
const withdrawBtn = document.getElementById('withdraw-btn');
const withdrawInput = document.getElementById('withdraw-input');
const withdrawConfirmBtn = document.getElementById('withdraw-confirm-btn');
const withdrawClose = document.getElementById('withdraw-close-btn');


withdrawBtn.addEventListener('click', () => {
    userOptionsModal.close();
    withdrawModal.showModal();
    console.log('selecteduser:', selectedUser)
    
})

withdrawConfirmBtn.addEventListener('click', () => {
    const amount = parseFloat(withdrawInput.value);
    let currentBalance = selectedUser.cash
    const balance = Number(currentBalance.replace(/\D/g, ""));

    if (!isNaN(amount) && amount <= balance) {
        currentBalance = balance - amount
        console.log(currentBalance)
        withdrawModal.close();
    } else {
        alert('Please enter a valid amount to deposit.')
    }
});

withdrawClose.addEventListener('click', () => {
    withdrawModal.close();
    })