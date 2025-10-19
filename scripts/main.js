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

// Function to play audio for specific books
function playBookAudio(bookName) {
    // Stop any currently playing audio
    const existingAudio = document.querySelector('.audio-player-container');
    if (existingAudio) {
        const audio = existingAudio.querySelector('audio');
        if (audio) audio.pause();
        existingAudio.remove();
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
            console.log(`No audio file available for ${bookName}`);
            // Do not show any card/modal, just return
            return;
    }

    // Create only the audio player overlay (no card/modal content)
    const playerContainer = document.createElement('div');
    playerContainer.className = 'audio-player-container';
    playerContainer.innerHTML = `
        <div class="audio-player-card">
            <div class="audio-player-content">
                <div class="audio-info-section">
                    <div class="audio-book-info">
                        <h2 class="audio-book-title">${bookName}</h2>
                    </div>
                    <button class="audio-close-btn" onclick="closeAudioPlayer()">✕</button>
                </div>
                <div class="audio-player-section">
                    <div class="audio-waveform-container">
                        <div class="audio-waveform">
                            <button class="audio-play-button" onclick="toggleAudioPlayback()">
                                <div class="play-pause-icon">
                                    <span class="play-icon">▶</span>
                                    <span class="pause-icon" style="display: none;">⏸</span>
                                </div>
                            </button>
                            <div class="waveform-section">
                                <div class="waveform-bars">
                                    ${generateWaveformBars()}
                                </div>
                                <div class="waveform-progress"></div>
                            </div>
                        </div>
                        <div class="audio-time-info">
                            <span class="current-time">0:00</span>
                            <span class="total-time">0:00</span>
                        </div>
                    </div>
                </div>
                <audio preload="metadata">
                    <source src="${audioFile}" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>
            </div>
        </div>
    `;

    // Function to generate waveform bars
    function generateWaveformBars() {
        let bars = '';
        const barCount = 80;
        for (let i = 0; i < barCount; i++) {
            const height = Math.random() * 80 + 20; // Random height between 20-100%
            bars += `<div class="waveform-bar" style="height: ${height}%"></div>`;
        }
        return bars;
    }

    // Add enhanced styles for the waveform audio player
    const style = document.createElement('style');
    style.textContent = `
        .audio-player-container {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10000;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .audio-player-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            overflow: hidden;
            width: 550px;
            max-width: 90vw;
            color: white;
        }

        .audio-player-content {
            padding: 30px;
        }

        .audio-info-section {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 30px;
        }

        .audio-book-info {
            flex: 1;
        }

        .audio-book-label {
            font-size: 12px;
            color: rgba(255,255,255,0.7);
            margin: 0 0 5px 0;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .audio-book-title {
            font-size: 24px;
            color: white;
            margin: 0;
            font-weight: 600;
        }

        .audio-close-btn {
            background: rgba(255,255,255,0.1);
            border: none;
            color: white;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
        }

        .audio-close-btn:hover {
            background: rgba(255,255,255,0.2);
            transform: scale(1.1);
        }

        .audio-player-section {
            display: flex;
            align-items: center;
        }

        .audio-waveform-container {
            flex: 1;
            min-width: 0;
        }

        .audio-waveform {
            position: relative;
            height: 70px;
            background: rgba(255,255,255,0.1);
            border-radius: 35px;
            overflow: hidden;
            margin-bottom: 15px;
            cursor: pointer;
            display: flex;
            align-items: center;
            padding: 10px;
        }

        .audio-play-button {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: white;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s;
            flex-shrink: 0;
            margin-right: 15px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        .audio-play-button:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 16px rgba(0,0,0,0.3);
        }

        .play-pause-icon {
            color: #667eea;
            font-size: 16px;
            margin-left: 2px;
        }

        .waveform-section {
            position: relative;
            flex: 1;
            height: 50px;
        }

        .waveform-bars {
            display: flex;
            align-items: center;
            height: 100%;
            gap: 2px;
            padding: 0 10px;
        }

        .waveform-bar {
            background: rgba(255,255,255,0.3);
            width: 3px;
            border-radius: 2px;
            transition: all 0.3s;
        }

        .waveform-progress {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            background: rgba(255,255,255,0.6);
            width: 0%;
            transition: width 0.1s;
            border-radius: 25px;
            overflow: hidden;
        }

        .waveform-progress::after {
            content: '';
            position: absolute;
            right: -6px;
            top: 50%;
            transform: translateY(-50%);
            width: 12px;
            height: 12px;
            background: white;
            border-radius: 50%;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }

        .audio-time-info {
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            color: rgba(255,255,255,0.8);
            padding: 0 5px;
        }

        /* Waveform animation when playing */
        .waveform-playing .waveform-bar {
            animation: waveform-pulse 1.5s ease-in-out infinite;
        }

        @keyframes waveform-pulse {
            0%, 100% { 
                background: rgba(255,255,255,0.3);
                transform: scaleY(1);
            }
            50% { 
                background: rgba(255,255,255,0.8);
                transform: scaleY(1.3);
            }
        }

        /* Different animation delays for bars */
        .waveform-bar:nth-child(2n) { animation-delay: 0.1s; }
        .waveform-bar:nth-child(3n) { animation-delay: 0.2s; }
        .waveform-bar:nth-child(4n) { animation-delay: 0.3s; }
        .waveform-bar:nth-child(5n) { animation-delay: 0.4s; }

        @media (max-width: 480px) {
            .audio-player-card {
                width: 95vw;
                margin: 20px;
            }
            
            .audio-player-content {
                padding: 20px;
            }
            
            .audio-waveform {
                height: 60px;
                padding: 8px;
            }
            
            .audio-play-button {
                width: 44px;
                height: 44px;
                margin-right: 12px;
            }
            
            .waveform-section {
                height: 44px;
            }
        }
    `;

    // Add overlay background with click-outside-to-close functionality
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 9999;
        backdrop-filter: blur(5px);
    `;
    
    // Close when clicking outside the player
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeAudioPlayer();
        }
    });

    // Prevent closing when clicking inside the player
    playerContainer.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Add to document
    document.head.appendChild(style);
    document.body.appendChild(overlay);
    document.body.appendChild(playerContainer);

    // Get audio element and set up functionality
    const audio = playerContainer.querySelector('audio');
    const playPauseBtn = playerContainer.querySelector('.audio-play-button');
    const playIcon = playerContainer.querySelector('.play-icon');
    const pauseIcon = playerContainer.querySelector('.pause-icon');
    const waveformContainer = playerContainer.querySelector('.audio-waveform');
    const waveformProgress = playerContainer.querySelector('.waveform-progress');
    const waveformBars = playerContainer.querySelector('.waveform-bars');
    const currentTimeSpan = playerContainer.querySelector('.current-time');
    const totalTimeSpan = playerContainer.querySelector('.total-time');

    // Close function
    window.closeAudioPlayer = function() {
        if (audio) audio.pause();
        playerContainer.remove();
        overlay.remove();
        style.remove();
        document.removeEventListener('keydown', handleEscapeKey);
        delete window.closeAudioPlayer;
        delete window.toggleAudioPlayback;
    };

    // Handle ESC key to close player
    function handleEscapeKey(e) {
        if (e.key === 'Escape') {
            closeAudioPlayer();
        }
    }
    document.addEventListener('keydown', handleEscapeKey);

    // Toggle play/pause function
    window.toggleAudioPlayback = function() {
        if (audio.paused) {
            audio.play().catch(error => {
                console.error('Error playing audio:', error);
                alert('Unable to play audio file. Please check if the file exists.');
                closeAudioPlayer();
            });
        } else {
            audio.pause();
        }
    };

    // Format time helper
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // Audio event listeners
    audio.addEventListener('loadedmetadata', () => {
        totalTimeSpan.textContent = formatTime(audio.duration);
    });

    audio.addEventListener('timeupdate', () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        waveformProgress.style.width = `${progress}%`;
        currentTimeSpan.textContent = formatTime(audio.currentTime);
    });

    audio.addEventListener('play', () => {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'inline';
        waveformBars.classList.add('waveform-playing');
    });

    audio.addEventListener('pause', () => {
        playIcon.style.display = 'inline';
        pauseIcon.style.display = 'none';
        waveformBars.classList.remove('waveform-playing');
    });

    audio.addEventListener('ended', () => {
        closeAudioPlayer();
    });

    // Waveform click to seek
    waveformContainer.addEventListener('click', (e) => {
        const rect = waveformContainer.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const seekTime = (clickX / width) * audio.duration;
        audio.currentTime = seekTime;
    });

    // Auto-play the audio
    audio.play().catch(error => {
        console.error('Error playing audio:', error);
        alert('Unable to play audio file. Please check if the file exists.');
        closeAudioPlayer();
    });

    console.log(`Playing audio for ${bookName}: ${audioFile}`);
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
        onRowClick: (book) => showBookChapter(book),
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
            console.log('Kings filter button clicked');
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
            console.log('Prophets filter button clicked');
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
            console.log('Filter button clicked');
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

function showBookChapter(book) {
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
    
    // Update the title with the book name
    const bookChapterTitle = document.getElementById('bookChapterTitle');
    if (bookChapterTitle && book && book.name) {
        bookChapterTitle.textContent = book.name;
    }
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