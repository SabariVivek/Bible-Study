/**
 * CROSS REFERENCE POPUP - Handle cross-reference link clicks
 * 
 * Note: This file uses BOOK_FILE_MAP and OLD_TESTAMENT_BOOKS constants
 * which are defined in bible-verse-modal.js. Make sure bible-verse-modal.js
 * is loaded before this file.
 */

// Cross-reference mapping for Bible verses
const CROSS_REFERENCE_MAP = {
    // Matthew 1:1
    'matthew_1_1_0': {
        title: 'The Genealogy of Jesus',
        references: [
            { verse: 'Luke 3:23-38', book: 'Luke', chapter: 3, verses: [23, 38] }
        ]
    },
    'matthew_1_1_1': {
        title: 'Son of David',
        references: [
            { verse: '2 Samuel 7:12-16', book: '2 Samuel', chapter: 7, verses: [12, 16] },
            { verse: 'Psalm 132:11', book: 'Psalms', chapter: 132, verses: [11, 11] },
            { verse: 'Isaiah 11:1', book: 'Isaiah', chapter: 11, verses: [1, 1] },
            { verse: 'Jeremiah 23:5', book: 'Jeremiah', chapter: 23, verses: [5, 5] },
            { verse: 'Luke 1:32', book: 'Luke', chapter: 1, verses: [32, 32] },
            { verse: 'Acts 2:30', book: 'Acts', chapter: 2, verses: [30, 30] },
            { verse: 'Romans 1:3', book: 'Romans', chapter: 1, verses: [3, 3] }
        ]
    },
    'matthew_1_1_2': {
        title: 'Son of Abraham',
        references: [
            { verse: 'Genesis 22:18', book: 'Genesis', chapter: 22, verses: [18, 18] },
            { verse: 'Galatians 3:16', book: 'Galatians', chapter: 3, verses: [16, 16] }
        ]
    },
    // Matthew 1:2
    'matthew_1_2_0': {
        title: 'Abraham, Isaac, Jacob',
        references: [
            { verse: 'Genesis 21:3', book: 'Genesis', chapter: 21, verses: [3, 3] }
        ]
    },
    'matthew_1_2_1': {
        title: 'Isaac and Jacob',
        references: [
            { verse: 'Genesis 25:26', book: 'Genesis', chapter: 25, verses: [26, 26] }
        ]
    },
    'matthew_1_2_2': {
        title: 'Jacob and Judah',
        references: [
            { verse: 'Genesis 29:35', book: 'Genesis', chapter: 29, verses: [35, 35] }
        ]
    },
    // Matthew 1:3
    'matthew_1_3_0': {
        title: 'Genealogy Records',
        references: [
            { verse: 'Ruth 4:18-22', book: 'Ruth', chapter: 4, verses: [18, 22] },
            { verse: '1 Chronicles 2:1-15', book: '1 Chronicles', chapter: 2, verses: [1, 15] }
        ]
    },
    // Matthew 1:5
    'matthew_1_5_0': {
        title: 'Rahab',
        references: [
            { verse: 'Joshua 6:25', book: 'Joshua', chapter: 6, verses: [25, 25] }
        ]
    },
    // Matthew 1:6
    'matthew_1_6_0': {
        title: 'Jesse and David',
        references: [
            { verse: '1 Samuel 16:1', book: '1 Samuel', chapter: 16, verses: [1, 1] }
        ]
    },
    'matthew_1_6_1': {
        title: 'David and Solomon',
        references: [
            { verse: '2 Samuel 12:24', book: '2 Samuel', chapter: 12, verses: [24, 24] }
        ]
    },
    'matthew_1_6_2': {
        title: 'Wife of Uriah',
        references: [
            { verse: '2 Samuel 12:10', book: '2 Samuel', chapter: 12, verses: [10, 10] }
        ]
    },
    // Matthew 1:7-10
    'matthew_1_7_0': {
        title: 'Kings of Judah',
        references: [
            { verse: 'Matthew 1:7-10', book: 'Matthew', chapter: 1, verses: [7, 10] },
            { verse: '1 Chronicles 3:10-14', book: '1 Chronicles', chapter: 3, verses: [10, 14] }
        ]
    },
    'matthew_1_8_0': {
        title: 'Joram to Uzziah',
        references: [
            { verse: '2 Kings 15:1', book: '2 Kings', chapter: 15, verses: [1, 1] },
            { verse: '1 Chronicles 3:11-12', book: '1 Chronicles', chapter: 3, verses: [11, 12] }
        ]
    },
    // Matthew 1:11
    'matthew_1_11_0': {
        title: 'Deportation to Babylon',
        references: [
            { verse: '2 Kings 24:14-15', book: '2 Kings', chapter: 24, verses: [14, 15] },
            { verse: '2 Chronicles 36:10', book: '2 Chronicles', chapter: 36, verses: [10, 10] }
        ]
    },
    // Matthew 1:12
    'matthew_1_12_0': {
        title: 'Post-Exile Genealogy',
        references: [
            { verse: '1 Chronicles 3:17-19', book: '1 Chronicles', chapter: 3, verses: [17, 19] }
        ]
    },
    'matthew_1_12_1': {
        title: 'Shealtiel',
        references: [
            { verse: 'Luke 3:27', book: 'Luke', chapter: 3, verses: [27, 27] }
        ]
    },
    'matthew_1_12_2': {
        title: 'Zerubbabel',
        references: [
            { verse: 'Ezra 3:2', book: 'Ezra', chapter: 3, verses: [2, 2] }
        ]
    },
    // Matthew 1:16
    'matthew_1_16_0': {
        title: 'Joseph, husband of Mary',
        references: [
            { verse: 'Luke 3:23', book: 'Luke', chapter: 3, verses: [23, 23] }
        ]
    },
    // Matthew 1:17
    'matthew_1_17_0': {
        title: 'The Christ',
        references: [
            { verse: 'Matthew 2:4', book: 'Matthew', chapter: 2, verses: [4, 4] },
            { verse: 'Matthew 11:2', book: 'Matthew', chapter: 11, verses: [2, 2] },
            { verse: 'Matthew 16:16', book: 'Matthew', chapter: 16, verses: [16, 16] },
            { verse: 'John 1:41', book: 'John', chapter: 1, verses: [41, 41] },
            { verse: 'John 4:25', book: 'John', chapter: 4, verses: [25, 25] }
        ]
    },
    // Matthew 1:18
    'matthew_1_18_0': {
        title: 'Birth of Jesus Christ',
        references: [
            { verse: 'Matthew 1:1', book: 'Matthew', chapter: 1, verses: [1, 1] },
            { verse: 'Mark 1:1', book: 'Mark', chapter: 1, verses: [1, 1] },
            { verse: 'John 1:17', book: 'John', chapter: 1, verses: [17, 17] }
        ]
    },
    'matthew_1_18_1': {
        title: 'Jesus Christ',
        references: [
            { verse: 'Matthew 1:16', book: 'Matthew', chapter: 1, verses: [16, 16] },
            { verse: 'John 17:3', book: 'John', chapter: 17, verses: [3, 3] }
        ]
    },
    'matthew_1_18_2': {
        title: 'Mary Betrothed',
        references: [
            { verse: 'Luke 1:27', book: 'Luke', chapter: 1, verses: [27, 27] }
        ]
    },
    'matthew_1_18_3': {
        title: 'From the Holy Spirit',
        references: [
            { verse: 'Luke 1:35', book: 'Luke', chapter: 1, verses: [35, 35] }
        ]
    },
    // Matthew 1:19
    'matthew_1_19_0': {
        title: 'Joseph, A Just Man',
        references: [
            { verse: 'Deuteronomy 24:1', book: 'Deuteronomy', chapter: 24, verses: [1, 4] }
        ]
    },
    'matthew_1_19_1': {
        title: 'Put Her to Shame',
        references: [
            { verse: 'Deuteronomy 24:1', book: 'Deuteronomy', chapter: 24, verses: [1, 1] }
        ]
    },
    // Matthew 1:20
    'matthew_1_20_0': {
        title: 'Angel in a Dream',
        references: [
            { verse: 'Matthew 2:13', book: 'Matthew', chapter: 2, verses: [13, 13] },
            { verse: 'Matthew 2:19', book: 'Matthew', chapter: 2, verses: [19, 19] },
            { verse: 'Matthew 2:22', book: 'Matthew', chapter: 2, verses: [22, 22] }
        ]
    },
    'matthew_1_20_1': {
        title: 'Son of David',
        references: [
            { verse: 'Matthew 1:1', book: 'Matthew', chapter: 1, verses: [1, 1] },
            { verse: 'Luke 1:27', book: 'Luke', chapter: 1, verses: [27, 27] }
        ]
    },
    'matthew_1_20_2': {
        title: 'From the Holy Spirit',
        references: [
            { verse: 'Matthew 1:18', book: 'Matthew', chapter: 1, verses: [18, 18] },
            { verse: 'Luke 1:35', book: 'Luke', chapter: 1, verses: [35, 35] }
        ]
    },
    // Matthew 1:21
    'matthew_1_21_0': {
        title: 'She Will Bear a Son',
        references: [
            { verse: 'Luke 1:31', book: 'Luke', chapter: 1, verses: [31, 31] }
        ]
    },
    'matthew_1_21_1': {
        title: 'Call His Name Jesus',
        references: [
            { verse: 'Luke 1:31', book: 'Luke', chapter: 1, verses: [31, 31] },
            { verse: 'Luke 2:21', book: 'Luke', chapter: 2, verses: [21, 21] }
        ]
    },
    'matthew_1_21_2': {
        title: 'Save His People',
        references: [
            { verse: 'Psalm 130:8', book: 'Psalms', chapter: 130, verses: [8, 8] },
            { verse: 'Acts 13:23', book: 'Acts', chapter: 13, verses: [23, 23] }
        ]
    },
    // Matthew 1:22
    'matthew_1_22_0': {
        title: 'To Fulfill Prophecy',
        references: [
            { verse: 'Matthew 1:22', book: 'Matthew', chapter: 1, verses: [22, 22] },
            { verse: 'Matthew 2:15', book: 'Matthew', chapter: 2, verses: [15, 15] },
            { verse: 'Matthew 2:23', book: 'Matthew', chapter: 2, verses: [23, 23] },
            { verse: 'Matthew 4:14', book: 'Matthew', chapter: 4, verses: [14, 14] }
        ]
    },
    // Matthew 1:23
    'matthew_1_23_0': {
        title: 'Isaiah\'s Prophecy',
        references: [
            { verse: 'Isaiah 7:14', book: 'Isaiah', chapter: 7, verses: [14, 14] }
        ]
    },
    'matthew_1_23_1': {
        title: 'Immanuel',
        references: [
            { verse: 'Isaiah 8:8', book: 'Isaiah', chapter: 8, verses: [8, 10] }
        ]
    },
    'matthew_1_23_2': {
        title: 'God With Us',
        references: [
            { verse: 'Matthew 28:20', book: 'Matthew', chapter: 28, verses: [20, 20] }
        ]
    },
    // Matthew 1:25
    'matthew_1_25_0': {
        title: 'Called His Name Jesus',
        references: [
            { verse: 'Matthew 1:21', book: 'Matthew', chapter: 1, verses: [21, 21] },
            { verse: 'Luke 2:21', book: 'Luke', chapter: 2, verses: [21, 21] }
        ]
    }
};

let currentPopup = null;
let currentViewAllModal = null;
let bibleDataCache = {}; // Cache for both English and Tamil data

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
    
    // Check if clicked element is a link icon (🔗) or has the link-icon class
    if ((target.classList && target.classList.contains('link-icon')) || 
        (target.textContent && target.textContent.trim() === '🔗')) {
        e.preventDefault();
        e.stopPropagation();
        
        // Get the reference key from context
        const verseItem = target.closest('.bible-verse-item');
        if (!verseItem) {
            console.warn('Could not find verse item');
            return;
        }
        
        // Get verse number
        const verseNumber = verseItem.querySelector('.bible-verse-number');
        if (!verseNumber) {
            console.warn('Could not find verse number');
            return;
        }
        
        const verseNum = verseNumber.textContent.replace('.', '').trim();
        
        // Build reference key - use underscores to match CROSS_REFERENCE_MAP format
        const book = currentBibleBook.toLowerCase().replace(/\s+/g, '_');
        const chapter = currentBibleChapter;
        
        console.log(`Clicked reference in ${book} ${chapter}:${verseNum}`);
        
        // Find the position of the clicked icon in the text
        const verseText = target.closest('.bible-verse-text, .bible-verse-english, .bible-verse-esv');
        if (!verseText) {
            console.warn('Could not find verse text container');
            return;
        }
        
        // Get which link was clicked (by counting preceding links)
        const allLinks = verseText.querySelectorAll('.link-icon');
        let linkIndex = 0;
        for (let i = 0; i < allLinks.length; i++) {
            if (allLinks[i] === target || allLinks[i].contains(target)) {
                linkIndex = i;
                break;
            }
        }
        
        console.log(`Link index: ${linkIndex}`);
        
        // Build reference key: book_chapter_verse_index
        let referenceKey = `${book}_${chapter}_${verseNum}_${linkIndex}`;
        
        console.log(`Looking for reference key: ${referenceKey}`);
        console.log(`Available keys:`, Object.keys(CROSS_REFERENCE_MAP));
        
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
    
    // Apply theme variant class if Bible display has a theme
    const bibleDisplaySection = document.getElementById('bibleVerseDisplaySection');
    if (bibleDisplaySection) {
        console.log('Bible section classes:', bibleDisplaySection.className);
        
        // Check most specific variants first
        if (bibleDisplaySection.classList.contains('dark-mode-bible-variant2')) {
            popup.classList.add('dark-mode-popup-variant2');
            console.log('Applied: dark-mode-popup-variant2');
        } else if (bibleDisplaySection.classList.contains('light-mode-bible-variant2')) {
            popup.classList.add('light-mode-popup-variant2');
            console.log('Applied: light-mode-popup-variant2');
        } else if (bibleDisplaySection.classList.contains('dark-mode-bible')) {
            popup.classList.add('dark-mode-popup');
            console.log('Applied: dark-mode-popup');
        } else {
            console.log('Applied: default light mode (no class)');
        }
        // Default (no additional class) is light-mode-bible
    }
    
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
        showViewAllModal(referenceData, verseRef);
    };
    
    const title = document.createElement('h3');
    title.className = 'cross-reference-popup-title';
    
    // Get the verse reference for title
    const verseRef = `${currentBibleBook} ${currentBibleChapter}:${getVerseNumberFromKey(referenceKey)}`;
    title.textContent = verseRef;
    
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
    
    // Load reference content and reposition after loading
    loadCrossReferenceContent(referenceData, content).then(() => {
        // Reposition after content is loaded to ensure proper placement
        setTimeout(() => {
            positionPopup(popup, triggerElement);
        }, 50);
    });
    
    // Store current popup
    currentPopup = { popup, backdrop, triggerElement };
}

/**
 * Position popup near trigger element
 */
function positionPopup(popup, triggerElement) {
    const triggerRect = triggerElement.getBoundingClientRect();
    const popupRect = popup.getBoundingClientRect();
    
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const scrollY = window.scrollY || window.pageYOffset;
    
    // Calculate available space above and below the trigger
    const spaceBelow = viewportHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;
    
    // Estimate popup height (use actual height or minimum expected height)
    // Max height is min(500px, 100vh - 40px)
    const maxPopupHeight = Math.min(500, viewportHeight - 40);
    const popupHeight = popupRect.height > 0 ? Math.min(popupRect.height, maxPopupHeight) : maxPopupHeight;
    
    let top, left;
    
    // Decide whether to show above or below
    // Prefer below if there's enough space (at least 300px), otherwise show above if space is better
    if (spaceBelow >= 300 || (spaceBelow > spaceAbove && spaceBelow >= 150)) {
        // Show below trigger
        top = triggerRect.bottom + scrollY + 10;
        
        // Make sure it doesn't go off bottom of viewport
        if (top + popupHeight > scrollY + viewportHeight - 20) {
            // Reduce the space to fit in viewport
            const maxTop = scrollY + viewportHeight - popupHeight - 20;
            if (maxTop > scrollY + 20) {
                top = maxTop;
            } else {
                // Not enough space, show at top of viewport
                top = scrollY + 20;
            }
        }
    } else {
        // Show above trigger
        top = triggerRect.top + scrollY - popupHeight - 10;
        
        // Make sure it doesn't go off top of viewport
        if (top < scrollY + 20) {
            top = scrollY + 20;
        }
    }
    
    // Position horizontally
    left = triggerRect.left;
    
    // Adjust if popup goes off-screen horizontally
    if (left + popupRect.width > viewportWidth - 20) {
        left = viewportWidth - popupRect.width - 20;
    }
    if (left < 20) {
        left = 20;
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
            item.addEventListener('click', async (e) => {
                e.stopPropagation();
                
                // Toggle expanded state
                const isExpanded = item.classList.contains('expanded');
                
                if (isExpanded) {
                    // Collapse
                    item.classList.remove('expanded');
                    const expandedContent = item.querySelector('.cross-reference-expanded-content');
                    if (expandedContent) {
                        expandedContent.remove();
                    }
                    
                    // Reposition popup after collapse
                    if (currentPopup && currentPopup.popup && currentPopup.triggerElement) {
                        setTimeout(() => positionPopup(currentPopup.popup, currentPopup.triggerElement), 50);
                    }
                } else {
                    // Collapse all other items first
                    items.forEach(otherItem => {
                        otherItem.classList.remove('expanded');
                        const expandedContent = otherItem.querySelector('.cross-reference-expanded-content');
                        if (expandedContent) {
                            expandedContent.remove();
                        }
                    });
                    
                    // Expand this item
                    item.classList.add('expanded');
                    
                    // Get full verse text
                    const book = item.getAttribute('data-book');
                    const chapter = parseInt(item.getAttribute('data-chapter'));
                    const verses = item.getAttribute('data-verses').split(',').map(v => parseInt(v));
                    
                    // Show loading
                    const loadingDiv = document.createElement('div');
                    loadingDiv.className = 'cross-reference-expanded-content';
                    loadingDiv.innerHTML = '<div class="cross-reference-loading">Loading full text...</div>';
                    item.appendChild(loadingDiv);
                    
                    // Load full text
                    try {
                        const fullText = await getFullVerseText(book, chapter, verses);
                        loadingDiv.innerHTML = `<div class="cross-reference-full-text">${fullText}</div>`;
                        
                        // Reposition popup after expansion
                        if (currentPopup && currentPopup.popup && currentPopup.triggerElement) {
                            setTimeout(() => positionPopup(currentPopup.popup, currentPopup.triggerElement), 50);
                        }
                    } catch (error) {
                        loadingDiv.innerHTML = '<div class="cross-reference-error">Failed to load text</div>';
                    }
                }
            });
        });
        
    } catch (error) {
        console.error('Error loading cross-reference content:', error);
        contentElement.innerHTML = '<div class="cross-reference-error">Failed to load references</div>';
    }
}

/**
 * Load a script dynamically and cache the data
 */
function loadScriptForPopup(src, cacheKey) {
    return new Promise((resolve, reject) => {
        // If already cached, just resolve
        if (cacheKey && bibleDataCache[cacheKey]) {
            console.log(`✅ Using cached data for ${cacheKey}`);
            resolve();
            return;
        }
        
        const fileName = src.split('/').pop().replace('.js', '');
        const dataVarName = `${fileName}_data`;
        
        console.log(`[loadScript] Requested: ${src}, cacheKey: ${cacheKey}, varName: ${dataVarName}`);
        
        // Check if script already exists
        const existing = document.querySelector(`script[src="${src}"]`);
        if (existing) {
            console.log(`[loadScript] Script already exists: ${src}`);
            
            // CRITICAL FIX: If the script exists but we haven't cached this cacheKey yet,
            // the window variable might have been overwritten by another language version
            // (e.g., tamil/luke.js exists but window.luke_data has English data)
            // So we MUST remove and reload to get the correct data
            if (cacheKey && !bibleDataCache[cacheKey]) {
                console.log(`[loadScript] Cache key ${cacheKey} not found. Removing existing script and reloading to ensure correct data...`);
                existing.remove();
                // Recursively call to reload
                return loadScriptForPopup(src, cacheKey).then(resolve).catch(reject);
            }
            
            resolve();
            return;
        }
        
        console.log(`[loadScript] Loading new script: ${src}`);
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            console.log(`[loadScript] Script onload fired for ${src}`);
            // CRITICAL: Cache the data IMMEDIATELY and synchronously
            if (cacheKey) {
                console.log(`[loadScript] Looking for window.${dataVarName}...`);
                
                if (window[dataVarName]) {
                    // Clone immediately before anything can overwrite it
                    bibleDataCache[cacheKey] = JSON.parse(JSON.stringify(window[dataVarName]));
                    const chapterCount = Object.keys(bibleDataCache[cacheKey]).length;
                    console.log(`✅ Cached ${cacheKey} successfully with ${chapterCount} chapters`);
                    
                    // Log first verse to verify language
                    const firstVerse = bibleDataCache[cacheKey].chapter_1?.verse_1;
                    if (firstVerse) {
                        console.log(`   First verse preview: ${firstVerse.substring(0, 80)}...`);
                    }
                    resolve();
                } else {
                    console.error(`❌ Variable ${dataVarName} not found after loading ${src}!`);
                    console.log('Available _data variables:', Object.keys(window).filter(k => k.endsWith('_data')));
                    reject(new Error(`Variable ${dataVarName} not found`));
                }
            } else {
                resolve();
            }
        };
        script.onerror = (error) => {
            console.error(`Failed to load script: ${src}`, error);
            reject(error);
        };
        document.head.appendChild(script);
    });
}

/**
 * Get verse text from Bible data
 */
async function getVerseText(book, chapter, verses) {
    try {
        // Get the file name for the book
        const fileName = BOOK_FILE_MAP[book];
        if (!fileName) {
            console.warn(`Book not found in BOOK_FILE_MAP: ${book}`);
            return 'Text not available';
        }
        
        // Determine testament
        const testament = OLD_TESTAMENT_BOOKS.includes(book) ? 'old-testament' : 'new-testament';
        const cacheKey = `english_${fileName}`;
        
        // Check cache first
        let bibleData = bibleDataCache[cacheKey];
        
        // If not in cache, load it
        if (!bibleData) {
            console.log(`Loading ${book} English data for cross-reference...`);
            
            // Load English data (default for cross-references)
            const scriptPath = `scripts/data/bible/english/${testament}/${fileName}.js`;
            
            try {
                await loadScriptForPopup(scriptPath, cacheKey);
                bibleData = bibleDataCache[cacheKey];
                
                if (!bibleData) {
                    console.warn(`Bible data file not found or empty: ${scriptPath}`);
                    return 'Text not available';
                }
            } catch (loadError) {
                console.warn(`Failed to load ${book} from ${scriptPath}:`, loadError);
                return 'Text not available';
            }
        }
        
        const chapterKey = `chapter_${chapter}`;
        const chapterData = bibleData[chapterKey];
        
        if (!chapterData) {
            console.warn(`Chapter ${chapter} not found in ${book}`);
            return 'Text not available';
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
                
                // For multiple verses, add verse numbers
                if (startVerse !== endVerse) {
                    verseTexts.push(`<span class="verse-number">${i}</span> ${cleanText}`);
                } else {
                    verseTexts.push(cleanText);
                }
            }
        }
        
        if (verseTexts.length === 0) {
            console.warn(`No verses found for ${book} ${chapter}:${startVerse}-${endVerse}`);
            return 'Text not available';
        }
        
        // Show each verse separately with line breaks for multiple verses
        return verseTexts.join('<br><br>');
        
    } catch (error) {
        console.error('Error getting verse text:', error);
        return 'Text not available';
    }
}

/**
 * Get full verse text (without truncation) for expansion
 */
async function getFullVerseText(book, chapter, verses) {
    try {
        // Get the file name for the book
        const fileName = BOOK_FILE_MAP[book];
        if (!fileName) {
            console.warn(`Book not found in BOOK_FILE_MAP: ${book}`);
            return 'Text not available';
        }
        
        // Determine testament
        const testament = OLD_TESTAMENT_BOOKS.includes(book) ? 'old-testament' : 'new-testament';
        const cacheKey = `english_${fileName}`;
        
        // Check cache first
        let bibleData = bibleDataCache[cacheKey];
        
        // If not in cache, load it
        if (!bibleData) {
            console.log(`Loading ${book} English data for expansion...`);
            const scriptPath = `scripts/data/bible/english/${testament}/${fileName}.js`;
            
            try {
                await loadScriptForPopup(scriptPath, cacheKey);
                bibleData = bibleDataCache[cacheKey];
                
                if (!bibleData) {
                    console.warn(`Bible data file not found or empty: ${scriptPath}`);
                    return 'Text not available';
                }
            } catch (loadError) {
                console.warn(`Failed to load ${book} from ${scriptPath}:`, loadError);
                return 'Text not available';
            }
        }
        
        const chapterKey = `chapter_${chapter}`;
        const chapterData = bibleData[chapterKey];
        
        if (!chapterData) {
            console.warn(`Chapter ${chapter} not found in ${book}`);
            return 'Text not available';
        }
        
        // Get verse range
        const [startVerse, endVerse] = verses.length === 2 ? verses : [verses[0], verses[0]];
        
        let verseTexts = [];
        for (let i = startVerse; i <= endVerse; i++) {
            const verseKey = `verse_${i}`;
            const verseText = chapterData[verseKey];
            
            if (verseText) {
                // Remove link icons but keep full text
                const cleanText = verseText.replace(/🔗/g, '').trim();
                
                // Add verse number prefix for multi-verse ranges
                if (startVerse !== endVerse) {
                    verseTexts.push(`<div class="verse-item"><sup>${i}</sup> ${cleanText}</div>`);
                } else {
                    verseTexts.push(cleanText);
                }
            }
        }
        
        if (verseTexts.length === 0) {
            console.warn(`No verses found for ${book} ${chapter}:${startVerse}-${endVerse}`);
            return 'Text not available';
        }
        
        // For multiple verses, join with line breaks; single verse stays as is
        return startVerse !== endVerse ? verseTexts.join('') : verseTexts.join(' ');
        
    } catch (error) {
        console.error('Error getting full verse text:', error);
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
 * Show View All modal with all references expanded
 */
async function showViewAllModal(referenceData, verseRef) {
    // Close any existing view-all modal
    closeViewAllModal();
    
    const references = referenceData.references;
    if (!references || references.length === 0) {
        return;
    }
    
    // Create backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'cross-reference-view-all-backdrop';
    backdrop.onclick = closeViewAllModal;
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'cross-reference-view-all-modal';
    modal.id = 'crossReferenceViewAllModal';
    
    // Apply theme variant class
    const bibleDisplaySection = document.getElementById('bibleVerseDisplaySection');
    if (bibleDisplaySection) {
        if (bibleDisplaySection.classList.contains('dark-mode-bible-variant2')) {
            modal.classList.add('dark-mode-popup-variant2');
        } else if (bibleDisplaySection.classList.contains('light-mode-bible-variant2')) {
            modal.classList.add('light-mode-popup-variant2');
        } else if (bibleDisplaySection.classList.contains('dark-mode-bible')) {
            modal.classList.add('dark-mode-popup');
        }
    }
    
    // Create header
    const header = document.createElement('div');
    header.className = 'cross-reference-view-all-header';
    
    const title = document.createElement('h3');
    title.className = 'cross-reference-view-all-title';
    title.textContent = `Cross References - ${verseRef}`;
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'cross-reference-popup-close';
    closeBtn.innerHTML = '×';
    closeBtn.onclick = closeViewAllModal;
    
    header.appendChild(title);
    header.appendChild(closeBtn);
    
    // Create segmented control for language selection
    const segmentedControl = document.createElement('div');
    segmentedControl.className = 'cross-reference-segmented-control';
    
    const segments = [
        { value: 'english', label: 'English' },
        { value: 'tamil', label: 'Tamil' },
        { value: 'both', label: 'Both' }
    ];
    
    segments.forEach(segment => {
        const btn = document.createElement('button');
        btn.className = 'cross-reference-segment-btn';
        btn.textContent = segment.label;
        btn.dataset.value = segment.value;
        
        if (segment.value === 'english') {
            btn.classList.add('active');
        }
        
        btn.onclick = () => {
            // Update active state
            segmentedControl.querySelectorAll('.cross-reference-segment-btn').forEach(b => {
                b.classList.remove('active');
            });
            btn.classList.add('active');
            
            // Update content display
            updateViewAllLanguage(segment.value);
        };
        
        segmentedControl.appendChild(btn);
    });
    
    // Create content container
    const content = document.createElement('div');
    content.className = 'cross-reference-view-all-content';
    content.innerHTML = '<div class="cross-reference-loading">Loading all references...</div>';
    
    modal.appendChild(header);
    modal.appendChild(segmentedControl);
    modal.appendChild(content);
    
    // Add to DOM
    document.body.appendChild(backdrop);
    document.body.appendChild(modal);
    
    // Show with animation
    setTimeout(() => {
        backdrop.classList.add('show');
        modal.classList.add('show');
    }, 10);
    
    // Load all references with full text (default: English)
    await loadViewAllContent(references, content, 'english');
    
    // Store current view-all modal
    currentViewAllModal = { modal, backdrop, references, content };
}

/**
 * Load content for View All modal
 */
async function loadViewAllContent(references, contentElement, language) {
    contentElement.innerHTML = '<div class="cross-reference-loading">Loading...</div>';
    
    let html = '';
    for (const ref of references) {
        try {
            let verseContent = '';
            let hasContent = false;
            
            if (language === 'english' || language === 'both') {
                try {
                    const englishText = await getFullVerseText(ref.book, ref.chapter, ref.verses);
                    if (englishText && englishText !== 'Text not available') {
                        verseContent += `<div class="verse-language-section verse-english">${englishText}</div>`;
                        hasContent = true;
                    }
                } catch (error) {
                    console.error(`Failed to load English for ${ref.book} ${ref.chapter}:${ref.verses}`, error);
                }
            }
            
            if (language === 'tamil' || language === 'both') {
                try {
                    const tamilText = await getTamilVerseText(ref.book, ref.chapter, ref.verses);
                    if (tamilText && tamilText !== 'Text not available') {
                        verseContent += `<div class="verse-language-section verse-tamil">${tamilText}</div>`;
                        hasContent = true;
                    }
                } catch (error) {
                    console.error(`Failed to load Tamil for ${ref.book} ${ref.chapter}:${ref.verses}`, error);
                }
            }
            
            // If no content was loaded, show error message
            if (!hasContent) {
                verseContent = '<div class="cross-reference-error">Text not available for this reference</div>';
            }
            
            html += `
                <div class="cross-reference-view-all-item">
                    <div class="cross-reference-verse-ref">${ref.verse}</div>
                    <div class="cross-reference-full-text">${verseContent}</div>
                </div>
            `;
        } catch (error) {
            console.error('Error loading reference:', ref, error);
            html += `
                <div class="cross-reference-view-all-item">
                    <div class="cross-reference-verse-ref">${ref.verse}</div>
                    <div class="cross-reference-error">Failed to load verse</div>
                </div>
            `;
        }
    }
    
    contentElement.innerHTML = html;
}

/**
 * Update View All modal language
 */
async function updateViewAllLanguage(language) {
    if (currentViewAllModal) {
        const { references, content } = currentViewAllModal;
        await loadViewAllContent(references, content, language);
    }
}

/**
 * Get Tamil verse text
 */
async function getTamilVerseText(book, chapter, verses) {
    try {
        const fileName = BOOK_FILE_MAP[book];
        if (!fileName) {
            console.warn(`Book not found in BOOK_FILE_MAP: ${book}`);
            return 'Text not available';
        }
        
        const testament = OLD_TESTAMENT_BOOKS.includes(book) ? 'old-testament' : 'new-testament';
        const cacheKey = `tamil_${fileName}`;
        
        console.log(`[Tamil] Getting ${book} ${chapter}:${verses}, cache key: ${cacheKey}`);
        
        // Check cache first
        let tamilData = bibleDataCache[cacheKey];
        
        // If not in cache, load it
        if (!tamilData) {
            console.log(`[Tamil] Not in cache, loading Tamil ${book} data from ${testament}...`);
            const scriptPath = `scripts/data/bible/tamil/${testament}/${fileName}.js`;
            
            try {
                await loadScriptForPopup(scriptPath, cacheKey);
                tamilData = bibleDataCache[cacheKey];
                
                console.log(`[Tamil] After load, cache has data:`, !!tamilData);
                
                if (!tamilData) {
                    console.warn(`[Tamil] Data file not found or empty: ${scriptPath}`);
                    console.log(`[Tamil] Cache keys available:`, Object.keys(bibleDataCache));
                    return 'Text not available';
                }
            } catch (loadError) {
                console.warn(`[Tamil] Failed to load ${book} from ${scriptPath}:`, loadError);
                return 'Text not available';
            }
        } else {
            console.log(`[Tamil] Using cached data for ${book}`);
        }
        
        const chapterKey = `chapter_${chapter}`;
        const chapterData = tamilData[chapterKey];
        
        if (!chapterData) {
            console.warn(`[Tamil] Chapter ${chapter} not found in ${book}`);
            console.log(`[Tamil] Available chapters:`, Object.keys(tamilData));
            return 'Text not available';
        }
        
        // Get verse range
        const [startVerse, endVerse] = verses.length === 2 ? verses : [verses[0], verses[0]];
        
        let verseTexts = [];
        for (let i = startVerse; i <= endVerse; i++) {
            const verseKey = `verse_${i}`;
            const verseText = chapterData[verseKey];
            
            if (verseText) {
                const cleanText = verseText.replace(/🔗/g, '').replace(/<b>/g, '').replace(/<\/b>/g, '').trim();
                
                if (startVerse !== endVerse) {
                    verseTexts.push(`<div class="verse-item"><sup>${i}</sup> ${cleanText}</div>`);
                } else {
                    verseTexts.push(cleanText);
                }
            }
        }
        
        if (verseTexts.length === 0) {
            console.warn(`[Tamil] No verses found for ${book} ${chapter}:${startVerse}-${endVerse}`);
            return 'Text not available';
        }
        
        console.log(`[Tamil] Successfully got verse text (${verseTexts[0].substring(0, 50)}...)`);
        // For multiple verses, join with no space; single verse stays as is
        return startVerse !== endVerse ? verseTexts.join('') : verseTexts.join(' ');
        
    } catch (error) {
        console.error('[Tamil] Error getting Tamil verse text:', error);
        return 'Text not available';
    }
}

/**
 * Close View All modal (keeps small popup open)
 */
function closeViewAllModal() {
    if (currentViewAllModal) {
        const { modal, backdrop } = currentViewAllModal;
        
        // Remove show class for animation
        modal.classList.remove('show');
        backdrop.classList.remove('show');
        
        // Remove from DOM after animation
        setTimeout(() => {
            if (modal.parentElement) {
                modal.parentElement.removeChild(modal);
            }
            if (backdrop.parentElement) {
                backdrop.parentElement.removeChild(backdrop);
            }
        }, 200);
        
        currentViewAllModal = null;
    }
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
