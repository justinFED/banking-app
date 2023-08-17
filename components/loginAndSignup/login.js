const storedUserData = JSON.parse(localStorage.getItem('userData'));
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

if (storedUserData) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const enteredEmail = emailInput.value;
        const enteredPassword = passwordInput.value;

        if (enteredEmail ===  storedUserData.email && enteredPassword === storedUserData.password) {
            window.location.href = '../main/main.html'
        } else {
            alert('Invalid email or password. Please try again.')
        }
    });
}