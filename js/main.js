// Main JavaScript file for initializing.
lucide.createIcons();

// homepage testing

const sidebar = document.getElementById("sidebar");
const menuBtn = document.getElementById("menu-button");
const icon = menuBtn.querySelector('i');

if (localStorage.getItem("sidebar-collapsed") == "true") {
    sidebar.classList.add("collapsed");
}

menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');

    // Sets if sidebar is collapsed. Animation still plays. Needs refinement.
    const isCollapsed = sidebar.classList.contains("collapsed");
    localStorage.setItem("sidebar-collapsed", isCollapsed);

    lucide.createIcons();
});

