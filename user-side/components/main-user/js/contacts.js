if (!localStorage.getItem("usercontacts")) {
    localStorage.setItem("usercontacts", JSON.stringify([]));
}

function addContactToTable() {
    const name = prompt("Enter the contact's name:");
    let email;

    do {
        email = prompt("Enter the contact's email:");
    } while (!isValidEmail(email));

    if (name && email) {
        const table = document.getElementById("contactsTable").getElementsByTagName('tbody')[0];
        const newRow = table.insertRow(-1);
        const nameCell = newRow.insertCell(0);
        const emailCell = newRow.insertCell(1);
        const deleteCell = newRow.insertCell(2);

        nameCell.innerHTML = name;
        emailCell.innerHTML = email;

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.addEventListener("click", function () {
            deleteContact(this);
        });

        deleteCell.appendChild(deleteButton);

        const contacts = JSON.parse(localStorage.getItem("usercontacts"));
        contacts.push({ name, email });
        localStorage.setItem("usercontacts", JSON.stringify(contacts));
    }
}

const addContactIcon = document.getElementById("addContactIcon");
addContactIcon.addEventListener("click", addContactToTable);

window.addEventListener("load", function () {
    const contacts = JSON.parse(localStorage.getItem("usercontacts"));
    if (contacts) {
        const table = document.getElementById("contactsTable").getElementsByTagName('tbody')[0];
        contacts.forEach(contact => {
            const newRow = table.insertRow(-1);
            const nameCell = newRow.insertCell(0);
            const emailCell = newRow.insertCell(1);
            const deleteCell = newRow.insertCell(2);

            nameCell.innerHTML = contact.name;
            emailCell.innerHTML = contact.email;

            const deleteButton = document.createElement("button");
            deleteButton.className = "delete-button";
            deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
            deleteButton.addEventListener("click", function () {
                deleteContact(this);
            });

            deleteCell.appendChild(deleteButton);
        });
    }
});

function deleteContact(button) {
    const row = button.closest("tr");
    row.remove();

    const contacts = JSON.parse(localStorage.getItem("usercontacts"));
    const email = row.cells[1].textContent;
    const updatedContacts = contacts.filter(contact => contact.email !== email);
    localStorage.setItem("usercontacts", JSON.stringify(updatedContacts));
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
