document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    const storedAdminData = JSON.parse(localStorage.getItem('adminData'));
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.querySelector('.fa-regular');

    let isToggling = false;
    let timeoutId;

    if (storedUserData) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const enteredEmail = emailInput.value;
            const enteredPassword = passwordInput.value;

            if (enteredEmail === storedUserData.email && enteredPassword === storedUserData.password) {
                window.location.href = '/user-side/components/main-user/main-user.html';
            } else {
                alert('Invalid email or password. Please try again.');
            }
        });
    } else if (storedAdminData) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const enteredEmail = emailInput.value;
            const enteredPassword = passwordInput.value;

            if (enteredEmail === storedAdminData.email && enteredPassword === storedAdminData.password) {
                window.location.href = '../main/main.html'; 
            } else {
                alert('Invalid email or password. Please try again.');
            }
        });
    } else {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = emailInput.value;
            const password = passwordInput.value;

            const predefinedAdminEmail = "admin@jk.com";
            const predefinedAdminPassword = "admin";

            if (email === predefinedAdminEmail && password === predefinedAdminPassword) {
                alert("Admin Login successful!");
                window.location.href = "../main/main.html";
            } else {
                alert("Invalid email or password");
            }
        });
    }


    togglePassword.addEventListener('mousedown', () => {
        isToggling = true;
        timeoutId = setTimeout(() => {
            if (isToggling) {
                togglePasswordVisibility();
            }
        }, 10);
    });

    togglePassword.addEventListener('mouseup', () => {
        togglePasswordVisibility();
    });








});
