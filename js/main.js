// Main JavaScript file for initializing.

// Load Lucide icons.
lucide.createIcons();

// Retains sidebar state on page change.
// TODO: Stop animation playing 
const sidebar = document.getElementById("sidebar");
const menuBtn = document.getElementById("menu-button");
const icon = menuBtn.querySelector('i');

menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');

    lucide.createIcons();
});