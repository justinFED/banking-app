const depositModal = document.getElementById('deposit-modal');
const depositBtn = document.getElementById('deposit-btn');
const depositInput = document.getElementById('deposit-input');
const depositConfirmBtn = document.getElementById('deposit-confirm-btn');
const depositClose = document.getElementById('deposit-close-btn');

depositBtn.addEventListener('click', () => {
    userOptionsModal.close();
    depositModal.showModal();
    console.log('selecteduser:', selectedUser)
    
})

depositConfirmBtn.addEventListener('click', () => {
    const amount = parseFloat(depositInput.value);
    if (!isNaN(amount) && amount > 0) {
        const balance = parseFloat(localStorage.getItem('cash'));
        selectedUser.cash = amount + balance
        console.log(selectedUser.cash)
    } else {
        alert('Please enter a valid amount to deposit.')
    }
});

depositClose.addEventListener('click', () => {
    depositModal.close();
    })