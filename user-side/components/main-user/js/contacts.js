function addContactToTable() {
    const name = prompt("Enter the contact's name:");
    const email = prompt("Enter the contact's email:");

    if (name && email) {
        const table = document.getElementById("contactsTable").getElementsByTagName('tbody')[0];
        const newRow = table.insertRow(-1);
        const nameCell = newRow.insertCell(0);
        const emailCell = newRow.insertCell(1);

        nameCell.innerHTML = name;
        emailCell.innerHTML = email;

        // Save the contact to localStorage
        saveContactToLocalStorage(name, email);
    }
}

// Function to save a contact to localStorage
function saveContactToLocalStorage(name, email) {
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    contacts.push({ name, email });
    localStorage.setItem("contacts", JSON.stringify(contacts));
}

// Function to load contacts from localStorage and populate the table
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

// Add a click event listener to the add contact icon
const addContactIcon = document.getElementById("addContactIcon");
addContactIcon.addEventListener("click", addContactToTable);

// Load contacts from localStorage when the page loads
window.addEventListener("load", loadContactsFromLocalStorage);