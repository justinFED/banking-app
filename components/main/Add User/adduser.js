        // Get the modal element
        var modal = document.getElementById("addUserModal");

        // Get the <li> element for "Add User"
        var addUserListItem = document.querySelector("#items li:nth-child(5)");

        // Get the <span> element with the close button
        var closeBtn = document.querySelector(".close");

        // Show the modal when clicking on "Add User"
        addUserListItem.addEventListener("click", function () {
            modal.style.display = "block";
        });

        // Close the modal when clicking on the close button
        closeBtn.addEventListener("click", function () {
            modal.style.display = "none";
        });

        // Close the modal when clicking outside of it
        window.addEventListener("click", function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        });


        document.getElementById('data-form').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent form submission
            
            const name = document.getElementById('name-input').value;
            const email = document.getElementById('email-input').value;
            const phone = document.getElementById('phone-input').value;
            
            document.querySelector('.name h5').textContent = name;
            document.querySelector('.email p').textContent = email;
            document.querySelector('.phone').textContent = phone;
        });
        