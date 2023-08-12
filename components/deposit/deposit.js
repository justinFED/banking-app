const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.close-btn');

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

function openModal() {
    modal.style.display = 'block';
}
