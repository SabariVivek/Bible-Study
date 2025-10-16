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
    document.getElementById('prophets-content').classList.add('hidden');
    document.getElementById('books-content').classList.add('hidden');
}

function showKings() {
    // Update navigation
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelector('.nav-item.kings').classList.add('active');
    
    // Show/hide content
    document.getElementById('dashboard-content').classList.add('hidden');
    document.getElementById('kings-content').classList.remove('hidden');
    document.getElementById('prophets-content').classList.add('hidden');
    document.getElementById('books-content').classList.add('hidden');
    
    // Initialize with all kingdoms if not already loaded
    if (currentKingdoms.length === 0) {
        applyFilters();
    }
}

function showProphets() {
    // Update navigation
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelector('.nav-item.prophets').classList.add('active');
    
    // Show/hide content
    document.getElementById('dashboard-content').classList.add('hidden');
    document.getElementById('kings-content').classList.add('hidden');
    document.getElementById('prophets-content').classList.remove('hidden');
    document.getElementById('books-content').classList.add('hidden');
    
    // Initialize prophets table if not already done
    if (!prophetsTableManager) {
        initializeProphetsTable();
    }
    
    // Load prophets data
    loadProphetsData();
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
        const prophetsDropdownContainer = document.getElementById('prophetsDropdownButton')?.closest('.fancy-dropdown');
        const booksDropdownContainer = document.getElementById('booksDropdownButton')?.closest('.fancy-dropdown');
        
        // Close kingdom dropdown if click is outside
        if (kingdomDropdownContainer && !kingdomDropdownContainer.contains(event.target)) {
            document.getElementById('dropdownButton')?.classList.remove('active');
            document.getElementById('dropdownMenu')?.classList.remove('show');
        }
        
        // Close prophets dropdown if click is outside
        if (prophetsDropdownContainer && !prophetsDropdownContainer.contains(event.target)) {
            document.getElementById('prophetsDropdownButton')?.classList.remove('active');
            document.getElementById('prophetsDropdownMenu')?.classList.remove('show');
        }
        
        // Close books dropdown if click is outside
        if (booksDropdownContainer && !booksDropdownContainer.contains(event.target)) {
            document.getElementById('booksDropdownButton')?.classList.remove('active');
            document.getElementById('booksDropdownMenu')?.classList.remove('show');
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
        const prophetsFilterOverlay = document.getElementById('prophetsFilterCardOverlay');
        const booksFilterOverlay = document.getElementById('booksFilterCardOverlay');
        
        if (event.target === filterOverlay) {
            closeFilterCard();
        }
        
        if (event.target === prophetsFilterOverlay) {
            closeProphetsFilterCard();
        }
        
        if (event.target === booksFilterOverlay) {
            closeBooksFilterCard();
        }
    });
    
    // Initialize the kings view with all kingdoms by default
    applyFilters();
    
    console.log('Initialization complete');
});

// Make functions globally accessible
window.openKingModal = openKingModal;

// Prophets Filter Variables
let selectedProphetsFilterValue = 'all';
let currentProphetsAudienceFilter = 'all';

// Prophets functionality using TableManager
let prophetsTableManager;
let currentProphetsFilter = 'all';

function initializeProphetsTable() {
    const prophetsTableConfig = {
        containerId: 'prophets-table-container',
        tableId: 'prophets-table',
        tableBodyId: 'prophets-table-body',
        paginationId: 'prophets-pagination',
        showingCountId: 'prophets-showing-count',
        prevBtnId: 'prophetsPrevBtn',
        nextBtnId: 'prophetsNextBtn',
        paginationControlsId: 'prophetsPaginationControls',
        itemsPerPage: 10,
        columns: [
            {
                header: 'Testament',
                key: 'testament',
                className: 'testament-cell',
                render: (item) => {
                    const testamentBadge = getTestamentBadge(item.testament);
                    return `<td class="testament-cell"><span class="status-badge ${testamentBadge.class}">${testamentBadge.text}</span></td>`;
                }
            },
            {
                header: 'Prophet Name',
                key: 'name',
                className: 'name-cell',
                render: (item) => `<td class="name-cell"><div class="name-container"><span class="name">${item.name}</span></div></td>`
            },
            {
                header: 'Audience',
                key: 'audience',
                className: 'audience-cell',
                render: (item) => `<td class="audience-cell">${item.audience}</td>`
            },
            {
                header: 'Contemporary Kings',
                key: 'contemporaryKings',
                className: 'contemporary-cell',
                render: (item) => `<td class="contemporary-cell">${item.contemporaryKings || 'Not specified'}</td>`
            },
            {
                header: 'Info',
                className: 'info-cell',
                render: (item, index) => `<td class="info-cell"><button class="info-btn" onclick="event.stopPropagation(); openProphetByIndex(${index})" title="Major Events / Miracles">ℹ</button></td>`
            }
        ]
    };

    prophetsTableManager = new TableManager(prophetsTableConfig);
}

function loadProphetsData() {
    let prophetsData = [];
    
    if (currentProphetsFilter === 'all') {
        // Combine all prophet categories
        prophetsData = [
            ...allProphetsData.majorProphets.map(prophet => ({...prophet, category: 'Major Prophet'})),
            ...allProphetsData.minorProphets.map(prophet => ({...prophet, category: 'Minor Prophet'})),
            ...allProphetsData.otherProphets.map(prophet => ({...prophet, category: 'Other Prophet'}))
        ];
    } else if (currentProphetsFilter === 'major') {
        prophetsData = allProphetsData.majorProphets.map(prophet => ({
            ...prophet,
            category: 'Major Prophet'
        }));
    } else if (currentProphetsFilter === 'minor') {
        prophetsData = allProphetsData.minorProphets.map(prophet => ({
            ...prophet,
            category: 'Minor Prophet'
        }));
    } else if (currentProphetsFilter === 'other') {
        prophetsData = allProphetsData.otherProphets.map(prophet => ({
            ...prophet,
            category: 'Other Prophet'
        }));
    }
    
    // Apply audience filter
    if (currentProphetsAudienceFilter !== 'all') {
        prophetsData = prophetsData.filter(prophet => 
            prophet.audience === currentProphetsAudienceFilter
        );
    }
    
    if (prophetsTableManager) {
        prophetsTableManager.setData(prophetsData);
    }
}

function getTestamentBadge(testament) {
    if (testament === 'Old') {
        return { class: 'status-ancient', text: 'Old' };
    } else if (testament === 'New') {
        return { class: 'status-righteous', text: 'New' };
    } else {
        return { class: 'status-neutral', text: testament };
    }
}

function getCategoryBadge(category) {
    switch (category) {
        case 'Law':
            return { class: 'category-law', text: 'Law' };
        case 'History':
            return { class: 'category-history', text: 'History' };
        case 'Poetry':
            return { class: 'category-poetry', text: 'Poetry' };
        case 'Major Prophet':
            return { class: 'category-major-prophet', text: 'Major Prophet' };
        case 'Minor Prophet':
            return { class: 'category-minor-prophet', text: 'Minor Prophet' };
        case 'Gospel':
            return { class: 'category-gospel', text: 'Gospel' };
        case 'Acts':
            return { class: 'category-acts', text: 'Acts' };
        case 'Letters':
            return { class: 'category-letters', text: 'Letters' };
        case 'Revelation':
            return { class: 'category-revelation', text: 'Revelation' };
        default:
            return { class: 'status-neutral', text: category };
    }
}

function openProphetByIndex(index) {
    const currentData = prophetsTableManager.getCurrentData();
    const prophet = currentData[index];
    if (prophet) {
        openProphetModal(prophet);
    }
}

function selectProphetsCategory(category, text, icon, count) {
    currentProphetsFilter = category;
    
    const selectedText = document.getElementById('prophetsSelectedText');
    if (selectedText) {
        selectedText.textContent = `${icon} ${text}`;
    }
    
    // Update dropdown selection
    document.querySelectorAll('#prophetsDropdownMenu .dropdown-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    const clickedItem = document.querySelector(`#prophetsDropdownMenu .dropdown-item[onclick*="${category}"]`);
    if (clickedItem) {
        clickedItem.classList.add('selected');
    }
    
    loadProphetsData();
    toggleProphetsDropdown();
}

function toggleProphetsDropdown() {
    const dropdownMenu = document.getElementById('prophetsDropdownMenu');
    if (dropdownMenu) {
        dropdownMenu.classList.toggle('show');
    }
}

function openProphetsFilterCard() {
    document.getElementById('prophetsFilterCardOverlay').classList.add('show');
    document.body.classList.add('modal-open');
    // Set current selection
    selectedProphetsFilterValue = currentProphetsAudienceFilter;
    updateProphetsFilterSelection();
}

function closeProphetsFilterCard() {
    document.getElementById('prophetsFilterCardOverlay').classList.remove('show');
    document.body.classList.remove('modal-open');
}

function updateProphetsFilterSelection() {
    const filterOptions = document.querySelectorAll('#prophetsFilterCardOverlay .filter-option');
    filterOptions.forEach(option => {
        option.classList.remove('selected');
        if (option.dataset.value === selectedProphetsFilterValue) {
            option.classList.add('selected');
        }
    });
}

function applyProphetsFilter() {
    currentProphetsAudienceFilter = selectedProphetsFilterValue;
    loadProphetsData();
    closeProphetsFilterCard();
}

// Add click event listeners for prophets filter options
document.addEventListener('DOMContentLoaded', function() {
    const prophetsFilterOptions = document.querySelectorAll('#prophetsFilterCardOverlay .filter-option');
    prophetsFilterOptions.forEach(option => {
        option.addEventListener('click', function() {
            selectedProphetsFilterValue = this.dataset.value;
            updateProphetsFilterSelection();
        });
    });

    // Books filter event listeners
    const booksFilterOptions = document.querySelectorAll('#booksFilterCardOverlay .filter-option');
    booksFilterOptions.forEach(option => {
        option.addEventListener('click', function() {
            selectedBooksCategoryFilterValue = this.dataset.value;
            updateBooksFilterSelection();
        });
    });
});

function openProphetModal(prophet) {
    const popup = document.getElementById('prophetPopup');
    const nameElement = document.getElementById('popupProphetName');
    const contentElement = document.getElementById('popupProphetContent');
    
    if (nameElement) nameElement.textContent = prophet.name;
    
    if (contentElement) {
        let content = '';
        
        // Add key events section
        if (prophet.keyEvents && prophet.keyEvents.length > 0) {
            content += `
                <div class="king-info-row">
                    <span class="king-info-label">Key Events:</span>
                    <ul class="king-info-list">
                        ${prophet.keyEvents.map(event => `<li>${event}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        // Add major events section
        if (prophet.majorEvents && prophet.majorEvents.length > 0) {
            content += `
                <div class="king-info-row">
                    <span class="king-info-label">Major Events:</span>
                    <ul class="king-info-list">
                        ${prophet.majorEvents.map(event => `<li>${event}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        // Add miracles section
        if (prophet.miracles && prophet.miracles.length > 0) {
            content += `
                <div class="king-info-row">
                    <span class="king-info-label">Miracles Performed:</span>
                    <ul class="king-info-list">
                        ${prophet.miracles.map(miracle => `<li>${miracle}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        // Add significance section
        if (prophet.significance) {
            content += `
                <div class="king-info-row biography-section">
                    <span class="king-info-label">Significance:</span>
                    <span class="king-info-value biography-text">${prophet.significance}</span>
                </div>
            `;
        }
        
        contentElement.innerHTML = content;
    }
    
    // Update side cards
    document.getElementById('prophetPeriodValue').textContent = prophet.period || 'Unknown';
    document.getElementById('prophetMinistryValue').textContent = prophet.ministry || 'Unknown';
    document.getElementById('prophetBooksValue').textContent = prophet.books || 'Unknown';
    document.getElementById('prophetCharacterValue').textContent = prophet.characteristics || 'Unknown';
    document.getElementById('prophetContemporaryValue').textContent = prophet.contemporaryKings || 'Not specified';
    
    if (popup) {
        popup.classList.add('show');
        document.body.classList.add('modal-open');
        
        // Add click outside listener when modal opens
        setTimeout(() => {
            document.addEventListener('click', handleProphetOutsideClick);
        }, 100);
    }
}

/**
 * Handle clicks outside the prophet modal to close it
 */
function handleProphetOutsideClick(event) {
    const prophetPopup = document.getElementById('prophetPopup');
    if (!prophetPopup?.classList.contains('show')) return;
    
    const prophetCard = prophetPopup.querySelector('.king-card');
    const sideCards = prophetPopup.querySelector('.side-cards-container');
    
    // Close if clicking outside both the main card and side cards
    if (!prophetCard?.contains(event.target) && !sideCards?.contains(event.target)) {
        closeProphetPopup();
    }
}

function closeProphetPopup() {
    const popup = document.getElementById('prophetPopup');
    if (popup) {
        popup.classList.remove('show');
        document.body.classList.remove('modal-open');
        
        // Remove the outside click listener when modal closes
        document.removeEventListener('click', handleProphetOutsideClick);
    }
}

// Book popup functions
function openBookByIndex(index) {
    const currentData = booksTableManager.getCurrentData();
    const book = currentData[index];
    if (book) {
        openBookModal(book);
    }
}

function openBookModal(book) {
    const popup = document.getElementById('bookPopup');
    const nameElement = document.getElementById('popupBookName');
    const contentElement = document.getElementById('popupBookContent');
    
    if (nameElement) nameElement.textContent = book.name;
    
    if (contentElement) {
        // Check if this is Genesis and we have Genesis data
        if (book.name === 'Genesis' && typeof genesisData !== 'undefined') {
            displayGenesisContent(contentElement);
        } else {
            // For other books, show basic book information
            contentElement.innerHTML = `
                <div class="king-info-row">
                    <span class="king-info-label">Testament:</span>
                    <span class="king-info-value">${book.testament} Testament</span>
                </div>
                <div class="king-info-row">
                    <span class="king-info-label">Category:</span>
                    <span class="king-info-value">${book.category}</span>
                </div>
                <div class="king-info-row">
                    <span class="king-info-label">Author:</span>
                    <span class="king-info-value">${book.author}</span>
                </div>
                <div class="king-info-row">
                    <span class="king-info-label">Chapters:</span>
                    <span class="king-info-value">${book.chapters}</span>
                </div>
            `;
        }
    }
    
    if (popup) {
        popup.classList.add('show');
        document.body.classList.add('modal-open');
        
        // Add outside click listener to close modal
        setTimeout(() => {
            document.addEventListener('click', handleBookOutsideClick);
        }, 100);
    }
}

/**
 * Display Genesis content in the book modal
 * @param {HTMLElement} contentElement - The element to populate with Genesis content
 */
function displayGenesisContent(contentElement) {
    let content = `
        <!-- Introduction Section -->
        <div class="genesis-section">
            <div class="section-header">
                <h3 class="section-title">📖 ${genesisData.introduction.title}</h3>
            </div>
            <div class="section-content">
                <div class="introduction-text">${genesisData.introduction.content.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}</div>
            </div>
        </div>

        <!-- Basic Information -->
        <div class="genesis-section">
            <div class="section-header">
                <h3 class="section-title">📋 Book Information</h3>
            </div>
            <div class="section-content">
                <div class="king-info-row">
                    <span class="king-info-label">Testament:</span>
                    <span class="king-info-value">${genesisData.testament} Testament</span>
                </div>
                <div class="king-info-row">
                    <span class="king-info-label">Category:</span>
                    <span class="king-info-value">${genesisData.category}</span>
                </div>
                <div class="king-info-row">
                    <span class="king-info-label">Author:</span>
                    <span class="king-info-value">${genesisData.author}</span>
                </div>
                <div class="king-info-row">
                    <span class="king-info-label">Chapters:</span>
                    <span class="king-info-value">${genesisData.chapters}</span>
                </div>
                <div class="king-info-row">
                    <span class="king-info-label">Theme:</span>
                    <span class="king-info-value">${genesisData.theme}</span>
                </div>
            </div>
        </div>

        <!-- Sample Chapter (Chapter 1) -->
        <div class="genesis-section">
            <div class="section-header">
                <h3 class="section-title">📜 Chapter 1: ${genesisData.chapters_list[0].title}</h3>
                <a href="${genesisData.chapters_list[0].url}" target="_blank" class="external-link">View on EasyEnglish Bible ↗</a>
            </div>
            <div class="section-content">
                <div class="chapter-content">
    `;
    
    // Add the verses from Chapter 1
    genesisData.chapters_list[0].sections.forEach((section, index) => {
        content += `
            <div class="verse-section">
                <div class="verse-reference">${section.verses}</div>
                <div class="verse-content">${section.content}</div>
            </div>
        `;
    });
    
    content += `
                </div>
            </div>
        </div>

        <!-- Chapter Index -->
        <div class="genesis-section">
            <div class="section-header">
                <h3 class="section-title">📑 Chapter Index</h3>
            </div>
            <div class="section-content">
                <div class="chapter-index">
                    <p class="chapter-index-description">Click on any chapter title to read it on EasyEnglish Bible:</p>
                    <div class="chapter-links-grid">
    `;
    
    // Add chapter links in a grid format
    genesisData.chapterLinks.forEach((link, index) => {
        const chapterNumber = index + 1;
        content += `
            <div class="chapter-link-item">
                <a href="${link.url}" target="_blank" class="chapter-link" title="Read Chapter ${chapterNumber}">
                    <span class="chapter-number">${chapterNumber}</span>
                    <span class="chapter-title">${link.title}</span>
                </a>
            </div>
        `;
    });
    
    content += `
                    </div>
                </div>
            </div>
        </div>
    `;
    
    contentElement.innerHTML = content;
}

function handleBookOutsideClick(event) {
    const popup = document.getElementById('bookPopup');
    const popupContainer = popup.querySelector('.popup-container');
    
    if (popup && popupContainer && !popupContainer.contains(event.target)) {
        closeBookPopup();
    }
}

function closeBookPopup() {
    const popup = document.getElementById('bookPopup');
    if (popup) {
        popup.classList.remove('show');
        document.body.classList.remove('modal-open');
        
        // Remove the outside click listener when modal closes
        document.removeEventListener('click', handleBookOutsideClick);
    }
}

// Books functionality
let booksTableManager;
let currentBooksFilter = 'all';
let currentBooksCategoryFilter = 'all';
let selectedBooksCategoryFilterValue = 'all';

function showBooks() {
    // Update navigation
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelector('.nav-item.books').classList.add('active');
    
    // Show/hide content
    document.getElementById('dashboard-content').classList.add('hidden');
    document.getElementById('kings-content').classList.add('hidden');
    document.getElementById('prophets-content').classList.add('hidden');
    document.getElementById('books-content').classList.remove('hidden');
    
    // Initialize table manager if not already done
    if (!booksTableManager) {
        initializeBooksTable();
    }
    
    // Load books data
    loadBooksData();
}

function initializeBooksTable() {
    const booksTableConfig = {
        containerId: 'books-table-container',
        tableId: 'books-table',
        tableBodyId: 'books-table-body',
        paginationId: 'books-pagination',
        showingCountId: 'books-showing-count',
        prevBtnId: 'booksPrevBtn',
        nextBtnId: 'booksNextBtn',
        paginationControlsId: 'booksPaginationControls',
        itemsPerPage: 10,
        columns: [
            {
                header: 'Testament',
                key: 'testament',
                className: 'testament-cell',
                render: (item) => {
                    const testamentBadge = getTestamentBadge(item.testament);
                    return `<td class="testament-cell"><span class="status-badge ${testamentBadge.class}">${testamentBadge.text}</span></td>`;
                }
            },
            {
                header: 'Book Name',
                key: 'name',
                className: 'name-cell',
                render: (item) => `<td class="name-cell"><div class="name-container"><span class="name">${item.name}</span></div></td>`
            },
            {
                header: 'Category',
                key: 'category',
                className: 'category-cell',
                render: (item) => {
                    const categoryBadge = getCategoryBadge(item.category);
                    return `<td class="category-cell"><span class="status-badge ${categoryBadge.class}">${categoryBadge.text}</span></td>`;
                }
            },
            {
                header: 'Author',
                key: 'author',
                className: 'author-cell',
                render: (item) => `<td class="author-cell">${item.author}</td>`
            },
            {
                header: 'Info',
                className: 'info-cell',
                render: (item, index) => `<td class="info-cell"><button class="info-btn" onclick="event.stopPropagation(); openBookByIndex(${index})" title="Book Information">ℹ</button></td>`
            }
        ]
    };

    booksTableManager = new TableManager(booksTableConfig);
}

function loadBooksData() {
    // Only load books data if books section is active
    const booksContent = document.getElementById('books-content');
    if (!booksContent || booksContent.classList.contains('hidden')) {
        return;
    }
    
    let booksData = [];
    
    // Check if allBooksData is available
    if (typeof allBooksData === 'undefined') {
        console.error('allBooksData is not defined. Make sure books-data.js is loaded.');
        return;
    }
    
    if (currentBooksFilter === 'all') {
        // Combine all books
        booksData = [
            ...allBooksData.oldTestament,
            ...allBooksData.newTestament
        ];
    } else if (currentBooksFilter === 'old') {
        booksData = allBooksData.oldTestament;
    } else if (currentBooksFilter === 'new') {
        booksData = allBooksData.newTestament;
    }
    
    // Apply category filter
    if (currentBooksCategoryFilter !== 'all') {
        booksData = booksData.filter(book => book.category === currentBooksCategoryFilter);
    }
    
    if (booksTableManager) {
        booksTableManager.setData(booksData);
    }
}

function selectBooksCategory(category, text, icon, count) {
    currentBooksFilter = category;
    
    const selectedText = document.getElementById('booksSelectedText');
    if (selectedText) {
        selectedText.textContent = `${icon} ${text}`;
    }
    
    // Update dropdown selection
    document.querySelectorAll('#booksDropdownMenu .dropdown-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    const clickedItem = document.querySelector(`#booksDropdownMenu .dropdown-item[onclick*="${category}"]`);
    if (clickedItem) {
        clickedItem.classList.add('selected');
    }
    
    loadBooksData();
    toggleBooksDropdown();
}

function toggleBooksDropdown() {
    const dropdownMenu = document.getElementById('booksDropdownMenu');
    if (dropdownMenu) {
        dropdownMenu.classList.toggle('show');
    }
}

function openBooksFilterCard() {
    // Only open filter if books content is currently visible
    const booksContent = document.getElementById('books-content');
    if (!booksContent || booksContent.classList.contains('hidden')) {
        console.warn('Cannot open books filter - books section is not active');
        return;
    }
    
    document.getElementById('booksFilterCardOverlay').classList.add('show');
    document.body.classList.add('modal-open');
    // Set current selection
    selectedBooksCategoryFilterValue = currentBooksCategoryFilter;
    updateBooksFilterSelection();
}

function closeBooksFilterCard() {
    document.getElementById('booksFilterCardOverlay').classList.remove('show');
    document.body.classList.remove('modal-open');
}

function updateBooksFilterSelection() {
    const filterOptions = document.querySelectorAll('#booksFilterCardOverlay .filter-option');
    filterOptions.forEach(option => {
        option.classList.remove('selected');
        if (option.dataset.value === selectedBooksCategoryFilterValue) {
            option.classList.add('selected');
        }
    });
}

function applyBooksFilter() {
    // Only apply filter if books content is currently visible
    const booksContent = document.getElementById('books-content');
    if (!booksContent || booksContent.classList.contains('hidden')) {
        console.warn('Books filter applied but books section is not active');
        closeBooksFilterCard();
        return;
    }
    
    currentBooksCategoryFilter = selectedBooksCategoryFilterValue;
    loadBooksData();
    closeBooksFilterCard();
}

// Make functions globally available
window.openProphetModal = openProphetModal;
window.openProphetByIndex = openProphetByIndex;
window.closeProphetPopup = closeProphetPopup;
window.changeProphetsPage = changeProphetsPage;
window.selectProphetsCategory = selectProphetsCategory;
window.toggleProphetsDropdown = toggleProphetsDropdown;
window.openProphetsFilterCard = openProphetsFilterCard;
window.openBookByIndex = openBookByIndex;
window.openBookModal = openBookModal;
window.closeBookPopup = closeBookPopup;
window.showBooks = showBooks;
window.selectBooksCategory = selectBooksCategory;
window.toggleBooksDropdown = toggleBooksDropdown;
window.openBooksFilterCard = openBooksFilterCard;
window.closeBooksFilterCard = closeBooksFilterCard;
window.applyBooksFilter = applyBooksFilter;