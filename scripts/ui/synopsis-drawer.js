// Synopsis Side Drawer Functionality

// Book data configuration - All 66 books
const synopsisBooks = [
    // Old Testament - Torah (5 books)
    { name: 'Genesis', data: 'genesisData' },
    { name: 'Exodus', data: 'exodusData' },
    { name: 'Leviticus', data: 'leviticusData' },
    { name: 'Numbers', data: 'numbersData' },
    { name: 'Deuteronomy', data: 'deuteronomyData' },
    
    // Old Testament - Historical Books (12 books)
    { name: 'Joshua', data: 'joshuaData' },
    { name: 'Judges', data: 'judgesData' },
    { name: 'Ruth', data: 'ruthData' },
    { name: '1 Samuel', data: 'samuel1Data' },
    { name: '2 Samuel', data: 'samuel2Data' },
    { name: '1 Kings', data: 'kings1Data' },
    { name: '2 Kings', data: 'kings2Data' },
    { name: '1 Chronicles', data: 'chronicles1Data' },
    { name: '2 Chronicles', data: 'chronicles2Data' },
    { name: 'Ezra', data: 'ezraData' },
    { name: 'Nehemiah', data: 'nehemiahData' },
    { name: 'Esther', data: 'estherData' },
    
    // Old Testament - Wisdom Books (5 books)
    { name: 'Job', data: 'jobData' },
    { name: 'Psalms', data: 'psalmsData' },
    { name: 'Proverbs', data: 'proverbsData' },
    { name: 'Ecclesiastes', data: 'ecclesiastesData' },
    { name: 'Song of Solomon', data: 'songData' },
    
    // Old Testament - Major Prophets (5 books)
    { name: 'Isaiah', data: 'isaiahData' },
    { name: 'Jeremiah', data: 'jeremiahData' },
    { name: 'Lamentations', data: 'lamentationsData' },
    { name: 'Ezekiel', data: 'ezekielData' },
    { name: 'Daniel', data: 'danielData' },
    
    // Old Testament - Minor Prophets (12 books)
    { name: 'Hosea', data: 'hoseaData' },
    { name: 'Joel', data: 'joelData' },
    { name: 'Amos', data: 'amosData' },
    { name: 'Obadiah', data: 'obadiahData' },
    { name: 'Jonah', data: 'jonahData' },
    { name: 'Micah', data: 'micahData' },
    { name: 'Nahum', data: 'nahumData' },
    { name: 'Habakkuk', data: 'habakkukData' },
    { name: 'Zephaniah', data: 'zephaniahData' },
    { name: 'Haggai', data: 'haggaiData' },
    { name: 'Zechariah', data: 'zechariahData' },
    { name: 'Malachi', data: 'malachiData' },
    
    // New Testament - Gospels and Acts (5 books)
    { name: 'Matthew', data: 'matthewData' },
    { name: 'Mark', data: 'markData' },
    { name: 'Luke', data: 'lukeData' },
    { name: 'John', data: 'johnData' },
    { name: 'Acts', data: 'actsData' },
    
    // New Testament - Paul's Letters (13 books)
    { name: 'Romans', data: 'romansData' },
    { name: '1 Corinthians', data: 'corinthians1Data' },
    { name: '2 Corinthians', data: 'corinthians2Data' },
    { name: 'Galatians', data: 'galatiansData' },
    { name: 'Ephesians', data: 'ephesiansData' },
    { name: 'Philippians', data: 'philippiansData' },
    { name: 'Colossians', data: 'colossiansData' },
    { name: '1 Thessalonians', data: 'thessalonians1Data' },
    { name: '2 Thessalonians', data: 'thessalonians2Data' },
    { name: '1 Timothy', data: 'timothy1Data' },
    { name: '2 Timothy', data: 'timothy2Data' },
    { name: 'Titus', data: 'titusData' },
    { name: 'Philemon', data: 'philemonData' },
    
    // New Testament - General Letters (9 books)
    { name: 'Hebrews', data: 'hebrewsData' },
    { name: 'James', data: 'jamesData' },
    { name: '1 Peter', data: 'peter1Data' },
    { name: '2 Peter', data: 'peter2Data' },
    { name: '1 John', data: 'john1Data' },
    { name: '2 John', data: 'john2Data' },
    { name: '3 John', data: 'john3Data' },
    { name: 'Jude', data: 'judeData' },
    { name: 'Revelation', data: 'revelationData' }
];

let currentSynopsisBookIndex = 0;

// Function to load synopsis book data
function loadSynopsisBookData(bookIndex) {
    const book = synopsisBooks[bookIndex];
    
    const drawerContent = document.getElementById('synopsisDrawerContent');
    const bookName = document.getElementById('synopsisBookName');
    const prevBtn = document.getElementById('synopsisPrevBtn');
    const nextBtn = document.getElementById('synopsisNextBtn');
    const bookSelector = document.getElementById('synopsisBookSelector');
    
    if (!drawerContent || !bookName) {
        return;
    }
    
    // Get the actual data from window object using the data variable name
    const dataVarName = book.data;
    const bookData = window[dataVarName];
    
    if (!bookData || !Array.isArray(bookData) || bookData.length === 0) {
        drawerContent.innerHTML = '<div class="synopsis-no-data"><p>Synopsis not available for ' + book.name + ' yet.</p></div>';
        bookName.textContent = book.name;
        return;
    }
    
    let html = '';
    let globalIndex = 1;
    
    bookData.forEach((section, index) => {
        const marginStyle = index > 0 ? ' style="margin-top: 40px;"' : '';
        
        html += `
            <h2 class="synopsis-section-title"${marginStyle}>${section.title}</h2>
            <p class="synopsis-section-subtitle">${section.reference}</p>
        `;
        
        section.items.forEach(item => {
            html += `
                <div class="synopsis-timeline-item" data-index="${String(globalIndex).padStart(2, '0')}">
                    <div class="synopsis-item-title">${item.title}</div>
                    <div class="synopsis-item-reference">${item.reference}</div>
                </div>
            `;
            globalIndex++;
        });
    });
    
    drawerContent.innerHTML = html;
    bookName.textContent = book.name;
    
    // Update button states
    if (prevBtn) prevBtn.disabled = bookIndex === 0;
    if (nextBtn) nextBtn.disabled = bookIndex === synopsisBooks.length - 1;
    
    // Update dropdown
    if (bookSelector) bookSelector.value = bookIndex;
    
    // Scroll to top
    drawerContent.scrollTop = 0;
}

// Open synopsis drawer
function openSynopsisDrawer() {
    const drawer = document.getElementById('synopsisSideDrawer');
    const overlay = document.getElementById('synopsisDrawerOverlay');
    const drawerContent = document.getElementById('synopsisDrawerContent');
    
    if (!drawer || !overlay) {
        return;
    }
    
    // Always try to match current book if available
    if (typeof currentChapterInfo !== 'undefined' && currentChapterInfo.bookName) {
        const bookIndex = synopsisBooks.findIndex(b => 
            b.name.toLowerCase() === currentChapterInfo.bookName.toLowerCase()
        );
        if (bookIndex !== -1) {
            currentSynopsisBookIndex = bookIndex;
        }
    }
    
    // Load data when drawer opens (lazy loading) or if content is empty
    if (!drawerContent || drawerContent.innerHTML.trim() === '' || drawerContent.innerHTML.includes('will be loaded')) {
        loadSynopsisBookData(currentSynopsisBookIndex);
    } else {
        // Even if content exists, reload to show the current book
        loadSynopsisBookData(currentSynopsisBookIndex);
    }
    
    drawer.classList.add('active');
    overlay.classList.add('active');
}

// Close synopsis drawer
function closeSynopsisDrawer() {
    const drawer = document.getElementById('synopsisSideDrawer');
    const overlay = document.getElementById('synopsisDrawerOverlay');
    
    if (drawer) drawer.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
}

// Initialize synopsis drawer event listeners
document.addEventListener('DOMContentLoaded', function() {
    const synopsisBookTitle = document.getElementById('synopsisBookTitle');
    const synopsisDropdownIcon = document.getElementById('synopsisDropdownIcon');
    const synopsisBookSelector = document.getElementById('synopsisBookSelector');
    const synopsisPrevBtn = document.getElementById('synopsisPrevBtn');
    const synopsisNextBtn = document.getElementById('synopsisNextBtn');
    const synopsisDrawerOverlay = document.getElementById('synopsisDrawerOverlay');
    
    // Toggle dropdown
    if (synopsisBookTitle) {
        synopsisBookTitle.addEventListener('click', () => {
            if (synopsisBookSelector) synopsisBookSelector.classList.toggle('show');
            if (synopsisDropdownIcon) synopsisDropdownIcon.classList.toggle('open');
        });
    }
    
    // Book selector dropdown
    if (synopsisBookSelector) {
        synopsisBookSelector.addEventListener('change', (e) => {
            currentSynopsisBookIndex = parseInt(e.target.value);
            loadSynopsisBookData(currentSynopsisBookIndex);
            synopsisBookSelector.classList.remove('show');
            if (synopsisDropdownIcon) synopsisDropdownIcon.classList.remove('open');
        });
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (synopsisBookTitle && synopsisBookSelector && 
            !synopsisBookTitle.contains(e.target) && 
            !synopsisBookSelector.contains(e.target)) {
            synopsisBookSelector.classList.remove('show');
            if (synopsisDropdownIcon) synopsisDropdownIcon.classList.remove('open');
        }
    });
    
    // Previous button
    if (synopsisPrevBtn) {
        synopsisPrevBtn.addEventListener('click', () => {
            if (currentSynopsisBookIndex > 0) {
                currentSynopsisBookIndex--;
                loadSynopsisBookData(currentSynopsisBookIndex);
            }
        });
    }
    
    // Next button
    if (synopsisNextBtn) {
        synopsisNextBtn.addEventListener('click', () => {
            if (currentSynopsisBookIndex < synopsisBooks.length - 1) {
                currentSynopsisBookIndex++;
                loadSynopsisBookData(currentSynopsisBookIndex);
            }
        });
    }
    
    // Close drawer on overlay click
    if (synopsisDrawerOverlay) {
        synopsisDrawerOverlay.addEventListener('click', closeSynopsisDrawer);
    }
    
    // Close drawer on Escape key
    document.addEventListener('keydown', (e) => {
        const drawer = document.getElementById('synopsisSideDrawer');
        if (e.key === 'Escape' && drawer && drawer.classList.contains('active')) {
            closeSynopsisDrawer();
        }
    });
});

// Make functions globally available
window.openSynopsisDrawer = openSynopsisDrawer;
window.closeSynopsisDrawer = closeSynopsisDrawer;
window.loadSynopsisBookData = loadSynopsisBookData;
