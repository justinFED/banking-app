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

        nameCell.innerHTML = name;
        emailCell.innerHTML = email;

        
        saveContactToLocalStorage(name, email);
    }
}


function saveContactToLocalStorage(name, email) {
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    contacts.push({ name, email });
    localStorage.setItem("contacts", JSON.stringify(contacts));
}


function loadContactsFromLocalStorage() {
    const table = document.getElementById("contactsTable").getElementsByTagName('tbody')[0];
    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    for (const contact of contacts) {
        const newRow = table.insertRow(-1);
        const nameCell = newRow.insertCell(0);
        const emailCell = newRow.insertCell(1);

        nameCell.innerHTML = contact.name;
        emailCell.innerHTML = contact.email;
    }
}

function isValidEmail(email) {
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.value = email;
    return emailInput.checkValidity();
}


const addContactIcon = document.getElementById("addContactIcon");
addContactIcon.addEventListener("click", addContactToTable);


window.addEventListener("load", loadContactsFromLocalStorage);