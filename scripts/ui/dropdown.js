/**
 * DROPDOWN - Handle kingdom dropdown functionality
 */

/**
 * Toggle the kingdom dropdown menu visibility
 */
function toggleDropdown() {
    const button = document.getElementById('dropdownButton');
    const menu = document.getElementById('dropdownMenu');
    
    button.classList.toggle('active');
    menu.classList.toggle('show');
}

/**
 * Select a kingdom from the dropdown and filter the data
 * @param {string} value - Kingdom identifier (all, united, israel, judah)
 * @param {string} text - Display text for the kingdom
 * @param {string} icon - Icon for the kingdom
 * @param {number} count - Number of kings in the kingdom
 */
function selectKingdom(value, text, icon, count) {
    // Update button text
    document.getElementById('selectedText').innerHTML = `${icon} ${text}`;
    
    // Update selected item in dropdown
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.classList.remove('selected');
    });
    event.target.closest('.dropdown-item').classList.add('selected');
    
    // Close dropdown
    document.getElementById('dropdownButton').classList.remove('active');
    document.getElementById('dropdownMenu').classList.remove('show');
    
    // Apply kingdom filter
    currentFilter = value;
    currentPage = 1;
    applyFilters();
}

/**
 * Initialize dropdown event listeners
 */
function initializeDropdown() {
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        const kingdomDropdownContainer = document.getElementById('dropdownButton')?.closest('.fancy-dropdown');
        
        // Close kingdom dropdown if click is outside
        if (kingdomDropdownContainer && !kingdomDropdownContainer.contains(event.target)) {
            document.getElementById('dropdownButton').classList.remove('active');
            document.getElementById('dropdownMenu').classList.remove('show');
        }
    });
    console.log('Dropdown initialized');
}