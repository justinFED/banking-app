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

        saveContactToLocalStorage(name, email);
    }
}


function saveContactToLocalStorage(name, email, hasDeleteButton = true) {
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    contacts.push({ name, email, hasDeleteButton });
    localStorage.setItem("contacts", JSON.stringify(contacts));
}


function loadContactsFromLocalStorage() {
    const table = document.getElementById("contactsTable").getElementsByTagName('tbody')[0];
    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    for (const contact of contacts) {
        const newRow = table.insertRow(-1);
        const nameCell = newRow.insertCell(0);
        const emailCell = newRow.insertCell(1);
        const deleteCell = newRow.insertCell(2);

        nameCell.innerHTML = contact.name;
        emailCell.innerHTML = contact.email;

        if (contact.hasDeleteButton) {
            const deleteButton = document.createElement("button");
            deleteButton.className = "delete-button";
            deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
            deleteButton.addEventListener("click", function () {
                deleteContact(this);
            });
            deleteCell.appendChild(deleteButton);
        }
    }
}

function isValidEmail(email) {
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.value = email;
    return emailInput.checkValidity();
}

function deleteContact(buttonElement) {
    var row = buttonElement.closest('tr');
    row.remove();
}


const addContactIcon = document.getElementById("addContactIcon");
addContactIcon.addEventListener("click", addContactToTable);


window.addEventListener("load", loadContactsFromLocalStorage);