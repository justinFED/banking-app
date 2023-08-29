document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.querySelector('.fa-regular');

    let isToggling = false;
    let timeoutId;

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const enteredEmail = emailInput.value;
        const enteredPassword = passwordInput.value;

        const storedUserData = JSON.parse(localStorage.getItem('users'));
        const storedAdminData = JSON.parse(localStorage.getItem('adminData'));

        const matchedUser = storedUserData.find(user => user.email === enteredEmail && user.password === enteredPassword);

        if (matchedUser) {
            window.location.href = '/user-side/components/main-user/main-user.html';
        } else if (storedAdminData && enteredEmail === storedAdminData.email && enteredPassword === storedAdminData.password) {
            window.location.href = '../main/main.html'; 
        } else {
            const predefinedAdminEmail = "admin@jk.com";
            const predefinedAdminPassword = "admin";

            if (enteredEmail === predefinedAdminEmail && enteredPassword === predefinedAdminPassword) {
                alert("Admin Login successful!");
                localStorage.setItem("adminData", JSON.stringify({ email: enteredEmail, password: enteredPassword }));
                window.location.href = "../main/main.html";
            } else {
                alert("Invalid email or password");
            }
        }
    });

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
