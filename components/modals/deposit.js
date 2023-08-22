const depositModal = document.getElementById('deposit-modal');
const depositBtn = document.getElementById('deposit-btn');
const depositInput = document.getElementById('deposit-input');
const depositConfirmBtn = document.getElementById('deposit-confirm-btn');
const depositClose = document.getElementById('deposit-close-btn');
const depositCheckModal = document.getElementById('confirm-deposit-modal')
const depositYes = document.getElementById('yes-deposit')
const depositNo = document.getElementById('no-deposit')
const depositAmount = document.getElementById('deposit-amount');
const depositEmail = document.getElementById('deposit-email')

depositBtn.addEventListener('click', () => {
    userOptionsModal.close();
    depositModal.showModal();
    console.log('selecteduser:', selectedUser)
    
})

depositConfirmBtn.addEventListener('click', () => {
    const amount = parseFloat(depositInput.value);
    let currentBalance = selectedUser.cash
    const balance = parseFloat(currentBalance.replace('$', '').replace(',', ''));
    
    if (!isNaN(amount) && amount > 0) {
        depositAmount.innerHTML = `$${depositInput.value}`
        depositEmail.innerHTML = selectedUser.email
        depositCheckModal.showModal();
        const newBalance = balance + amount;
        selectedUser.cash = "$" + newBalance.toFixed(2);
        console.log(currentBalance)
        depositModal.close();
    } else {
        alert('Please enter a valid amount to deposit.')
    }
});

depositYes.addEventListener('click', () => {
    localStorage.setItem("addUser", JSON.stringify(addUser));
    updateTable(addUser);
    depositCheckModal.close()
})

depositNo.addEventListener('click', () => {
    depositCheckModal.close()
})

depositClose.addEventListener('click', () => {
    depositModal.close();
    })