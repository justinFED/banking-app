function calculateScore() {
    const income = parseFloat(document.getElementById("income").value);
    const expenses = parseFloat(document.getElementById("expenses").value);
    const savings = parseFloat(document.getElementById("savings").value);

    if (!isNaN(income) && !isNaN(expenses) && !isNaN(savings)) {
        const score = ((income - expenses) / income) * 100;
        document.getElementById("scoreResult").textContent = score.toFixed(2) + "%";
    } else {
        alert("Please enter valid numbers for income, expenses, and savings.");
    }
}
