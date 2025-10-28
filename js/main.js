// Main JavaScript file for initializing.
lucide.createIcons();

// homepage testing

const sidebar = document.getElementById("sidebar");
const menuBtn = document.getElementById("menu-button");
const icon = menuBtn.querySelector('i');

menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');

    lucide.createIcons();
});