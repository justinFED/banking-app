const signupForm = document.getElementById('signup-form');
const fullNameInput = document.getElementById('full-name');
const emailInput = document.getElementById('email');
const numberInput = document.getElementById('number');
const newPasswordInput = document.getElementById('new-password');
const retypePasswordInput = document.getElementById('retype-password');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = fullNameInput.value;
    const email = emailInput.value;
    const number = numberInput.value;

    if(newPasswordInput.value !== retypePasswordInput.value) {
        alert('Passwords do not match. Please re-enter.');
        return;
    }

    const userData = {
        name: name,
        email: email,
        phone: number,
        password: newPasswordInput.value
    };

    localStorage.setItem('userData', JSON.stringify(userData));

    alert('Account created successfully!');
    signupForm.reset();
});