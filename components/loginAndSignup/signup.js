const signupForm = document.getElementById('signup-form');
const fullNameInput = document.getElementById('full-name');
const emailInput = document.getElementById('email');
const numberInput = document.getElementById('number');
const newPasswordInput = document.getElementById('new-password');
const retypePasswordInput = document.getElementById('retype-password');
const togglePassword = document.querySelector('.fa-regular')

let isToggling = false;
let timeoutId;

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = fullNameInput.value;
    const email = emailInput.value;
    const number = numberInput.value;
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    if (existingUsers.some(user => user.email === email)) {
        alert('An account with this email already exists. Please log in.');
        return;
    }

    if (/^\d/.test(name)) {
        alert('Name cannot start with a number.');
        return;
    }

    if(newPasswordInput.value !== retypePasswordInput.value) {
        alert('Passwords do not match. Please re-enter.');
        return;
    }

    const newUser = {
        name: name,
        email: email,
        phone: number,
        password: newPasswordInput.value
    };

    existingUsers.push(newUser);

    localStorage.setItem('users', JSON.stringify(existingUsers));

    alert('Account created successfully!');
    signupForm.reset();
    window.location.href = '../loginAndSignup/login.html';
});

function togglePasswordVisibility(inputElement) {
    if (inputElement.type === 'password') {
        inputElement.type = 'text';
    } else {
        inputElement.type = 'password';
    }
}

togglePassword.addEventListener('mousedown', () => {
    isToggling = true;
    timeoutId = setTimeout(() => {
        if (isToggling) {
            togglePasswordVisibility(newPasswordInput);
            togglePasswordVisibility(retypePasswordInput);
        }
    }, 10);
});

togglePassword.addEventListener('mouseup', () => {
    togglePasswordVisibility(newPasswordInput);
    togglePasswordVisibility(retypePasswordInput);
});
