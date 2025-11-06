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

// Sorting state
let currentSortColumn = null;
let currentSortDirection = 'asc'; // 'asc' or 'desc'

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
}

/**
 * Parse reign string to get numeric value for sorting
 * Converts "40 years", "3 months", "7 days" to comparable numbers
 */
function parseReignForSorting(reign) {
    if (!reign || reign === 'N/A') return 0;
    
    const lowerReign = reign.toLowerCase();
    
    // Extract number from the string
    const match = lowerReign.match(/(\d+)/);
    if (!match) return 0;
    
    const num = parseInt(match[1]);
    
    // Convert to days for comparison
    if (lowerReign.includes('year')) {
        return num * 365;
    } else if (lowerReign.includes('month')) {
        return num * 30;
    } else if (lowerReign.includes('day')) {
        return num;
    }
    
    return num;
}

/**
 * Sort the current kingdoms array by specified column
 */
function sortKingdoms(column, direction) {
    currentKingdoms.sort((a, b) => {
        let valueA, valueB;
        
        if (column === 'name') {
            valueA = a.name.toLowerCase();
            valueB = b.name.toLowerCase();
            
            if (direction === 'asc') {
                return valueA.localeCompare(valueB);
            } else {
                return valueB.localeCompare(valueA);
            }
        } else if (column === 'reign') {
            valueA = parseReignForSorting(a.reign);
            valueB = parseReignForSorting(b.reign);
            
            if (direction === 'asc') {
                return valueA - valueB;
            } else {
                return valueB - valueA;
            }
        }
        
        return 0;
    });
}

/**
 * Handle sort column click
 */
function handleSort(column) {
    // Toggle direction if clicking the same column, otherwise start with ascending
    if (currentSortColumn === column) {
        currentSortDirection = currentSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        currentSortColumn = column;
        currentSortDirection = 'asc';
    }
    
    // Sort the data
    sortKingdoms(currentSortColumn, currentSortDirection);
    
    // Update sort indicators
    updateSortIndicators();
    
    // Re-render table
    updateTable();
}

/**
 * Update sort indicators in table headers
 */
function updateSortIndicators() {
    // SVG icons for different sort states
    const unsortedIcon = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 10L12 15L17 10H7Z" fill="currentColor"/>
            <path d="M7 14L12 9L17 14H7Z" fill="currentColor" opacity="0.4"/>
        </svg>
    `;
    
    const ascendingIcon = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 14L12 9L17 14H7Z" fill="currentColor"/>
        </svg>
    `;
    
    const descendingIcon = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 10L12 15L17 10H7Z" fill="currentColor"/>
        </svg>
    `;
    
    // Reset all sort icons
    document.querySelectorAll('.sortable').forEach(th => {
        th.classList.remove('sort-asc', 'sort-desc');
        const icon = th.querySelector('.sort-icon');
        if (icon) {
            icon.innerHTML = unsortedIcon;
        }
    });
    
    // Set active sort indicator
    if (currentSortColumn) {
        const activeHeader = document.querySelector(`.sortable[data-column="${currentSortColumn}"]`);
        if (activeHeader) {
            activeHeader.classList.add(currentSortDirection === 'asc' ? 'sort-asc' : 'sort-desc');
            const icon = activeHeader.querySelector('.sort-icon');
            if (icon) {
                icon.innerHTML = currentSortDirection === 'asc' ? ascendingIcon : descendingIcon;
            }
        }
    }
}

/**
 * Initialize sorting event listeners
 */
function initializeSorting() {
    document.querySelectorAll('.sortable').forEach(th => {
        th.style.cursor = 'pointer';
        th.addEventListener('click', function() {
            const column = this.getAttribute('data-column');
            handleSort(column);
        });
    });
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

function getReignBadge(reign) {
    if (!reign || reign === 'N/A') {
        return { class: 'reign-unknown', text: 'N/A' };
    }
    
    const lowerReign = reign.toLowerCase();
    
    if (lowerReign.includes('year')) {
        return { class: 'reign-years', text: reign };
    } else if (lowerReign.includes('month')) {
        return { class: 'reign-months', text: reign };
    } else if (lowerReign.includes('day')) {
        return { class: 'reign-days', text: reign };
    }
    
    return { class: 'reign-unknown', text: reign };
}

function updateTable() {
    const tbody = document.getElementById('kings-table-body');
    
    // Show all kings without pagination
    const allKings = currentKingdoms;
    
    // Store kings globally for easy access
    window.currentPageKings = allKings;
    
    tbody.innerHTML = '';
    
    allKings.forEach((king, index) => {
        const badgeClass = getCharacterBadge(king.character);
        const reignBadge = getReignBadge(king.reign);
        
        const row = `
            <tr onclick="showKingPage('${king.name.replace(/'/g, "\\'")}', ${index})" style="cursor: pointer;">
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
                    <span class="status-badge ${reignBadge.class}">${reignBadge.text}</span>
                </td>
                <td>
                    ${king.kingdom}
                </td>
                <td>
                    <span class="status-badge ${badgeClass}">${king.character}</span>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
    
    // Update showing count
    document.getElementById('showing-count').textContent = `Showing ${allKings.length}`;
}

// Removed: openKingModal function - Info column has been removed from the table
// Users can click on the table row to view king details

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

// Helper function to update navigation active state
function updateNavActive(activeClass) {
    // Remove active from both old and new sidebar styles
    document.querySelectorAll('.nav-item, .history-item').forEach(item => item.classList.remove('active'));
    
    // Add active to both old and new sidebar styles
    const oldNavItem = document.querySelector('.nav-item.' + activeClass);
    if (oldNavItem) oldNavItem.classList.add('active');
    
    // For new sidebar, we need to match by onclick function (case-insensitive)
    const historyItems = document.querySelectorAll('.history-item');
    historyItems.forEach(item => {
        const onclick = item.getAttribute('onclick');
        if (onclick && onclick.toLowerCase().includes(activeClass.toLowerCase())) {
            item.classList.add('active');
        }
    });
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
    updateNavActive('dashboard');

    // Show/hide content
    document.getElementById('dashboard-content').classList.remove('hidden');
    document.getElementById('kings-content').classList.add('hidden');
    document.getElementById('prophets-content').classList.add('hidden');
    document.getElementById('prophet-detail-content').classList.add('hidden');
    document.getElementById('books-content').classList.add('hidden');
    document.getElementById('book-chapter-content').classList.add('hidden');
    document.getElementById('king-page-content').classList.add('hidden');
    document.getElementById('timeline-content').classList.add('hidden');
    document.getElementById('genealogy-content').classList.add('hidden');
    document.getElementById('bible-content').classList.add('hidden');
    document.getElementById('setting-content').classList.add('hidden');
    document.getElementById('help-content').classList.add('hidden');
    
    // Hide Bible verse display section as well
    const bibleVerseDisplaySection = document.getElementById('bibleVerseDisplaySection');
    if (bibleVerseDisplaySection) {
        bibleVerseDisplaySection.classList.add('hidden');
    }
    
    // Update URL route
    if (typeof updateRoute === 'function') {
        updateRoute('dashboard');
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showKings() {
    // Update navigation
    updateNavActive('kings');
    
    // Show/hide content
    document.getElementById('dashboard-content').classList.add('hidden');
    document.getElementById('kings-content').classList.remove('hidden');
    document.getElementById('prophets-content').classList.add('hidden');
    document.getElementById('prophet-detail-content').classList.add('hidden');
    document.getElementById('books-content').classList.add('hidden');
    document.getElementById('book-chapter-content').classList.add('hidden');
    document.getElementById('king-page-content').classList.add('hidden');
    document.getElementById('kings-timeline-content').classList.add('hidden');
    document.getElementById('timeline-content').classList.add('hidden');
    document.getElementById('genealogy-content').classList.add('hidden');
    document.getElementById('bible-content').classList.add('hidden');
    document.getElementById('setting-content').classList.add('hidden');
    document.getElementById('help-content').classList.add('hidden');
    
    // Hide Bible verse display section as well
    const bibleVerseDisplaySection = document.getElementById('bibleVerseDisplaySection');
    if (bibleVerseDisplaySection) {
        bibleVerseDisplaySection.classList.add('hidden');
    }
    
    // Initialize with all kingdoms if not already loaded
    if (currentKingdoms.length === 0) {
        applyFilters();
    }
    
    // Initialize filter buttons
    initializeKingsFilterButtons();
    
    // Initialize sorting
    initializeSorting();
    
    // Update URL route
    if (typeof updateRoute === 'function') {
        updateRoute('kings');
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showKingPage(kingName, index) {
    // Update navigation - keep kings nav active
    updateNavActive('kings');
    
    // Hide all content sections
    document.getElementById('dashboard-content').classList.add('hidden');
    document.getElementById('kings-content').classList.add('hidden');
    document.getElementById('prophets-content').classList.add('hidden');
    document.getElementById('prophet-detail-content').classList.add('hidden');
    document.getElementById('books-content').classList.add('hidden');
    document.getElementById('book-chapter-content').classList.add('hidden');
    document.getElementById('kings-timeline-content').classList.add('hidden');
    document.getElementById('timeline-content').classList.add('hidden');
    document.getElementById('genealogy-content').classList.add('hidden');
    document.getElementById('bible-content').classList.add('hidden');
    document.getElementById('setting-content').classList.add('hidden');
    document.getElementById('help-content').classList.add('hidden');
    
    // Hide Bible verse display section as well
    const bibleVerseDisplaySection = document.getElementById('bibleVerseDisplaySection');
    if (bibleVerseDisplaySection) {
        bibleVerseDisplaySection.classList.add('hidden');
    }
    
    // Show king page content
    document.getElementById('king-page-content').classList.remove('hidden');
    
    // Update URL with king name
    if (typeof updateRoute === 'function') {
        updateRoute('kingDetail', kingName);
    }
    
    // Update the title with the king name
    const kingPageTitle = document.getElementById('kingPageTitle');
    if (kingPageTitle) {
        kingPageTitle.textContent = `King ${kingName}`;
    }
    
    // Clear the king page container
    const kingPageContainer = document.querySelector('.king-page-container');
    if (kingPageContainer) {
        kingPageContainer.innerHTML = '';
        // Force a reflow to ensure the clear happens before new content
        void kingPageContainer.offsetHeight;
    }
    
    // Load and display king timeline data using the loader
    const timelineData = typeof getKingTimelineData === 'function' 
        ? getKingTimelineData(kingName) 
        : null;
    
    const summaryData = typeof getKingSummaryData === 'function' 
        ? getKingSummaryData(kingName) 
        : null;
    
    // Get the kingdom information from the current king
    let kingdom = '';
    if (window.currentPageKings && window.currentPageKings[index]) {
        kingdom = window.currentPageKings[index].kingdom;
    }
    
    // Store the timeline data and king name globally for the table view toggle
    window.currentKingData = {
        name: kingName,
        kingdom: kingdom, // Store kingdom to distinguish duplicate names
        data: timelineData,
        summary: summaryData,
        isTableView: false,
        currentIndex: index // Store the current index for navigation
    };
    
    if (summaryData && summaryData.length > 0) {
        // Display summary data by default in book chapter format
        displayKingSummary(kingPageContainer, summaryData, kingName);
    } else if (timelineData) {
        // Fallback to showing welcome message if no summary
        kingPageContainer.innerHTML = `
            <div style="text-align: center; padding: 60px 20px;">
                <h2 style="color: #667eea; margin-bottom: 16px; font-size: 24px;">Welcome to King ${kingName}'s Timeline</h2>
                <p style="font-size: 16px; margin-bottom: 24px;">Click the table icon above to view the timeline details</p>
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" style="opacity: 0.3;">
                    <rect x="3" y="3" width="7" height="7" rx="1" stroke="#667eea" stroke-width="2"/>
                    <rect x="3" y="13" width="7" height="7" rx="1" stroke="#667eea" stroke-width="2"/>
                    <rect x="13" y="3" width="7" height="7" rx="1" stroke="#667eea" stroke-width="2"/>
                    <rect x="13" y="13" width="7" height="7" rx="1" stroke="#667eea" stroke-width="2"/>
                </svg>
            </div>
        `;
    } else {
        // Show message if no data available
        kingPageContainer.innerHTML = '<p style="text-align: center; padding: 40px;">No timeline data available for this king yet.</p>';
    }
    
    // Check if audio exists for this king and show/hide audio button
    updateKingAudioButtonVisibility(kingName, kingdom);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function displayKingSummary(container, summaryData, kingName) {
    if (!container || !summaryData || summaryData.length === 0) {
        return;
    }
    
    // Clear container first
    container.innerHTML = '';
    
    // Create sections similar to book chapter format
    summaryData.forEach((section, index) => {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'chapter-section';
        sectionDiv.style.marginBottom = index < summaryData.length - 1 ? '2.5rem' : '0';
        
        // Add section heading
        if (section.heading) {
            const sectionHeading = document.createElement('h3');
            sectionHeading.className = 'chapter-section-heading';
            sectionHeading.textContent = section.heading;
            sectionDiv.appendChild(sectionHeading);
        }
        
        // Add section text
        if (section.text) {
            const sectionText = document.createElement('div');
            sectionText.innerHTML = section.text;
            sectionText.style.lineHeight = '2.2';
            sectionText.style.color = 'inherit';  // This will inherit from parent dark mode styles
            sectionText.style.fontSize = '1.05rem';
            sectionText.style.whiteSpace = 'pre-wrap';
            sectionText.style.marginTop = '1rem';
            sectionText.style.textAlign = 'justify';
            sectionDiv.appendChild(sectionText);
        }
        
        container.appendChild(sectionDiv);
    });
    
    // Make verse badges in section text clickable (not in headings)
    makeVerseBadgesClickable(container);
}

function openKingTableView() {
    const kingPageContainer = document.querySelector('.king-page-container');
    const tableViewBtn = document.querySelector('.table-view-btn');
    
    if (!window.currentKingData) {
        return;
    }
    
    // Check current view state
    if (!window.currentKingData.isTableView) {
        // Switch to table view
        if (!window.currentKingData.data) {
            alert('No timeline data available for this king.');
            return;
        }
        
        kingPageContainer.innerHTML = '';
        displayKingTimeline(kingPageContainer, window.currentKingData.data);
        window.currentKingData.isTableView = true;
        
        // Apply dark mode styles if in dark mode
        setTimeout(() => applyDarkModeToKingTable(), 0);
        
        // Highlight the button
        if (tableViewBtn) {
            tableViewBtn.classList.add('active');
        }
    } else {
        // Switch back to summary view
        kingPageContainer.innerHTML = '';
        
        if (window.currentKingData.summary && window.currentKingData.summary.length > 0) {
            displayKingSummary(kingPageContainer, window.currentKingData.summary, window.currentKingData.name);
        } else if (window.currentKingData.data) {
            // Show welcome message if no summary
            kingPageContainer.innerHTML = `
                <div style="text-align: center; padding: 60px 20px;">
                    <h2 style="color: #667eea; margin-bottom: 16px; font-size: 24px;">Welcome to King ${window.currentKingData.name}'s Timeline</h2>
                    <p style="font-size: 16px; margin-bottom: 24px;">Click the table icon above to view the timeline details</p>
                    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" style="opacity: 0.3;">
                        <rect x="3" y="3" width="7" height="7" rx="1" stroke="#667eea" stroke-width="2"/>
                        <rect x="3" y="13" width="7" height="7" rx="1" stroke="#667eea" stroke-width="2"/>
                        <rect x="13" y="3" width="7" height="7" rx="1" stroke="#667eea" stroke-width="2"/>
                        <rect x="13" y="13" width="7" height="7" rx="1" stroke="#667eea" stroke-width="2"/>
                    </svg>
                </div>
            `;
        }
        
        window.currentKingData.isTableView = false;
        
        // Remove highlight from button
        if (tableViewBtn) {
            tableViewBtn.classList.remove('active');
        }
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function displayKingTimeline(container, timelineData) {
    if (!container || !timelineData || timelineData.length === 0) {
        return;
    }
    
    // Helper function to check if verse is empty (— or -)
    const isEmptyVerse = (verse) => verse === '—' || verse === '-' || !verse || verse.trim() === '';
    
    // Helper function to check if verse is a non-clickable note (like "Linked, not in narrative")
    const isNonClickableNote = (verse) => {
        if (!verse) return false;
        const lowerVerse = verse.toLowerCase();
        return lowerVerse.includes('linked') || 
               lowerVerse.includes('not in narrative') || 
               lowerVerse.includes('thematically');
    };
    
    // Helper function to normalize verse references for parsing
    const normalizeVerseReference = (verse) => {
        if (!verse) return verse;
        
        // Book name abbreviations map
        const bookAbbreviations = {
            '1 Sam': '1 Samuel',
            '2 Sam': '2 Samuel',
            '1 Kgs': '1 Kings',
            '2 Kgs': '2 Kings',
            '1 Chr': '1 Chronicles',
            '2 Chr': '2 Chronicles',
            'Matt': 'Matthew',
            'Mark': 'Mark',
            'Luke': 'Luke',
            'John': 'John',
            'Acts': 'Acts',
            'Rom': 'Romans',
            '1 Cor': '1 Corinthians',
            '2 Cor': '2 Corinthians',
            'Gal': 'Galatians',
            'Eph': 'Ephesians',
            'Phil': 'Philippians',
            'Col': 'Colossians',
            '1 Thess': '1 Thessalonians',
            '2 Thess': '2 Thessalonians',
            '1 Tim': '1 Timothy',
            '2 Tim': '2 Timothy',
            'Titus': 'Titus',
            'Philem': 'Philemon',
            'Heb': 'Hebrews',
            'Jas': 'James',
            '1 Pet': '1 Peter',
            '2 Pet': '2 Peter',
            '1 John': '1 John',
            '2 John': '2 John',
            '3 John': '3 John',
            'Jude': 'Jude',
            'Rev': 'Revelation'
        };
        
        let normalized = verse;
        
        // Replace en-dash and em-dash with regular hyphen
        normalized = normalized.replace(/[–—]/g, '-');
        
        // Replace book abbreviations with full names
        for (const [abbr, full] of Object.entries(bookAbbreviations)) {
            if (normalized.startsWith(abbr + ' ')) {
                normalized = normalized.replace(abbr, full);
                break;
            }
        }
        
        return normalized;
    };
    
    // Detect columns dynamically from the first data item
    // Always exclude 'incident' and 'notes' as they are fixed columns
    const firstItem = timelineData[0];
    const allKeys = Object.keys(firstItem);
    const allDataColumns = allKeys.filter(key => key !== 'incident' && key !== 'notes');
    
    // Filter out columns that have no values in any row
    const dataColumns = allDataColumns.filter(col => {
        // Check if at least one row has a non-empty value for this column
        return timelineData.some(item => !isEmptyVerse(item[col]));
    });
    
    // Helper function to get badge class based on column name
    const getBadgeClass = (colName) => {
        const lowerCol = colName.toLowerCase();
        if (lowerCol.includes('samuel')) return 'verse-samuel';
        if (lowerCol.includes('king')) return 'verse-kings';
        if (lowerCol.includes('chronicle')) return 'verse-chronicles';
        return 'verse-samuel'; // default
    };
    
    // Helper function to format column header
    const formatHeader = (colName) => {
        // Capitalize first letter and handle common patterns
        return colName
            .replace(/([A-Z])/g, ' $1') // Add space before capitals
            .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
            .replace(/\d+/g, ' $&') // Add space before numbers
            .trim();
    };
    
    // Create table HTML matching the kings table format
    const tableHTML = `
        <div class="table-container">
            <table class="table">
                <thead>
                    <tr>
                        <th style="text-align: left;">Incident</th>
                        ${dataColumns.map(col => `<th>${formatHeader(col)}</th>`).join('')}
                        <th style="text-align: left;">Notes</th>
                    </tr>
                </thead>
                <tbody id="king-timeline-tbody">
                    ${timelineData.map((item, rowIndex) => `
                        <tr>
                            <td style="text-align: left;">${item.incident || ''}</td>
                            ${dataColumns.map((col, colIndex) => {
                                const value = item[col] || '—';
                                const badgeClass = getBadgeClass(col);
                                const emptyClass = isEmptyVerse(value) ? 'verse-empty' : '';
                                const dataAttr = `data-verse="${value}" data-row="${rowIndex}" data-col="${colIndex}"`;
                                return `<td><span class="verse-badge ${badgeClass} ${emptyClass}" ${dataAttr}>${value}</span></td>`;
                            }).join('')}
                            <td style="text-align: left;">${item.notes || ''}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    container.innerHTML = tableHTML;
    
    // Add click event listeners to verse badges
    const badges = container.querySelectorAll('.verse-badge');
    badges.forEach(badge => {
        const verseText = badge.getAttribute('data-verse');
        
        // Check if badge should be clickable
        const isClickable = !isEmptyVerse(verseText) && !isNonClickableNote(verseText);
        
        if (isClickable) {
            // Add cursor pointer style
            badge.style.cursor = 'pointer';
            
            // Add click event listener
            badge.addEventListener('click', function(e) {
                e.stopPropagation();
                // Normalize the verse reference before passing to openPassagePopup
                const normalizedVerse = normalizeVerseReference(verseText);
                
                // Check if openPassagePopup function exists (from life-of-christ.js)
                if (typeof openPassagePopup === 'function') {
                    openPassagePopup(normalizedVerse);
                } else {
                    console.warn('openPassagePopup function not found. Make sure life-of-christ.js is loaded.');
                }
            });
        }
    });
}

// Helper function to apply dark mode styles to dynamically created king timeline tables
function applyDarkModeToKingTable() {
    const darkTheme = document.getElementById('dark-theme');
    if (!darkTheme || !darkTheme.checked) {
        return; // Not in dark mode
    }
    
    // Get current dark variant (1 or 2)
    let darkVariant = 1;
    try {
        darkVariant = parseInt(localStorage.getItem('darkVariant')) || 1;
    } catch (err) {
        darkVariant = 1;
    }
    
    const kingPageContent = document.getElementById('king-page-content');
    if (!kingPageContent) return;
    
    const tableContainer = kingPageContent.querySelector('.table-container');
    if (!tableContainer) return;
    
    const tableBg = darkVariant === 2 ? '#1a2332' : '#2a2a2a';
    const tableBorder = darkVariant === 2 ? '#294052' : '#3a3a3a';
    const tableHeaderBg = darkVariant === 2 ? '#0f1a22' : '#1f1f1f';
    const tableHoverBg = darkVariant === 2 ? '#294052' : '#2f2f2f';
    
    tableContainer.style.setProperty('background', tableBg, 'important');
    tableContainer.style.setProperty('border-color', tableBorder, 'important');
    
    const table = tableContainer.querySelector('.table');
    if (!table) return;
    
    table.style.setProperty('background', tableBg, 'important');
    
    // Update table headers
    table.querySelectorAll('th').forEach(th => {
        th.style.setProperty('background', tableHeaderBg, 'important');
        th.style.setProperty('color', '#ececec', 'important');
        th.style.setProperty('border-bottom-color', tableBorder, 'important');
    });
    
    // Update table cells
    table.querySelectorAll('td').forEach(td => {
        td.style.setProperty('color', '#d1d1d1', 'important');
        td.style.setProperty('border-bottom-color', tableBorder, 'important');
        td.style.setProperty('background', tableBg, 'important');
    });
    
    // Update table rows with hover effects
    table.querySelectorAll('tbody tr').forEach(tr => {
        tr.style.setProperty('background', tableBg, 'important');
        
        // Remove existing listeners to avoid duplicates
        const newTr = tr.cloneNode(true);
        tr.parentNode.replaceChild(newTr, tr);
        
        newTr.style.setProperty('background', tableBg, 'important');
        
        newTr.addEventListener('mouseenter', function() {
            this.style.setProperty('background', tableHoverBg, 'important');
            this.querySelectorAll('td').forEach(td => {
                td.style.setProperty('background', tableHoverBg, 'important');
            });
        });
        
        newTr.addEventListener('mouseleave', function() {
            this.style.setProperty('background', tableBg, 'important');
            this.querySelectorAll('td').forEach(td => {
                td.style.setProperty('background', tableBg, 'important');
            });
        });
        
        // Re-attach click handlers for verse badges
        newTr.querySelectorAll('.verse-badge').forEach(badge => {
            const verseText = badge.getAttribute('data-verse');
            const isEmptyVerse = (verse) => verse === '—' || verse === '-' || !verse || verse.trim() === '';
            const isNonClickableNote = (verse) => {
                if (!verse) return false;
                const lowerVerse = verse.toLowerCase();
                return lowerVerse.includes('linked') || 
                       lowerVerse.includes('not in narrative') || 
                       lowerVerse.includes('thematically');
            };
            
            const isClickable = !isEmptyVerse(verseText) && !isNonClickableNote(verseText);
            
            if (isClickable) {
                badge.style.cursor = 'pointer';
                badge.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const normalizeVerseReference = (verse) => {
                        if (!verse) return verse;
                        const bookAbbreviations = {
                            '1 Sam': '1 Samuel', '2 Sam': '2 Samuel', '1 Kgs': '1 Kings', '2 Kgs': '2 Kings',
                            '1 Chr': '1 Chronicles', '2 Chr': '2 Chronicles'
                        };
                        let normalized = verse.replace(/[–—]/g, '-');
                        for (const [abbr, full] of Object.entries(bookAbbreviations)) {
                            if (normalized.startsWith(abbr + ' ')) {
                                normalized = normalized.replace(abbr, full);
                                break;
                            }
                        }
                        return normalized;
                    };
                    const normalizedVerse = normalizeVerseReference(verseText);
                    if (typeof openPassagePopup === 'function') {
                        openPassagePopup(normalizedVerse);
                    }
                });
            }
        });
    });
}

function showKingsTimeline(currentKingName = null) {
    // Hide all content sections
    document.getElementById('dashboard-content').classList.add('hidden');
    document.getElementById('kings-content').classList.add('hidden');
    document.getElementById('prophets-content').classList.add('hidden');
    document.getElementById('prophet-detail-content').classList.add('hidden');
    document.getElementById('books-content').classList.add('hidden');
    document.getElementById('book-chapter-content').classList.add('hidden');
    document.getElementById('king-page-content').classList.add('hidden');
    document.getElementById('timeline-content').classList.add('hidden');
    document.getElementById('genealogy-content').classList.add('hidden');
    document.getElementById('bible-content').classList.add('hidden');
    document.getElementById('setting-content').classList.add('hidden');
    document.getElementById('help-content').classList.add('hidden');
    
    // Show kings timeline
    document.getElementById('kings-timeline-content').classList.remove('hidden');
    
    // Add click handlers to timeline cards
    document.querySelectorAll('.timeline-card').forEach(card => {
        card.addEventListener('click', function() {
            const kingName = this.textContent.trim();
            // Navigate to king detail page
            showKingPageFromTimeline(kingName);
        });
    });
    
    // Highlight current king if provided - use setTimeout to ensure DOM is ready
    if (currentKingName) {
        setTimeout(() => {
            highlightKingInTimeline(currentKingName);
        }, 50);
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function highlightKingInTimeline(kingName) {
    // Remove any existing highlights
    document.querySelectorAll('.timeline-card').forEach(card => {
        card.classList.remove('current-king-highlight');
    });
    
    if (!kingName) return;
    
    // Normalize king name for matching
    const normalizedSearchName = kingName.toLowerCase().trim();
    
    // Find and highlight the matching king
    const cards = document.querySelectorAll('.timeline-card');
    let found = false;
    
    cards.forEach(card => {
        const cardText = card.textContent.trim();
        const normalizedCardName = cardText.toLowerCase();
        
        // Try exact match first
        if (normalizedCardName === normalizedSearchName) {
            card.classList.add('current-king-highlight');
            found = true;
            // Scroll to the highlighted king
            setTimeout(() => {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 150);
        }
        // Try matching if card name is in search name or vice versa
        else if (!found) {
            // Extract first word from both for partial matching
            const searchFirstWord = normalizedSearchName.split(' ')[0];
            const cardFirstWord = normalizedCardName.split(' ')[0];
            
            // Check if the main names match (handles cases like "Jehoram" vs "Jehoram (Joram)")
            if (searchFirstWord === cardFirstWord || 
                normalizedCardName.includes(normalizedSearchName) || 
                normalizedSearchName.includes(normalizedCardName)) {
                card.classList.add('current-king-highlight');
                found = true;
                setTimeout(() => {
                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 150);
            }
        }
    });
}

function showKingPageFromTimeline(kingName) {
    // Find the king in all kings data
    const allKings = [
        ...allKingsData.united.map(king => ({...king, kingdom: 'United Kingdom'})),
        ...allKingsData.israel.map(king => ({...king, kingdom: 'Israel'})),
        ...allKingsData.judah.map(king => ({...king, kingdom: 'Judah'}))
    ];
    
    const normalizedSearchName = kingName.toLowerCase().trim();
    
    const kingIndex = allKings.findIndex(king => {
        const normalizedKingName = king.name.toLowerCase();
        return normalizedKingName === normalizedSearchName || 
               normalizedKingName.includes(normalizedSearchName) ||
               normalizedSearchName.includes(normalizedKingName);
    });
    
    if (kingIndex !== -1) {
        showKingPage(allKings[kingIndex].name, kingIndex);
    }
}

function goBackFromKingsTimeline() {
    // Check if we came from a king page
    if (window.currentKingData && window.currentKingData.name) {
        // Go back to the king detail page
        showKingPage(window.currentKingData.name, 0);
    } else {
        // Go back to kings list
        showKings();
    }
}

function showKingsTimelineFromKingPage() {
    // Get the current king name from the stored data
    const currentKingName = window.currentKingData ? window.currentKingData.name : null;
    openKingsTimelineModal(currentKingName);
}

// Function to check if king audio exists and update button visibility
async function updateKingAudioButtonVisibility(kingName, kingdom) {
    const audioBtn = document.querySelector('#king-page-content .audio-btn');
    
    if (!audioBtn) {
        console.warn('King audio button not found');
        return;
    }
    
    // Hide button initially while checking
    audioBtn.style.display = 'none';
    
    // Format king name for file path
    const cleanedName = kingName.split('(')[0].trim();
    const baseName = cleanedName.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
    
    // List of kings that appear in both kingdoms and need kingdom suffix
    const duplicateKings = ['jehoram', 'joram', 'ahaziah', 'joash', 'jehoash'];
    
    // Determine the formatted king name
    let formattedKingName = baseName;
    if (duplicateKings.includes(baseName) && kingdom) {
        const kingdomSuffix = kingdom.toLowerCase().replace(/\s+kingdom$/, '').trim();
        formattedKingName = `${baseName}-${kingdomSuffix}`;
    }
    
    // Check primary path
    const audioPath = `resources/audio/kings-overview/${formattedKingName}-overview.mp3`;
    
    const checkAudio = (path) => {
        return new Promise((resolve) => {
            const audio = new Audio();
            let resolved = false;
            
            const onCanPlay = () => {
                if (resolved) return;
                resolved = true;
                cleanup();
                resolve(true);
            };
            
            const onError = () => {
                if (resolved) return;
                resolved = true;
                cleanup();
                resolve(false);
            };
            
            const cleanup = () => {
                audio.removeEventListener('canplaythrough', onCanPlay);
                audio.removeEventListener('error', onError);
                audio.removeEventListener('loadeddata', onCanPlay);
                audio.src = '';
            };
            
            const timeout = setTimeout(() => {
                if (!resolved) {
                    onError();
                }
            }, 2000);
            
            audio.addEventListener('canplaythrough', () => {
                clearTimeout(timeout);
                onCanPlay();
            });
            audio.addEventListener('loadeddata', () => {
                clearTimeout(timeout);
                onCanPlay();
            });
            audio.addEventListener('error', () => {
                clearTimeout(timeout);
                onError();
            });
            
            audio.src = path;
            audio.load();
        });
    };
    
    // Check primary path first
    let audioExists = await checkAudio(audioPath);
    
    // If not found and this is a duplicate king, try fallback path
    if (!audioExists && duplicateKings.includes(baseName) && kingdom) {
        const fallbackPath = `resources/audio/kings-overview/${baseName}-overview.mp3`;
        audioExists = await checkAudio(fallbackPath);
    }
    
    // Show or hide button based on audio availability
    if (audioExists) {
        audioBtn.style.display = 'flex';
    } else {
        audioBtn.style.display = 'none';
    }
}

function handleKingAudioClick(event) {
    event.stopPropagation();
    
    // Get the current king name and kingdom from the stored data
    const currentKingName = window.currentKingData ? window.currentKingData.name : null;
    const currentKingdom = window.currentKingData ? window.currentKingData.kingdom : '';
    
    if (!currentKingName) {
        console.warn('No king data available for audio');
        return;
    }
    
    // Format king name for file path
    // Remove parenthetical text (e.g., "Athaliah (Queen)" -> "Athaliah")
    // Then lowercase and replace spaces with hyphens
    const cleanedName = currentKingName.split('(')[0].trim();
    const baseName = cleanedName.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
    
    // List of kings that appear in both kingdoms and need kingdom suffix
    const duplicateKings = ['jehoram', 'joram', 'ahaziah', 'joash', 'jehoash'];
    
    // Check if this king needs kingdom distinction
    let formattedKingName = baseName;
    if (duplicateKings.includes(baseName) && currentKingdom) {
        // Extract kingdom name (e.g., "United Kingdom" -> "united", "Israel" -> "israel")
        const kingdomSuffix = currentKingdom.toLowerCase().replace(/\s+kingdom$/, '').trim();
        formattedKingName = `${baseName}-${kingdomSuffix}`;
    }
    
    // Check if audio file exists and play it
    const audioPath = `resources/audio/kings-overview/${formattedKingName}-overview.mp3`;
    
    console.log('Attempting to play audio for:', currentKingName);
    console.log('Kingdom:', currentKingdom);
    console.log('Formatted name:', formattedKingName);
    console.log('Audio path:', audioPath);
    
    // Check if audio exists
    const audio = new Audio();
    audio.src = audioPath;
    
    audio.addEventListener('canplaythrough', function() {
        // Audio exists, load the player
        console.log('Audio file found, loading player...');
        loadChapterAudioPlayer(audioPath, cleanedName, '');
    }, { once: true });
    
    audio.addEventListener('error', function() {
        // If first path fails and this is a duplicate king, try without kingdom suffix
        if (duplicateKings.includes(baseName) && currentKingdom) {
            const fallbackPath = `resources/audio/kings-overview/${baseName}-overview.mp3`;
            console.log('First path failed, trying fallback:', fallbackPath);
            
            const fallbackAudio = new Audio();
            fallbackAudio.src = fallbackPath;
            
            fallbackAudio.addEventListener('canplaythrough', function() {
                console.log('Fallback audio found, loading player...');
                loadChapterAudioPlayer(fallbackPath, cleanedName, '');
            }, { once: true });
            
            fallbackAudio.addEventListener('error', function() {
                console.warn('Audio file not found:', fallbackPath);
                alert(`Audio for King ${currentKingName} is not available yet.`);
            }, { once: true });
            
            fallbackAudio.load();
        } else {
            // Audio doesn't exist, show message
            console.warn('Audio file not found:', audioPath);
            alert(`Audio for King ${currentKingName} is not available yet.`);
        }
    }, { once: true });
    
    audio.load();
}

function openKingsTimelineModal(currentKingName = null) {
    // Show the modal
    const modal = document.getElementById('kings-timeline-modal');
    if (modal) {
        modal.style.display = 'flex';
        
        // Reset scroll to top
        const modalBody = modal.querySelector('.timeline-modal-body');
        if (modalBody) {
            modalBody.scrollTop = 0;
        }
        
        // Add click handlers to timeline cards in modal
        modal.querySelectorAll('.timeline-card').forEach(card => {
            // Remove old event listeners by cloning
            const newCard = card.cloneNode(true);
            card.parentNode.replaceChild(newCard, card);
            
            newCard.addEventListener('click', function() {
                const kingName = this.textContent.trim();
                // Close modal and navigate to king detail page
                closeKingsTimelineModal();
                setTimeout(() => {
                    showKingPageFromTimeline(kingName);
                }, 300);
            });
        });
        
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
        
        // Highlight current king if provided (but don't scroll to it)
        if (currentKingName) {
            highlightKingInTimelineModal(currentKingName);
        }
    }
}

function closeKingsTimelineModal() {
    const modal = document.getElementById('kings-timeline-modal');
    if (modal) {
        modal.style.display = 'none';
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Remove all highlights
        modal.querySelectorAll('.timeline-card').forEach(card => {
            card.classList.remove('current-king-highlight');
        });
    }
}

function highlightKingInTimelineModal(kingName) {
    const modal = document.getElementById('kings-timeline-modal');
    if (!modal) return;
    
    // Remove any existing highlights
    modal.querySelectorAll('.timeline-card').forEach(card => {
        card.classList.remove('current-king-highlight');
    });
    
    if (!kingName) return;
    
    // Normalize king name for matching
    const normalizedSearchName = kingName.toLowerCase().trim();
    
    // Find and highlight the matching king - only one card
    const cards = modal.querySelectorAll('.timeline-card');
    
    for (let card of cards) {
        const cardText = card.textContent.trim();
        const normalizedCardName = cardText.toLowerCase();
        
        // Try exact match first (case insensitive)
        if (normalizedCardName === normalizedSearchName) {
            card.classList.add('current-king-highlight');
            break; // Stop after finding the first exact match
        }
    }
    
    // If no exact match found, try partial matching
    if (!modal.querySelector('.current-king-highlight')) {
        for (let card of cards) {
            const cardText = card.textContent.trim();
            const normalizedCardName = cardText.toLowerCase();
            
            const searchFirstWord = normalizedSearchName.split(' ')[0];
            const cardFirstWord = normalizedCardName.split(' ')[0];
            
            // Check if main names match (for cases like "Jehoram" vs "Jehoram (Joram)")
            if (searchFirstWord === cardFirstWord && searchFirstWord.length > 3) {
                card.classList.add('current-king-highlight');
                break; // Stop after finding the first partial match
            }
        }
    }
    
    // Note: No scrolling - modal always shows from the top
}

function showProphets() {
    // Update navigation
    updateNavActive('prophets');
    
    // Show/hide content
    document.getElementById('dashboard-content').classList.add('hidden');
    document.getElementById('kings-content').classList.add('hidden');
    document.getElementById('prophets-content').classList.remove('hidden');
    document.getElementById('prophet-detail-content').classList.add('hidden');
    document.getElementById('books-content').classList.add('hidden');
    document.getElementById('book-chapter-content').classList.add('hidden');
    document.getElementById('king-page-content').classList.add('hidden');
    document.getElementById('timeline-content').classList.add('hidden');
    document.getElementById('genealogy-content').classList.add('hidden');
    document.getElementById('bible-content').classList.add('hidden');
    document.getElementById('setting-content').classList.add('hidden');
    document.getElementById('help-content').classList.add('hidden');
    
    // Hide Bible verse display section as well
    const bibleVerseDisplaySection = document.getElementById('bibleVerseDisplaySection');
    if (bibleVerseDisplaySection) {
        bibleVerseDisplaySection.classList.add('hidden');
    }
    
    // Initialize prophets table if not already done
    if (!prophetsTableManager) {
        initializeProphetsTable();
    }
    
    // Load prophets data
    loadProphetsData();
    
    // Initialize filter buttons
    initializeProphetsFilterButtons();
    
    // Update URL route
    if (typeof updateRoute === 'function') {
        updateRoute('prophets');
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showProphetDetail(prophetName) {
    // Update navigation
    updateNavActive('prophets');
    
    // Show/hide content
    document.getElementById('dashboard-content').classList.add('hidden');
    document.getElementById('kings-content').classList.add('hidden');
    document.getElementById('prophets-content').classList.add('hidden');
    document.getElementById('prophet-detail-content').classList.remove('hidden');
    document.getElementById('books-content').classList.add('hidden');
    document.getElementById('book-chapter-content').classList.add('hidden');
    document.getElementById('king-page-content').classList.add('hidden');
    document.getElementById('timeline-content').classList.add('hidden');
    document.getElementById('genealogy-content').classList.add('hidden');
    document.getElementById('bible-content').classList.add('hidden');
    
    // Hide Bible verse display section as well
    const bibleVerseDisplaySection = document.getElementById('bibleVerseDisplaySection');
    if (bibleVerseDisplaySection) {
        bibleVerseDisplaySection.classList.add('hidden');
    }
    document.getElementById('setting-content').classList.add('hidden');
    document.getElementById('help-content').classList.add('hidden');
    
    // Update URL with prophet name
    if (typeof updateRoute === 'function') {
        updateRoute('prophetDetail', prophetName);
    }
    
    // Update the prophet detail title
    const titleElement = document.getElementById('prophetDetailTitle');
    if (titleElement) {
        titleElement.textContent = `Prophet ${prophetName}`;
    }
    
    // Clear the prophet page container
    const prophetPageContainer = document.querySelector('.prophet-page-container');
    if (prophetPageContainer) {
        prophetPageContainer.innerHTML = '';
        // Force a reflow to ensure the clear happens before new content
        void prophetPageContainer.offsetHeight;
    }
    
    // Load and display prophet content
    loadProphetContent(prophetName, prophetPageContainer);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function loadProphetContent(prophetName, container) {
    // Find the prophet in the data
    let prophet = null;
    let allProphets = [
        ...allProphetsData.majorProphets,
        ...allProphetsData.minorProphets,
        ...allProphetsData.otherProphets
    ];
    
    prophet = allProphets.find(p => p.name === prophetName);
    
    if (!prophet || !container) {
        if (container) {
            container.innerHTML = '<div class="no-content"><p>Prophet information not available.</p></div>';
        }
        return;
    }
    
    // Check if prophet has text content
    if (prophet.text && Array.isArray(prophet.text) && prophet.text.length > 0) {
        // Display text content in book chapter format (similar to king summary)
        displayProphetSummary(container, prophet.text, prophetName);
    } else {
        // Show welcome message if no text content
        container.innerHTML = `
            <div style="text-align: center; padding: 60px 20px;">
                <h2 style="color: #667eea; margin-bottom: 16px; font-size: 24px;">Prophet ${prophetName}</h2>
                <p style="font-size: 16px; margin-bottom: 24px;">Detailed information about this prophet is coming soon.</p>
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" style="opacity: 0.3;">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 10 12 6.16-1.26 10-6.45 10-12V7l-10-5z" stroke="#667eea" stroke-width="2" fill="none"/>
                    <path d="M12 11v6M12 8h.01" stroke="#667eea" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </div>
        `;
    }
}

function displayProphetSummary(container, textData, prophetName) {
    if (!container || !textData || textData.length === 0) {
        return;
    }
    
    // Clear container first
    container.innerHTML = '';
    
    // Create sections similar to book chapter format
    textData.forEach((section, index) => {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'chapter-section';
        sectionDiv.style.marginBottom = index < textData.length - 1 ? '2.5rem' : '0';
        
        // Add section heading
        if (section.section) {
            const sectionHeading = document.createElement('h3');
            sectionHeading.className = 'chapter-section-heading';
            sectionHeading.textContent = section.section;
            sectionDiv.appendChild(sectionHeading);
        }
        
        // Add section text
        if (section.text) {
            const sectionText = document.createElement('div');
            sectionText.innerHTML = section.text;
            sectionText.style.lineHeight = '2.2';
            sectionText.style.color = 'inherit';  // This will inherit from parent dark mode styles
            sectionText.style.fontSize = '1.05rem';
            sectionText.style.whiteSpace = 'pre-wrap';
            sectionText.style.marginTop = '1rem';
            sectionText.style.textAlign = 'justify';
            sectionDiv.appendChild(sectionText);
        }
        
        container.appendChild(sectionDiv);
    });
    
    // Make verse badges in section text clickable (not in headings)
    makeVerseBadgesClickable(container);
}

// Drawer toggle functionality
function toggleDrawer() {
    const sidebar = document.getElementById('sidebar') || document.getElementById('leftSidebar');
    const toggleIcon = document.getElementById('toggleIcon');
    
    sidebar.classList.toggle('collapsed');
    document.body.classList.toggle('sidebar-collapsed');
    
    if (toggleIcon) {
        if (sidebar.classList.contains('collapsed')) {
            toggleIcon.textContent = '›'; // Right chevron - click to expand
        } else {
            toggleIcon.textContent = '‹'; // Left chevron - click to collapse
        }
    }
}

// New sidebar toggle function
function toggleSidebar() {
    const sidebar = document.getElementById('leftSidebar');
    sidebar.classList.toggle('collapsed');
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

// Removed: window.openKingModal - function no longer exists after Info column removal

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
        onRowClick: (prophet) => {
            // Navigate to prophet detail page
            const encodedName = encodeURIComponent(prophet.name);
            navigateTo(`#/prophet/${encodedName}`);
        },
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

// Book popup functions
async function openBookByIndex(index) {
    const currentData = booksTableManager.getCurrentData();
    const book = currentData[index];
    if (book) {
        // Check if audio exists for this book
        const audioFile = await checkBookAudioExists(book.name);
        
        if (audioFile) {
            // Audio exists, play it
            playBookAudio(book.name);
        } else {
            // No audio, show the modal
            openBookModal(book);
        }
    }
}

// Helper function to format book name for audio file
function formatBookNameForAudioFile(bookName) {
    return bookName.toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with hyphens
        .replace(/^(\d+)(st|nd|rd|th)\s+/, '$1-')  // Handle "1st Samuel" -> "1-samuel"
        .replace(/^first\s+/i, '1-')    // Handle "First Samuel" -> "1-samuel"
        .replace(/^second\s+/i, '2-')   // Handle "Second Samuel" -> "2-samuel"
        .replace(/^third\s+/i, '3-')    // Handle "Third John" -> "3-john"
        .replace(/leviticus/, 'levi');   // Special case for Leviticus -> levi
}

// Function to check if book audio exists
function checkBookAudioExists(bookName) {
    return new Promise((resolve) => {
        const formattedName = formatBookNameForAudioFile(bookName);
        const audioPath = `resources/audio/books-overview/${formattedName}-overview.mp3`;
        
        // Create a temporary audio element to check if file exists
        const audio = new Audio();
        
        audio.addEventListener('loadedmetadata', () => {
            resolve(audioPath);
        });
        
        audio.addEventListener('error', () => {
            resolve(null);
        });
        
        audio.src = audioPath;
    });
}

// Function to play audio for specific books using enhanced audio player
async function playBookAudio(bookName) {
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

    // Check if audio file exists for this book
    const audioFile = await checkBookAudioExists(bookName);
    
    if (!audioFile) {
        // No audio file found, show the modal instead
        console.log(`No audio file found for ${bookName}`);
        return;
    }

    // Load the enhanced audio player
    loadEnhancedAudioPlayer(audioFile, bookName);
}

// Enhanced Audio Player Function - creates the player directly in the page
function loadEnhancedAudioPlayer(audioFile, bookName) {
    // Stop and remove any existing book audio player
    const existingPlayer = document.querySelector('.enhanced-audio-player-overlay');
    if (existingPlayer) {
        const audio = existingPlayer.querySelector('audio');
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
        existingPlayer.remove();
    }
    
    // Stop and remove any existing chapter audio player
    const existingChapterPlayer = document.querySelector('.chapter-audio-player-overlay');
    if (existingChapterPlayer) {
        const chapterAudio = existingChapterPlayer.querySelector('audio');
        if (chapterAudio) {
            chapterAudio.pause();
            chapterAudio.currentTime = 0;
        }
        existingChapterPlayer.remove();
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
    updateNavActive('books');
    
    // Show/hide content
    document.getElementById('dashboard-content').classList.add('hidden');
    document.getElementById('kings-content').classList.add('hidden');
    document.getElementById('prophets-content').classList.add('hidden');
    document.getElementById('prophet-detail-content').classList.add('hidden');
    document.getElementById('books-content').classList.remove('hidden');
    document.getElementById('book-chapter-content').classList.add('hidden');
    document.getElementById('king-page-content').classList.add('hidden');
    document.getElementById('timeline-content').classList.add('hidden');
    document.getElementById('genealogy-content').classList.add('hidden');
    document.getElementById('bible-content').classList.add('hidden');
    document.getElementById('setting-content').classList.add('hidden');
    document.getElementById('help-content').classList.add('hidden');
    
    // Hide Bible verse display section as well
    const bibleVerseDisplaySection = document.getElementById('bibleVerseDisplaySection');
    if (bibleVerseDisplaySection) {
        bibleVerseDisplaySection.classList.add('hidden');
    }
    
    // Initialize table manager if not already done
    if (!booksTableManager) {
        initializeBooksTable();
    }
    
    // Load books data
    loadBooksData();
    
    // Initialize filter buttons
    initializeBooksFilterButtons();
    
    // Update URL route
    if (typeof updateRoute === 'function') {
        updateRoute('books');
    }
    
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
                sortable: true,
                render: (item) => `<td class="name-cell"><div class="name-container"><span class="name">${item.name}</span></div></td>`
            },
            {
                header: 'Verses',
                key: 'verses',
                className: 'verses-cell',
                sortable: true,
                render: (item) => `<td class="verses-cell"><span class="status-badge badge-verses">${item.verses}</span></td>`
            },
            {
                header: 'Author',
                key: 'author',
                className: 'author-cell',
                render: (item) => `<td class="author-cell">${item.author}</td>`
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
    updateNavActive('books');
    
    // Hide all content sections
    document.getElementById('dashboard-content').classList.add('hidden');
    document.getElementById('kings-content').classList.add('hidden');
    document.getElementById('prophets-content').classList.add('hidden');
    document.getElementById('prophet-detail-content').classList.add('hidden');
    document.getElementById('books-content').classList.add('hidden');
    document.getElementById('king-page-content').classList.add('hidden');
    document.getElementById('timeline-content').classList.add('hidden');
    document.getElementById('genealogy-content').classList.add('hidden');
    document.getElementById('bible-content').classList.add('hidden');
    document.getElementById('setting-content').classList.add('hidden');
    document.getElementById('help-content').classList.add('hidden');
    
    // Hide Bible verse display section as well - book chapters have their own display
    const bibleVerseDisplaySection = document.getElementById('bibleVerseDisplaySection');
    if (bibleVerseDisplaySection) {
        bibleVerseDisplaySection.classList.add('hidden');
    }
    
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
    updateNavActive('books');
    
    // Hide all content sections
    document.getElementById('dashboard-content').classList.add('hidden');
    document.getElementById('kings-content').classList.add('hidden');
    document.getElementById('prophets-content').classList.add('hidden');
    document.getElementById('prophet-detail-content').classList.add('hidden');
    document.getElementById('books-content').classList.add('hidden');
    document.getElementById('king-page-content').classList.add('hidden');
    document.getElementById('timeline-content').classList.add('hidden');
    document.getElementById('genealogy-content').classList.add('hidden');
    document.getElementById('bible-content').classList.add('hidden');
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
    
    // Update URL with book and chapter
    if (typeof updateRoute === 'function') {
        updateRoute('bookChapter', bookName, chapterNumber);
    }
    
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
            <p style="font-size: 1rem;">Loading chapter...</p>
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
                    sectionText.style.color = 'inherit';  // Inherit from CSS variables
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
            noDataDiv.style.fontSize = '1.1rem';
            noDataDiv.style.background = '#f9f9f9';
            noDataDiv.style.borderRadius = '12px';
            noDataDiv.style.margin = '2rem 0';
            noDataDiv.style.border = '2px dashed #ddd';
            noDataDiv.innerHTML = `
                <p style="font-size: 3.5rem; margin-bottom: 1rem; opacity: 0.5;">📖</p>
                <p style="font-size: 1.3rem; font-weight: 600; margin-bottom: 0.5rem;">Chapter Data Not Available</p>
                <p style="font-size: 1rem;">Content for <strong>${bookName} Chapter ${chapterNum}</strong> has not been seeded yet.</p>
                <p style="font-size: 0.9rem; margin-top: 1rem;">Currently available: Matthew and Exodus</p>
            `;
            container.appendChild(noDataDiv);
        }
        
        // Make verse badges in section text clickable (not in headings)
        makeVerseBadgesClickable(container);
    });
}

/**
 * Make verse badges clickable to open Bible passage popup
 * This function finds all verse badges within a container (excluding those in headings)
 * and adds click event listeners to open the passage popup
 * @param {HTMLElement} container - The container element to search for verse badges
 */
function makeVerseBadgesClickable(container) {
    if (!container) return;
    
    // Get book and chapter from page title for context
    const bookChapterTitle = document.getElementById('bookChapterTitle');
    let currentBook = '';
    let currentChapter = '';
    
    if (bookChapterTitle) {
        const titleText = bookChapterTitle.textContent.trim();
        // Parse "Book Name - Chapter" format
        const titleMatch = titleText.match(/^(.+?)\s*-\s*(\d+)$/);
        if (titleMatch) {
            currentBook = titleMatch[1].trim();
            currentChapter = titleMatch[2].trim();
        }
    }
    
    // Find all verse badges
    const allBadges = container.querySelectorAll('.verse-badge');
    
    allBadges.forEach(badge => {
        // Get the verse text and clean it up
        let verseText = badge.textContent.trim();
        if (!verseText) return;
        
        // Check if badge is inside a heading
        const isInHeading = badge.closest('.chapter-section-heading');
        
        // Remove common prefixes (See, In, etc.) - case-insensitive
        verseText = verseText.replace(/^(see|in|cf\.?|compare|read)\s+/i, '');
        
        // Check if the verse reference is incomplete (e.g., "Verses 1-3" or "Verse 5")
        const incompleteVersePattern = /^verses?\s+(\d+(?:\s*-\s*\d+)?)/i;
        const incompleteMatch = verseText.match(incompleteVersePattern);
        
        if (incompleteMatch && currentBook && currentChapter) {
            // Complete the reference with book and chapter from page title
            const verseNumbers = incompleteMatch[1];
            verseText = `${currentBook} ${currentChapter}:${verseNumbers.replace(/\s*-\s*/, '-')}`;
        } else {
            // Extract just the Bible reference pattern: Book Chapter:Verse or Book Chapter:Verse-Verse
            // This regex matches patterns like "Genesis 1:1", "1 Kings 2:3-5", "2 Corinthians 5:17"
            const versePattern = /(\d?\s*[A-Za-z]+(?:\s+[A-Za-z]+)?)\s+(\d+)\s*:\s*(\d+(?:\s*-\s*\d+)?)/;
            const match = verseText.match(versePattern);
            
            if (match) {
                // Use the matched Bible reference only
                verseText = match[0].trim();
            }
        }
        
        // Remove any trailing punctuation or words after the verse reference
        verseText = verseText.replace(/[,;.]\s*.*$/, '');
        
        // Update badge text to show cleaned version
        if (badge.textContent.trim() !== verseText) {
            badge.textContent = verseText;
        }
        
        // Add cursor pointer style (for ALL badges now, including headings)
        badge.style.cursor = 'pointer';
        
        // Add click event listener
        badge.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Check if openPassagePopup function exists (from life-of-christ.js)
            if (typeof openPassagePopup === 'function') {
                openPassagePopup(verseText);
            } else {
                console.warn('openPassagePopup function not found. Make sure life-of-christ.js is loaded.');
            }
        });
        
        // Add hover effect
        badge.addEventListener('mouseenter', function() {
            badge.style.transform = 'translateY(-2px)';
            badge.style.transition = 'transform 0.2s ease';
        });
        
        badge.addEventListener('mouseleave', function() {
            badge.style.transform = 'translateY(0)';
        });
    });
}

// Additional Navigation Functions
function showTimeline() {
    // Update navigation
    updateNavActive('timeline');
    
    // Show/hide content
    document.getElementById('dashboard-content').classList.add('hidden');
    document.getElementById('kings-content').classList.add('hidden');
    document.getElementById('prophets-content').classList.add('hidden');
    document.getElementById('prophet-detail-content').classList.add('hidden');
    document.getElementById('books-content').classList.add('hidden');
    document.getElementById('book-chapter-content').classList.add('hidden');
    document.getElementById('king-page-content').classList.add('hidden');
    document.getElementById('timeline-content').classList.remove('hidden');
    document.getElementById('genealogy-content').classList.add('hidden');
    document.getElementById('bible-content').classList.add('hidden');
    document.getElementById('setting-content').classList.add('hidden');
    document.getElementById('help-content').classList.add('hidden');
    
    // Hide Bible verse display section as well
    const bibleVerseDisplaySection = document.getElementById('bibleVerseDisplaySection');
    if (bibleVerseDisplaySection) {
        bibleVerseDisplaySection.classList.add('hidden');
    }
    
    // Update URL route
    if (typeof updateRoute === 'function') {
        updateRoute('timeline');
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showGenealogy() {
    // Update navigation
    updateNavActive('genealogy');
    
    // Show/hide content
    document.getElementById('dashboard-content').classList.add('hidden');
    document.getElementById('kings-content').classList.add('hidden');
    document.getElementById('prophets-content').classList.add('hidden');
    document.getElementById('prophet-detail-content').classList.add('hidden');
    document.getElementById('books-content').classList.add('hidden');
    document.getElementById('book-chapter-content').classList.add('hidden');
    document.getElementById('king-page-content').classList.add('hidden');
    document.getElementById('timeline-content').classList.add('hidden');
    document.getElementById('genealogy-content').classList.remove('hidden');
    document.getElementById('bible-content').classList.add('hidden');
    document.getElementById('setting-content').classList.add('hidden');
    document.getElementById('help-content').classList.add('hidden');
    
    // Hide Bible verse display section as well
    const bibleVerseDisplaySection = document.getElementById('bibleVerseDisplaySection');
    if (bibleVerseDisplaySection) {
        bibleVerseDisplaySection.classList.add('hidden');
    }
    
    // Clear search input and reset filters
    const charactersSearchInput = document.getElementById('charactersSearch');
    const charactersClearBtn = document.getElementById('charactersClearBtn');
    const charactersSearchInfo = document.getElementById('charactersSearchInfo');
    
    if (charactersSearchInput) {
        charactersSearchInput.value = '';
    }
    if (charactersClearBtn) {
        charactersClearBtn.style.display = 'none';
    }
    if (charactersSearchInfo) {
        charactersSearchInfo.textContent = '';
        charactersSearchInfo.style.display = 'none';
    }
    
    // Initialize character study
    if (typeof initializeCharacterStudy === 'function') {
        setTimeout(() => {
            initializeCharacterStudy();
            setupCharactersSearch();
        }, 100);
    }
    
    // Update URL route
    if (typeof updateRoute === 'function') {
        updateRoute('genealogy');
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showBible() {
    // Update navigation
    updateNavActive('bible');
    
    // Show/hide content
    document.getElementById('dashboard-content').classList.add('hidden');
    document.getElementById('kings-content').classList.add('hidden');
    document.getElementById('prophets-content').classList.add('hidden');
    document.getElementById('prophet-detail-content').classList.add('hidden');
    document.getElementById('books-content').classList.add('hidden');
    document.getElementById('book-chapter-content').classList.add('hidden');
    document.getElementById('king-page-content').classList.add('hidden');
    document.getElementById('timeline-content').classList.add('hidden');
    document.getElementById('genealogy-content').classList.add('hidden');
    document.getElementById('bible-content').classList.remove('hidden');
    document.getElementById('setting-content').classList.add('hidden');
    document.getElementById('help-content').classList.add('hidden');
    
    // Hide Bible verse display section - it should only show after form submission
    const bibleVerseDisplaySection = document.getElementById('bibleVerseDisplaySection');
    if (bibleVerseDisplaySection) {
        bibleVerseDisplaySection.classList.add('hidden');
    }
    
    // Show the Bible verse form section
    const bibleVerseFormSection = document.getElementById('bibleVerseFormSection');
    if (bibleVerseFormSection) {
        bibleVerseFormSection.classList.remove('hidden');
    }
    
    // Update URL route
    if (typeof updateRoute === 'function') {
        updateRoute('bible');
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Initialize Bible verse form
    if (typeof initializeBibleVersePage === 'function') {
        initializeBibleVersePage();
    }
}

function showSetting() {
    // Update navigation
    updateNavActive('setting');
    
    // Show/hide content
    document.getElementById('dashboard-content').classList.add('hidden');
    document.getElementById('kings-content').classList.add('hidden');
    document.getElementById('prophets-content').classList.add('hidden');
    document.getElementById('prophet-detail-content').classList.add('hidden');
    document.getElementById('books-content').classList.add('hidden');
    document.getElementById('book-chapter-content').classList.add('hidden');
    document.getElementById('timeline-content').classList.add('hidden');
    document.getElementById('genealogy-content').classList.add('hidden');
    document.getElementById('bible-content').classList.add('hidden');
    document.getElementById('setting-content').classList.remove('hidden');
    document.getElementById('help-content').classList.add('hidden');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showHelp() {
    // Update navigation
    updateNavActive('help');
    
    // Show/hide content
    document.getElementById('dashboard-content').classList.add('hidden');
    document.getElementById('kings-content').classList.add('hidden');
    document.getElementById('prophets-content').classList.add('hidden');
    document.getElementById('prophet-detail-content').classList.add('hidden');
    document.getElementById('books-content').classList.add('hidden');
    document.getElementById('book-chapter-content').classList.add('hidden');
    document.getElementById('king-page-content').classList.add('hidden');
    document.getElementById('timeline-content').classList.add('hidden');
    document.getElementById('genealogy-content').classList.add('hidden');
    document.getElementById('bible-content').classList.add('hidden');
    document.getElementById('setting-content').classList.add('hidden');
    document.getElementById('help-content').classList.remove('hidden');
    
    // Hide Bible verse display section as well
    const bibleVerseDisplaySection = document.getElementById('bibleVerseDisplaySection');
    if (bibleVerseDisplaySection) {
        bibleVerseDisplaySection.classList.add('hidden');
    }
    
    // Clear search input and reset filters
    const lifeOfChristSearchInput = document.getElementById('lifeOfChristSearch');
    const searchClearBtn = document.getElementById('searchClearBtn');
    const searchResultsInfo = document.getElementById('searchResultsInfo');
    
    if (lifeOfChristSearchInput) {
        lifeOfChristSearchInput.value = '';
    }
    if (searchClearBtn) {
        searchClearBtn.style.display = 'none';
    }
    if (searchResultsInfo) {
        searchResultsInfo.textContent = '';
        searchResultsInfo.style.display = 'none';
    }
    
    // Initialize Life of Christ cards
    if (typeof initializeLifeOfChrist === 'function') {
        initializeLifeOfChrist();
    }
    
    // Update URL route
    if (typeof updateRoute === 'function') {
        updateRoute('help');
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
window.selectProphetsCategory = selectProphetsCategory;
window.toggleProphetsDropdown = toggleProphetsDropdown;
window.openProphetsFilterCard = openProphetsFilterCard;
window.openBookByIndex = openBookByIndex;
window.playBookAudio = playBookAudio;
window.openBookModal = openBookModal;
window.closeBookPopup = closeBookPopup;
window.showBooks = showBooks;
window.showProphets = showProphets;
window.showProphetDetail = showProphetDetail;
window.selectBooksCategory = selectBooksCategory;
window.toggleBooksDropdown = toggleBooksDropdown;
window.openBooksFilterCard = openBooksFilterCard;
window.closeBooksFilterCard = closeBooksFilterCard;
window.applyBooksFilter = applyBooksFilter;
window.showTimeline = showTimeline;
window.showGenealogy = showGenealogy;
window.showBible = showBible;
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

// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const darkTheme = document.getElementById('dark-theme');
    const lightTheme = document.getElementById('light-theme');
    // Track which dark variant is active: 1 = original, 2 = alternate (#1d2a3b)
    let darkVariant = 1;
    // Track which light variant is active: 1 = original, 2 = warm beige (#fef6eb)
    let lightVariant = 1;
    try {
        const stored = localStorage.getItem('darkVariant');
        if (stored) darkVariant = parseInt(stored, 10) || 1;
        const storedLight = localStorage.getItem('lightVariant');
        if (storedLight) lightVariant = parseInt(storedLight, 10) || 1;
    } catch (e) {
        // ignore storage errors
    }
    
    if (darkTheme && lightTheme) {
        const leftSidebar = document.getElementById('leftSidebar');
        const container = document.querySelector('.container');
        
        // Get the theme toggle labels for animation origin
        const darkThemeLabel = document.querySelector('label[for="dark-theme"]');
        const lightThemeLabel = document.querySelector('label[for="light-theme"]');
        
        // Function to apply dark theme (supports two variants via darkVariant)
        function applyDarkTheme() {
            // Remove light mode hover styles if they exist
            const lightModeStyle = document.getElementById('light-mode-hover');
            if (lightModeStyle) {
                lightModeStyle.remove();
            }
            
            // Remove all light mode variant classes before applying dark mode
            document.querySelector('.dashboard-cards-container')?.classList.remove('light-mode-cards-variant2');
            document.getElementById('dashboard-content')?.classList.remove('light-mode-dashboard-variant2');
            document.getElementById('timeline-content')?.classList.remove('light-mode-timeline-variant2');
            document.getElementById('help-content')?.classList.remove('light-mode-life-of-christ-variant2');
            document.getElementById('genealogy-content')?.classList.remove('light-mode-characters-variant2');
            document.getElementById('king-page-content')?.classList.remove('light-mode-kings-variant2');
            document.getElementById('kings-content')?.classList.remove('light-mode-kings-variant2');
            document.getElementById('prophets-content')?.classList.remove('light-mode-prophets-variant2');
            document.getElementById('prophet-detail-content')?.classList.remove('light-mode-prophets-variant2');
            document.getElementById('books-content')?.classList.remove('light-mode-books-variant2');
            document.getElementById('book-chapter-content')?.classList.remove('light-mode-books-variant2');
            document.getElementById('bible-content')?.classList.remove('light-mode-bible-variant2');
            document.getElementById('bibleVerseDisplaySection')?.classList.remove('light-mode-bible-variant2');
            document.getElementById('filterCardOverlay')?.classList.remove('light-mode-kings-variant2');
            document.getElementById('prophetsFilterCardOverlay')?.classList.remove('light-mode-prophets-variant2');
            document.getElementById('booksFilterCardOverlay')?.classList.remove('light-mode-books-variant2');
            document.getElementById('chaptersPopup')?.classList.remove('light-mode-books-variant2');
            document.getElementById('synopsisSideDrawer')?.classList.remove('light-mode-books-variant2');
            document.getElementById('kings-timeline-content')?.classList.remove('light-mode-kings-variant2');
            document.getElementById('passagePopup')?.classList.remove('light-mode-life-of-christ-variant2');
            document.getElementById('kingHoverCard')?.classList.remove('light-mode-kings-variant2');
            document.getElementById('kings-timeline-modal')?.classList.remove('light-mode-kings-variant2');
            
            // Remove inline styles that were applied by light mode
            // Reset content-actions and content-header backgrounds
            document.querySelectorAll('.content-actions').forEach(el => {
                el.style.removeProperty('background-color');
                
                // Reset card elements inside content-actions
                el.querySelectorAll('.card').forEach(card => {
                    card.style.removeProperty('background-color');
                    card.style.removeProperty('border-color');
                });
            });
            
            document.querySelectorAll('.content-header').forEach(el => {
                el.style.removeProperty('background-color');
            });
            
            // Reset container backgrounds
            const containersToReset = [
                '.timeline-container',
                '.characters-container',
                '.life-of-jesus-container',
                '.prophet-page-container',
                '.book-chapter-container',
                '.king-page-container',
                '.seed-image-container',
                '.seed-text-content'
            ];
            
            containersToReset.forEach(selector => {
                const element = document.querySelector(selector);
                if (element) {
                    element.style.removeProperty('background');
                }
            });
            
            // Dark mode - using dark colors
            // Variant specific colors
            if (darkVariant === 1) {
                if (leftSidebar) {
                    leftSidebar.style.background = '#171717';
                    leftSidebar.style.borderRight = '1px solid #2f2f2f';
                }

                if (container) {
                    container.style.background = '#212121';
                }
            } else {
                // Variant 2: swap colors - left pane gets container color, main content gets sidebar color
                if (leftSidebar) {
                    leftSidebar.style.background = '#0f1a22';
                    leftSidebar.style.borderRight = '1px solid #294052';
                }

                if (container) {
                    container.style.background = '#1d2a3b';
                }
            }
            
            // Update main content background for dark mode
            const mainContent = document.querySelector('.main-content');
            if (mainContent) {
                if (darkVariant === 1) {
                    mainContent.style.background = '#212121';
                } else {
                    mainContent.style.background = '#1d2a3b';
                }
            }
            
            // Update all sidebar items colors
            document.querySelectorAll('.sidebar-header, .history-item, .sidebar-footer-item, .sidebar-footer, .theme-toggle-container').forEach(el => {
                el.style.borderColor = darkVariant === 2 ? '#294052' : '#2f2f2f';
            });
            
            document.querySelectorAll('.history-item, .sidebar-footer-item, .sidebar-title').forEach(el => {
                el.style.color = '#ececec';
            });
            
            document.querySelectorAll('.theme-toggle').forEach(el => {
                el.style.background = darkVariant === 2 ? '#294052' : '#2f2f2f';
            });
            
            // Update toggle button
            const toggleBtn = document.querySelector('.sidebar-collapse-btn');
            if (toggleBtn) {
                const btnBg = darkVariant === 2 ? '#1a2332' : '#2f2f2f';
                const btnBorder = darkVariant === 2 ? '#365069' : '#4d4d4d';
                toggleBtn.style.setProperty('background', btnBg, 'important');
                toggleBtn.style.setProperty('border-color', btnBorder, 'important');
                toggleBtn.style.setProperty('color', '#ececec', 'important');
            }
            
            // Reset SVG icons to light color for dark mode
            document.querySelectorAll('.history-item svg, .sidebar-footer-item svg, .sidebar-collapse-btn svg').forEach(svg => {
                svg.style.removeProperty('fill'); // Remove any inline fill styles first
                svg.setAttribute('fill', '#ececec');
                svg.style.setProperty('fill', '#ececec', 'important'); // Force the fill color
            });
            
            // Update theme toggle options
            document.querySelectorAll('.theme-option').forEach(option => {
                const radio = option.previousElementSibling;
                if (radio && radio.checked) {
                    // When dark is selected, show different background for variant 2
                    if (radio.id === 'dark-theme' && darkVariant === 2) {
                        option.style.setProperty('background', '#365069', 'important');
                        option.style.setProperty('color', '#ffffff', 'important');
                    } else if (radio.id === 'dark-theme') {
                        option.style.setProperty('background', '#4d4d4d', 'important');
                        option.style.setProperty('color', '#ececec', 'important');
                    } else {
                        // Light mode - keep default CSS styling
                        option.style.removeProperty('background');
                        option.style.removeProperty('color');
                    }
                } else {
                    option.style.setProperty('background', 'transparent', 'important');
                    option.style.setProperty('color', '#a1a1a1', 'important');
                }
            });
            
            // Update theme toggle SVG icons
            document.querySelectorAll('.theme-option svg').forEach(svg => {
                const option = svg.closest('.theme-option');
                const radio = option.previousElementSibling;
                if (radio && radio.checked) {
                    // Use a different icon color when the alternate dark variant is active
                    if (radio.id === 'dark-theme' && darkVariant === 2) {
                        svg.style.setProperty('fill', '#ffffff', 'important');
                    } else if (radio.id === 'dark-theme') {
                        svg.style.setProperty('fill', '#ececec', 'important');
                    } else {
                        // Light mode
                        svg.style.removeProperty('fill');
                    }
                } else {
                    svg.style.setProperty('fill', '#a1a1a1', 'important');
                }
            });
            
            // Add dark mode hover styles
            const darkModeStyle = document.createElement('style');
            darkModeStyle.id = 'dark-mode-hover';
            const hoverBg = darkVariant === 2 ? '#294052' : '#2f2f2f';
            const hoverBgActive = darkVariant === 2 ? '#365069' : '#4d4d4d';
            const collapseBtnBg = darkVariant === 2 ? '#1a2332' : '#2f2f2f';
            const collapseBtnHover = darkVariant === 2 ? '#294052' : '#2f2f2f';
            darkModeStyle.innerHTML = `
                .history-item:hover:not(.active),
                .sidebar-footer-item:hover {
                    background: ${hoverBg} !important;
                    color: #ececec !important;
                }
                .sidebar-footer-item:last-child:hover {
                    background: #dc3545 !important;
                    color: #ffffff !important;
                }
                .sidebar-footer-item:last-child:hover svg {
                    fill: #ffffff !important;
                }
                .sidebar-toggle-btn:hover {
                    background: ${hoverBg} !important;
                }
                .sidebar-collapse-btn {
                    border-color: ${hoverBgActive} !important;
                    color: #ececec !important;
                    background: ${collapseBtnBg} !important;
                }
                .sidebar-collapse-btn:hover {
                    background: ${collapseBtnHover} !important;
                    border-color: #ececec !important;
                }
                .history-item.active {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
                    color: white !important;
                    border-radius: 10px !important;
                    margin: 0 8px 12px 8px !important;
                }
                .left-sidebar.collapsed .history-item.active {
                    margin: 0 auto 12px auto !important;
                }
                .theme-option:hover:not(:has(input:checked)) {
                    background: ${hoverBg} !important;
                }
            `;
            document.head.appendChild(darkModeStyle);
            
            // Apply dark mode to dashboard cards and content
            const dashboardCardsContainer = document.querySelector('.dashboard-cards-container');
            if (dashboardCardsContainer) {
                dashboardCardsContainer.classList.add('dark-mode-cards');
                // add variant class for dashboards to allow variant-specific styling if needed
                if (darkVariant === 2) dashboardCardsContainer.classList.add('dark-mode-cards-variant2');
                else dashboardCardsContainer.classList.remove('dark-mode-cards-variant2');
            }
            
            const dashboardContent = document.getElementById('dashboard-content');
            if (dashboardContent) {
                dashboardContent.classList.add('dark-mode-dashboard');
                if (darkVariant === 2) dashboardContent.classList.add('dark-mode-dashboard-variant2');
                else dashboardContent.classList.remove('dark-mode-dashboard-variant2');
            }
            
            // Apply dark mode to timeline
            const timelineContent = document.getElementById('timeline-content');
            if (timelineContent) {
                timelineContent.classList.add('dark-mode-timeline');
                if (darkVariant === 2) timelineContent.classList.add('dark-mode-timeline-variant2');
                else timelineContent.classList.remove('dark-mode-timeline-variant2');
            }
            
            // Apply dark mode to Life of Christ
            const lifeOfChristContent = document.getElementById('help-content');
            if (lifeOfChristContent) {
                lifeOfChristContent.classList.add('dark-mode-life-of-christ');
                if (darkVariant === 2) lifeOfChristContent.classList.add('dark-mode-life-of-christ-variant2');
                else lifeOfChristContent.classList.remove('dark-mode-life-of-christ-variant2');
            }
            
            // Apply dark mode to Characters
            const charactersContent = document.getElementById('genealogy-content');
            if (charactersContent) {
                charactersContent.classList.add('dark-mode-characters');
                if (darkVariant === 2) charactersContent.classList.add('dark-mode-characters-variant2');
                else charactersContent.classList.remove('dark-mode-characters-variant2');
            }
            
            // Apply dark mode to Kings
            const kingsContent = document.getElementById('king-page-content');
            if (kingsContent) {
                kingsContent.classList.add('dark-mode-kings');
                if (darkVariant === 2) kingsContent.classList.add('dark-mode-kings-variant2');
                else kingsContent.classList.remove('dark-mode-kings-variant2');
            }
            
            // Apply dark mode to Kings Table
            const kingsTableContent = document.getElementById('kings-content');
            if (kingsTableContent) {
                kingsTableContent.classList.add('dark-mode-kings');
                if (darkVariant === 2) kingsTableContent.classList.add('dark-mode-kings-variant2');
                else kingsTableContent.classList.remove('dark-mode-kings-variant2');
            }
            
            // Apply dark mode to Prophets
            const prophetsContent = document.getElementById('prophets-content');
            if (prophetsContent) {
                prophetsContent.classList.add('dark-mode-prophets');
                if (darkVariant === 2) prophetsContent.classList.add('dark-mode-prophets-variant2');
                else prophetsContent.classList.remove('dark-mode-prophets-variant2');
            }
            
            // Apply dark mode to Prophet Detail Content
            const prophetDetailContent = document.getElementById('prophet-detail-content');
            if (prophetDetailContent) {
                prophetDetailContent.classList.add('dark-mode-prophets');
                if (darkVariant === 2) prophetDetailContent.classList.add('dark-mode-prophets-variant2');
                else prophetDetailContent.classList.remove('dark-mode-prophets-variant2');
            }
            
            // Apply dark mode to Books
            const booksContent = document.getElementById('books-content');
            if (booksContent) {
                booksContent.classList.add('dark-mode-books');
                if (darkVariant === 2) booksContent.classList.add('dark-mode-books-variant2');
                else booksContent.classList.remove('dark-mode-books-variant2');
            }
            
            // Apply dark mode to Book Chapter Content
            const bookChapterContent = document.getElementById('book-chapter-content');
            if (bookChapterContent) {
                bookChapterContent.classList.add('dark-mode-books');
                if (darkVariant === 2) bookChapterContent.classList.add('dark-mode-books-variant2');
                else bookChapterContent.classList.remove('dark-mode-books-variant2');
            }
            
            // Apply dark mode to Bible content
            const bibleContent = document.getElementById('bible-content');
            if (bibleContent) {
                bibleContent.classList.add('dark-mode-bible');
                if (darkVariant === 2) bibleContent.classList.add('dark-mode-bible-variant2');
                else bibleContent.classList.remove('dark-mode-bible-variant2');
            }
            
            // Apply dark mode to Bible Verse Display Section
            const bibleVerseDisplaySection = document.getElementById('bibleVerseDisplaySection');
            if (bibleVerseDisplaySection) {
                bibleVerseDisplaySection.classList.add('dark-mode-bible');
                if (darkVariant === 2) bibleVerseDisplaySection.classList.add('dark-mode-bible-variant2');
                else bibleVerseDisplaySection.classList.remove('dark-mode-bible-variant2');
            }
            
            // Apply dark mode to filter overlays
            const kingsFilterOverlay = document.getElementById('filterCardOverlay');
            if (kingsFilterOverlay) {
                kingsFilterOverlay.classList.add('dark-mode-kings');
                if (darkVariant === 2) kingsFilterOverlay.classList.add('dark-mode-kings-variant2');
                else kingsFilterOverlay.classList.remove('dark-mode-kings-variant2');
            }
            
            const prophetsFilterOverlay = document.getElementById('prophetsFilterCardOverlay');
            if (prophetsFilterOverlay) {
                prophetsFilterOverlay.classList.add('dark-mode-prophets');
                if (darkVariant === 2) prophetsFilterOverlay.classList.add('dark-mode-prophets-variant2');
                else prophetsFilterOverlay.classList.remove('dark-mode-prophets-variant2');
            }
            
            const booksFilterOverlay = document.getElementById('booksFilterCardOverlay');
            if (booksFilterOverlay) {
                booksFilterOverlay.classList.add('dark-mode-books');
                if (darkVariant === 2) booksFilterOverlay.classList.add('dark-mode-books-variant2');
                else booksFilterOverlay.classList.remove('dark-mode-books-variant2');
            }
            
            // Apply dark mode to chapters popup
            const chaptersPopup = document.getElementById('chaptersPopup');
            if (chaptersPopup) {
                chaptersPopup.classList.add('dark-mode-books');
                if (darkVariant === 2) chaptersPopup.classList.add('dark-mode-books-variant2');
                else chaptersPopup.classList.remove('dark-mode-books-variant2');
            }
            
            // Apply dark mode to kings timeline content
            const kingsTimelineContent = document.getElementById('kings-timeline-content');
            if (kingsTimelineContent) {
                kingsTimelineContent.classList.add('dark-mode-kings');
                if (darkVariant === 2) kingsTimelineContent.classList.add('dark-mode-kings-variant2');
                else kingsTimelineContent.classList.remove('dark-mode-kings-variant2');
            }
            
            // Apply dark mode to synopsis side drawer
            const synopsisSideDrawer = document.getElementById('synopsisSideDrawer');
            if (synopsisSideDrawer) {
                synopsisSideDrawer.classList.add('dark-mode-books');
                if (darkVariant === 2) synopsisSideDrawer.classList.add('dark-mode-books-variant2');
                else synopsisSideDrawer.classList.remove('dark-mode-books-variant2');
            }
            
            // Update content-actions and content-header elements with variant-specific colors
            const contentActionsBg = darkVariant === 2 ? '#1d2a3b' : '#212121';
            const contentHeaderBg = darkVariant === 2 ? '#1d2a3b' : '#212121';
            const cardBg = darkVariant === 2 ? '#1a2332' : '#2a2a2a';
            const cardBorder = darkVariant === 2 ? '#294052' : '#3a3a3a';
            
            document.querySelectorAll('.content-actions').forEach(el => {
                el.style.setProperty('background-color', contentActionsBg, 'important');
                
                // Update card elements inside content-actions
                el.querySelectorAll('.card').forEach(card => {
                    card.style.setProperty('background-color', cardBg, 'important');
                    card.style.setProperty('border-color', cardBorder, 'important');
                });
            });
            
            document.querySelectorAll('.content-header').forEach(el => {
                el.style.setProperty('background-color', contentHeaderBg, 'important');
            });
            
            // Update specific container backgrounds with swapped variant 2 color
            const containerBg = darkVariant === 2 ? '#1d2a3b' : '#212121';
            
            // Timeline container
            const timelineContainer = document.querySelector('.timeline-container');
            if (timelineContainer) {
                timelineContainer.style.setProperty('background', containerBg, 'important');
            }
            
            // Characters container
            const charactersContainer = document.querySelector('.characters-container');
            if (charactersContainer) {
                charactersContainer.style.setProperty('background', containerBg, 'important');
            }
            
            // Life of Jesus container
            const lifeOfJesusContainer = document.querySelector('.life-of-jesus-container');
            if (lifeOfJesusContainer) {
                lifeOfJesusContainer.style.setProperty('background', containerBg, 'important');
            }
            
            // Prophet page container
            const prophetPageContainer = document.querySelector('.prophet-page-container');
            if (prophetPageContainer) {
                prophetPageContainer.style.setProperty('background', containerBg, 'important');
            }
            
            // Book chapter container
            const bookChapterContainer = document.querySelector('.book-chapter-container');
            if (bookChapterContainer) {
                bookChapterContainer.style.setProperty('background', containerBg, 'important');
            }
            
            // King page container
            const kingPageContainer = document.querySelector('.king-page-container');
            if (kingPageContainer) {
                kingPageContainer.style.setProperty('background', containerBg, 'important');
            }
            
            // Seed image and text containers
            const seedImageContainer = document.querySelector('.seed-image-container');
            if (seedImageContainer) {
                seedImageContainer.style.setProperty('background', containerBg, 'important');
            }
            
            const seedTextContent = document.querySelector('.seed-text-content');
            if (seedTextContent) {
                seedTextContent.style.setProperty('background', containerBg, 'important');
            }
            
            // Update dynamically created tables in king-page-content
            const kingPageContent = document.getElementById('king-page-content');
            if (kingPageContent) {
                const tableContainer = kingPageContent.querySelector('.table-container');
                if (tableContainer) {
                    const tableBg = darkVariant === 2 ? '#1a2332' : '#2a2a2a';
                    const tableBorder = darkVariant === 2 ? '#294052' : '#3a3a3a';
                    const tableHeaderBg = darkVariant === 2 ? '#0f1a22' : '#1f1f1f';
                    const tableHoverBg = darkVariant === 2 ? '#294052' : '#2f2f2f';
                    
                    tableContainer.style.setProperty('background', tableBg, 'important');
                    tableContainer.style.setProperty('border-color', tableBorder, 'important');
                    
                    const table = tableContainer.querySelector('.table');
                    if (table) {
                        table.style.setProperty('background', tableBg, 'important');
                        
                        // Update table headers
                        table.querySelectorAll('th').forEach(th => {
                            th.style.setProperty('background', tableHeaderBg, 'important');
                            th.style.setProperty('color', '#ececec', 'important');
                            th.style.setProperty('border-bottom-color', tableBorder, 'important');
                        });
                        
                        // Update table cells
                        table.querySelectorAll('td').forEach(td => {
                            td.style.setProperty('color', '#d1d1d1', 'important');
                            td.style.setProperty('border-bottom-color', tableBorder, 'important');
                            td.style.setProperty('background', tableBg, 'important');
                        });
                        
                        // Update table rows
                        table.querySelectorAll('tbody tr').forEach(tr => {
                            tr.style.setProperty('background', tableBg, 'important');
                            
                            // Add hover effect
                            tr.addEventListener('mouseenter', function() {
                                this.style.setProperty('background', tableHoverBg, 'important');
                                this.querySelectorAll('td').forEach(td => {
                                    td.style.setProperty('background', tableHoverBg, 'important');
                                });
                            });
                            
                            tr.addEventListener('mouseleave', function() {
                                this.style.setProperty('background', tableBg, 'important');
                                this.querySelectorAll('td').forEach(td => {
                                    td.style.setProperty('background', tableBg, 'important');
                                });
                            });
                        });
                    }
                }
            }
            
            // Apply dark mode to passage popup
            const passagePopup = document.getElementById('passagePopup');
            if (passagePopup) {
                passagePopup.classList.add('dark-mode-life-of-christ');
                if (darkVariant === 2) passagePopup.classList.add('dark-mode-life-of-christ-variant2');
                else passagePopup.classList.remove('dark-mode-life-of-christ-variant2');
            }
            
            // Apply dark mode to king hover card
            const kingHoverCard = document.getElementById('kingHoverCard');
            if (kingHoverCard) {
                kingHoverCard.classList.add('dark-mode-kings');
                if (darkVariant === 2) kingHoverCard.classList.add('dark-mode-kings-variant2');
                else kingHoverCard.classList.remove('dark-mode-kings-variant2');
            }
            
            // Apply dark mode to kings timeline modal
            const kingsTimelineModal = document.getElementById('kings-timeline-modal');
            if (kingsTimelineModal) {
                kingsTimelineModal.classList.add('dark-mode-kings');
                if (darkVariant === 2) kingsTimelineModal.classList.add('dark-mode-kings-variant2');
                else kingsTimelineModal.classList.remove('dark-mode-kings-variant2');
            }
            
            // Apply dark mode to king hover card via the module
            if (window.KingHoverCard && typeof window.KingHoverCard.applyTheme === 'function') {
                window.KingHoverCard.applyTheme();
            }
            
            // Switch timeline icon to dark mode version
            const timelineIcons = document.querySelectorAll('.timeline-icon');
            timelineIcons.forEach(icon => {
                if (icon.tagName === 'IMG' && icon.src.includes('timeline-icon.png')) {
                    icon.src = 'resources/icon/timeline-icon-dark.png';
                }
            });
        }
        
        // Apply dark theme on page load if it's checked
        if (darkTheme.checked) {
            applyDarkTheme();
        }
        
        // Dark theme change handler with animation
        darkTheme.addEventListener('change', function() {
            if (this.checked) {
                // Reset to variant 1 when dark mode is first enabled
                darkVariant = 1;
                try { localStorage.setItem('darkVariant', darkVariant); } catch (err) {}
                
                if (window.ThemeAnimation) {
                    window.ThemeAnimation.applyThemeWithAnimation(darkThemeLabel, applyDarkTheme);
                } else {
                    applyDarkTheme();
                }
            }
        });

        // When dark theme is already selected, clicking the dark label toggles the dark variant
        if (darkThemeLabel) {
            darkThemeLabel.addEventListener('click', function(e) {
                // if radio is already checked, toggle variant
                if (darkTheme.checked) {
                    darkVariant = darkVariant === 1 ? 2 : 1;
                    try { localStorage.setItem('darkVariant', darkVariant); } catch (err) {}
                    if (window.ThemeAnimation) {
                        window.ThemeAnimation.applyThemeWithAnimation(darkThemeLabel, applyDarkTheme);
                    } else {
                        applyDarkTheme();
                    }
                    // prevent default to avoid any unexpected behaviour
                    e.preventDefault();
                }
            });
        }

        // Light theme change handler with animation
        lightTheme.addEventListener('change', function() {
            if (this.checked) {
                // Reset to variant 1 when light mode is first enabled
                lightVariant = 1;
                try { localStorage.setItem('lightVariant', lightVariant); } catch (err) {}
                
                if (window.ThemeAnimation) {
                    window.ThemeAnimation.applyThemeWithAnimation(lightThemeLabel, applyLightTheme);
                } else {
                    applyLightTheme();
                }
            }
        });

        // When light theme is already selected, clicking the light label toggles the light variant
        if (lightThemeLabel) {
            lightThemeLabel.addEventListener('click', function(e) {
                // if radio is already checked, toggle variant
                if (lightTheme.checked) {
                    lightVariant = lightVariant === 1 ? 2 : 1;
                    try { localStorage.setItem('lightVariant', lightVariant); } catch (err) {}
                    if (window.ThemeAnimation) {
                        window.ThemeAnimation.applyThemeWithAnimation(lightThemeLabel, applyLightTheme);
                    } else {
                        applyLightTheme();
                    }
                    // prevent default to avoid any unexpected behaviour
                    e.preventDefault();
                }
            });
        }
        
        // Function to apply light theme (extracted for reusability)
        function applyLightTheme() {
                // Remove dark mode hover styles if they exist
                const darkModeStyle = document.getElementById('dark-mode-hover');
                if (darkModeStyle) {
                    darkModeStyle.remove();
                }
                
                // Remove dark mode from dashboard cards
                const dashboardCardsContainer = document.querySelector('.dashboard-cards-container');
                if (dashboardCardsContainer) {
                    dashboardCardsContainer.classList.remove('dark-mode-cards', 'dark-mode-cards-variant2');
                    // Add light mode variant classes
                    if (lightVariant === 2) dashboardCardsContainer.classList.add('light-mode-cards-variant2');
                    else dashboardCardsContainer.classList.remove('light-mode-cards-variant2');
                }
                
                const dashboardContent = document.getElementById('dashboard-content');
                if (dashboardContent) {
                    dashboardContent.classList.remove('dark-mode-dashboard', 'dark-mode-dashboard-variant2');
                    // Add light mode variant classes
                    if (lightVariant === 2) dashboardContent.classList.add('light-mode-dashboard-variant2');
                    else dashboardContent.classList.remove('light-mode-dashboard-variant2');
                }
                
                // Remove dark mode from timeline
                const timelineContent = document.getElementById('timeline-content');
                if (timelineContent) {
                    timelineContent.classList.remove('dark-mode-timeline', 'dark-mode-timeline-variant2');
                    // Add light mode variant classes
                    if (lightVariant === 2) timelineContent.classList.add('light-mode-timeline-variant2');
                    else timelineContent.classList.remove('light-mode-timeline-variant2');
                }
                
                // Remove dark mode from Life of Christ
                const lifeOfChristContent = document.getElementById('help-content');
                if (lifeOfChristContent) {
                    lifeOfChristContent.classList.remove('dark-mode-life-of-christ', 'dark-mode-life-of-christ-variant2');
                    // Add light mode variant classes
                    if (lightVariant === 2) lifeOfChristContent.classList.add('light-mode-life-of-christ-variant2');
                    else lifeOfChristContent.classList.remove('light-mode-life-of-christ-variant2');
                }
                
                // Remove dark mode from Characters
                const charactersContent = document.getElementById('genealogy-content');
                if (charactersContent) {
                    charactersContent.classList.remove('dark-mode-characters', 'dark-mode-characters-variant2');
                    // Add light mode variant classes
                    if (lightVariant === 2) charactersContent.classList.add('light-mode-characters-variant2');
                    else charactersContent.classList.remove('light-mode-characters-variant2');
                }
                
                // Remove dark mode from Kings
                const kingsContent = document.getElementById('king-page-content');
                if (kingsContent) {
                    kingsContent.classList.remove('dark-mode-kings', 'dark-mode-kings-variant2');
                    // Add light mode variant classes
                    if (lightVariant === 2) kingsContent.classList.add('light-mode-kings-variant2');
                    else kingsContent.classList.remove('light-mode-kings-variant2');
                }
                
                // Remove dark mode from Kings Table
                const kingsTableContent = document.getElementById('kings-content');
                if (kingsTableContent) {
                    kingsTableContent.classList.remove('dark-mode-kings', 'dark-mode-kings-variant2');
                    // Add light mode variant classes
                    if (lightVariant === 2) kingsTableContent.classList.add('light-mode-kings-variant2');
                    else kingsTableContent.classList.remove('light-mode-kings-variant2');
                }
                
                // Remove dark mode from Prophets
                const prophetsContent = document.getElementById('prophets-content');
                if (prophetsContent) {
                    prophetsContent.classList.remove('dark-mode-prophets', 'dark-mode-prophets-variant2');
                    // Add light mode variant classes
                    if (lightVariant === 2) prophetsContent.classList.add('light-mode-prophets-variant2');
                    else prophetsContent.classList.remove('light-mode-prophets-variant2');
                }
                
                // Remove dark mode from Prophet Detail Content
                const prophetDetailContent = document.getElementById('prophet-detail-content');
                if (prophetDetailContent) {
                    prophetDetailContent.classList.remove('dark-mode-prophets', 'dark-mode-prophets-variant2');
                    // Add light mode variant classes
                    if (lightVariant === 2) prophetDetailContent.classList.add('light-mode-prophets-variant2');
                    else prophetDetailContent.classList.remove('light-mode-prophets-variant2');
                }
                
                // Remove dark mode from Books
                const booksContent = document.getElementById('books-content');
                if (booksContent) {
                    booksContent.classList.remove('dark-mode-books', 'dark-mode-books-variant2');
                    // Add light mode variant classes
                    if (lightVariant === 2) booksContent.classList.add('light-mode-books-variant2');
                    else booksContent.classList.remove('light-mode-books-variant2');
                }
                
                // Remove dark mode from Book Chapter Content
                const bookChapterContent = document.getElementById('book-chapter-content');
                if (bookChapterContent) {
                    bookChapterContent.classList.remove('dark-mode-books', 'dark-mode-books-variant2');
                    // Add light mode variant classes
                    if (lightVariant === 2) bookChapterContent.classList.add('light-mode-books-variant2');
                    else bookChapterContent.classList.remove('light-mode-books-variant2');
                }
                
                // Remove dark mode from Bible content
                const bibleContent = document.getElementById('bible-content');
                if (bibleContent) {
                    bibleContent.classList.remove('dark-mode-bible', 'dark-mode-bible-variant2');
                    // Add light mode variant classes
                    if (lightVariant === 2) bibleContent.classList.add('light-mode-bible-variant2');
                    else bibleContent.classList.remove('light-mode-bible-variant2');
                }
                
                // Remove dark mode from Bible Verse Display Section
                const bibleVerseDisplaySection = document.getElementById('bibleVerseDisplaySection');
                if (bibleVerseDisplaySection) {
                    bibleVerseDisplaySection.classList.remove('dark-mode-bible', 'dark-mode-bible-variant2');
                    // Add light mode variant classes
                    if (lightVariant === 2) bibleVerseDisplaySection.classList.add('light-mode-bible-variant2');
                    else bibleVerseDisplaySection.classList.remove('light-mode-bible-variant2');
                }
                
                // Remove dark mode from filter overlays
                const kingsFilterOverlay = document.getElementById('filterCardOverlay');
                if (kingsFilterOverlay) {
                    kingsFilterOverlay.classList.remove('dark-mode-kings', 'dark-mode-kings-variant2');
                    // Add light mode variant classes
                    if (lightVariant === 2) kingsFilterOverlay.classList.add('light-mode-kings-variant2');
                    else kingsFilterOverlay.classList.remove('light-mode-kings-variant2');
                }
                
                const prophetsFilterOverlay = document.getElementById('prophetsFilterCardOverlay');
                if (prophetsFilterOverlay) {
                    prophetsFilterOverlay.classList.remove('dark-mode-prophets', 'dark-mode-prophets-variant2');
                    // Add light mode variant classes
                    if (lightVariant === 2) prophetsFilterOverlay.classList.add('light-mode-prophets-variant2');
                    else prophetsFilterOverlay.classList.remove('light-mode-prophets-variant2');
                }
                
                const booksFilterOverlay = document.getElementById('booksFilterCardOverlay');
                if (booksFilterOverlay) {
                    booksFilterOverlay.classList.remove('dark-mode-books', 'dark-mode-books-variant2');
                    // Add light mode variant classes
                    if (lightVariant === 2) booksFilterOverlay.classList.add('light-mode-books-variant2');
                    else booksFilterOverlay.classList.remove('light-mode-books-variant2');
                }
                
                // Remove dark mode from chapters popup
                const chaptersPopup = document.getElementById('chaptersPopup');
                if (chaptersPopup) {
                    chaptersPopup.classList.remove('dark-mode-books', 'dark-mode-books-variant2');
                    // Add light mode variant classes
                    if (lightVariant === 2) chaptersPopup.classList.add('light-mode-books-variant2');
                    else chaptersPopup.classList.remove('light-mode-books-variant2');
                }
                
                // Remove dark mode from synopsis side drawer
                const synopsisSideDrawer = document.getElementById('synopsisSideDrawer');
                if (synopsisSideDrawer) {
                    synopsisSideDrawer.classList.remove('dark-mode-books', 'dark-mode-books-variant2');
                    // Add light mode variant classes
                    if (lightVariant === 2) synopsisSideDrawer.classList.add('light-mode-books-variant2');
                    else synopsisSideDrawer.classList.remove('light-mode-books-variant2');
                }
                
                // Remove dark mode from kings timeline content
                const kingsTimelineContent = document.getElementById('kings-timeline-content');
                if (kingsTimelineContent) {
                    kingsTimelineContent.classList.remove('dark-mode-kings', 'dark-mode-kings-variant2');
                    // Add light mode variant classes
                    if (lightVariant === 2) kingsTimelineContent.classList.add('light-mode-kings-variant2');
                    else kingsTimelineContent.classList.remove('light-mode-kings-variant2');
                }
                
                // Remove dark mode from passage popup
                const passagePopup = document.getElementById('passagePopup');
                if (passagePopup) {
                    passagePopup.classList.remove('dark-mode-life-of-christ', 'dark-mode-life-of-christ-variant2');
                    // Add light mode variant classes
                    if (lightVariant === 2) passagePopup.classList.add('light-mode-life-of-christ-variant2');
                    else passagePopup.classList.remove('light-mode-life-of-christ-variant2');
                }
                
                // Remove dark mode from king hover card
                const kingHoverCard = document.getElementById('kingHoverCard');
                if (kingHoverCard) {
                    kingHoverCard.classList.remove('dark-mode-kings', 'dark-mode-kings-variant2');
                    // Add light mode variant classes
                    if (lightVariant === 2) kingHoverCard.classList.add('light-mode-kings-variant2');
                    else kingHoverCard.classList.remove('light-mode-kings-variant2');
                }
                
                // Remove dark mode from kings timeline modal
                const kingsTimelineModal = document.getElementById('kings-timeline-modal');
                if (kingsTimelineModal) {
                    kingsTimelineModal.classList.remove('dark-mode-kings', 'dark-mode-kings-variant2');
                    // Add light mode variant classes
                    if (lightVariant === 2) kingsTimelineModal.classList.add('light-mode-kings-variant2');
                    else kingsTimelineModal.classList.remove('light-mode-kings-variant2');
                }
                
                // Remove dark mode from king hover card via the module
                if (window.KingHoverCard && typeof window.KingHoverCard.applyTheme === 'function') {
                    window.KingHoverCard.applyTheme();
                }
                
                // Switch timeline icon back to normal version
                const timelineIcons = document.querySelectorAll('.timeline-icon');
                timelineIcons.forEach(icon => {
                    if (icon.tagName === 'IMG' && icon.src.includes('timeline-icon-dark.png')) {
                        icon.src = 'resources/icon/timeline-icon.png';
                    }
                });
                
                // Light mode - using original light colors or variant 2 colors
                if (lightVariant === 1) {
                    if (leftSidebar) {
                        leftSidebar.style.background = '#f8f9fb';
                        leftSidebar.style.borderRight = '1px solid #e5e7eb';
                    }
                    
                    if (container) {
                        container.style.background = 'white';
                    }
                } else {
                    // Variant 2: warm beige theme
                    if (leftSidebar) {
                        leftSidebar.style.background = '#f9f0df';
                        leftSidebar.style.borderRight = '1px solid #e8d5b7';
                    }
                    
                    if (container) {
                        container.style.background = '#fef6eb';
                    }
                }
                
                // Update main content background for light mode
                const mainContent = document.querySelector('.main-content');
                if (mainContent) {
                    if (lightVariant === 1) {
                        mainContent.style.background = 'white';
                    } else {
                        mainContent.style.background = '#fef6eb';
                    }
                }
                
                // Update all sidebar items colors
                document.querySelectorAll('.sidebar-header, .history-item, .sidebar-footer-item, .sidebar-footer, .theme-toggle-container').forEach(el => {
                    el.style.borderColor = lightVariant === 2 ? '#e8d5b7' : '#e5e7eb';
                });
                
                document.querySelectorAll('.history-item, .sidebar-footer-item, .sidebar-title').forEach(el => {
                    el.style.color = '#374151';
                });
                
                document.querySelectorAll('.theme-toggle').forEach(el => {
                    el.style.background = lightVariant === 2 ? '#e8d5b7' : '#e5e7eb';
                });
                
                // Update toggle button
                const toggleBtn = document.querySelector('.sidebar-collapse-btn');
                if (toggleBtn) {
                    const btnBg = lightVariant === 2 ? '#fef6eb' : 'white';
                    const btnBorder = lightVariant === 2 ? '#e8d5b7' : '#e5e7eb';
                    toggleBtn.style.setProperty('background', btnBg, 'important');
                    toggleBtn.style.setProperty('border-color', btnBorder, 'important');
                    toggleBtn.style.setProperty('color', '#374151', 'important');
                }
                
                // Update SVG icons to dark color for light mode
                document.querySelectorAll('.history-item svg, .sidebar-footer-item svg, .sidebar-collapse-btn svg').forEach(svg => {
                    svg.style.removeProperty('fill'); // Remove any inline fill styles first
                    svg.setAttribute('fill', '#374151');
                    svg.style.setProperty('fill', '#374151', 'important'); // Force the fill color
                });
                
                // Update theme toggle options
                document.querySelectorAll('.theme-option').forEach(option => {
                    const radio = option.previousElementSibling;
                    if (radio && radio.checked) {
                        // When light is selected, show different background for variant 2
                        if (radio.id === 'light-theme' && lightVariant === 2) {
                            option.style.setProperty('background', '#d9b787', 'important');
                            option.style.setProperty('color', '#2c2c2c', 'important');
                        } else if (radio.id === 'light-theme') {
                            option.style.setProperty('background', '#cbd5e1', 'important');
                            option.style.setProperty('color', '#1f2937', 'important');
                        } else {
                            // Dark mode - keep default CSS styling
                            option.style.removeProperty('background');
                            option.style.removeProperty('color');
                        }
                    } else {
                        option.style.setProperty('background', 'transparent', 'important');
                        option.style.setProperty('color', '#6b7280', 'important');
                    }
                });
                
                // Update theme toggle SVG icons
                document.querySelectorAll('.theme-option svg').forEach(svg => {
                    const option = svg.closest('.theme-option');
                    const radio = option.previousElementSibling;
                    if (radio && radio.checked) {
                        // Use a different icon color when the alternate light variant is active
                        if (radio.id === 'light-theme' && lightVariant === 2) {
                            svg.style.setProperty('fill', '#2c2c2c', 'important');
                        } else if (radio.id === 'light-theme') {
                            svg.style.setProperty('fill', '#1f2937', 'important');
                        } else {
                            // Dark mode
                            svg.style.removeProperty('fill');
                        }
                    } else {
                        svg.style.setProperty('fill', '#6b7280', 'important');
                    }
                });
                
                // Add light mode hover styles
                const lightModeStyle = document.createElement('style');
                lightModeStyle.id = 'light-mode-hover';
                const hoverBg = lightVariant === 2 ? '#e8d5b7' : '#e5e7eb';
                const hoverBgActive = lightVariant === 2 ? '#d4c3a8' : '#d1d5db';
                const collapseBtnBg = lightVariant === 2 ? '#fef6eb' : 'white';
                const collapseBtnHover = lightVariant === 2 ? '#f4ebe0' : '#f9fafb';
                lightModeStyle.innerHTML = `
                    .history-item:hover:not(.active),
                    .sidebar-footer-item:hover {
                        background: ${hoverBg} !important;
                        color: #374151 !important;
                    }
                    .sidebar-footer-item:last-child:hover {
                        background: #dc3545 !important;
                        color: #ffffff !important;
                    }
                    .sidebar-footer-item:last-child:hover svg {
                        fill: #ffffff !important;
                    }
                    .sidebar-toggle-btn:hover {
                        background: ${hoverBg} !important;
                    }
                    .sidebar-collapse-btn {
                        border-color: ${hoverBgActive} !important;
                        color: #374151 !important;
                        background: ${collapseBtnBg} !important;
                    }
                    .sidebar-collapse-btn:hover {
                        background: ${collapseBtnHover} !important;
                        border-color: #374151 !important;
                    }
                    .history-item.active {
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
                        color: white !important;
                        border-radius: 10px !important;
                        margin: 0 8px 12px 8px !important;
                    }
                    .left-sidebar.collapsed .history-item.active {
                        margin: 0 auto 12px auto !important;
                    }
                    .theme-option:hover:not(:has(input:checked)) {
                        background: ${hoverBg} !important;
                    }
                `;
                document.head.appendChild(lightModeStyle);
                
                // Remove inline styles that were applied by dark mode
                // Reset content-actions and content-header backgrounds
                document.querySelectorAll('.content-actions').forEach(el => {
                    el.style.removeProperty('background-color');
                    
                    // Reset card elements inside content-actions
                    el.querySelectorAll('.card').forEach(card => {
                        card.style.removeProperty('background-color');
                        card.style.removeProperty('border-color');
                    });
                });
                
                document.querySelectorAll('.content-header').forEach(el => {
                    el.style.removeProperty('background-color');
                });
                
                // Reset container backgrounds
                const containersToReset = [
                    '.timeline-container',
                    '.characters-container',
                    '.life-of-jesus-container',
                    '.prophet-page-container',
                    '.book-chapter-container',
                    '.king-page-container',
                    '.seed-image-container',
                    '.seed-text-content'
                ];
                
                containersToReset.forEach(selector => {
                    const element = document.querySelector(selector);
                    if (element) {
                        element.style.removeProperty('background');
                    }
                });
                
                // Reset table styles in king-page-content
                const kingPageContent = document.getElementById('king-page-content');
                if (kingPageContent) {
                    const tableContainer = kingPageContent.querySelector('.table-container');
                    if (tableContainer) {
                        tableContainer.style.removeProperty('background');
                        tableContainer.style.removeProperty('border-color');
                        
                        const table = tableContainer.querySelector('.table');
                        if (table) {
                            table.style.removeProperty('background');
                            
                            // Reset table headers
                            table.querySelectorAll('th').forEach(th => {
                                th.style.removeProperty('background');
                                th.style.removeProperty('color');
                                th.style.removeProperty('border-bottom-color');
                            });
                            
                            // Reset table cells
                            table.querySelectorAll('td').forEach(td => {
                                td.style.removeProperty('color');
                                td.style.removeProperty('border-bottom-color');
                                td.style.removeProperty('background');
                            });
                            
                            // Reset table rows
                            table.querySelectorAll('tbody tr').forEach(tr => {
                                tr.style.removeProperty('background');
                            });
                        }
                    }
                }
                
                // Update hover states for light mode
                const style = document.createElement('style');
                style.id = 'light-mode-hover';
                style.innerHTML = `
                    .history-item:hover:not(.active),
                    .sidebar-footer-item:hover {
                        background: #e5e7eb !important;
                    }
                    .sidebar-footer-item:last-child:hover {
                        background: #dc3545 !important;
                        color: #ffffff !important;
                    }
                    .sidebar-footer-item:last-child:hover svg {
                        fill: #ffffff !important;
                    }
                    .sidebar-toggle-btn:hover {
                        background: #e5e7eb !important;
                    }
                    .sidebar-collapse-btn {
                        border-color: #6c757d !important;
                        color: #1a1a1a !important;
                    }
                    .sidebar-collapse-btn svg {
                        fill: #1a1a1a !important;
                    }
                    .sidebar-collapse-btn:hover {
                        background: #e9ecef !important;
                        border-color: #495057 !important;
                    }
                    .history-item.active {
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
                        color: white !important;
                        border-radius: 10px !important;
                        margin: 0 8px 12px 8px !important;
                    }
                    .left-sidebar.collapsed .history-item.active {
                        margin: 0 auto 12px auto !important;
                    }
                `;
                document.head.appendChild(style);
        }
    }
});
