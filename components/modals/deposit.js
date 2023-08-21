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
    const balance = parseFloat(currentBalance.replace('$', '').replace(',', ''));
    
    if (!isNaN(amount) && amount > 0) {
        const newBalance = balance + amount; // Eto nag cacalculate ng cash kaya + plus sign nakalagay kse add cash
        selectedUser.cash = "$" + newBalance.toFixed(2); // Eto nag uupdate ng cash property
        console.log(currentBalance)

        localStorage.setItem("addUser", JSON.stringify(addUser)); // Eto nag uupdate sa localstorage
        updateTable(addUser);

        depositModal.close();
    } else {
        alert('Please enter a valid amount to deposit.')
    }
});

depositClose.addEventListener('click', () => {
    depositModal.close();
    })