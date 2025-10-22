/**
 * SIDEBAR - Handle sidebar toggle and drawer functionality
 */

/**
 * Toggle the sidebar collapsed/expanded state
 */
function toggleDrawer() {
    const sidebar = document.getElementById('sidebar');
    const toggleIcon = document.getElementById('toggleIcon');
    
    sidebar.classList.toggle('collapsed');
    
    if (sidebar.classList.contains('collapsed')) {
        toggleIcon.textContent = '⫸'; // Right arrow - click to expand right
    } else {
        toggleIcon.textContent = '⫷'; // Left arrow - click to collapse left
    }
}

/**
 * Initialize sidebar functionality
 */
function initializeSidebar() {
    // Sidebar functionality is primarily handled by the toggleDrawer function
    // Additional sidebar-related initialization can be added here
}
