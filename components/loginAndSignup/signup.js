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
    const existingUserData = JSON.parse(localStorage.getItem('userData'));

    if (existingUserData && existingUserData.email === email) {
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

    const userData = {
        name: name,
        email: email,
        phone: number,
        password: newPasswordInput.value
    };

    localStorage.setItem('userData', JSON.stringify(userData));

    alert('Account created successfully!');
    signupForm.reset();
    window.location.href = '../main/main.html'
});

function togglePasswordVisibility(inputElement) {
    if (inputElement.type === 'password') {
        inputElement.type = 'text'
    } else {
        inputElement.type = 'password'
    }
}

togglePassword.addEventListener('mousedown', () => {
    isToggling = true;
    timeoutId = setTimeout(() => {
        if (isToggling) {
            togglePasswordVisibility(newPasswordInput);
            togglePasswordVisibility(retypePasswordInput)
        }
    }, 10)
})

togglePassword.addEventListener('mouseup', () => {
    togglePasswordVisibility(newPasswordInput)
    togglePasswordVisibility(retypePasswordInput)
})