const depositModal = document.getElementById('deposit-modal');
const depositBtn = document.getElementById('deposit-btn');
const depositInput = document.getElementById('deposit-input');
const depositConfirmBtn = document.getElementById('deposit-confirm-btn');
const depositClose = document.getElementById('deposit-close-btn');

const updateTableEvent = new Event('updateTableEvent')

depositBtn.addEventListener('click', () => {
    userOptionsModal.close();
    depositModal.showModal();
    console.log('selecteduser:', selectedUser)
    
})

depositConfirmBtn.addEventListener('click', () => {
    const amount = parseFloat(depositInput.value);
    let currentBalance = selectedUser.cash
    const balance = Number(currentBalance.replace(/\D/g, ""));
    
    if (!isNaN(amount) && amount > 0) {
        currentBalance = amount + balance
        console.log(currentBalance)

        document.dispatchEvent(updateTableEvent)

        depositModal.close();
    } else {
        alert('Please enter a valid amount to deposit.')
    }
});

depositClose.addEventListener('click', () => {
    depositModal.close();
    })