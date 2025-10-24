/**
 * MAIN.JS - Bible Study Dashboard Core Functionality
 * Handles table generation, pagination, filtering, and navigation
 */

let currentKingdoms = [];
let currentPage = 1;
let currentFilter = 'all';
let currentCharacterFilter = 'all';
let selectedFilterValue = 'all'; // For the filter card
const itemsPerPage = 7;

function getOrdinalSuffix(number) {
    const j = number % 7;
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
    if (window.currentPageKings && window.currentPageKings[index]) {
        const king = window.currentPageKings[index];
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
    // Always reset dashboard to show cards and hide Parables section
    var cardsWrapper = document.getElementById('dashboard-cards-wrapper');
    if (cardsWrapper) cardsWrapper.classList.remove('hidden');
    var dashTitle = document.getElementById('dashboard-title-header');
    if (dashTitle) dashTitle.style.display = '';
    var parablesSection = document.getElementById('parables-pdf-section');
    if (parablesSection) parablesSection.remove();

    // Update navigation
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelector('.nav-item.dashboard').classList.add('active');

    // Show/hide content
    document.getElementById('dashboard-content').classList.remove('hidden');
    document.getElementById('kings-content').classList.add('hidden');
    document.getElementById('prophets-content').classList.add('hidden');
    document.getElementById('books-content').classList.add('hidden');
    document.getElementById('book-chapter-content').classList.add('hidden');
    document.getElementById('timeline-content').classList.add('hidden');
    document.getElementById('genealogy-content').classList.add('hidden');
    document.getElementById('maps-content').classList.add('hidden');
    document.getElementById('setting-content').classList.add('hidden');
    document.getElementById('help-content').classList.add('hidden');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    document.getElementById('book-chapter-content').classList.add('hidden');
    document.getElementById('timeline-content').classList.add('hidden');
    document.getElementById('genealogy-content').classList.add('hidden');
    document.getElementById('maps-content').classList.add('hidden');
    document.getElementById('setting-content').classList.add('hidden');
    document.getElementById('help-content').classList.add('hidden');
    
    // Initialize with all kingdoms if not already loaded
    if (currentKingdoms.length === 0) {
        applyFilters();
    }
    
    // Initialize filter buttons
    initializeKingsFilterButtons();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    document.getElementById('book-chapter-content').classList.add('hidden');
    document.getElementById('timeline-content').classList.add('hidden');
    document.getElementById('genealogy-content').classList.add('hidden');
    document.getElementById('maps-content').classList.add('hidden');
    document.getElementById('setting-content').classList.add('hidden');
    document.getElementById('help-content').classList.add('hidden');
    
    // Initialize prophets table if not already done
    if (!prophetsTableManager) {
        initializeProphetsTable();
    }
    
    // Load prophets data
    loadProphetsData();
    
    // Initialize filter buttons
    initializeProphetsFilterButtons();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Drawer toggle functionality
function toggleDrawer() {
    const sidebar = document.getElementById('sidebar');
    const toggleIcon = document.getElementById('toggleIcon');
    
    sidebar.classList.toggle('collapsed');
    document.body.classList.toggle('sidebar-collapsed');
    
    if (sidebar.classList.contains('collapsed')) {
        toggleIcon.textContent = '›'; // Right chevron - click to expand
    } else {
        toggleIcon.textContent = '‹'; // Left chevron - click to collapse
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
    itemsPerPage: 7,
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
        // Play audio for supported books using the custom player
        const audioBooks = [
            "Genesis", "Exodus", "Leviticus", "Levi", "Numbers", "Deuteronomy",
            "Joshua", "Judges", "Ruth", "1 Samuel", "1st Samuel", "First Samuel",
            "2 Samuel", "2nd Samuel", "Second Samuel"
        ];
        if (audioBooks.includes(book.name)) {
            playBookAudio(book.name);
        } else {
            openBookModal(book);
        }
    }
}

// Function to play audio for specific books using enhanced audio player
function playBookAudio(bookName) {
    // Check if player already exists
    const existingPlayer = document.querySelector('.enhanced-audio-player-overlay');
    
    if (existingPlayer) {
        // Check if it's playing the same book
        const playerTitle = existingPlayer.querySelector('.player-title');
        const currentBookName = playerTitle ? playerTitle.textContent.trim() : '';
        
        // Remove playing indicator text from comparison
        const cleanCurrentBookName = currentBookName.replace(/\s+/g, ' ').trim();
        
        if (cleanCurrentBookName === bookName) {
            // Same book is already playing, just maximize if minimized
            const playerContainer = existingPlayer.querySelector('.player-container');
            if (playerContainer && playerContainer.classList.contains('minimized')) {
                // Maximize the player by triggering the minimize button
                const minimizeBtn = existingPlayer.querySelector('#minimizeBtn');
                if (minimizeBtn) {
                    minimizeBtn.click();
                }
            }
            return; // Don't create a new player
        } else {
            // Different book, stop the current one
            const audio = existingPlayer.querySelector('audio');
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }
            existingPlayer.remove();
        }
    }

    // Create audio element based on book name
    let audioFile = '';
    switch(bookName) {
        case 'Genesis':
            audioFile = 'resources/audio/genesis-overview.mp3';
            break;
        case 'Exodus':
            audioFile = 'resources/audio/exodus-overview.mp3';
            break;
        case 'Leviticus':
        case 'Levi':
            audioFile = 'resources/audio/levi-overview.mp3';
            break;
        case 'Numbers':
            audioFile = 'resources/audio/numbers-overview.mp3';
            break;
        case 'Deuteronomy':
            audioFile = 'resources/audio/deuteronomy-overview.mp3';
            break;
        case 'Joshua':
            audioFile = 'resources/audio/joshua-overview.mp3';
            break;
        case 'Judges':
            audioFile = 'resources/audio/judges-overview.mp3';
            break;
        case 'Ruth':
            audioFile = 'resources/audio/ruth-overview.mp3';
            break;
        case '1 Samuel':
        case '1st Samuel':
        case 'First Samuel':
            audioFile = 'resources/audio/1-samuel-overview.mp3';
            break;
        case '2 Samuel':
        case '2nd Samuel':
        case 'Second Samuel':
            audioFile = 'resources/audio/2-samuel-overview.mp3';
            break;
        default:
            // Do not show any card/modal, just return
            return;
    }

    // Load the enhanced audio player
    loadEnhancedAudioPlayer(audioFile, bookName);
}

// Enhanced Audio Player Function - creates the player directly in the page
function loadEnhancedAudioPlayer(audioFile, bookName) {
    // Remove any existing player
    const existingPlayer = document.querySelector('.enhanced-audio-player-overlay');
    if (existingPlayer) {
        const audio = existingPlayer.querySelector('audio');
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
        existingPlayer.remove();
    }

    // Create overlay container with embedded player
    const overlay = document.createElement('div');
    overlay.className = 'enhanced-audio-player-overlay';
    overlay.innerHTML = `
        <style>
            .enhanced-audio-player-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                pointer-events: none;
            }
            
            .enhanced-audio-player-overlay::before {
                content: '';
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.3);
                backdrop-filter: blur(8px);
                transition: all 0.3s ease;
                z-index: 0;
                pointer-events: auto;
            }

            .enhanced-audio-player-overlay.minimized::before {
                background: rgba(0, 0, 0, 0);
                backdrop-filter: blur(0px);
                pointer-events: none;
            }

            .enhanced-player-body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background: transparent;
                width: 100%;
                height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                pointer-events: none;
            }

            .player-container {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                backdrop-filter: blur(10px);
                border-radius: 16px;
                padding: 16px;
                width: 100%;
                position: relative;
                z-index: 1;
                max-width: 320px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
                border: 1px solid rgba(255, 255, 255, 0.3);
                pointer-events: auto;
            }

            .player-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 12px;
            }

            .player-title {
                color: white;
                font-size: 18px;
                font-weight: 700;
                letter-spacing: -0.3px;
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .playing-indicator {
                display: none;
                width: 20px;
                height: 16px;
                position: relative;
                gap: 2px;
                align-items: flex-end;
            }

            .player-container.minimized .playing-indicator.active {
                display: flex;
            }

            .playing-bar {
                width: 3px;
                background: white;
                border-radius: 2px;
                animation: playingAnimation 0.8s ease-in-out infinite;
            }

            .playing-bar:nth-child(1) {
                height: 8px;
                animation-delay: 0s;
            }

            .playing-bar:nth-child(2) {
                height: 16px;
                animation-delay: 0.2s;
            }

            .playing-bar:nth-child(3) {
                height: 8px;
                animation-delay: 0.4s;
            }

            @keyframes playingAnimation {
                0%, 100% {
                    transform: scaleY(0.5);
                }
                50% {
                    transform: scaleY(1);
                }
            }

            .player-container.minimized {
                max-width: 250px;
            }

            .player-container.minimized .waveform-container,
            .player-container.minimized .progress-bar,
            .player-container.minimized .time-display,
            .player-container.minimized .controls,
            .player-container.minimized .bottom-controls {
                display: none;
            }

            .player-container.minimized .player-header {
                margin-bottom: 0;
            }

            /* Responsive styles for iPad and smaller devices */
            @media screen and (max-width: 1024px) {
                .player-container {
                    max-width: 300px;
                }
                
                .player-container.minimized {
                    max-width: 220px;
                    padding: 12px;
                }
            }

            @media screen and (max-width: 768px) {
                .enhanced-player-body {
                    padding: 15px;
                }
                
                .player-container {
                    max-width: 280px;
                }
                
                .player-container.minimized {
                    max-width: 200px;
                    padding: 10px;
                    bottom: 10px !important;
                    right: 10px !important;
                }
                
                .player-title {
                    font-size: 16px;
                }
            }

            @media screen and (max-width: 480px) {
                .player-container {
                    max-width: calc(100% - 30px);
                }
                
                .player-container.minimized {
                    max-width: 180px;
                    padding: 8px;
                    bottom: 8px !important;
                    right: 8px !important;
                }
                
                .player-title {
                    font-size: 14px;
                }
                
                .minimize-btn,
                .close-btn {
                    width: 24px;
                    height: 24px;
                    font-size: 18px;
                }
            }

            .minimize-btn .minimize-icon {
                display: block;
            }

            .minimize-btn .maximize-icon {
                display: none;
            }

            .player-container.minimized .minimize-btn .minimize-icon {
                display: none;
            }

            .player-container.minimized .minimize-btn .maximize-icon {
                display: block;
            }

            .header-buttons {
                display: flex;
                gap: 8px;
                align-items: center;
            }

            .minimize-btn,
            .close-btn {
                background: rgba(255, 255, 255, 0.2);
                border: none;
                border-radius: 50%;
                width: 28px;
                height: 28px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s ease;
                color: white;
                font-size: 20px;
            }

            .minimize-btn:hover,
            .close-btn:hover {
                background: rgba(255, 255, 255, 0.3);
            }

            .minimize-btn:hover {
                transform: scale(1.1);
            }

            .minimize-btn {
                font-size: 24px;
                font-weight: normal;
                line-height: 1;
            }

            .minimize-btn svg {
                width: 16px;
                height: 16px;
                fill: none;
                stroke: white;
            }

            .waveform-container {
                background: linear-gradient(135deg, rgba(255, 107, 107, 0.15), rgba(147, 51, 234, 0.15));
                border-radius: 12px;
                padding: 8px 6px;
                margin-bottom: 10px;
                position: relative;
                overflow: hidden;
            }

            .waveform {
                display: flex;  
                align-items: center;
                justify-content: center;
                height: 24px;
                gap: 2px;
                cursor: pointer;
                position: relative;
                z-index: 1;
                padding: 0 1px;
            }

            .wave-bar {
                flex: 1;
                background: linear-gradient(180deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.3));
                border-radius: 6px;
                transition: all 0.2s ease;
                min-width: 2px;
                max-width: 4px;
                position: relative;
                cursor: ew-resize;
            }

            .wave-bar:hover {
                background: linear-gradient(180deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.5));
            }

            .wave-bar.active {
                background: linear-gradient(180deg, #ff6b6b, #ff8787);
            }

            .progress-bar {
                width: 100%;
                height: 5px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 3px;
                margin-bottom: 8px;
                cursor: pointer;
                position: relative;
                overflow: visible;
                transition: height 0.2s ease;
            }

            .progress-bar:hover {
                height: 6px;
            }

            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #ff6b6b, #ff8787);
                border-radius: 3px;
                width: 0%;
                transition: width 0.1s linear;
                position: relative;
            }

            .progress-fill::after {
                content: '';
                position: absolute;
                right: -5px;
                top: 50%;
                transform: translateY(-50%);
                width: 10px;
                height: 10px;
                background: white;
                border-radius: 50%;
                opacity: 0;
                transition: opacity 0.2s ease;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            }

            .progress-bar:hover .progress-fill::after {
                opacity: 1;
            }

            .time-display {
                display: flex;
                justify-content: space-between;
                color: rgba(255, 255, 255, 0.9);
                font-size: 11px;
                font-weight: 500;
                margin-bottom: 12px;
            }

            .controls {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 12px;
                margin-bottom: 12px;
            }

            .control-btn {
                background: rgba(255, 255, 255, 0.9);
                border: none;
                border-radius: 50%;
                width: 36px;
                height: 36px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 11px;
                font-weight: 600;
                color: #333;
            }

            .control-btn:hover {
                background: rgba(255, 255, 255, 1);
                transform: scale(1.05);
            }

            .control-btn.play {
                width: 48px;
                height: 48px;
                background: linear-gradient(135deg, #ff6b6b, #ff8787);
                box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
            }

            .control-btn.play:hover {
                box-shadow: 0 6px 16px rgba(255, 107, 107, 0.4);
            }

            .control-btn svg {
                width: 18px;
                height: 18px;
                fill: #333;
            }

            .control-btn.play svg {
                fill: white;
                width: 20px;
                height: 20px;
            }

            .bottom-controls {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 12px;
            }

            .volume-control {
                display: flex;
                align-items: center;
                gap: 8px;
                flex: 1;
            }

            .volume-icon {
                color: white;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .volume-icon:hover {
                transform: scale(1.1);
            }

            .volume-icon.muted {
                opacity: 0.4;
            }

            .volume-slider {
                flex: 1;
                height: 3px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 2px;
                position: relative;
                cursor: pointer;
            }

            .volume-slider:hover {
                height: 4px;
            }

            .volume-fill {
                height: 100%;
                background: white;
                border-radius: 2px;
                width: 70%;
                position: relative;
                transition: width 0.1s linear;
            }

            .volume-fill::after {
                content: '';
                position: absolute;
                right: -5px;
                top: 50%;
                transform: translateY(-50%);
                width: 10px;
                height: 10px;
                background: white;
                border-radius: 50%;
                opacity: 0;
                transition: opacity 0.2s ease;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            }

            .volume-slider:hover .volume-fill::after {
                opacity: 1;
            }

            .speed-control {
                background: rgba(255, 255, 255, 0.2);
                border: 1px solid rgba(255, 255, 255, 0.3);
                border-radius: 12px;
                padding: 6px 12px;
                color: white;
                font-size: 11px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .speed-control:hover {
                background: rgba(255, 255, 255, 0.3);
            }
        </style>
        
        <div class="enhanced-player-body">
            <audio id="audioPlayer" src="${audioFile}" preload="metadata" autoplay></audio>
            
            <div class="player-container">
                <div class="player-header">
                    <h2 class="player-title">
                        <span class="playing-indicator" id="playingIndicator">
                            <div class="playing-bar"></div>
                            <div class="playing-bar"></div>
                            <div class="playing-bar"></div>
                        </span>
                        ${bookName}
                    </h2>
                    <div class="header-buttons">
                        <button class="minimize-btn" id="minimizeBtn">
                            <span class="minimize-icon">−</span>
                            <svg class="maximize-icon" viewBox="0 0 24 24">
                                <path d="M4 8V4h4M4 4l5 5M20 8V4h-4M20 4l-5 5M4 16v4h4M4 20l5-5M20 16v4h-4M20 20l-5-5" 
                                      stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>
                            </svg>
                        </button>
                        <button class="close-btn" id="closeBtn">×</button>
                    </div>
                </div>

                <div class="waveform-container">
                    <div class="waveform" id="waveform"></div>
                </div>

                <div class="progress-bar" id="progressBar">
                    <div class="progress-fill" id="progressFill"></div>
                </div>

                <div class="time-display">
                    <span id="currentTime">0:00</span>
                    <span id="duration">0:00</span>
                </div>

                <div class="controls">
                    <button class="control-btn skip" id="rewind" title="Rewind 3 seconds">-3s</button>
                    <button class="control-btn play" id="playBtn">
                        <svg viewBox="0 0 24 24" id="playIcon">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                        <svg viewBox="0 0 24 24" id="pauseIcon" style="display: none;">
                            <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
                        </svg>
                    </button>
                    <button class="control-btn skip" id="forward" title="Forward 3 seconds">+3s</button>
                </div>

                <div class="bottom-controls">
                    <div class="volume-control">
                        <div class="volume-icon" id="volumeIcon">
                            <svg width="22" height="18" viewBox="0 0 28 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none"/>
                                <path d="M14 10.5a1.5 1.5 0 0 1 0 3" class="volume-bar-1" style="opacity: 1;" stroke-linecap="round"/>
                                <path d="M16.5 8.5a4.5 4.5 0 0 1 0 7" class="volume-bar-2" style="opacity: 1;" stroke-linecap="round"/>
                                <path d="M19 6.5a7.5 7.5 0 0 1 0 11" class="volume-bar-3" style="opacity: 1;" stroke-linecap="round"/>
                            </svg>
                            <svg width="22" height="18" viewBox="0 0 28 24" fill="none" stroke="currentColor" stroke-width="2" id="volumeOffIcon" style="display: none;">
                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none"/>
                                <line x1="21" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                <line x1="15" y1="9" x2="21" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </div>
                        <div class="volume-slider" id="volumeSlider">
                            <div class="volume-fill" id="volumeFill"></div>
                        </div>
                    </div>
                    <button class="speed-control" id="speedBtn">1.0x</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Initialize the player with JavaScript
    initializeEnhancedPlayer(overlay);
}

// Initialize the enhanced audio player functionality
function initializeEnhancedPlayer(overlay) {
    const playerContainer = overlay.querySelector('.player-container');
    const waveform = overlay.querySelector('#waveform');
    const audio = overlay.querySelector('#audioPlayer');
    const playBtn = overlay.querySelector('#playBtn');
    const playIcon = overlay.querySelector('#playIcon');
    const pauseIcon = overlay.querySelector('#pauseIcon');
    const playingIndicator = overlay.querySelector('#playingIndicator');
    const progressBar = overlay.querySelector('#progressBar');
    const progressFill = overlay.querySelector('#progressFill');
    const currentTimeSpan = overlay.querySelector('#currentTime');
    const durationSpan = overlay.querySelector('#duration');
    const volumeIcon = overlay.querySelector('#volumeIcon');
    const volumeOffIcon = overlay.querySelector('#volumeOffIcon');
    const volumeSlider = overlay.querySelector('#volumeSlider');
    const volumeFill = overlay.querySelector('#volumeFill');
    const volumeBar1 = overlay.querySelector('.volume-bar-1');
    const volumeBar2 = overlay.querySelector('.volume-bar-2');
    const volumeBar3 = overlay.querySelector('.volume-bar-3');
    const speedBtn = overlay.querySelector('#speedBtn');
    const minimizeBtn = overlay.querySelector('#minimizeBtn');
    const closeBtn = overlay.querySelector('#closeBtn');
    const rewindBtn = overlay.querySelector('#rewind');
    const forwardBtn = overlay.querySelector('#forward');

    // Generate waveform bars
    const bars = 60;
    for (let i = 0; i < bars; i++) {
        const bar = document.createElement('div');
        bar.className = 'wave-bar';
        const height = Math.random() * 70 + 30;
        bar.style.height = height + '%';
        waveform.appendChild(bar);
    }

    // Player state
    let isPlaying = false;
    let currentProgress = 0;
    let speed = 1.0;
    let volume = 70;
    let isMuted = false;
    let previousVolume = 70;
    let isMinimized = false;

    // Set initial volume
    audio.volume = volume / 100;

    // Play/Pause
    playBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
    });

    // Audio event listeners
    audio.addEventListener('play', () => {
        isPlaying = true;
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
        playingIndicator.classList.add('active');
    });

    audio.addEventListener('pause', () => {
        isPlaying = false;
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        playingIndicator.classList.remove('active');
    });

    audio.addEventListener('loadedmetadata', () => {
        const minutes = Math.floor(audio.duration / 60);
        const seconds = Math.floor(audio.duration % 60);
        durationSpan.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        // Autoplay on load
        audio.play().catch(error => {
        });
    });

    audio.addEventListener('timeupdate', () => {
        if (!audio.duration) return;
        const percent = (audio.currentTime / audio.duration) * 100;
        currentProgress = percent;
        progressFill.style.width = currentProgress + '%';
        updateWaveform(currentProgress);
        
        const minutes = Math.floor(audio.currentTime / 60);
        const seconds = Math.floor(audio.currentTime % 60);
        currentTimeSpan.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    });

    audio.addEventListener('ended', () => {
        isPlaying = false;
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        playingIndicator.classList.remove('active');
    });

    // Waveform interaction
    let isDraggingWaveform = false;

    waveform.addEventListener('mousedown', (e) => {
        isDraggingWaveform = true;
        seekWaveform(e);
    });

    document.addEventListener('mousemove', (e) => {
        if (isDraggingWaveform) {
            seekWaveform(e);
        }
    });

    document.addEventListener('mouseup', () => {
        isDraggingWaveform = false;
    });

    function seekWaveform(e) {
        const rect = waveform.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
        if (audio.duration) {
            audio.currentTime = (percent / 100) * audio.duration;
        }
    }

    // Progress bar interaction
    let isDraggingProgress = false;

    function updateProgress(e) {
        const rect = progressBar.getBoundingClientRect();
        const percent = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
        if (audio.duration) {
            audio.currentTime = (percent / 100) * audio.duration;
        }
    }

    progressBar.addEventListener('mousedown', (e) => {
        isDraggingProgress = true;
        updateProgress(e);
    });

    document.addEventListener('mousemove', (e) => {
        if (isDraggingProgress) {
            updateProgress(e);
        }
    });

    document.addEventListener('mouseup', () => {
        isDraggingProgress = false;
    });

    progressBar.addEventListener('click', (e) => {
        updateProgress(e);
    });

    // Update waveform active state
    function updateWaveform(percent) {
        const waveBars = waveform.querySelectorAll('.wave-bar');
        const activeIndex = Math.floor((percent / 100) * waveBars.length);
        waveBars.forEach((bar, i) => {
            if (i < activeIndex) {
                bar.classList.add('active');
            } else {
                bar.classList.remove('active');
            }
        });
    }

    // Volume icon functionality
    function updateVolumeIcon(volumeLevel) {
        const normalizedVolume = volumeLevel / 100;
        
        if (volumeLevel === 0 || audio.muted) {
            volumeIcon.querySelector('svg:not(#volumeOffIcon)').style.display = 'none';
            volumeOffIcon.style.display = 'block';
            volumeIcon.classList.add('muted');
        } else {
            volumeIcon.querySelector('svg:not(#volumeOffIcon)').style.display = 'block';
            volumeOffIcon.style.display = 'none';
            volumeIcon.classList.remove('muted');
            
            if (normalizedVolume > 0 && normalizedVolume <= 0.33) {
                volumeBar1.style.opacity = '1';
                volumeBar2.style.opacity = '0';
                volumeBar3.style.opacity = '0';
            } else if (normalizedVolume > 0.33 && normalizedVolume <= 0.66) {
                volumeBar1.style.opacity = '1';
                volumeBar2.style.opacity = '1';
                volumeBar3.style.opacity = '0';
            } else {
                volumeBar1.style.opacity = '1';
                volumeBar2.style.opacity = '1';
                volumeBar3.style.opacity = '1';
            }
        }
    }

    volumeIcon.addEventListener('click', () => {
        isMuted = !isMuted;
        audio.muted = isMuted;

        if (isMuted) {
            previousVolume = volume;
            updateVolumeIcon(0);
        } else {
            volume = previousVolume;
            audio.volume = volume / 100;
            volumeFill.style.width = volume + '%';
            updateVolumeIcon(volume);
        }
    });

    // Speed control
    const speeds = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
    let speedIndex = 2;

    speedBtn.addEventListener('click', () => {
        speedIndex = (speedIndex + 1) % speeds.length;
        speed = speeds[speedIndex];
        audio.playbackRate = speed;
        speedBtn.textContent = speed + 'x';
    });

    // Volume control
    let isDraggingVolume = false;

    function updateVolume(e) {
        const rect = volumeSlider.getBoundingClientRect();
        const percent = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
        volume = percent;
        audio.volume = volume / 100;
        volumeFill.style.width = volume + '%';

        if (volume === 0) {
            isMuted = true;
            audio.muted = true;
        } else {
            isMuted = false;
            audio.muted = false;
            previousVolume = volume;
        }
        
        updateVolumeIcon(volume);
    }

    volumeSlider.addEventListener('mousedown', (e) => {
        isDraggingVolume = true;
        updateVolume(e);
    });

    document.addEventListener('mousemove', (e) => {
        if (isDraggingVolume) {
            updateVolume(e);
        }
    });

    document.addEventListener('mouseup', () => {
        isDraggingVolume = false;
    });

    volumeSlider.addEventListener('click', (e) => {
        updateVolume(e);
    });

    // Skip buttons
    rewindBtn.addEventListener('click', () => {
        if (audio.duration) {
            audio.currentTime = Math.max(0, audio.currentTime - 3);
        }
    });

    forwardBtn.addEventListener('click', () => {
        if (audio.duration) {
            audio.currentTime = Math.min(audio.duration, audio.currentTime + 3);
        }
    });

    // Minimize button
    minimizeBtn.addEventListener('click', () => {
        if (!isMinimized) {
            playerContainer.classList.add('minimized');
            overlay.classList.add('minimized');
            playerContainer.style.position = 'fixed';
            // Use responsive positioning based on screen size
            const isMobile = window.innerWidth <= 768;
            const offset = isMobile ? '10px' : '20px';
            playerContainer.style.bottom = offset;
            playerContainer.style.right = offset;
            playerContainer.style.top = 'auto';
            playerContainer.style.left = 'auto';
            isMinimized = true;
        } else {
            playerContainer.classList.remove('minimized');
            overlay.classList.remove('minimized');
            playerContainer.style.position = 'relative';
            playerContainer.style.bottom = 'auto';
            playerContainer.style.right = 'auto';
            isMinimized = false;
        }
    });

    // Click outside to minimize
    overlay.addEventListener('click', (e) => {
        if (!playerContainer.contains(e.target) && !isMinimized) {
            playerContainer.classList.add('minimized');
            overlay.classList.add('minimized');
            playerContainer.style.position = 'fixed';
            // Use responsive positioning based on screen size
            const isMobile = window.innerWidth <= 768;
            const offset = isMobile ? '10px' : '20px';
            playerContainer.style.bottom = offset;
            playerContainer.style.right = offset;
            playerContainer.style.top = 'auto';
            playerContainer.style.left = 'auto';
            isMinimized = true;
        }
    });

    // Close button
    closeBtn.addEventListener('click', () => {
        audio.pause();
        audio.currentTime = 0;
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
            overlay.remove();
        }, 300);
    });

    // ESC key to close
    function handleEscKey(e) {
        if (e.key === 'Escape') {
            audio.pause();
            overlay.remove();
            document.removeEventListener('keydown', handleEscKey);
        }
    }
    document.addEventListener('keydown', handleEscKey);

    // Initialize volume
    updateVolumeIcon(volume);
}

function openBookModal(book) {
    const popup = document.getElementById('bookPopup');
    const nameElement = document.getElementById('popupBookName');
    const contentElement = document.getElementById('popupBookContent');
    
    if (nameElement) nameElement.textContent = book.name;
    
    if (contentElement) {
        // Show basic book information
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
    
    if (popup) {
        popup.classList.add('show');
        document.body.classList.add('modal-open');
        
        // Add outside click listener to close modal
        setTimeout(() => {
            document.addEventListener('click', handleBookOutsideClick);
        }, 100);
    }
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
    document.getElementById('book-chapter-content').classList.add('hidden');
    document.getElementById('timeline-content').classList.add('hidden');
    document.getElementById('genealogy-content').classList.add('hidden');
    document.getElementById('maps-content').classList.add('hidden');
    document.getElementById('setting-content').classList.add('hidden');
    document.getElementById('help-content').classList.add('hidden');
    
    // Initialize table manager if not already done
    if (!booksTableManager) {
        initializeBooksTable();
    }
    
    // Load books data
    loadBooksData();
    
    // Initialize filter buttons
    initializeBooksFilterButtons();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        itemsPerPage: 7,
        onRowClick: (book) => openChaptersPopup(book.name, book.chapters),
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
                header: 'Audio',
                className: 'info-cell',
                render: (item, index) => `<td class="info-cell"><button class="info-btn audio-btn" onclick="event.stopPropagation(); openBookByIndex(${index})" title="Audio Information">
                    <div class="audio-icon-animated">
                        <div class="sound-bar bar1"></div>
                        <div class="sound-bar bar2"></div>
                        <div class="sound-bar bar3"></div>
                        <div class="sound-bar bar4"></div>
                    </div>
                </button></td>`
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

function initializeKingsFilterButtons() {
    // Find all theme buttons in the kings section
    const kingsContent = document.getElementById('kings-content');
    if (!kingsContent) return;
    
    const themeButtons = kingsContent.querySelectorAll('.theme-btn');
    if (themeButtons.length === 0) return;
    
    const filterBtn = themeButtons[0]; // First button is the filter button
    
    themeButtons.forEach((button, index) => {
        // Skip the first button (Filter button)
        if (index === 0) return;
        
        // Remove any existing listeners by cloning
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        newButton.addEventListener('click', function() {
            // Add a quick scale down animation to currently active button
            const currentActive = kingsContent.querySelector('.theme-btn.active');
            if (currentActive && currentActive !== this) {
                currentActive.style.transition = 'all 0.2s ease-out';
                currentActive.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    currentActive.classList.remove('active');
                    currentActive.style.transform = '';
                }, 200);
            }
            
            // Add a scale animation to the clicked button
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            this.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                this.classList.add('active');
                this.style.transform = '';
            }, 100);
            
            // Get the filter text
            const filter = this.textContent.trim().toLowerCase();
            
            // Update the current filter and reload data
            if (filter === 'all') {
                currentFilter = 'all';
            } else if (filter === 'united') {
                currentFilter = 'united';
            } else if (filter === 'northern') {
                currentFilter = 'israel'; // Maps to 'israel' in the data
            } else if (filter === 'southern') {
                currentFilter = 'judah'; // Maps to 'judah' in the data
            }
            
            applyFilters();
        });
    });
    
    // Filter button click handler
    if (filterBtn) {
        const newFilterBtn = filterBtn.cloneNode(true);
        filterBtn.parentNode.replaceChild(newFilterBtn, filterBtn);
        
        newFilterBtn.addEventListener('click', function() {
            // Trigger the kings filter card
            openFilterCard();
        });
    }
}

function initializeProphetsFilterButtons() {
    // Find all theme buttons in the prophets section
    const prophetsContent = document.getElementById('prophets-content');
    if (!prophetsContent) return;
    
    const themeButtons = prophetsContent.querySelectorAll('.theme-btn');
    if (themeButtons.length === 0) return;
    
    const filterBtn = themeButtons[0]; // First button is the filter button
    
    themeButtons.forEach((button, index) => {
        // Skip the first button (Filter button)
        if (index === 0) return;
        
        // Remove any existing listeners by cloning
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        newButton.addEventListener('click', function() {
            // Add a quick scale down animation to currently active button
            const currentActive = prophetsContent.querySelector('.theme-btn.active');
            if (currentActive && currentActive !== this) {
                currentActive.style.transition = 'all 0.2s ease-out';
                currentActive.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    currentActive.classList.remove('active');
                    currentActive.style.transform = '';
                }, 200);
            }
            
            // Add a scale animation to the clicked button
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            this.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                this.classList.add('active');
                this.style.transform = '';
            }, 100);
            
            // Get the filter text
            const filter = this.textContent.trim().toLowerCase();
            
            // Update the current filter and reload data
            if (filter === 'all') {
                currentProphetsFilter = 'all';
            } else if (filter === 'major') {
                currentProphetsFilter = 'major';
            } else if (filter === 'minor') {
                currentProphetsFilter = 'minor';
            } else if (filter === 'other') {
                currentProphetsFilter = 'other';
            }
            
            loadProphetsData();
        });
    });
    
    // Filter button click handler (optional - can trigger additional functionality)
    if (filterBtn) {
        const newFilterBtn = filterBtn.cloneNode(true);
        filterBtn.parentNode.replaceChild(newFilterBtn, filterBtn);
        
        newFilterBtn.addEventListener('click', function() {
            // Trigger the prophets filter card
            openProphetsFilterCard();
        });
    }
}

function initializeBooksFilterButtons() {
    // Find all theme buttons in the books section
    const booksContent = document.getElementById('books-content');
    if (!booksContent) return;
    
    const themeButtons = booksContent.querySelectorAll('.theme-btn');
    if (themeButtons.length === 0) return;
    
    const filterBtn = themeButtons[0]; // First button is the filter button
    
    themeButtons.forEach((button, index) => {
        // Skip the first button (Filter button)
        if (index === 0) return;
        
        // Remove any existing listeners by cloning
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        newButton.addEventListener('click', function() {
            // Add a quick scale down animation to currently active button
            const currentActive = booksContent.querySelector('.theme-btn.active');
            if (currentActive && currentActive !== this) {
                currentActive.style.transition = 'all 0.2s ease-out';
                currentActive.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    currentActive.classList.remove('active');
                    currentActive.style.transform = '';
                }, 200);
            }
            
            // Add a scale animation to the clicked button
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            this.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                this.classList.add('active');
                this.style.transform = '';
            }, 100);
            
            // Get the filter text
            const filter = this.textContent.trim().toLowerCase();
            
            // Update the current filter and reload data
            if (filter === 'all') {
                currentBooksFilter = 'all';
            } else if (filter === 'old') {
                currentBooksFilter = 'old';
            } else if (filter === 'new') {
                currentBooksFilter = 'new';
            }
            
            loadBooksData();
        });
    });
    
    // Filter button click handler (optional - can trigger additional functionality)
    if (filterBtn) {
        const newFilterBtn = filterBtn.cloneNode(true);
        filterBtn.parentNode.replaceChild(newFilterBtn, filterBtn);
        
        newFilterBtn.addEventListener('click', function() {
            // You can add filter menu/dropdown functionality here if needed
        });
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

function showBookChapter(book, chapterNum) {
    
    // Update navigation - keep books nav active
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelector('.nav-item.books').classList.add('active');
    
    // Hide all content sections
    document.getElementById('dashboard-content').classList.add('hidden');
    document.getElementById('kings-content').classList.add('hidden');
    document.getElementById('prophets-content').classList.add('hidden');
    document.getElementById('books-content').classList.add('hidden');
    document.getElementById('timeline-content').classList.add('hidden');
    document.getElementById('genealogy-content').classList.add('hidden');
    document.getElementById('maps-content').classList.add('hidden');
    document.getElementById('setting-content').classList.add('hidden');
    document.getElementById('help-content').classList.add('hidden');
    
    // Show book chapter content
    document.getElementById('book-chapter-content').classList.remove('hidden');
    
    // Clear the chapter container first to avoid showing old content
    const bookChapterContainer = document.querySelector('.book-chapter-container');
    if (bookChapterContainer) {
        bookChapterContainer.innerHTML = '';
        // Force a reflow to ensure the clear happens before new content
        void bookChapterContainer.offsetHeight;
    }
    
    // Update the title with the book name and chapter number
    const bookChapterTitle = document.getElementById('bookChapterTitle');
    const bookName = typeof book === 'string' ? book : book.name;
    
    // Ensure chapterNum is treated as a number
    const chapterNumber = parseInt(chapterNum) || 1;
    
    if (bookChapterTitle && book) {
        if (chapterNumber) {
            bookChapterTitle.textContent = `${bookName} - ${chapterNumber}`;
        } else {
            bookChapterTitle.textContent = bookName;
        }
    }
    
    // Display chapter data after a small delay to ensure clearing is complete
    if (bookChapterContainer && chapterNumber) {
        setTimeout(() => {
            displayChapterContent(bookName, chapterNumber, bookChapterContainer);
            updateChapterNavigation(bookName, chapterNumber);
            // Update audio icon visibility based on audio file availability
            if (typeof updateChapterAudioIconVisibility === 'function') {
                updateChapterAudioIconVisibility(bookName, chapterNumber);
            }
        }, 10);
    }
    
    // Initialize testament navigation on the book chapter title
    setTimeout(() => {
        const titleElement = document.getElementById('bookChapterTitle');
        if (titleElement && typeof initializeTestamentNav === 'function') {
            initializeTestamentNav('bookChapterTitle', bookName);
        }
    }, 150);
}

// Store current chapter info for navigation
let currentChapterInfo = {
    bookName: '',
    chapterNum: 0,
    totalChapters: 0,
    bookObject: null
};

// Add a flag to prevent simultaneous chapter loads
let isLoadingChapter = false;

function showBookChapter(book, chapterNum) {
    // Prevent multiple simultaneous chapter loads
    if (isLoadingChapter) {
        console.log('Chapter load already in progress, ignoring request');
        return;
    }
    
    isLoadingChapter = true;
    
    // Update navigation - keep books nav active
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelector('.nav-item.books').classList.add('active');
    
    // Hide all content sections
    document.getElementById('dashboard-content').classList.add('hidden');
    document.getElementById('kings-content').classList.add('hidden');
    document.getElementById('prophets-content').classList.add('hidden');
    document.getElementById('books-content').classList.add('hidden');
    document.getElementById('timeline-content').classList.add('hidden');
    document.getElementById('genealogy-content').classList.add('hidden');
    document.getElementById('maps-content').classList.add('hidden');
    document.getElementById('setting-content').classList.add('hidden');
    document.getElementById('help-content').classList.add('hidden');
    
    // Show book chapter content
    document.getElementById('book-chapter-content').classList.remove('hidden');
    
    // Clear the chapter container first to avoid showing old content
    const bookChapterContainer = document.querySelector('.book-chapter-container');
    if (bookChapterContainer) {
        bookChapterContainer.innerHTML = '';
        // Force a reflow to ensure the clear happens before new content
        void bookChapterContainer.offsetHeight;
    }
    
    // Update the title with the book name and chapter number
    const bookChapterTitle = document.getElementById('bookChapterTitle');
    const bookName = typeof book === 'string' ? book : book.name;
    
    // Ensure chapterNum is treated as a number
    const chapterNumber = parseInt(chapterNum) || 1;
    
    if (bookChapterTitle && book) {
        if (chapterNumber) {
            bookChapterTitle.textContent = `${bookName} - ${chapterNumber}`;
        } else {
            bookChapterTitle.textContent = bookName;
        }
    }
    
    // Display chapter data after a small delay to ensure clearing is complete
    if (bookChapterContainer && chapterNumber) {
        setTimeout(() => {
            displayChapterContent(bookName, chapterNumber, bookChapterContainer);
            updateChapterNavigation(bookName, chapterNumber);
            // Update audio icon visibility based on audio file availability
            if (typeof updateChapterAudioIconVisibility === 'function') {
                updateChapterAudioIconVisibility(bookName, chapterNumber);
            }
            // Reset the loading flag after content is displayed
            setTimeout(() => {
                isLoadingChapter = false;
            }, 100);
        }, 10);
    } else {
        // Reset flag if no content to load
        isLoadingChapter = false;
    }
    
    // Initialize testament navigation on the book chapter title
    setTimeout(() => {
        const titleElement = document.getElementById('bookChapterTitle');
        if (titleElement && typeof initializeTestamentNav === 'function') {
            initializeTestamentNav('bookChapterTitle', bookName);
        }
    }, 150);
}
function getAllBooksInOrder() {
    if (typeof allBooksData === 'undefined') {
        return [];
    }
    return [...allBooksData.oldTestament, ...allBooksData.newTestament];
}

// Function to find book in allBooksData
function findBookInAllData(bookName) {
    if (typeof allBooksData === 'undefined') {
        console.error('allBooksData is not defined');
        return null;
    }
    
    const normalizedName = bookName.toLowerCase();
    
    // Search in Old Testament
    let book = allBooksData.oldTestament.find(b => b.name.toLowerCase() === normalizedName);
    if (book) return book;
    
    // Search in New Testament
    book = allBooksData.newTestament.find(b => b.name.toLowerCase() === normalizedName);
    return book;
}

// Function to get next book
function getNextBook(currentBookName) {
    const allBooks = getAllBooksInOrder();
    const currentIndex = allBooks.findIndex(b => b.name.toLowerCase() === currentBookName.toLowerCase());
    
    if (currentIndex !== -1 && currentIndex < allBooks.length - 1) {
        return allBooks[currentIndex + 1];
    }
    return null;
}

// Function to get previous book
function getPreviousBook(currentBookName) {
    const allBooks = getAllBooksInOrder();
    const currentIndex = allBooks.findIndex(b => b.name.toLowerCase() === currentBookName.toLowerCase());
    
    if (currentIndex > 0) {
        return allBooks[currentIndex - 1];
    }
    return null;
}

// Function to update chapter navigation buttons
function updateChapterNavigation(bookName, chapterNum) {
    // Get total chapters for the book
    const book = findBookInAllData(bookName);
    const totalChapters = book ? book.chapters : 0;
    
    // Store current chapter info
    currentChapterInfo = {
        bookName: bookName,
        chapterNum: parseInt(chapterNum),
        totalChapters: totalChapters,
        bookObject: book
    };
    
    // Get navigation buttons
    const prevBtn = document.getElementById('prevChapterBtn');
    const nextBtn = document.getElementById('nextChapterBtn');
    
    // Check if we can go to previous chapter or book
    const canGoPrevious = chapterNum > 1 || getPreviousBook(bookName) !== null;
    
    // Check if we can go to next chapter or book
    const canGoNext = chapterNum < totalChapters || getNextBook(bookName) !== null;
    
    // Update previous button
    if (prevBtn) {
        prevBtn.disabled = !canGoPrevious;
    }
    
    // Update next button
    if (nextBtn) {
        nextBtn.disabled = !canGoNext;
    }
}

// Navigate to previous chapter
function navigateToPreviousChapter() {
    if (!currentChapterInfo.bookObject) return;
    
    if (currentChapterInfo.chapterNum > 1) {
        // Go to previous chapter in same book
        const prevChapter = currentChapterInfo.chapterNum - 1;
        showBookChapter(currentChapterInfo.bookObject, prevChapter);
    } else {
        // Go to last chapter of previous book
        const prevBook = getPreviousBook(currentChapterInfo.bookName);
        if (prevBook) {
            showBookChapter(prevBook, prevBook.chapters);
        }
    }
    
    // Scroll to top of page
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Also scroll container to top
    const container = document.querySelector('.book-chapter-container');
    if (container) {
        container.scrollTop = 0;
    }
}

// Navigate to next chapter
function navigateToNextChapter() {
    if (!currentChapterInfo.bookObject) return;
    
    if (currentChapterInfo.chapterNum < currentChapterInfo.totalChapters) {
        // Go to next chapter in same book
        const nextChapter = currentChapterInfo.chapterNum + 1;
        showBookChapter(currentChapterInfo.bookObject, nextChapter);
    } else {
        // Go to first chapter of next book
        const nextBook = getNextBook(currentChapterInfo.bookName);
        if (nextBook) {
            showBookChapter(nextBook, 1);
        }
    }
    
    // Scroll to top of page
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Also scroll container to top
    const container = document.querySelector('.book-chapter-container');
    if (container) {
        container.scrollTop = 0;
    }
}

// Function to convert verse references to badges
function formatVerseReferences(text) {
    // First, remove any existing verse badge spans to avoid double-wrapping
    let cleanText = text.replace(/<span class="verse-badge">([^<]*)<\/span>/g, '$1');
    
    // Use a placeholder to prevent double-processing
    const PLACEHOLDER_START = '###BADGE_START###';
    const PLACEHOLDER_END = '###BADGE_END###';
    
    // First, handle complex patterns like "Matthew 9:27, 12:23, 15:22, 20:30, 21:9, 21:15"
    // This pattern looks for a book name followed by multiple chapter:verse references in parentheses
    let formattedText = cleanText.replace(
        /\(([A-Z][a-z]+(?:\s[A-Z][a-z]+)?)\s+(\d+:\d+(?:-\d+)?(?:,\s*\d+:\d+(?:-\d+)?)*)\)/g,
        (match, book, verses) => {
            // Split the verses by comma
            const verseList = verses.split(',').map(v => v.trim());
            const badges = verseList.map(verse => 
                `${PLACEHOLDER_START}${book} ${verse}${PLACEHOLDER_END}`
            ).join(' ');
            return `(${badges})`;
        }
    );
    
    // Second, handle "book chapter X" format (e.g., "Genesis chapter 38")
    formattedText = formattedText.replace(/\b(\d\s)?([A-Z][a-z]+(?:\s[A-Z][a-z]+)?)\s+chapter\s+(\d+)\b/g, 
        (match, num, book, chapter) => {
            const prefix = num ? num : '';
            return `${PLACEHOLDER_START}${prefix}${book} ${chapter}${PLACEHOLDER_END}`;
        });
    
    // Third, handle standard single verse references with colons
    // Examples: "Matthew 22:41-46", "Genesis 22:18", "1 Chronicles 3:11-12"
    formattedText = formattedText.replace(/\b(\d\s)?([A-Z][a-z]+(?:\s[A-Z][a-z]+)?)\s(\d+):(\d+)(?:-(\d+))?/g, 
        (match, num, book, chapter, verse1, verse2) => {
            const prefix = num ? num : '';
            const range = verse2 ? `-${verse2}` : '';
            return `${PLACEHOLDER_START}${prefix}${book} ${chapter}:${verse1}${range}${PLACEHOLDER_END}`;
        });
    
    // Finally, replace all placeholders with actual span tags
    formattedText = formattedText.replace(new RegExp(PLACEHOLDER_START, 'g'), '<span class="verse-badge">');
    formattedText = formattedText.replace(new RegExp(PLACEHOLDER_END, 'g'), '</span>');
    
    return formattedText;
}

// Function to display chapter content
function displayChapterContent(bookName, chapterNum, container) {
    // Show loading indicator
    container.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; min-height: 300px; flex-direction: column; gap: 20px;">
            <div style="width: 50px; height: 50px; border: 4px solid #f3f3f3; border-top: 4px solid #667eea; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            <p style="color: #666; font-size: 1rem;">Loading chapter...</p>
        </div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;
    
    // Use requestAnimationFrame to ensure smooth rendering
    requestAnimationFrame(() => {
        // Get chapter data based on book name (Dynamic approach)
        let chapterData = null;
        const chapterKey = `chapter_${chapterNum}`;
        
        // Convert book name to PascalCase for the data object name
        // E.g., "matthew" -> "MatthewData", "1 samuel" -> "Samuel1Data"
        const formatBookDataName = (name) => {
            // Remove numbers and spaces, capitalize first letter
            let cleanName = name.toLowerCase();
            
            // Handle numbered books (e.g., "1 Samuel", "2 Kings")
            const numberMatch = cleanName.match(/^(\d+)\s+(.+)$/);
            if (numberMatch) {
                const number = numberMatch[1];
                const bookName = numberMatch[2];
                // Capitalize first letter
                const capitalizedBook = bookName.charAt(0).toUpperCase() + bookName.slice(1);
                return `${capitalizedBook}${number}Data`;
            }
            
            // Regular books - just capitalize first letter
            return cleanName.charAt(0).toUpperCase() + cleanName.slice(1) + 'Data';
        };
        
        // Get the data object name dynamically
        const dataObjectName = formatBookDataName(bookName);
        
        // Try to access the data object from the global window object
        if (typeof window[dataObjectName] !== 'undefined' && window[dataObjectName][chapterKey]) {
            chapterData = window[dataObjectName][chapterKey];
        }
        
        // Clear loading indicator before displaying content
        container.innerHTML = '';
        
        // Display the chapter data
        if (chapterData && chapterData.length > 0) {
            chapterData.forEach((section, index) => {
                const sectionDiv = document.createElement('div');
                sectionDiv.className = 'chapter-section';
                sectionDiv.style.marginBottom = index < chapterData.length - 1 ? '2.5rem' : '0';
                
                // Add section heading
                if (section.section) {
                    const sectionHeading = document.createElement('h3');
                    sectionHeading.className = 'chapter-section-heading';
                    sectionHeading.innerHTML = section.section;
                    sectionDiv.appendChild(sectionHeading);
                }
                
                // Add section text with formatted verse references
                if (section.text) {
                    const sectionText = document.createElement('div');
                    // Format verse references as badges
                    const formattedText = formatVerseReferences(section.text);
                    sectionText.innerHTML = formattedText;
                    sectionText.style.lineHeight = '2.2';
                    sectionText.style.color = '#2c3e50';
                    sectionText.style.fontSize = '1.05rem';
                    sectionText.style.whiteSpace = 'pre-wrap';
                    sectionText.style.marginTop = '1rem';
                    sectionDiv.appendChild(sectionText);
                }
                
                // Add note card if note property exists
                if (section.note) {
                    const noteCard = document.createElement('div');
                    noteCard.className = 'note-card';
                    
                    const noteCardInner = document.createElement('div');
                    noteCardInner.className = 'note-card-inner';
                    
                    const noteHeader = document.createElement('div');
                    noteHeader.className = 'note-header';
                    
                    // Always show "Note" as title
                    const noteTitle = document.createElement('h3');
                    noteTitle.className = 'note-title';
                    noteTitle.textContent = 'Note';
                    noteHeader.appendChild(noteTitle);
                    
                    // Show the note content (subject)
                    const noteContent = document.createElement('div');
                    noteContent.className = 'note-content';
                    noteContent.innerHTML = section.note;
                    
                    noteCardInner.appendChild(noteHeader);
                    noteCardInner.appendChild(noteContent);
                    noteCard.appendChild(noteCardInner);
                    sectionDiv.appendChild(noteCard);
                }
                
                container.appendChild(sectionDiv);
            });
        } else {
            // No data available message
            const noDataDiv = document.createElement('div');
            noDataDiv.className = 'no-chapter-data';
            noDataDiv.style.padding = '4rem 2rem';
            noDataDiv.style.textAlign = 'center';
            noDataDiv.style.color = '#666';
            noDataDiv.style.fontSize = '1.1rem';
            noDataDiv.style.background = '#f9f9f9';
            noDataDiv.style.borderRadius = '12px';
            noDataDiv.style.margin = '2rem 0';
            noDataDiv.style.border = '2px dashed #ddd';
            noDataDiv.innerHTML = `
                <p style="font-size: 3.5rem; margin-bottom: 1rem; opacity: 0.5;">📖</p>
                <p style="font-size: 1.3rem; font-weight: 600; color: #333; margin-bottom: 0.5rem;">Chapter Data Not Available</p>
                <p style="color: #888; font-size: 1rem;">Content for <strong>${bookName} Chapter ${chapterNum}</strong> has not been seeded yet.</p>
                <p style="color: #888; font-size: 0.9rem; margin-top: 1rem;">Currently available: Matthew and Exodus</p>
            `;
            container.appendChild(noDataDiv);
        }
    });
}

// Additional Navigation Functions
function showTimeline() {
    // Update navigation
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelector('.nav-item.timeline').classList.add('active');
    
    // Show/hide content
    document.getElementById('dashboard-content').classList.add('hidden');
    document.getElementById('kings-content').classList.add('hidden');
    document.getElementById('prophets-content').classList.add('hidden');
    document.getElementById('books-content').classList.add('hidden');
    document.getElementById('book-chapter-content').classList.add('hidden');
    document.getElementById('timeline-content').classList.remove('hidden');
    document.getElementById('genealogy-content').classList.add('hidden');
    document.getElementById('maps-content').classList.add('hidden');
    document.getElementById('setting-content').classList.add('hidden');
    document.getElementById('help-content').classList.add('hidden');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showGenealogy() {
    // Update navigation
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelector('.nav-item.genealogy').classList.add('active');
    
    // Show/hide content
    document.getElementById('dashboard-content').classList.add('hidden');
    document.getElementById('kings-content').classList.add('hidden');
    document.getElementById('prophets-content').classList.add('hidden');
    document.getElementById('books-content').classList.add('hidden');
    document.getElementById('book-chapter-content').classList.add('hidden');
    document.getElementById('timeline-content').classList.add('hidden');
    document.getElementById('genealogy-content').classList.remove('hidden');
    document.getElementById('maps-content').classList.add('hidden');
    document.getElementById('setting-content').classList.add('hidden');
    document.getElementById('help-content').classList.add('hidden');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showMaps() {
    // Update navigation
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelector('.nav-item.maps').classList.add('active');
    
    // Show/hide content
    document.getElementById('dashboard-content').classList.add('hidden');
    document.getElementById('kings-content').classList.add('hidden');
    document.getElementById('prophets-content').classList.add('hidden');
    document.getElementById('books-content').classList.add('hidden');
    document.getElementById('book-chapter-content').classList.add('hidden');
    document.getElementById('timeline-content').classList.add('hidden');
    document.getElementById('genealogy-content').classList.add('hidden');
    document.getElementById('maps-content').classList.remove('hidden');
    document.getElementById('setting-content').classList.add('hidden');
    document.getElementById('help-content').classList.add('hidden');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showSetting() {
    // Update navigation
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelector('.nav-item.setting').classList.add('active');
    
    // Show/hide content
    document.getElementById('dashboard-content').classList.add('hidden');
    document.getElementById('kings-content').classList.add('hidden');
    document.getElementById('prophets-content').classList.add('hidden');
    document.getElementById('books-content').classList.add('hidden');
    document.getElementById('book-chapter-content').classList.add('hidden');
    document.getElementById('timeline-content').classList.add('hidden');
    document.getElementById('genealogy-content').classList.add('hidden');
    document.getElementById('maps-content').classList.add('hidden');
    document.getElementById('setting-content').classList.remove('hidden');
    document.getElementById('help-content').classList.add('hidden');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showHelp() {
    // Update navigation
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelector('.nav-item.help').classList.add('active');
    
    // Show/hide content
    document.getElementById('dashboard-content').classList.add('hidden');
    document.getElementById('kings-content').classList.add('hidden');
    document.getElementById('prophets-content').classList.add('hidden');
    document.getElementById('books-content').classList.add('hidden');
    document.getElementById('book-chapter-content').classList.add('hidden');
    document.getElementById('timeline-content').classList.add('hidden');
    document.getElementById('genealogy-content').classList.add('hidden');
    document.getElementById('maps-content').classList.add('hidden');
    document.getElementById('setting-content').classList.add('hidden');
    document.getElementById('help-content').classList.remove('hidden');
    
    // Initialize Life of Christ cards
    if (typeof initializeLifeOfChrist === 'function') {
        initializeLifeOfChrist();
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== CHAPTERS POPUP FUNCTIONS =====
function openChaptersPopup(bookName, chapterCount) {
    // Set book title and count
    const titleElement = document.getElementById('popupBookTitle');
    const countElement = document.getElementById('popupChapterCount');
    
    if (!titleElement || !countElement) return;
    
    titleElement.textContent = bookName;
    countElement.textContent = `(${chapterCount} chapter${chapterCount > 1 ? 's' : ''})`;
    
    // Generate chapter cards
    const chaptersContainer = document.getElementById('chaptersContainer');
    if (!chaptersContainer) return;
    
    chaptersContainer.innerHTML = '';
    
    for(let i = 1; i <= chapterCount; i++) {
        const chapterCard = document.createElement('div');
        chapterCard.className = 'chapter-card';
        chapterCard.textContent = i;
        chapterCard.onclick = () => chapterClick(bookName, i);
        chaptersContainer.appendChild(chapterCard);
    }
    
    // Show popup
    const popup = document.getElementById('chaptersPopup');
    const overlay = document.getElementById('chaptersOverlay');
    
    if (!popup || !overlay) return;
    
    popup.classList.add('show');
    overlay.classList.add('show');
}

function closeChaptersPopup() {
    const popup = document.getElementById('chaptersPopup');
    const overlay = document.getElementById('chaptersOverlay');
    
    if (popup) popup.classList.remove('show');
    if (overlay) overlay.classList.remove('show');
}

function chapterClick(bookName, chapterNum) {
    // Close the popup
    closeChaptersPopup();
    // Navigate to book chapter page with chapter number
    showBookChapter(bookName, chapterNum);
}

// Close on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const chaptersPopup = document.getElementById('chaptersPopup');
        if (chaptersPopup && chaptersPopup.classList.contains('show')) {
            closeChaptersPopup();
        }
    }
    
    // Arrow key navigation for book chapters
    const bookChapterContent = document.getElementById('book-chapter-content');
    if (bookChapterContent && !bookChapterContent.classList.contains('hidden')) {
        // Only navigate if we're on the book chapter page
        // And not typing in an input/textarea
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            if (e.key === 'ArrowLeft') {
                e.preventDefault(); // Prevent page scroll
                navigateToPreviousChapter();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault(); // Prevent page scroll
                navigateToNextChapter();
            }
        }
    }
});

// Make functions globally available
window.openProphetModal = openProphetModal;
window.openProphetByIndex = openProphetByIndex;
window.closeProphetPopup = closeProphetPopup;
// window.changeProphetsPage = changeProphetsPage; // COMMENTED OUT - function doesn't exist
window.selectProphetsCategory = selectProphetsCategory;
window.toggleProphetsDropdown = toggleProphetsDropdown;
window.openProphetsFilterCard = openProphetsFilterCard;
window.openBookByIndex = openBookByIndex;
window.playBookAudio = playBookAudio;
window.openBookModal = openBookModal;
window.closeBookPopup = closeBookPopup;
window.showBooks = showBooks;
window.selectBooksCategory = selectBooksCategory;
window.toggleBooksDropdown = toggleBooksDropdown;
window.openBooksFilterCard = openBooksFilterCard;
window.closeBooksFilterCard = closeBooksFilterCard;
window.applyBooksFilter = applyBooksFilter;
window.showTimeline = showTimeline;
window.showGenealogy = showGenealogy;
window.showMaps = showMaps;
window.showSetting = showSetting;
window.showHelp = showHelp;
window.showBookChapter = showBookChapter;

// Testament Navigation Integration - Define IMMEDIATELY after showBookChapter
window.loadBookFromTestamentNav = function(bookName) {
    
    // Clear the chapter container immediately
    const bookChapterContainer = document.querySelector('.book-chapter-container');
    if (bookChapterContainer) {
        bookChapterContainer.innerHTML = '';
    }
    
    // Find the book object from allBooksData
    let bookObject = null;
    
    if (typeof allBooksData !== 'undefined') {
        const allBooks = [...allBooksData.oldTestament, ...allBooksData.newTestament];
        bookObject = allBooks.find(book => book.name === bookName);
    }
    
    if (bookObject) {
        // IMPORTANT: Always load chapter 1 when selecting from testament nav
        const chapterNumber = 1;
        showBookChapter(bookObject, chapterNumber);
    } else {
        console.warn(`Book not found in allBooksData: ${bookName}`);
        alert(`Chapter data for ${bookName} is not yet available. Currently, only Matthew and Exodus have full chapter content.`);
    }
};

window.openChaptersPopup = openChaptersPopup;
window.closeChaptersPopup = closeChaptersPopup;
