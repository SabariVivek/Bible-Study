/**
 * CROSS REFERENCE POPUP - Handle cross-reference link clicks
 */

// Cross-reference mapping for Bible verses
const CROSS_REFERENCE_MAP = {
    'matthew_1_1_ancestors': {
        title: 'Ancestors of Jesus Christ',
        references: [
            { verse: 'Luke 3:23-38', book: 'Luke', chapter: 3, verses: [23, 38] },
            { verse: 'Ruth 4:18-22', book: 'Ruth', chapter: 4, verses: [18, 22] },
            { verse: '1 Chronicles 3:10-17', book: '1 Chronicles', chapter: 3, verses: [10, 17] }
        ]
    },
    'matthew_1_1_david': {
        title: 'Jesus from the family of David',
        references: [
            { verse: '2 Samuel 7:12-16', book: '2 Samuel', chapter: 7, verses: [12, 16] },
            { verse: 'Isaiah 11:1', book: 'Isaiah', chapter: 11, verses: [1, 1] },
            { verse: 'Romans 1:3', book: 'Romans', chapter: 1, verses: [3, 3] }
        ]
    },
    'matthew_1_1_abraham': {
        title: 'David from the family of Abraham',
        references: [
            { verse: 'Genesis 12:1-3', book: 'Genesis', chapter: 12, verses: [1, 3] },
            { verse: 'Genesis 22:18', book: 'Genesis', chapter: 22, verses: [18, 18] },
            { verse: 'Galatians 3:16', book: 'Galatians', chapter: 3, verses: [16, 16] }
        ]
    }
};

let currentPopup = null;

/**
 * Initialize cross-reference link handlers
 */
function initializeCrossReferenceLinkHandlers() {
    const content = document.getElementById('bibleChapterContent');
    if (!content) return;
    
    // Remove existing handlers to prevent duplicates
    const existingHandler = content._crossRefHandler;
    if (existingHandler) {
        content.removeEventListener('click', existingHandler);
    }
    
    // Create new handler
    const handler = handleCrossReferenceClick;
    content._crossRefHandler = handler;
    
    // Add event listener
    content.addEventListener('click', handler);
}

/**
 * Handle cross-reference link clicks
 */
function handleCrossReferenceClick(e) {
    const target = e.target;
    
    // Check if clicked element is a link icon (🔗)
    if (target.textContent && target.textContent.trim() === '🔗') {
        e.preventDefault();
        e.stopPropagation();
        
        // Get the reference key from context
        const verseItem = target.closest('.bible-verse-item');
        if (!verseItem) return;
        
        // Get verse number
        const verseNumber = verseItem.querySelector('.bible-verse-number');
        if (!verseNumber) return;
        
        const verseNum = verseNumber.textContent.replace('.', '').trim();
        
        // Build reference key
        const book = currentBibleBook.toLowerCase().replace(/\s+/g, '_');
        const chapter = currentBibleChapter;
        
        // Find the position of the clicked icon in the text
        const verseText = target.closest('.bible-verse-text, .bible-verse-english');
        if (!verseText) return;
        
        // Get which link was clicked (by counting preceding links)
        const allLinks = verseText.querySelectorAll('.link-icon');
        let linkIndex = 0;
        for (let i = 0; i < allLinks.length; i++) {
            if (allLinks[i] === target || allLinks[i].contains(target)) {
                linkIndex = i;
                break;
            }
        }
        
        // Build reference key based on book, chapter, verse, and link index
        let referenceKey = `${book}_${chapter}_${verseNum}`;
        
        // Add specific suffix based on the context or link index
        if (book === 'matthew' && chapter === 1 && verseNum === '1') {
            const suffixes = ['ancestors', 'david', 'abraham'];
            referenceKey += '_' + suffixes[linkIndex];
        }
        
        // Show the popup
        showCrossReferencePopup(referenceKey, target);
    }
}

/**
 * Get verse number from reference key
 */
function getVerseNumberFromKey(referenceKey) {
    const parts = referenceKey.split('_');
    // Format: book_chapter_verse_suffix
    if (parts.length >= 3) {
        return parts[2];
    }
    return '';
}

/**
 * Show cross-reference popup
 */
function showCrossReferencePopup(referenceKey, triggerElement) {
    // Close any existing popup
    closeCrossReferencePopup();
    
    // Get reference data
    const referenceData = CROSS_REFERENCE_MAP[referenceKey];
    
    if (!referenceData) {
        console.warn('No cross-reference data found for:', referenceKey);
        return;
    }
    
    // Create backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'cross-reference-backdrop';
    backdrop.onclick = closeCrossReferencePopup;
    
    // Create popup
    const popup = document.createElement('div');
    popup.className = 'cross-reference-popup';
    popup.id = 'crossReferencePopup';
    
    // Create header
    const header = document.createElement('div');
    header.className = 'cross-reference-popup-header';
    
    // Add "View All" link
    const viewAll = document.createElement('a');
    viewAll.className = 'cross-reference-popup-view-all';
    viewAll.textContent = 'View All';
    viewAll.href = '#';
    viewAll.onclick = (e) => {
        e.preventDefault();
        // TODO: Implement view all functionality
        console.log('View all references');
    };
    
    const title = document.createElement('h3');
    title.className = 'cross-reference-popup-title';
    
    // Get the verse reference for title
    const verseRef = `${currentBibleBook} ${currentBibleChapter}:${getVerseNumberFromKey(referenceKey)}`;
    title.innerHTML = verseRef.replace(/(\d+)$/, '<sup>$1</sup>');
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'cross-reference-popup-close';
    closeBtn.innerHTML = '×';
    closeBtn.onclick = closeCrossReferencePopup;
    
    header.appendChild(viewAll);
    header.appendChild(title);
    header.appendChild(closeBtn);
    
    // Create content
    const content = document.createElement('div');
    content.className = 'cross-reference-popup-content';
    
    // Add loading state
    content.innerHTML = '<div class="cross-reference-loading">Loading references</div>';
    
    popup.appendChild(header);
    popup.appendChild(content);
    
    // Add to DOM
    document.body.appendChild(backdrop);
    document.body.appendChild(popup);
    
    // Position popup near the trigger element
    positionPopup(popup, triggerElement);
    
    // Show with animation
    setTimeout(() => {
        backdrop.classList.add('show');
        popup.classList.add('show');
    }, 10);
    
    // Load reference content
    loadCrossReferenceContent(referenceData, content);
    
    // Store current popup
    currentPopup = { popup, backdrop };
}

/**
 * Position popup near trigger element
 */
function positionPopup(popup, triggerElement) {
    const triggerRect = triggerElement.getBoundingClientRect();
    const popupRect = popup.getBoundingClientRect();
    
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    let top = triggerRect.bottom + 10;
    let left = triggerRect.left;
    
    // Adjust if popup goes off-screen horizontally
    if (left + popupRect.width > viewportWidth - 20) {
        left = viewportWidth - popupRect.width - 20;
    }
    if (left < 20) {
        left = 20;
    }
    
    // Adjust if popup goes off-screen vertically
    if (top + popupRect.height > viewportHeight - 20) {
        // Show above trigger instead
        top = triggerRect.top - popupRect.height - 10;
        
        // If still off-screen, align to viewport
        if (top < 20) {
            top = 20;
        }
    }
    
    popup.style.top = `${top}px`;
    popup.style.left = `${left}px`;
}

/**
 * Load cross-reference content
 */
async function loadCrossReferenceContent(referenceData, contentElement) {
    try {
        const references = referenceData.references;
        
        if (!references || references.length === 0) {
            contentElement.innerHTML = '<div class="cross-reference-empty">No references available</div>';
            return;
        }
        
        // Build content HTML
        let html = '';
        
        for (const ref of references) {
            const verseText = await getVerseText(ref.book, ref.chapter, ref.verses);
            
            html += `
                <div class="cross-reference-item" data-book="${ref.book}" data-chapter="${ref.chapter}" data-verses="${ref.verses.join(',')}">
                    <div class="cross-reference-verse-ref">${ref.verse}</div>
                    <div class="cross-reference-verse-text">${verseText}</div>
                </div>
            `;
        }
        
        contentElement.innerHTML = html;
        
        // Add click handlers to items
        const items = contentElement.querySelectorAll('.cross-reference-item');
        items.forEach(item => {
            item.addEventListener('click', () => {
                const book = item.getAttribute('data-book');
                const chapter = parseInt(item.getAttribute('data-chapter'));
                const verses = item.getAttribute('data-verses').split(',').map(v => parseInt(v));
                navigateToReference(book, chapter, verses);
            });
        });
        
    } catch (error) {
        console.error('Error loading cross-reference content:', error);
        contentElement.innerHTML = '<div class="cross-reference-error">Failed to load references</div>';
    }
}

/**
 * Get verse text from Bible data
 */
async function getVerseText(book, chapter, verses) {
    try {
        // Get the file name for the book
        const fileName = BOOK_FILE_MAP[book];
        if (!fileName) {
            throw new Error(`Book not found: ${book}`);
        }
        
        // Determine testament
        const testament = OLD_TESTAMENT_BOOKS.includes(book) ? 'old' : 'new';
        
        // Get data from global variables
        const dataVarName = `${fileName}_data`;
        const bibleData = window[dataVarName];
        
        if (!bibleData) {
            throw new Error(`Bible data not found for: ${book}`);
        }
        
        const chapterKey = `chapter_${chapter}`;
        const chapterData = bibleData[chapterKey];
        
        if (!chapterData) {
            throw new Error(`Chapter ${chapter} not found in ${book}`);
        }
        
        // Get verse range
        const [startVerse, endVerse] = verses.length === 2 ? verses : [verses[0], verses[0]];
        
        let verseTexts = [];
        for (let i = startVerse; i <= endVerse; i++) {
            const verseKey = `verse_${i}`;
            const verseText = chapterData[verseKey];
            
            if (verseText) {
                // Remove link icons from the text
                const cleanText = verseText.replace(/🔗/g, '').trim();
                verseTexts.push(cleanText);
            }
        }
        
        return verseTexts.join(' ');
        
    } catch (error) {
        console.error('Error getting verse text:', error);
        return 'Text not available';
    }
}

/**
 * Navigate to a reference
 */
function navigateToReference(book, chapter, verses) {
    closeCrossReferencePopup();
    
    // Get the book data
    const fileName = BOOK_FILE_MAP[book];
    if (!fileName) return;
    
    const dataVarName = `${fileName}_data`;
    const bibleData = window[dataVarName];
    
    if (!bibleData) return;
    
    const chapterKey = `chapter_${chapter}`;
    const chapterData = bibleData[chapterKey];
    
    if (!chapterData) return;
    
    // Display the verses
    const verseRange = verses.length === 2 && verses[0] !== verses[1] 
        ? `${verses[0]}-${verses[1]}` 
        : `${verses[0]}`;
    
    // Use current language setting
    const language = currentBibleLanguage || 'english';
    
    displayBibleVerses(book, chapter, null, chapterData, verseRange, language);
    
    // Show display section
    const displaySection = document.getElementById('bibleVerseDisplaySection');
    if (displaySection) {
        displaySection.classList.remove('hidden');
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Close cross-reference popup
 */
function closeCrossReferencePopup() {
    if (currentPopup) {
        const { popup, backdrop } = currentPopup;
        
        // Remove show class for animation
        popup.classList.remove('show');
        backdrop.classList.remove('show');
        
        // Remove from DOM after animation
        setTimeout(() => {
            if (popup.parentElement) {
                popup.parentElement.removeChild(popup);
            }
            if (backdrop.parentElement) {
                backdrop.parentElement.removeChild(backdrop);
            }
        }, 200);
        
        currentPopup = null;
    }
}

/**
 * Process verse text to wrap link icons
 */
function processVerseTextWithLinks(verseText) {
    if (!verseText) return '';
    
    // Replace link icons with wrapped spans for better click handling
    return verseText.replace(/🔗/g, '<span class="link-icon">🔗</span>');
}

// Close popup on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCrossReferencePopup();
    }
});
