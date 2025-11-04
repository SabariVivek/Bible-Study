/**
 * BIBLE VERSE FORM PAGE - Handle Bible verse selection inline page
 */

// Global state
let currentTestament = 'old';
let selectedBook = '';
let biblePageInitialized = false;
let currentBibleBook = '';
let currentBibleChapter = 1;
let currentBibleLanguage = 'tamil';
let touchStartX = 0;
let touchEndX = 0;

// Book name mapping for file names
const BOOK_FILE_MAP = {
    // Old Testament
    'Genesis': 'genesis',
    'Exodus': 'exodus',
    'Leviticus': 'leviticus',
    'Numbers': 'numbers',
    'Deuteronomy': 'deuteronomy',
    'Joshua': 'joshua',
    'Judges': 'judges',
    'Ruth': 'ruth',
    '1 Samuel': 'i_samuel',
    '2 Samuel': 'ii_samuel',
    '1 Kings': 'i_kings',
    '2 Kings': 'ii_kings',
    '1 Chronicles': 'i_chronicles',
    '2 Chronicles': 'ii_chronicles',
    'Ezra': 'ezra',
    'Nehemiah': 'nehemiah',
    'Esther': 'esther',
    'Job': 'job',
    'Psalms': 'psalms',
    'Proverbs': 'proverbs',
    'Ecclesiastes': 'ecclesiastes',
    'Song of Solomon': 'song_of_solomon',
    'Isaiah': 'isaiah',
    'Jeremiah': 'jeremiah',
    'Lamentations': 'lamentations',
    'Ezekiel': 'ezekiel',
    'Daniel': 'daniel',
    'Hosea': 'hosea',
    'Joel': 'joel',
    'Amos': 'amos',
    'Obadiah': 'obadiah',
    'Jonah': 'jonah',
    'Micah': 'micah',
    'Nahum': 'nahum',
    'Habakkuk': 'habakkuk',
    'Zephaniah': 'zephaniah',
    'Haggai': 'haggai',
    'Zechariah': 'zechariah',
    'Malachi': 'malachi',
    // New Testament (adjust based on your file naming)
    'Matthew': 'matthew',
    'Mark': 'mark',
    'Luke': 'luke',
    'John': 'john',
    'Acts': 'acts',
    'Romans': 'romans',
    '1 Corinthians': 'i_corinthians',
    '2 Corinthians': 'ii_corinthians',
    'Galatians': 'galatians',
    'Ephesians': 'ephesians',
    'Philippians': 'philippians',
    'Colossians': 'colossians',
    '1 Thessalonians': 'i_thessalonians',
    '2 Thessalonians': 'ii_thessalonians',
    '1 Timothy': 'i_timothy',
    '2 Timothy': 'ii_timothy',
    'Titus': 'titus',
    'Philemon': 'philemon',
    'Hebrews': 'hebrews',
    'James': 'james',
    '1 Peter': 'i_peter',
    '2 Peter': 'ii_peter',
    '1 John': 'i_john',
    '2 John': 'ii_john',
    '3 John': 'iii_john',
    'Jude': 'jude',
    'Revelation': 'revelation'
};

// Old Testament Books
const OLD_TESTAMENT_BOOKS = [
    'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy',
    'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel',
    '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles',
    'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs',
    'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah',
    'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel',
    'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk',
    'Zephaniah', 'Haggai', 'Zechariah', 'Malachi'
];

// New Testament Books
const NEW_TESTAMENT_BOOKS = [
    'Matthew', 'Mark', 'Luke', 'John', 'Acts',
    'Romans', '1 Corinthians', '2 Corinthians', 'Galatians',
    'Ephesians', 'Philippians', 'Colossians', '1 Thessalonians',
    '2 Thessalonians', '1 Timothy', '2 Timothy', 'Titus',
    'Philemon', 'Hebrews', 'James', '1 Peter', '2 Peter',
    '1 John', '2 John', '3 John', 'Jude', 'Revelation'
];

// Chapter counts for each book
const BOOK_CHAPTERS = {
    // Old Testament
    'Genesis': 50, 'Exodus': 40, 'Leviticus': 27, 'Numbers': 36, 'Deuteronomy': 34,
    'Joshua': 24, 'Judges': 21, 'Ruth': 4, '1 Samuel': 31, '2 Samuel': 24,
    '1 Kings': 22, '2 Kings': 25, '1 Chronicles': 29, '2 Chronicles': 36,
    'Ezra': 10, 'Nehemiah': 13, 'Esther': 10, 'Job': 42, 'Psalms': 150, 'Proverbs': 31,
    'Ecclesiastes': 12, 'Song of Solomon': 8, 'Isaiah': 66, 'Jeremiah': 52,
    'Lamentations': 5, 'Ezekiel': 48, 'Daniel': 12, 'Hosea': 14, 'Joel': 3,
    'Amos': 9, 'Obadiah': 1, 'Jonah': 4, 'Micah': 7, 'Nahum': 3, 'Habakkuk': 3,
    'Zephaniah': 3, 'Haggai': 2, 'Zechariah': 14, 'Malachi': 4,
    // New Testament
    'Matthew': 28, 'Mark': 16, 'Luke': 24, 'John': 21, 'Acts': 28,
    'Romans': 16, '1 Corinthians': 16, '2 Corinthians': 13, 'Galatians': 6,
    'Ephesians': 6, 'Philippians': 4, 'Colossians': 4, '1 Thessalonians': 5,
    '2 Thessalonians': 3, '1 Timothy': 6, '2 Timothy': 4, 'Titus': 3,
    'Philemon': 1, 'Hebrews': 13, 'James': 5, '1 Peter': 5, '2 Peter': 3,
    '1 John': 5, '2 John': 1, '3 John': 1, 'Jude': 1, 'Revelation': 22
};

// Verse counts for each chapter of each book
const VERSE_COUNTS = {
    'Genesis': [31,25,24,26,32,22,24,22,29,32,32,20,18,24,21,16,27,33,38,18,34,24,20,67,34,35,46,22,35,43,55,32,20,31,29,43,36,30,23,23,57,38,34,34,28,34,31,22,33,26],
    'Exodus': [22,25,22,31,23,30,25,32,35,29,10,51,22,31,27,36,16,27,25,26,36,31,33,18,40,37,21,43,46,38,18,35,23,35,35,38,29,31,43,38],
    'Leviticus': [17,16,17,35,19,30,38,36,24,20,47,8,59,57,33,34,16,30,37,27,24,33,44,23,55,46,34],
    'Numbers': [54,34,51,49,31,27,89,26,23,36,35,16,33,45,41,50,13,32,22,29,35,41,30,25,18,65,23,31,40,16,54,42,56,29,34,13],
    'Deuteronomy': [46,37,29,49,33,25,26,20,29,22,32,32,18,29,23,22,20,22,21,20,23,30,25,22,19,19,26,68,29,20,30,52,29,12],
    'Joshua': [18,24,17,24,15,27,26,35,27,43,23,24,33,15,63,10,18,28,51,9,45,34,16,33],
    'Judges': [36,23,31,24,31,40,25,35,57,18,40,15,25,20,20,31,13,31,30,48,25],
    'Ruth': [22,23,18,22],
    '1 Samuel': [28,36,21,22,12,21,17,22,27,27,15,25,23,52,35,23,58,30,24,42,15,23,29,22,44,25,12,25,11,31,13],
    '2 Samuel': [27,32,39,12,25,23,29,18,13,19,27,31,39,33,37,23,29,33,43,26,22,51,39,25],
    '1 Kings': [53,46,28,34,18,38,51,66,28,29,43,33,34,31,34,34,24,46,21,43,29,53],
    '2 Kings': [18,25,27,44,27,33,20,29,37,36,21,21,25,29,38,20,41,37,37,21,26,20,37,20,30],
    '1 Chronicles': [54,55,24,43,26,81,40,40,44,14,47,40,14,17,29,43,27,17,19,8,30,19,32,31,31,32,34,21,30],
    '2 Chronicles': [17,18,17,22,14,42,22,18,31,19,23,16,22,15,19,14,19,34,11,37,20,12,21,27,28,23,9,27,36,27,21,33,25,33,27,23],
    'Ezra': [11,70,13,24,17,22,28,36,15,44],
    'Nehemiah': [11,20,32,23,19,19,73,18,38,39,36,47,31],
    'Esther': [22,23,15,17,14,14,10,17,32,3],
    'Job': [22,13,26,21,27,30,21,22,35,22,20,25,28,22,35,22,16,21,29,29,34,30,17,25,6,14,23,28,25,31,40,22,33,37,16,33,24,41,30,24,34,17],
    'Psalms': [6,12,8,8,12,10,17,9,20,18,7,8,6,7,5,11,15,50,14,9,13,31,6,10,22,12,14,9,11,12,24,11,22,22,28,12,40,22,13,17,13,11,5,26,17,11,9,14,20,23,19,9,6,7,23,13,11,11,17,12,8,12,11,10,13,20,7,35,36,5,24,20,28,23,10,12,20,72,13,19,16,8,18,12,13,17,7,18,52,17,16,15,5,23,11,13,12,9,9,5,8,28,22,35,45,48,43,13,31,7,10,10,9,8,18,19,2,29,176,7,8,9,4,8,5,6,5,6,8,8,3,18,3,3,21,26,9,8,24,13,10,7,12,15,21,10,20,14,9,6],
    'Proverbs': [33,22,35,27,23,35,27,36,18,32,31,28,25,35,33,33,28,24,29,30,31,29,35,34,28,28,27,28,27,33,31],
    'Ecclesiastes': [18,26,22,16,20,12,29,17,18,20,10,14],
    'Song of Solomon': [17,17,11,16,16,13,13,14],
    'Isaiah': [31,22,26,6,30,13,25,22,21,34,16,6,22,32,9,14,14,7,25,6,17,25,18,23,12,21,13,29,24,33,9,20,24,17,10,22,38,22,8,31,29,25,28,28,25,13,15,22,26,11,23,15,12,17,13,12,21,14,21,22,11,12,19,12,25,24],
    'Jeremiah': [19,37,25,31,31,30,34,22,26,25,23,17,27,22,21,21,27,23,15,18,14,30,40,10,38,24,22,17,32,24,40,44,26,22,19,32,21,28,18,16,18,22,13,30,5,28,7,47,39,46,64,34],
    'Lamentations': [22,22,66,22,22],
    'Ezekiel': [28,10,27,17,17,14,27,18,11,22,25,28,23,23,8,63,24,32,14,49,32,31,49,27,17,21,36,26,21,26,18,32,33,31,15,38,28,23,29,49,26,20,27,31,25,24,23,35],
    'Daniel': [21,49,30,37,31,28,28,27,27,21,45,13],
    'Hosea': [11,23,5,19,15,11,16,14,17,15,12,14,16,9],
    'Joel': [20,32,21],
    'Amos': [15,16,15,13,27,14,17,14,15],
    'Obadiah': [21],
    'Jonah': [17,10,10,11],
    'Micah': [16,13,12,13,15,16,20],
    'Nahum': [15,13,19],
    'Habakkuk': [17,20,19],
    'Zephaniah': [18,15,20],
    'Haggai': [15,23],
    'Zechariah': [21,13,10,14,11,15,14,23,17,12,17,14,9,21],
    'Malachi': [14,17,18,6],
    'Matthew': [25,23,17,25,48,34,29,34,38,42,30,50,58,36,39,28,27,35,30,34,46,46,39,51,46,75,66,20],
    'Mark': [45,28,35,41,43,56,37,38,50,52,33,44,37,72,47,20],
    'Luke': [80,52,38,44,39,49,50,56,62,42,54,59,35,35,32,31,37,43,48,47,38,71,56,53],
    'John': [51,25,36,54,47,71,53,59,41,42,57,50,38,31,27,33,26,40,42,31,25],
    'Acts': [26,47,26,37,42,15,60,40,43,48,30,25,52,28,41,40,34,28,41,38,40,30,35,27,27,32,44,31],
    'Romans': [32,29,31,25,21,23,25,39,33,21,36,21,14,23,33,27],
    '1 Corinthians': [31,16,23,21,13,20,40,13,27,33,34,31,13,40,58,24],
    '2 Corinthians': [24,17,18,18,21,18,16,24,15,18,33,21,14],
    'Galatians': [24,21,29,31,26,18],
    'Ephesians': [23,22,21,32,33,24],
    'Philippians': [30,30,21,23],
    'Colossians': [29,23,25,18],
    '1 Thessalonians': [10,20,13,18,28],
    '2 Thessalonians': [12,17,18],
    '1 Timothy': [20,15,16,16,25,21],
    '2 Timothy': [18,26,17,22],
    'Titus': [16,15,15],
    'Philemon': [25],
    'Hebrews': [14,18,19,16,14,20,28,13,28,39,40,29,25],
    'James': [27,26,18,17,20],
    '1 Peter': [25,25,22,19,14],
    '2 Peter': [21,22,18],
    '1 John': [10,29,24,21,21],
    '2 John': [13],
    '3 John': [14],
    'Jude': [25],
    'Revelation': [20,29,22,11,14,17,17,13,21,11,19,17,18,20,8,21,18,24,21,15,27,21]
};

/**
 * Initialize Bible verse page
 */
function initializeBibleVersePage() {
    if (biblePageInitialized) return;
    
    // Initialize dropdown
    initializeBibleDropdown();
    
    // Initialize form submission
    initializeBibleForm();
    
    // Initialize radio option click handlers
    initializeRadioOptionClicks();
    
    // Initialize chapter validation
    initializeChapterValidation();
    
    // Initialize verse validation
    initializeVerseValidation();
    
    biblePageInitialized = true;
}

/**
 * Switch between Old and New Testament
 */
function switchTestament(testament) {
    currentTestament = testament;
    
    // Update button states
    const buttons = document.querySelectorAll('.bible-verse-testament-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Update header
    const header = document.getElementById('testamentTitle');
    if (header) {
        header.textContent = testament === 'old' ? 'OLD TESTAMENT' : 'NEW TESTAMENT';
    }
    
    // Clear all input fields
    const bookInput = document.getElementById('bookInput');
    const chapterInput = document.getElementById('chapterInput');
    const verseInput = document.getElementById('verseInput');
    
    if (bookInput) {
        bookInput.value = '';
    }
    if (chapterInput) {
        chapterInput.value = '';
    }
    if (verseInput) {
        verseInput.value = '';
    }
    
    // Reset selected book
    selectedBook = '';
    
    // Clear helper texts and reset to default
    const chapterHelperText = document.getElementById('chapterHelperText');
    const verseHelperText = document.getElementById('verseHelperText');
    
    if (chapterHelperText) {
        chapterHelperText.textContent = 'Example: 1';
        chapterHelperText.classList.remove('error');
    }
    if (verseHelperText) {
        verseHelperText.textContent = 'Example: 4:7 or 2-9';
        verseHelperText.classList.remove('error');
    }
    
    // Refresh dropdown
    populateBookDropdown();
}

/**
 * Initialize the book dropdown
 */
function initializeBibleDropdown() {
    const bookInput = document.getElementById('bookInput');
    const bookList = document.getElementById('bookList');
    
    if (!bookInput || !bookList) return;
    
    // Populate initial books
    populateBookDropdown();
    
    // Show dropdown when input is focused
    bookInput.addEventListener('focus', () => {
        bookList.classList.add('active');
        filterBooks('');
    });
    
    // Filter books as user types
    bookInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        filterBooks(searchTerm);
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!bookInput.contains(e.target) && !bookList.contains(e.target)) {
            bookList.classList.remove('active');
        }
    });
}

/**
 * Populate book dropdown based on current testament
 */
function populateBookDropdown() {
    const bookList = document.getElementById('bookList');
    if (!bookList) return;
    
    const books = currentTestament === 'old' ? OLD_TESTAMENT_BOOKS : NEW_TESTAMENT_BOOKS;
    
    bookList.innerHTML = books.map(book => 
        `<div class="bible-verse-dropdown-item" data-value="${book}">${book}</div>`
    ).join('');
    
    // Add click handlers
    bookList.querySelectorAll('.bible-verse-dropdown-item').forEach(item => {
        item.addEventListener('click', () => {
            const bookInput = document.getElementById('bookInput');
            const bookName = item.textContent;
            
            if (bookInput) {
                bookInput.value = bookName;
            }
            
            // Update selected book and chapter helper text
            selectedBook = bookName;
            
            // Clear chapter input
            const chapterInput = document.getElementById('chapterInput');
            if (chapterInput) {
                chapterInput.value = '';
            }
            
            // Update helper text with the book's chapter range
            updateChapterHelperText(bookName);
            
            bookList.classList.remove('active');
        });
    });
}

/**
 * Filter books in dropdown
 */
function filterBooks(searchTerm) {
    const bookList = document.getElementById('bookList');
    if (!bookList) return;
    
    const items = bookList.querySelectorAll('.bible-verse-dropdown-item');
    let hasVisibleItems = false;
    
    items.forEach(item => {
        const bookName = item.textContent.toLowerCase();
        if (bookName.includes(searchTerm)) {
            item.classList.remove('hidden');
            hasVisibleItems = true;
        } else {
            item.classList.add('hidden');
        }
    });
    
    // Show "no results" message if needed
    const existingNoResults = bookList.querySelector('.bible-verse-no-results');
    if (!hasVisibleItems && searchTerm) {
        if (!existingNoResults) {
            const noResults = document.createElement('div');
            noResults.className = 'bible-verse-no-results';
            noResults.textContent = 'No books found';
            bookList.appendChild(noResults);
        }
    } else if (existingNoResults) {
        existingNoResults.remove();
    }
}

/**
 * Initialize form submission
 */
function initializeBibleForm() {
    const form = document.getElementById('bibleVerseForm');
    if (!form) return;
    
    // Remove existing event listener if any
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);
    
    newForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const book = document.getElementById('bookInput').value;
        let chapter = document.getElementById('chapterInput').value;
        const verse = document.getElementById('verseInput').value;
        const languageRadio = document.querySelector('input[name="language"]:checked');
        const language = languageRadio ? languageRadio.value : 'tamil';
        
        // Validate all inputs
        if (!book) {
            alert('Please select a book');
            return;
        }
        
        // Default to chapter 1 if no chapter is entered
        if (!chapter) {
            chapter = '1';
            document.getElementById('chapterInput').value = '1';
        }
        
        // Validate chapter before submission
        if (!validateChapterInput(book, chapter)) {
            return;
        }
        
        // Validate verse if provided
        if (verse && !validateVerseInput()) {
            return;
        }
        
        // Load and display verses
        await loadBibleVerses(book, chapter, verse, language);
    });
    
    // Re-initialize dropdown after form recreation
    initializeBibleDropdown();
}

/**
 * Load and display Bible verses
 */
async function loadBibleVerses(book, chapter, verse, language) {
    try {
        // Get display section
        const displaySection = document.getElementById('bibleVerseDisplaySection');
        
        if (!displaySection) return;
        
        // Get file name for the book
        const fileName = BOOK_FILE_MAP[book];
        if (!fileName) {
            alert('Book data not found');
            return;
        }
        
        // Determine testament folder
        const testament = OLD_TESTAMENT_BOOKS.includes(book) ? 'old-testament' : 'new-testament';
        const dataVarName = `${fileName}_data`;
        
        let tamilData = null;
        let englishData = null;
        
        // Load Tamil data if needed
        if (language === 'tamil' || language === 'both') {
            const tamilScriptPath = `scripts/data/bible/tamil/${testament}/${fileName}.js`;
            // Remove existing script to force reload
            removeScript(tamilScriptPath);
            await loadScript(tamilScriptPath);
            
            // Store Tamil data immediately after loading
            if (window[dataVarName]) {
                tamilData = JSON.parse(JSON.stringify(window[dataVarName]));
            }
            
            if (!tamilData) {
                alert('Failed to load Tamil Bible data');
                return;
            }
        }
        
        // Load English data if needed
        if (language === 'english' || language === 'both') {
            const englishScriptPath = `scripts/data/bible/english/${testament}/${fileName}.js`;
            // Remove existing script to force reload
            removeScript(englishScriptPath);
            await loadScript(englishScriptPath);
            
            // Store English data immediately after loading
            if (window[dataVarName]) {
                englishData = JSON.parse(JSON.stringify(window[dataVarName]));
            }
            
            if (!englishData) {
                alert('Failed to load English Bible data');
                return;
            }
        }
        
        // Get chapter data
        const chapterKey = `chapter_${chapter}`;
        const tamilChapterData = tamilData ? tamilData[chapterKey] : null;
        const englishChapterData = englishData ? englishData[chapterKey] : null;
        
        if (!tamilChapterData && !englishChapterData) {
            alert(`Chapter ${chapter} not found`);
            return;
        }
        
        // Display verses
        displayBibleVerses(book, chapter, tamilChapterData, englishChapterData, verse, language);
        
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
        
        // Show verse display section
        displaySection.classList.remove('hidden');
        
        // Scroll to top of the page
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
    } catch (error) {
        console.error('Error loading Bible verses:', error);
        alert('Failed to load Bible verses. Please try again.');
    }
}

/**
 * Load a script dynamically
 */
function loadScript(src) {
    return new Promise((resolve, reject) => {
        // Check if script already loaded
        const existing = document.querySelector(`script[src="${src}"]`);
        if (existing) {
            resolve();
            return;
        }
        
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

/**
 * Remove a script from DOM
 */
function removeScript(src) {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
        existing.remove();
    }
}

/**
 * Display Bible verses in the list
 */
function displayBibleVerses(book, chapter, tamilChapterData, englishChapterData, verseRange, language) {
    const title = document.getElementById('bibleVerseDisplayTitle');
    const content = document.getElementById('bibleChapterContent');
    
    if (!title || !content) return;
    
    // Store current context for navigation
    currentBibleBook = book;
    currentBibleChapter = parseInt(chapter);
    currentBibleLanguage = language;
    
    // Set title
    title.textContent = `${book} - ${chapter}`;
    
    // Clear previous content
    content.innerHTML = '';
    
    // Use whichever data is available to determine verse count
    const chapterData = tamilChapterData || englishChapterData;
    
    // Determine which verses to display
    let startVerse = 1;
    let endVerse = Object.keys(chapterData).length;
    
    if (verseRange) {
        if (verseRange.includes('-')) {
            const parts = verseRange.split('-');
            startVerse = parseInt(parts[0]) || 1;
            endVerse = parseInt(parts[1]) || endVerse;
        } else if (verseRange.includes(':')) {
            const parts = verseRange.split(':');
            startVerse = parseInt(parts[0]) || 1;
            endVerse = parseInt(parts[1]) || endVerse;
        } else {
            startVerse = endVerse = parseInt(verseRange) || 1;
        }
    }
    
    // Create a section for the verses
    const section = document.createElement('div');
    section.className = 'bible-section';
    
    // Add section title if it's a verse range
    if (verseRange) {
        const sectionTitle = document.createElement('h2');
        sectionTitle.className = 'bible-section-title';
        sectionTitle.textContent = `Verses ${startVerse}${startVerse !== endVerse ? ' - ' + endVerse : ''}`;
        section.appendChild(sectionTitle);
    }
    
    // Create verse items
    for (let i = startVerse; i <= endVerse; i++) {
        const verseKey = `verse_${i}`;
        const tamilVerseText = tamilChapterData ? tamilChapterData[verseKey] : null;
        const englishVerseText = englishChapterData ? englishChapterData[verseKey] : null;
        
        if (!tamilVerseText && !englishVerseText) continue;
        
        const verseItem = document.createElement('p');
        verseItem.className = 'bible-verse-item';
        
        if (language === 'tamil') {
            verseItem.innerHTML = `<span class="bible-verse-number">${i}.</span> <span class="bible-verse-text">${tamilVerseText || ''}</span>`;
        } else if (language === 'english') {
            verseItem.innerHTML = `<span class="bible-verse-number">${i}.</span> <span class="bible-verse-text">${englishVerseText || ''}</span>`;
        } else { // both
            verseItem.innerHTML = `<span class="bible-verse-number">${i}.</span> <span class="bible-verse-tamil">${tamilVerseText || ''}</span><br><span class="bible-verse-english">${englishVerseText || ''}</span>`;
        }
        
        section.appendChild(verseItem);
    }
    
    content.appendChild(section);
    
    // Initialize navigation
    initializeBibleNavigation();
}

/**
 * Initialize keyboard and touch navigation for chapters
 */
function initializeBibleNavigation() {
    // Remove existing listeners if any
    document.removeEventListener('keydown', handleBibleKeyNavigation);
    
    // Add keyboard navigation
    document.addEventListener('keydown', handleBibleKeyNavigation);
    
    // Add touch/swipe navigation for mobile
    const content = document.getElementById('bibleChapterContent');
    if (content) {
        content.removeEventListener('touchstart', handleTouchStart);
        content.removeEventListener('touchend', handleTouchEnd);
        
        content.addEventListener('touchstart', handleTouchStart);
        content.addEventListener('touchend', handleTouchEnd);
    }
}

function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
}

function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next chapter
            navigateToNextChapter();
        } else {
            // Swipe right - previous chapter
            navigateToPreviousChapter();
        }
    }
}

function handleBibleKeyNavigation(e) {
    // Only handle if we're on the bible verse display page
    const displaySection = document.getElementById('bibleVerseDisplaySection');
    if (!displaySection || displaySection.classList.contains('hidden')) return;
    
    if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigateToNextChapter();
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigateToPreviousChapter();
    }
}

/**
 * Navigate to next chapter
 */
async function navigateToNextChapter() {
    if (!currentBibleBook) return;
    
    const maxChapters = BOOK_CHAPTERS[currentBibleBook];
    if (!maxChapters) return;
    
    let nextChapter = currentBibleChapter + 1;
    let nextBook = currentBibleBook;
    
    // If exceeded max chapters, go to next book
    if (nextChapter > maxChapters) {
        const books = OLD_TESTAMENT_BOOKS.includes(currentBibleBook) ? OLD_TESTAMENT_BOOKS : NEW_TESTAMENT_BOOKS;
        const currentIndex = books.indexOf(currentBibleBook);
        
        if (currentIndex >= 0 && currentIndex < books.length - 1) {
            nextBook = books[currentIndex + 1];
            nextChapter = 1;
        } else {
            // Last chapter of last book
            return;
        }
    }
    
    // Load next chapter
    await loadBibleVerses(nextBook, nextChapter.toString(), '', currentBibleLanguage);
}

/**
 * Navigate to previous chapter
 */
async function navigateToPreviousChapter() {
    if (!currentBibleBook) return;
    
    let prevChapter = currentBibleChapter - 1;
    let prevBook = currentBibleBook;
    
    // If below chapter 1, go to previous book's last chapter
    if (prevChapter < 1) {
        const books = OLD_TESTAMENT_BOOKS.includes(currentBibleBook) ? OLD_TESTAMENT_BOOKS : NEW_TESTAMENT_BOOKS;
        const currentIndex = books.indexOf(currentBibleBook);
        
        if (currentIndex > 0) {
            prevBook = books[currentIndex - 1];
            prevChapter = BOOK_CHAPTERS[prevBook];
        } else {
            // First chapter of first book
            return;
        }
    }
    
    // Load previous chapter
    await loadBibleVerses(prevBook, prevChapter.toString(), '', currentBibleLanguage);
}

/**
 * Go back to the Bible form
 */
function goBackToBibleForm() {
    const displaySection = document.getElementById('bibleVerseDisplaySection');
    
    if (displaySection) {
        // Hide verse display section
        displaySection.classList.add('hidden');
        
        // Hide all other content sections
        document.getElementById('dashboard-content').classList.add('hidden');
        document.getElementById('kings-content').classList.add('hidden');
        document.getElementById('prophets-content').classList.add('hidden');
        document.getElementById('prophet-detail-content').classList.add('hidden');
        document.getElementById('books-content').classList.add('hidden');
        document.getElementById('book-chapter-content').classList.add('hidden');
        document.getElementById('king-page-content').classList.add('hidden');
        document.getElementById('timeline-content').classList.add('hidden');
        document.getElementById('genealogy-content').classList.add('hidden');
        document.getElementById('setting-content').classList.add('hidden');
        document.getElementById('help-content').classList.add('hidden');
        
        // Show bible form section
        document.getElementById('bible-content').classList.remove('hidden');
        
        // Update navigation
        if (typeof updateNavActive === 'function') {
            updateNavActive('bible');
        }
        
        // Scroll to top of the page
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

/**
 * Initialize radio option click handlers
 * Makes the entire radio option div clickable
 */
function initializeRadioOptionClicks() {
    const radioOptions = document.querySelectorAll('.bible-verse-radio-option');
    
    radioOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            // Don't double-trigger if clicking directly on input or label
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'LABEL') {
                return;
            }
            
            // Find the radio input inside this option
            const radioInput = this.querySelector('input[type="radio"]');
            if (radioInput) {
                radioInput.checked = true;
            }
        });
    });
}

/**
 * Update chapter helper text based on selected book
 */
function updateChapterHelperText(bookName) {
    const chapterHelperText = document.getElementById('chapterHelperText');
    
    if (!chapterHelperText || !bookName) return;
    
    const maxChapters = BOOK_CHAPTERS[bookName];
    
    if (maxChapters) {
        chapterHelperText.textContent = `Example: 1 - ${maxChapters}`;
        chapterHelperText.classList.remove('error');
    }
}

/**
 * Validate chapter input
 */
function validateChapterInput(bookName, chapterValue) {
    const chapterHelperText = document.getElementById('chapterHelperText');
    
    if (!chapterHelperText || !bookName) {
        return true;
    }
    
    // If no value, show example
    if (!chapterValue) {
        const maxChapters = BOOK_CHAPTERS[bookName];
        chapterHelperText.textContent = `Example: 1 - ${maxChapters}`;
        chapterHelperText.classList.remove('error');
        return true;
    }
    
    const maxChapters = BOOK_CHAPTERS[bookName];
    const chapterNum = parseInt(chapterValue);
    
    if (isNaN(chapterNum) || chapterNum < 1 || chapterNum > maxChapters) {
        chapterHelperText.textContent = `The selected book has only ${maxChapters} chapter${maxChapters === 1 ? '' : 's'}`;
        chapterHelperText.classList.add('error');
        return false;
    }
    
    // Valid input - reset to normal
    chapterHelperText.textContent = `Example: 1 - ${maxChapters}`;
    chapterHelperText.classList.remove('error');
    return true;
}

/**
 * Clear chapter error state
 */
function clearChapterError() {
    const chapterHelperText = document.getElementById('chapterHelperText');
    
    if (chapterHelperText) {
        chapterHelperText.textContent = 'Example: 3';
        chapterHelperText.classList.remove('error');
    }
}

/**
 * Initialize chapter input validation
 */
function initializeChapterValidation() {
    const chapterInput = document.getElementById('chapterInput');
    
    if (!chapterInput) return;
    
    // Restrict to numbers only
    chapterInput.addEventListener('input', (e) => {
        const value = e.target.value;
        
        // Check if input contains non-numeric characters
        if (value && !/^\d+$/.test(value)) {
            showNumericError('chapter');
            // Remove non-numeric characters
            e.target.value = value.replace(/\D/g, '');
            return;
        }
        
        // If numeric, validate chapter range
        if (selectedBook && value) {
            validateChapterInput(selectedBook, value);
        } else if (selectedBook && !value) {
            // Clear error when input is empty
            const chapterHelperText = document.getElementById('chapterHelperText');
            if (chapterHelperText) {
                const maxChapters = BOOK_CHAPTERS[selectedBook];
                chapterHelperText.textContent = `Example: 1 - ${maxChapters}`;
                chapterHelperText.classList.remove('error');
            }
        }
    });
    
    // Validate on blur (when user leaves the field)
    chapterInput.addEventListener('blur', () => {
        if (selectedBook && chapterInput.value) {
            validateChapterInput(selectedBook, chapterInput.value);
        }
    });
}

/**
 * Initialize verse input validation
 */
function initializeVerseValidation() {
    const verseInput = document.getElementById('verseInput');
    
    if (!verseInput) return;
    
    // Restrict to numbers, hyphens, and colons only (for ranges like "4:7" or "2-9")
    verseInput.addEventListener('input', (e) => {
        const value = e.target.value;
        const verseHelperText = document.getElementById('verseHelperText');
        
        // Check for invalid characters (anything other than digits, hyphen, or colon)
        if (value && /[^\d\-:]/.test(value)) {
            if (verseHelperText) {
                verseHelperText.textContent = 'Try mentioning the limit using - or :';
                verseHelperText.classList.add('error');
            }
            // Remove invalid characters (keep only numbers, hyphens, colons)
            e.target.value = value.replace(/[^\d\-:]/g, '');
            
            // Clear error after 2 seconds
            setTimeout(() => {
                if (verseHelperText && !verseHelperText.classList.contains('error')) return;
                verseHelperText.textContent = 'Example: 4:7 or 2-9';
                verseHelperText.classList.remove('error');
            }, 2000);
            return;
        }
        
        // Check for consecutive special characters (like -- or ::)
        if (value && /[\-:]{2,}/.test(value)) {
            if (verseHelperText) {
                verseHelperText.textContent = 'Use only one - or : to specify range';
                verseHelperText.classList.add('error');
            }
            // Remove consecutive special characters
            e.target.value = value.replace(/[\-:]{2,}/g, (match) => match[0]);
            
            // Clear error after 2 seconds
            setTimeout(() => {
                if (verseHelperText && !verseHelperText.classList.contains('error')) return;
                verseHelperText.textContent = 'Example: 4:7 or 2-9';
                verseHelperText.classList.remove('error');
            }, 2000);
            return;
        }
        
        // Count special characters (hyphens and colons)
        const specialCharCount = (value.match(/[\-:]/g) || []).length;
        
        // Allow only one special character
        if (specialCharCount > 1) {
            if (verseHelperText) {
                verseHelperText.textContent = 'Use only one - or : to specify range';
                verseHelperText.classList.add('error');
            }
            // Remove the last special character entered
            const lastSpecialChar = value.match(/[\-:](?!.*[\-:])/);
            if (lastSpecialChar) {
                e.target.value = value.substring(0, value.lastIndexOf(lastSpecialChar[0])) + 
                                 value.substring(value.lastIndexOf(lastSpecialChar[0]) + 1);
            }
            
            // Clear error after 2 seconds
            setTimeout(() => {
                if (verseHelperText && !verseHelperText.classList.contains('error')) return;
                verseHelperText.textContent = 'Example: 4:7 or 2-9';
                verseHelperText.classList.remove('error');
            }, 2000);
            return;
        }
        
        // Validate verse number if we have valid input
        if (value) {
            validateVerseInput();
        }
    });
    
    // Also validate on blur
    verseInput.addEventListener('blur', () => {
        if (verseInput.value) {
            validateVerseInput();
        }
    });
}

/**
 * Validate verse input based on chapter
 */
function validateVerseInput() {
    const verseInput = document.getElementById('verseInput');
    const chapterInput = document.getElementById('chapterInput');
    const verseHelperText = document.getElementById('verseHelperText');
    
    if (!verseInput || !verseHelperText) return true;
    
    const verseValue = verseInput.value.trim();
    const chapterValue = chapterInput ? chapterInput.value.trim() : '';
    
    // If no verse entered, reset to example
    if (!verseValue) {
        verseHelperText.textContent = 'Example: 4:7 or 2-9';
        verseHelperText.classList.remove('error');
        return true;
    }
    
    // Check if we have book and chapter selected
    if (!selectedBook || !chapterValue) {
        verseHelperText.textContent = 'Please select a book and enter a chapter first';
        verseHelperText.classList.add('error');
        return false;
    }
    
    const chapterNum = parseInt(chapterValue);
    
    // Validate chapter number exists
    if (isNaN(chapterNum) || chapterNum < 1 || chapterNum > BOOK_CHAPTERS[selectedBook]) {
        verseHelperText.textContent = 'Please enter a valid chapter first';
        verseHelperText.classList.add('error');
        return false;
    }
    
    // Get actual verse count for this chapter
    const verseCountsForBook = VERSE_COUNTS[selectedBook];
    if (!verseCountsForBook || !verseCountsForBook[chapterNum - 1]) {
        verseHelperText.textContent = 'Example: 4:7 or 2-9';
        verseHelperText.classList.remove('error');
        return true;
    }
    
    const maxVerses = verseCountsForBook[chapterNum - 1];
    
    // Parse verse range or single verse
    let startVerse, endVerse;
    
    if (verseValue.includes('-')) {
        // Range with hyphen: "2-9"
        const parts = verseValue.split('-');
        startVerse = parseInt(parts[0]);
        endVerse = parts[1] ? parseInt(parts[1]) : startVerse;
    } else if (verseValue.includes(':')) {
        // Range with colon: "4:7"
        const parts = verseValue.split(':');
        startVerse = parseInt(parts[0]);
        endVerse = parts[1] ? parseInt(parts[1]) : startVerse;
    } else {
        // Single verse
        startVerse = parseInt(verseValue);
        endVerse = startVerse;
    }
    
    // Validate start verse
    if (isNaN(startVerse) || startVerse < 1) {
        verseHelperText.textContent = 'Verse number must be at least 1';
        verseHelperText.classList.add('error');
        return false;
    }
    
    if (startVerse > maxVerses) {
        verseHelperText.textContent = `Chapter ${chapterNum} has only ${maxVerses} verse${maxVerses === 1 ? '' : 's'}`;
        verseHelperText.classList.add('error');
        return false;
    }
    
    // Validate end verse (if range)
    if (!isNaN(endVerse) && endVerse > 0) {
        if (endVerse > maxVerses) {
            verseHelperText.textContent = `Chapter ${chapterNum} has only ${maxVerses} verse${maxVerses === 1 ? '' : 's'}`;
            verseHelperText.classList.add('error');
            return false;
        }
        
        if (endVerse < startVerse) {
            verseHelperText.textContent = 'End verse must be greater than start verse';
            verseHelperText.classList.add('error');
            return false;
        }
    }
    
    // Valid verse - reset to normal
    verseHelperText.textContent = 'Example: 4:7 or 2-9';
    verseHelperText.classList.remove('error');
    return true;
}

/**
 * Show numeric error message
 */
function showNumericError(fieldType) {
    const helperTextId = fieldType === 'chapter' ? 'chapterHelperText' : 'verseHelperText';
    const helperText = document.getElementById(helperTextId);
    
    if (helperText) {
        helperText.textContent = 'Try entering only numbers';
        helperText.classList.add('error');
        
        // Clear the error after 2 seconds if user stops typing
        setTimeout(() => {
            if (fieldType === 'chapter' && selectedBook) {
                const maxChapters = BOOK_CHAPTERS[selectedBook];
                helperText.textContent = `Example: 1 - ${maxChapters}`;
                helperText.classList.remove('error');
            } else if (fieldType === 'verse') {
                helperText.textContent = 'Example: 4:7 or 2-9';
                helperText.classList.remove('error');
            }
        }, 2000);
    }
}

// Export functions to global scope
window.initializeBibleVersePage = initializeBibleVersePage;
window.switchTestament = switchTestament;


