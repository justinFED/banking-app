const billReminders = [];


const billNameInput = document.getElementById("billName");
const dueDateInput = document.getElementById("dueDate");
const addBillButton = document.getElementById("addBill");
const billList = document.getElementById("billReminders");


function addBillReminder() {
    const billName = billNameInput.value;
    const dueDate = dueDateInput.value;

    if (billName.trim() !== "" && dueDate.trim() !== "") {
        const listItem = document.createElement("li");
        listItem.textContent = `${billName} (Due on ${dueDate})`;
        billList.appendChild(listItem);

        billReminders.push({ name: billName, date: dueDate });

        billNameInput.value = "";
        dueDateInput.value = "";
    }
}


addBillButton.addEventListener("click", addBillReminder);

function checkUpcomingBills() {
    const currentDate = new Date();

    for (const reminder of billReminders) {
        const dueDate = new Date(reminder.date);

        if (dueDate >= currentDate) {
            alert(`Reminder: ${reminder.name} is due on ${reminder.date}`);
        }
    }
}

checkUpcomingBills();
