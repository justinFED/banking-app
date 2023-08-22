const transferModal = document.getElementById('transfer-modal');
const transferBtn = document.getElementById('transfer-btn');
const transferRecipientInput = document.getElementById('transfer-recipient');
const transferAmountInput = document.getElementById('transfer-amount');
const transferConfirmBtn = document.getElementById('transfer-confirm-btn');
const transferCloseBtn = document.getElementById('transfer-close-btn');
const transferCheckModal = document.getElementById('transfer-check-modal')
const transferYes = document.getElementById('yes-transfer')
const transferNo = document.getElementById('no-transfer')
const transferAmount = document.getElementById('transfer-amount');
const transferEmail = document.getElementById('transfer-email')
const recipientEmail = document.getElementById('recipient-email')

transferBtn.addEventListener('click', () => {
    userOptionsModal.close();
    transferModal.showModal();
});

transferConfirmBtn.addEventListener('click', () => {
    const recipientEmail = transferRecipientInput.value.toLowerCase();
    const amount = parseFloat(transferAmountInput.value);

    if (!recipientEmail || isNaN(amount) || amount <= 0) {
        alert('Please enter valid recipient email and amount.');
        return;
    }

    const senderIndex = addUser.findIndex(user => user.email.toLowerCase() === selectedUser.email.toLowerCase());
    const recipientIndex = addUser.findIndex(user => user.email.toLowerCase() === recipientEmail);

    if (senderIndex === -1) {
        alert('Sender not found.');
        return;
    }

    if (recipientIndex === -1) {
        alert('Recipient not found.');
        return;
    }

    const senderBalance = parseFloat(selectedUser.cash.replace('$', '').replace(',', ''));
    const recipientBalance = parseFloat(addUser[recipientIndex].cash.replace('$', '').replace(',', ''));

    if (senderBalance < amount) {
        alert('Insufficient funds.');
        return;
    }

    transferAmount.innerHTML = `$${transferAmountInput.value}`
    transferEmail.innerHTML = selectedUser.email
    recipientEmail.innerHTML = transferRecipientInput.value
    transferCheckModal.showModal();
    const newSenderBalance = senderBalance - amount;
    const newRecipientBalance = recipientBalance + amount;

    selectedUser.cash = '$' + newSenderBalance.toFixed(2);
    addUser[recipientIndex].cash = '$' + newRecipientBalance.toFixed(2);
    transferModal.close();
});

transferYes.addEventListener('click', () => {
    localStorage.setItem('addUser', JSON.stringify(addUser));
    updateTable(addUser);
    updateTotalUsersCount(addUser);
    transferCheckModal.close()
})

transferNo.addEventListener('click', () => {
    transferCheckModal.close()
})

transferCloseBtn.addEventListener('click', () => {
    transferModal.close();
});