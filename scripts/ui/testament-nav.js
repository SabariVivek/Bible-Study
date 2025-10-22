/**
 * Testament Navigation Menu JavaScript
 * Handles the Bible book navigation mega menu with Old and New Testament sections
 */

// Bible books data structure
const testamentBooksData = {
    oldTestament: {
        'Law (Torah)': ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy'],
        'History': [
            'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel', '1 Kings', '2 Kings',
            '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah', 'Esther'
        ],
        'Wisdom': ['Job', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Songs'],
        'Major Prophets': ['Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel'],
        'Minor Prophets': [
            'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah',
            'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi'
        ]
    },
    newTestament: {
        'The Gospels': ['Matthew', 'Mark', 'Luke', 'John'],
        'History': ['Acts'],
        'Paul\'s Letters': [
            'Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians',
            'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians',
            '1 Timothy', '2 Timothy', 'Titus', 'Philemon'
        ],
        'General Letters': [
            'Hebrews', 'James', '1 Peter', '2 Peter',
            '1 John', '2 John', '3 John', 'Jude'
        ],
        'Prophecy': ['Revelation']
    }
};

// Store currently selected book
let selectedTestamentBook = null;
let selectedTestamentBookElement = null;

/**
 * Initialize the testament navigation menu
 * @param {string} triggerElementId - ID of the element that triggers the menu (e.g., page title)
 * @param {string} currentBook - The currently displayed book name
 */
function initializeTestamentNav(triggerElementId, currentBook = null) {
    
    const triggerElement = document.getElementById(triggerElementId);
    if (!triggerElement) {
        console.warn(`Testament nav trigger element not found: ${triggerElementId}`);
        return;
    }

    // Store the current book if provided
    if (currentBook) {
        selectedTestamentBook = currentBook;
    }

    // Check if already initialized - remove old initialization if exists
    const existingWrapper = triggerElement.closest('.testament-nav-wrapper');
    if (existingWrapper) {
        if (selectedTestamentBook) {
            markSelectedBook(selectedTestamentBook);
        }
        return;
    }

    
    // Create wrapper around the trigger element
    const wrapper = document.createElement('div');
    wrapper.className = 'testament-nav-wrapper';
    
    // Replace trigger with wrapper and put trigger inside
    triggerElement.parentNode.insertBefore(wrapper, triggerElement);
    wrapper.appendChild(triggerElement);
    
    // Add class to trigger
    triggerElement.classList.add('testament-nav-trigger');
    
    // Create and insert the mega menu
    const menuContainer = document.createElement('div');
    menuContainer.innerHTML = createTestamentNavHTML();
    
    // Append the menu content to wrapper
    const megaMenuElement = menuContainer.firstElementChild;
    wrapper.appendChild(megaMenuElement);
    
    
    // Initialize event listeners - wait a bit for DOM to settle
    setTimeout(() => {
        initializeTestamentNavEvents();
        
        // Mark the selected book if any
        if (selectedTestamentBook) {
            markSelectedBook(selectedTestamentBook);
        }
        
    }, 50);
}

/**
 * Create the HTML structure for the testament navigation menu
 */
function createTestamentNavHTML() {
    return `
        <div class="testament-mega-menu">
            <div class="testament-mega-menu-content">
                <div class="testament-tabs">
                    <button class="testament-tab-button active" data-testament="old">Old Testament</button>
                    <button class="testament-tab-button" data-testament="new">New Testament</button>
                </div>

                <!-- Old Testament Content -->
                <div id="testament-old" class="testament-content active">
                    ${generateTestamentSection('oldTestament')}
                </div>

                <!-- New Testament Content -->
                <div id="testament-new" class="testament-content">
                    ${generateTestamentSection('newTestament')}
                </div>
            </div>
        </div>
    `;
}

/**
 * Generate HTML for a testament section
 */
function generateTestamentSection(testament) {
    const books = testamentBooksData[testament];
    const categories = Object.keys(books);
    
    if (testament === 'oldTestament') {
        // Old Testament: 4 columns with specific category distribution
        return `
            <div class="testament-menu-column">
                <h3 class="testament-column-title">Law (Torah)</h3>
                <ul class="testament-menu-items">
                    ${books['Law (Torah)'].map(book => `
                        <li class="testament-menu-item">
                            <a href="#" data-book="${book}">${book}</a>
                        </li>
                    `).join('')}
                </ul>
                
                <h3 class="testament-column-title" style="margin-top: 25px;">History</h3>
                <ul class="testament-menu-items">
                    ${books['History'].slice(0, 6).map(book => `
                        <li class="testament-menu-item">
                            <a href="#" data-book="${book}">${book}</a>
                        </li>
                    `).join('')}
                </ul>
            </div>

            <div class="testament-menu-column">
                <h3 class="testament-column-title">History</h3>
                <ul class="testament-menu-items">
                    ${books['History'].slice(6).map(book => `
                        <li class="testament-menu-item">
                            <a href="#" data-book="${book}">${book}</a>
                        </li>
                    `).join('')}
                </ul>
                
                <h3 class="testament-column-title" style="margin-top: 25px;">Wisdom</h3>
                <ul class="testament-menu-items">
                    ${books['Wisdom'].slice(0, 3).map(book => `
                        <li class="testament-menu-item">
                            <a href="#" data-book="${book}">${book}</a>
                        </li>
                    `).join('')}
                </ul>
            </div>

            <div class="testament-menu-column">
                <h3 class="testament-column-title">Wisdom</h3>
                <ul class="testament-menu-items">
                    ${books['Wisdom'].slice(3).map(book => `
                        <li class="testament-menu-item">
                            <a href="#" data-book="${book}">${book}</a>
                        </li>
                    `).join('')}
                </ul>

                <h3 class="testament-column-title" style="margin-top: 25px;">Major Prophets</h3>
                <ul class="testament-menu-items">
                    ${books['Major Prophets'].map(book => `
                        <li class="testament-menu-item">
                            <a href="#" data-book="${book}">${book}</a>
                        </li>
                    `).join('')}
                </ul>
            </div>

            <div class="testament-menu-column">
                <h3 class="testament-column-title">Minor Prophets</h3>
                <ul class="testament-menu-items">
                    ${books['Minor Prophets'].map(book => `
                        <li class="testament-menu-item">
                            <a href="#" data-book="${book}">${book}</a>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    } else {
        // New Testament: 4 columns
        return `
            <div class="testament-menu-column">
                <h3 class="testament-column-title">The Gospels</h3>
                <ul class="testament-menu-items">
                    ${books['The Gospels'].map(book => `
                        <li class="testament-menu-item">
                            <a href="#" data-book="${book}">${book}</a>
                        </li>
                    `).join('')}
                </ul>
                
                <h3 class="testament-column-title" style="margin-top: 25px;">History</h3>
                <ul class="testament-menu-items">
                    ${books['History'].map(book => `
                        <li class="testament-menu-item">
                            <a href="#" data-book="${book}">${book}</a>
                        </li>
                    `).join('')}
                </ul>
            </div>

            <div class="testament-menu-column">
                <h3 class="testament-column-title">Paul's Letters</h3>
                <ul class="testament-menu-items">
                    ${books['Paul\'s Letters'].slice(0, 7).map(book => `
                        <li class="testament-menu-item">
                            <a href="#" data-book="${book}">${book}</a>
                        </li>
                    `).join('')}
                </ul>
            </div>

            <div class="testament-menu-column">
                <h3 class="testament-column-title">Paul's Letters</h3>
                <ul class="testament-menu-items">
                    ${books['Paul\'s Letters'].slice(7).map(book => `
                        <li class="testament-menu-item">
                            <a href="#" data-book="${book}">${book}</a>
                        </li>
                    `).join('')}
                </ul>
            </div>

            <div class="testament-menu-column">
                <h3 class="testament-column-title">General Letters</h3>
                <ul class="testament-menu-items">
                    ${books['General Letters'].map(book => `
                        <li class="testament-menu-item">
                            <a href="#" data-book="${book}">${book}</a>
                        </li>
                    `).join('')}
                </ul>
                
                <h3 class="testament-column-title" style="margin-top: 25px;">Prophecy</h3>
                <ul class="testament-menu-items">
                    ${books['Prophecy'].map(book => `
                        <li class="testament-menu-item">
                            <a href="#" data-book="${book}">${book}</a>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    }
}

/**
 * Initialize event listeners for the testament navigation
 */
function initializeTestamentNavEvents() {
    
    // Tab switching on hover
    const tabButtons = document.querySelectorAll('.testament-tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            switchTestamentTab(this.dataset.testament);
        });
    });
    
    // Book selection
    const bookLinks = document.querySelectorAll('.testament-menu-item a');
    bookLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            selectTestamentBook(this);
        });
    });
    
}

/**
 * Switch between Old and New Testament tabs
 */
function switchTestamentTab(testament) {
    // Remove active class from all tabs and content
    document.querySelectorAll('.testament-tab-button').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.testament-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Add active class to selected tab and content
    const activeButton = document.querySelector(`.testament-tab-button[data-testament="${testament}"]`);
    const activeContent = document.getElementById(`testament-${testament}`);
    
    if (activeButton) activeButton.classList.add('active');
    if (activeContent) activeContent.classList.add('active');
}

/**
 * Handle book selection from the menu
 */
function selectTestamentBook(bookLink) {
    const bookName = bookLink.dataset.book;
    
    
    // If clicking the already selected book, just close the menu
    if (bookLink === selectedTestamentBookElement) {
        closeTestamentMenu();
        return;
    }
    
    // Remove selected class from previously selected book
    if (selectedTestamentBookElement) {
        selectedTestamentBookElement.classList.remove('selected');
    }
    
    // Add selected class to newly selected book
    bookLink.classList.add('selected');
    selectedTestamentBookElement = bookLink;
    selectedTestamentBook = bookName;
    
    // Update the page - call the main navigation function
    if (typeof window.loadBookFromTestamentNav === 'function') {
        window.loadBookFromTestamentNav(bookName);
    }
    
    // Close the mega menu
    closeTestamentMenu();
}

/**
 * Mark a book as selected in the navigation menu
 */
function markSelectedBook(bookName) {
    // Remove any existing selected class
    const allBookLinks = document.querySelectorAll('.testament-menu-item a');
    allBookLinks.forEach(link => link.classList.remove('selected'));
    
    // Find and mark the book
    const bookLink = document.querySelector(`.testament-menu-item a[data-book="${bookName}"]`);
    if (bookLink) {
        bookLink.classList.add('selected');
        selectedTestamentBookElement = bookLink;
        selectedTestamentBook = bookName;
        
        // Switch to the correct testament tab
        const testament = isOldTestamentBook(bookName) ? 'old' : 'new';
        switchTestamentTab(testament);
    }
}

/**
 * Check if a book belongs to the Old Testament
 */
function isOldTestamentBook(bookName) {
    for (const category in testamentBooksData.oldTestament) {
        if (testamentBooksData.oldTestament[category].includes(bookName)) {
            return true;
        }
    }
    return false;
}

/**
 * Close the testament mega menu
 */
function closeTestamentMenu() {
    const megaMenu = document.querySelector('.testament-mega-menu');
    if (megaMenu) {
        megaMenu.style.opacity = '0';
        megaMenu.style.visibility = 'hidden';
        
        // Reset styles after animation
        setTimeout(() => {
            megaMenu.style.opacity = '';
            megaMenu.style.visibility = '';
        }, 300);
    }
}

/**
 * Update the selected book when the page changes
 * @param {string} bookName - The new book name to mark as selected
 */
function updateTestamentNavSelection(bookName) {
    selectedTestamentBook = bookName;
    markSelectedBook(bookName);
}
