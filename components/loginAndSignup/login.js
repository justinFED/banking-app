document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.querySelector('.fa-regular')

    let isToggling = false;
    let timeoutId;

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
    } else {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            const predefinedEmail = "admin@jk.com";
            const predefinedPassword = "admin";

            if (email === predefinedEmail && password === predefinedPassword) {
                alert("Login successful!");
                window.location.href = "../main/main.html";
            } else {
                alert("Invalid email or password");
            }
        });
    }

    function togglePasswordVisibility() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text'
        } else {
            passwordInput.type = 'password'
        }
    }

    togglePassword.addEventListener('mousedown', () => {
        isToggling = true;
        timeoutId = setTimeout(() => {
            if (isToggling) {
                togglePasswordVisibility();
            }
        }, 10)
    })

    togglePassword.addEventListener('mouseup', () => {
        togglePasswordVisibility()
    })
});
