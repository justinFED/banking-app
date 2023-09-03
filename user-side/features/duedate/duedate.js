// Initialize variables
const billReminders = [];

// Get DOM elements
const billNameInput = document.getElementById("billName");
const dueDateInput = document.getElementById("dueDate");
const addBillButton = document.getElementById("addBill");
const billList = document.getElementById("billReminders");

// Function to add a bill reminder
function addBillReminder() {
    const billName = billNameInput.value;
    const dueDate = dueDateInput.value;

    if (billName.trim() !== "" && dueDate.trim() !== "") {
        const listItem = document.createElement("li");
        listItem.textContent = `${billName} (Due on ${dueDate})`;
        billList.appendChild(listItem);

        // Save the reminder
        billReminders.push({ name: billName, date: dueDate });

        // Clear input fields
        billNameInput.value = "";
        dueDateInput.value = "";
    }
}

// Event listener for adding a bill reminder
addBillButton.addEventListener("click", addBillReminder);

// Function to check for upcoming bill reminders
function checkUpcomingBills() {
    const currentDate = new Date();

    for (const reminder of billReminders) {
        const dueDate = new Date(reminder.date);

        if (dueDate >= currentDate) {
            alert(`Reminder: ${reminder.name} is due on ${reminder.date}`);
        }
    }
}

// Check for upcoming bills when the page loads
checkUpcomingBills();
