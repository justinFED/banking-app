const storedBillReminders = JSON.parse(localStorage.getItem("billReminders")) || [];
const billReminders = storedBillReminders;

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

        const newBillReminder = { name: billName, date: dueDate };
        billReminders.push(newBillReminder);

        localStorage.setItem("billReminders", JSON.stringify(billReminders));

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
            const listItem = document.createElement("li");
            listItem.textContent = `Reminder: ${reminder.name} is due on ${reminder.date}`;
            billList.appendChild(listItem);
        }
    }
}

checkUpcomingBills();
