/**
 * MAIN.JS - Bible Study Dashboard Core Functionality
 * Handles table generation, pagination, filtering, and navigation
 */

let currentKingdoms = [];
let currentPage = 1;
let currentFilter = 'all';
let currentCharacterFilter = 'all';
let selectedFilterValue = 'all'; // For the filter card
const itemsPerPage = 10;

function getOrdinalSuffix(number) {
    const j = number % 10;
    const k = number % 100;
    if (j == 1 && k != 11) return "st";
    if (j == 2 && k != 12) return "nd";
    if (j == 3 && k != 13) return "rd";
    return "th";
}

function applyFilters() {
    let filteredKingdoms = [];
    
    // First filter by kingdom
    if (currentFilter === 'all') {
        filteredKingdoms = [
            ...allKingsData.united.map(king => ({...king, kingdom: 'United Kingdom'})),
            ...allKingsData.israel.map(king => ({...king, kingdom: 'Israel'})),
            ...allKingsData.judah.map(king => ({...king, kingdom: 'Judah'}))
        ];
    } else {
        const kingdomNames = {
            'united': 'United Kingdom',
            'israel': 'Israel',
            'judah': 'Judah'
        };
        filteredKingdoms = allKingsData[currentFilter].map(king => ({
            ...king, 
            kingdom: kingdomNames[currentFilter]
        }));
    }
    
    // Then filter by character
    if (currentCharacterFilter !== 'all') {
        filteredKingdoms = filteredKingdoms.filter(king => king.character === currentCharacterFilter);
    }
    
    currentKingdoms = filteredKingdoms;
    updateTable();
    updatePagination();
}

function toggleDropdown() {
    const button = document.getElementById('dropdownButton');
    const menu = document.getElementById('dropdownMenu');
    
    button.classList.toggle('active');
    menu.classList.toggle('show');
}

function selectKingdom(value, text, icon, count) {
    // Update button text
    document.getElementById('selectedText').innerHTML = `${icon} ${text}`;
    
    // Update selected item
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.classList.remove('selected');
    });
    event.target.closest('.dropdown-item').classList.add('selected');
    
    // Close dropdown
    document.getElementById('dropdownButton').classList.remove('active');
    document.getElementById('dropdownMenu').classList.remove('show');
    
    // Filter kingdoms
    currentFilter = value;
    currentPage = 1;
    applyFilters();
}

function getKingdomIcon(kingdom) {
    const kingImage = '👑'; // Crown emoji
    
    switch(kingdom) {
        case 'United Kingdom': 
            return { bg: '#fef3c7', icon: kingImage, isImage: false };
        case 'Israel': 
            return { bg: '#dbeafe', icon: kingImage, isImage: false };
        case 'Judah': 
            return { bg: '#d1fae5', icon: kingImage, isImage: false };
        default: 
            return { bg: '#f3f4f6', icon: kingImage, isImage: false };
    }
}

function getCharacterBadge(character) {
    const badges = {
        'Righteous': 'status-judah',
        'Good': 'status-judah',
        'Wise': 'status-united',
        'Zealous': 'status-israel',
        'Evil': 'status-evil',
        'Wicked': 'status-wicked',
        'Disobedient': 'status-evil',
        'Rebellious': 'status-evil',
        'Foolish': 'status-evil',
        'Good/Bad': 'status-israel',
        'Evil/Repentant': 'status-israel'
    };
    return badges[character] || 'status-badge';
}

function getCharacterColor(character) {
    const colors = {
        'Righteous': '#065f46',      // Dark green for righteous
        'Good': '#059669',           // Green for good
        'Wise': '#d97706',           // Orange for wise
        'Zealous': '#1d4ed8',        // Blue for zealous
        'Evil': '#dc2626',           // Red for evil
        'Wicked': '#b91c1c',         // Dark red for wicked
        'Disobedient': '#dc2626',    // Red for disobedient
        'Rebellious': '#dc2626',     // Red for rebellious
        'Foolish': '#dc2626',        // Red for foolish
        'Good/Bad': '#1d4ed8',       // Blue for mixed
        'Evil/Repentant': '#1d4ed8'  // Blue for repentant
    };
    return colors[character] || '#1f2937'; // Default dark gray
}

function updateTable() {
    const tbody = document.getElementById('kings-table-body');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageKings = currentKingdoms.slice(startIndex, endIndex);
    
    // Store kings globally for easy access
    window.currentPageKings = pageKings;
    
    tbody.innerHTML = '';
    
    pageKings.forEach((king, index) => {
        const badgeClass = getCharacterBadge(king.character);
        
        const row = `
            <tr>
                <td class="order-number">${king.order}<sup>${getOrdinalSuffix(king.order)}</sup></td>
                <td>
                    <div class="king-info">
                        <div>
                            <div class="king-name">${king.name}</div>
                            <div class="king-kingdom">${king.description}</div>
                        </div>
                    </div>
                </td>
                <td>
                    ${king.kingdom}
                </td>
                <td>
                    <span class="status-badge ${badgeClass}">${king.character}</span>
                </td>
                <td>
                    <button class="info-btn" onclick="openKingModal(${index})">ℹ</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
    
    // Update showing count
    document.getElementById('showing-count').textContent = `Showing ${pageKings.length}`;
}

// Function to open king modal by index
function openKingModal(index) {
    console.log('openKingModal called with index:', index);
    if (window.currentPageKings && window.currentPageKings[index]) {
        const king = window.currentPageKings[index];
        console.log('Opening modal for king:', king.name);
        showKingDetails(king);
    } else {
        console.error('No king found at index:', index);
    }
}

function updatePagination() {
    const totalPages = Math.ceil(currentKingdoms.length / itemsPerPage);
    const paginationControls = document.getElementById('paginationControls');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Update prev/next buttons
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
    
    // Generate page buttons
    paginationControls.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.className = `pagination-btn ${i === currentPage ? 'active' : ''}`;
        button.textContent = i.toString().padStart(2, '0');
        button.onclick = () => {
            currentPage = i;
            updateTable();
            updatePagination();
        };
        paginationControls.appendChild(button);
    }
}

function changePage(direction) {
    const totalPages = Math.ceil(currentKingdoms.length / itemsPerPage);
    const newPage = currentPage + direction;
    
    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        updateTable();
        updatePagination();
    }
}

function showDashboard() {
    // Update navigation
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelector('.nav-item.dashboard').classList.add('active');
    
    // Show/hide content
    document.getElementById('dashboard-content').classList.remove('hidden');
    document.getElementById('kings-content').classList.add('hidden');
}

function showKings() {
    // Update navigation
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelector('.nav-item.kings').classList.add('active');
    
    // Show/hide content
    document.getElementById('dashboard-content').classList.add('hidden');
    document.getElementById('kings-content').classList.remove('hidden');
    
    // Initialize with all kingdoms if not already loaded
    if (currentKingdoms.length === 0) {
        applyFilters();
    }
}

// Drawer toggle functionality
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

// Filter Card Functions
function openFilterCard() {
    document.getElementById('filterCardOverlay').classList.add('show');
    document.body.classList.add('modal-open');
    // Set current selection
    selectedFilterValue = currentCharacterFilter;
    updateFilterSelection();
}

function closeFilterCard() {
    document.getElementById('filterCardOverlay').classList.remove('show');
    document.body.classList.remove('modal-open');
}

function updateFilterSelection() {
    document.querySelectorAll('.filter-option').forEach(option => {
        option.classList.remove('selected');
        if (option.dataset.value === selectedFilterValue) {
            option.classList.add('selected');
        }
    });
}

function applyFilter() {
    currentCharacterFilter = selectedFilterValue;
    currentPage = 1;
    applyFilters();
    closeFilterCard();
}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        const kingdomDropdownContainer = document.getElementById('dropdownButton')?.closest('.fancy-dropdown');
        
        // Close kingdom dropdown if click is outside
        if (kingdomDropdownContainer && !kingdomDropdownContainer.contains(event.target)) {
            document.getElementById('dropdownButton')?.classList.remove('active');
            document.getElementById('dropdownMenu')?.classList.remove('show');
        }
    });

    // Add click handlers for filter options
    document.querySelectorAll('.filter-option').forEach(option => {
        option.addEventListener('click', function() {
            selectedFilterValue = this.dataset.value;
            updateFilterSelection();
        });
    });

    // Close filter card when clicking outside
    document.addEventListener('click', function(event) {
        const filterOverlay = document.getElementById('filterCardOverlay');
        if (event.target === filterOverlay) {
            closeFilterCard();
        }
    });
    
    // Initialize the kings view with all kingdoms by default
    applyFilters();
    
    console.log('Initialization complete');
});

// Make functions globally accessible
window.openKingModal = openKingModal;