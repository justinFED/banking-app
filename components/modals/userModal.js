const userOptionsModal = document.querySelector('#user-options-modal');
const userOptionsClose = document.querySelector('#user-options-close');

let users = addUser;
let selectedUser = null;

userTableBody.addEventListener('click', (event) => {
    if (event.target.classList.contains('user-btn')) {
        const clickedUser = event.target.textContent;
        selectedUser = users.find(user => user.username === clickedUser)
        console.log('selecteduser:', selectedUser)
        userOptionsModal.showModal();
        }
    })

userOptionsClose.addEventListener('click', () => {
    userOptionsModal.close();
    })
