/**
 * NAVIGATION - Handle sidebar navigation and content switching
 */

/**
 * Show Dashboard content and update navigation state
 */
function showDashboard() {
    // Update navigation active state
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelector('.nav-item.dashboard').classList.add('active');
    
    // Show/hide content sections
    document.getElementById('dashboard-content').classList.remove('hidden');
    document.getElementById('kings-content').classList.add('hidden');
}

/**
 * Show Kings content and update navigation state
 */
function showKings() {
    
    // Update navigation active state
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelector('.nav-item.kings').classList.add('active');
    
    // Show/hide content sections
    document.getElementById('dashboard-content').classList.add('hidden');
    document.getElementById('kings-content').classList.remove('hidden');
    
    // Always load the data when Kings section is shown
    applyFilters();
}

/**
 * Initialize navigation event listeners
 */
function initializeNavigation() {
    // Add click event listeners to navigation items when they're implemented
    // This function can be expanded as more navigation sections are added
}
