/**
 * LIFE OF CHRIST - Cards and Passage Popup Functionality
 * Handles dynamic card generation and passage display
 */

// Track current language for Life of Christ passages
let currentLifeOfChristLanguage = 'english'; // Default to English
let currentVerseReference = ''; // Store current verse reference for translation

// Get all events from all sections
function getAllLifeOfJesusEvents() {
    const allEvents = [];
    
    // Combine all sections from lifeOfJesus data
    if (typeof lifeOfJesus !== 'undefined') {
        if (lifeOfJesus.birthEvents) allEvents.push(...lifeOfJesus.birthEvents);
        if (lifeOfJesus.introductionToMinistry) allEvents.push(...lifeOfJesus.introductionToMinistry);
        if (lifeOfJesus.galileanMinistry) allEvents.push(...lifeOfJesus.galileanMinistry);
        if (lifeOfJesus.seasonOfWithdrawal) allEvents.push(...lifeOfJesus.seasonOfWithdrawal);
        if (lifeOfJesus.judeanMinistry) allEvents.push(...lifeOfJesus.judeanMinistry);
        if (lifeOfJesus.pereanMinistry) allEvents.push(...lifeOfJesus.pereanMinistry);
        if (lifeOfJesus.passionWeek) allEvents.push(...lifeOfJesus.passionWeek);
        if (lifeOfJesus.resurrectionAndAppearances) allEvents.push(...lifeOfJesus.resurrectionAndAppearances);
    }
    
    return allEvents;
}

// Section information for the Life of Jesus
const lifeSections = [
    { key: 'birthEvents', title: 'Preparation of Ministry', subtitle: 'Birth, Childhood and Hidden Years' },
    { key: 'introductionToMinistry', title: 'Introduction to Ministry', subtitle: 'Approximately 6 months' },
    { key: 'galileanMinistry', title: 'Galilean Ministry', subtitle: 'Approximately 12-18 months' },
    { key: 'seasonOfWithdrawal', title: 'Season of withdrawal from Galilee', subtitle: 'Approximately 6 months' },
    { key: 'judeanMinistry', title: 'Jusean Ministry', subtitle: 'Approximately 3 months' },
    { key: 'pereanMinistry', title: 'Perean Ministry', subtitle: 'Approximately 3 months' },
    { key: 'passionWeek', title: 'Passion Week', subtitle: '7 days' },
    { key: 'resurrectionAndAppearances', title: 'Resurrection and Appearances', subtitle: '40 days' }
];

// Generate cards from data with section headers
function generateLifeOfJesusCards() {
    const cardsGrid = document.getElementById('lifeOfJesusCardsGrid');
    
    if (!cardsGrid) return;
    
    cardsGrid.innerHTML = ''; // Clear existing cards
    
    // Generate cards section by section
    lifeSections.forEach(section => {
        if (typeof lifeOfJesus !== 'undefined' && lifeOfJesus[section.key]) {
            const events = lifeOfJesus[section.key];
            
            // Create section header
            const sectionHeader = document.createElement('h2');
            sectionHeader.className = 'chapter-section-heading';
            sectionHeader.innerHTML = `${section.title}<br><small style="font-size: 0.55em; font-weight: 500; opacity: 0.8;">${section.subtitle}</small>`;
            cardsGrid.appendChild(sectionHeader);
            
            // Generate cards for this section
            events.forEach(event => {
                const card = document.createElement('div');
                card.className = 'life-of-jesus-card';
                
                // Store searchable text in data attribute
                const searchableText = `${event.title} ${event.category || ''} ${(event.verses || []).join(' ')}`.toLowerCase();
                card.setAttribute('data-search-text', searchableText);
                
                const cardHeader = document.createElement('div');
                cardHeader.className = 'life-of-jesus-card-header';
                
                const title = document.createElement('h2');
                title.className = 'life-of-jesus-card-title';
                title.textContent = event.title;
                
                cardHeader.appendChild(title);
                card.appendChild(cardHeader);
                
                // Create badge container
                const badgeContainer = document.createElement('div');
                badgeContainer.className = 'verse-badge-container';
                
                // Add badges for each verse
                if (event.verses && Array.isArray(event.verses)) {
                    event.verses.forEach(verse => {
                        const badge = document.createElement('span');
                        badge.className = 'verse-badge';
                        
                        // Add gospel-specific class
                        const verseLower = verse.toLowerCase();
                        if (verseLower.includes('matthew')) {
                            badge.classList.add('matthew');
                        } else if (verseLower.includes('mark')) {
                            badge.classList.add('mark');
                        } else if (verseLower.includes('luke')) {
                            badge.classList.add('luke');
                        } else if (verseLower.includes('john')) {
                            badge.classList.add('john');
                        } else if (verseLower.includes('acts')) {
                            badge.classList.add('acts');
                        } else if (verseLower.includes('corinthians')) {
                            badge.classList.add('corinthians');
                        }
                        
                        badge.textContent = verse;
                        
                        // Make badge clickable to open popup
                        badge.addEventListener('click', function(e) {
                            e.stopPropagation();
                            openPassagePopup(verse);
                        });
                        
                        badgeContainer.appendChild(badge);
                    });
                }
                
                card.appendChild(badgeContainer);
                cardsGrid.appendChild(card);
            });
        }
    });
    
    // Initialize search functionality after cards are generated
    initializeLifeOfChristSearch();
}

// Convert verse reference to passage key
function verseToPassageKey(verseRef) {
    // Normalize the verse reference
    // Remove Tamil characters and extra spaces, convert to lowercase
    let normalized = verseRef
        .toLowerCase()
        .replace(/[^a-z0-9:\-\s]/g, '') // Keep only letters, numbers, colons, hyphens, spaces
        .trim();
    
    // Extract book name and verse numbers
    // Examples: "Luke 1:5-25" -> "luke_1_5_25"
    normalized = normalized
        .replace(/\s+/g, '_')  // Replace spaces with underscores
        .replace(/:/g, '_')     // Replace colons with underscores
        .replace(/-/g, '_');    // Replace hyphens with underscores
    
    return normalized;
}

// Open passage popup window
function openPassagePopup(verseReference) {
    // Convert verse reference to passage key
    const passageKey = verseToPassageKey(verseReference);
    
    // Load passage data
    loadPassageData(passageKey, verseReference);
    
    // Show modal
    const modal = document.getElementById('passagePopup');
    if (modal) {
        modal.classList.add('show');
        document.body.classList.add('modal-open');
        
        // Add click outside listener when modal opens
        setTimeout(() => {
            document.addEventListener('click', handlePassageOutsideClick);
        }, 100);
    }
}

// Load passage data into modal
function loadPassageData(passageKey, verseReference) {
    const badge = document.getElementById('passageBadge');
    const content = document.getElementById('passageContent');
    
    if (!badge || !content) return;

    // Clear previous content immediately to prevent flash - show elegant loader
    content.innerHTML = '<div class="passage-loader"><div class="passage-loader-spinner"></div></div>';
    content.style.opacity = '1';

    // Store verse reference for translation
    currentVerseReference = verseReference;
    
    // Reset language to English when opening new passage
    currentLifeOfChristLanguage = 'english';
    updateTranslateButton();

    // Parse verse reference to check if Bible data needs to be loaded
    const parsed = parseVerseReference(verseReference);
    if (parsed) {
        const dataVarName = getBookDataVariable(parsed.book);
        
        // Always reload English Bible data to ensure we have fresh English content
        if (dataVarName) {
            // Determine testament folder
            const newTestamentBooks = ['matthew', 'mark', 'luke', 'john', 'acts', 'romans', '1 corinthians', '2 corinthians', 
                               'galatians', 'ephesians', 'philippians', 'colossians', '1 thessalonians', '2 thessalonians',
                               '1 timothy', '2 timothy', 'titus', 'philemon', 'hebrews', 'james', '1 peter', '2 peter',
                               '1 john', '2 john', '3 john', 'jude', 'revelation'];
            const testament = newTestamentBooks.includes(parsed.book) ? 'new-testament' : 'old-testament';
            
            // Determine file name from dataVarName
            const fileName = dataVarName.replace('_data', '');
            const englishScriptPath = `scripts/data/bible/english/${testament}/${fileName}.js`;
            
            // Remove any existing script for this book to force reload
            const existingScripts = document.querySelectorAll(`script[src*="${fileName}.js"]`);
            existingScripts.forEach(script => script.remove());
            
            // Update badge with new verse reference
            badge.textContent = verseReference;
            
            // Load English script dynamically
            const script = document.createElement('script');
            script.src = englishScriptPath;
            script.onload = function() {
                // After loading, try to display the verses
                const englishContent = loadEnglishVerses(verseReference);
                
                if (englishContent && englishContent.html) {
                    badge.textContent = verseReference;
                    badge.setAttribute('title', verseReference);
                    addGospelClassToBadge(badge, verseReference);
                    
                    // Display content with smooth fade-in
                    content.innerHTML = englishContent.html;
                    content.scrollTop = 0;
                    setTimeout(() => {
                        content.style.opacity = '1';
                    }, 50);
                } else {
                    // Fallback to passages.js or show message
                    displayFallbackOrMessage(passageKey, verseReference, badge, content);
                }
            };
            script.onerror = function() {
                console.warn(`Failed to load Bible data: ${englishScriptPath}`);
                // Fallback to passages.js or show message
                displayFallbackOrMessage(passageKey, verseReference, badge, content);
            };
            document.head.appendChild(script);
            return;
        }
    }

    // Fallback to passages.js or show message if parsed reference is invalid
    displayFallbackOrMessage(passageKey, verseReference, badge, content);
}

// Helper function to display fallback data or message
function displayFallbackOrMessage(passageKey, verseReference, badge, content) {
    // Fallback: Check if passage data exists in passages.js
    const data = typeof passages !== 'undefined' ? passages[passageKey] : null;
    
    if (!data) {
        // Show "Data yet to be seeded" for missing passages
        badge.textContent = verseReference;
        content.innerHTML = '<p class="passage-no-data">Data yet to be seeded</p>';
        
        // Add gospel-specific class to badge
        addGospelClassToBadge(badge, verseReference);
        
        // Fade in content
        setTimeout(() => {
            content.style.opacity = '1';
        }, 50);
        return;
    }

    // Display the passage data
    badge.textContent = data.badgeLabel || data.reference || verseReference;
    if (data.reference) {
        badge.setAttribute('title', data.reference);
    }

    // Add gospel-specific class to badge
    addGospelClassToBadge(badge, verseReference);

    if (Array.isArray(data.verses)) {
        content.innerHTML = data.verses.join('<br><br>');
    } else if (data.text) {
        content.textContent = data.text;
    } else {
        content.innerHTML = '<p class="passage-no-data">No content available</p>';
    }
    
    // Scroll content to top and fade in
    content.scrollTop = 0;
    setTimeout(() => {
        content.style.opacity = '1';
    }, 50);
}

// Parse complex verse references
// Handles: 
// - "Mark 8:31-9:1" (cross-chapter verse range)
// - "John 18:13-14, 19-24" (multiple ranges same chapter)
// - "Matthew 27:2, 11-14" (single verse + range)
// - "1 Chronicles 23-26" (full chapters range)
// - "1 Chronicles 24" (single full chapter)
// - "1 Chronicles 8:29-33; 9:35-39" (multiple chapter:verse ranges separated by semicolon)
function parseVerseReference(verseRef) {
    const normalized = verseRef.trim();
    
    // Try to match book name with chapter (with or without colon)
    // Pattern 1: "Book Chapter:Verse" or "Book Chapter-Chapter" or "Book Chapter"
    const bookChapterMatch = normalized.match(/^([\w\s]+?)\s+(\d+)([:;\-,\s]|$)/i);
    if (!bookChapterMatch) return null;
    
    const bookName = bookChapterMatch[1].trim().toLowerCase();
    const firstChapter = parseInt(bookChapterMatch[2]);
    const separator = bookChapterMatch[3];
    
    // Parse all chapter:verse patterns and standalone verse ranges
    const ranges = [];
    
    // Get the part after the book name and first chapter
    const afterFirstChapter = normalized.substring(bookChapterMatch[0].length - bookChapterMatch[3].length);
    
    // Case 1: Full chapters range (e.g., "1 Chr 23-26" or "1 Chr 23–26")
    const fullChaptersRangeMatch = afterFirstChapter.match(/^[\-–—](\d+)$/);
    if (fullChaptersRangeMatch) {
        const endChapter = parseInt(fullChaptersRangeMatch[1]);
        ranges.push({
            startChapter: firstChapter,
            startVerse: null, // null means full chapter
            endChapter: endChapter,
            endVerse: null, // null means full chapter
            fullChapters: true
        });
        return { book: bookName, ranges: ranges };
    }
    
    // Case 2: Single full chapter (e.g., "1 Chr 24")
    if (!afterFirstChapter || afterFirstChapter.trim() === '') {
        ranges.push({
            startChapter: firstChapter,
            startVerse: null, // null means full chapter
            endChapter: firstChapter,
            endVerse: null, // null means full chapter
            fullChapters: true
        });
        return { book: bookName, ranges: ranges };
    }
    
    // Case 3: Chapter:verse patterns (original logic with semicolon support)
    // Check if we have a colon after the first chapter number
    if (!separator.includes(':')) {
        // No colon found, might be malformed or edge case
        return null;
    }
    
    const versePart = afterFirstChapter;
    
    // Split by semicolon first (for cases like "8:29-33; 9:35-39")
    const semicolonParts = versePart.split(';').map(p => p.trim());
    
    semicolonParts.forEach(semicolonPart => {
        // Split by comma to get individual ranges within this semicolon part
        const parts = semicolonPart.split(',').map(p => p.trim());
        
        parts.forEach(part => {
            // Check for new chapter:verse pattern (e.g., "9:35-39" after semicolon)
            const newChapterMatch = part.match(/^(\d+):(\d+)(?:[a-z])?(?:[\-–—](\d+))?(?:[a-z])?$/i);
            if (newChapterMatch) {
                const chapter = parseInt(newChapterMatch[1]);
                const startVerse = parseInt(newChapterMatch[2]);
                const endVerse = newChapterMatch[3] ? parseInt(newChapterMatch[3]) : startVerse;
                ranges.push({
                    startChapter: chapter,
                    startVerse: startVerse,
                    endChapter: chapter,
                    endVerse: endVerse,
                    crossChapter: false
                });
                return;
            }
            
            // Check for cross-chapter range: ":31-9:1"
            const crossChapterMatch = part.match(/^:(\d+)(?:[a-z])?[\-–—](\d+):(\d+)(?:[a-z])?$/i);
            if (crossChapterMatch) {
                ranges.push({
                    startChapter: firstChapter,
                    startVerse: parseInt(crossChapterMatch[1]),
                    endChapter: parseInt(crossChapterMatch[2]),
                    endVerse: parseInt(crossChapterMatch[3]),
                    crossChapter: true
                });
                return;
            }
            
            // Check for same-chapter range with explicit chapter: ":13-14"
            const sameChapterMatch = part.match(/^:(\d+)(?:[a-z])?[\-–—](\d+)(?:[a-z])?$/i);
            if (sameChapterMatch) {
                ranges.push({
                    startChapter: firstChapter,
                    startVerse: parseInt(sameChapterMatch[1]),
                    endChapter: firstChapter,
                    endVerse: parseInt(sameChapterMatch[2]),
                    crossChapter: false
                });
                return;
            }
            
            // Check for single verse with colon: ":5"
            const singleVerseWithColon = part.match(/^:(\d+)(?:[a-z])?$/i);
            if (singleVerseWithColon) {
                const verse = parseInt(singleVerseWithColon[1]);
                ranges.push({
                    startChapter: firstChapter,
                    startVerse: verse,
                    endChapter: firstChapter,
                    endVerse: verse,
                    crossChapter: false
                });
                return;
            }
            
            // Check for single verse or range without colon: "19-24" or "2"
            const noColonMatch = part.match(/^(\d+)(?:[a-z])?(?:[\-–—](\d+)(?:[a-z])?)?$/i);
            if (noColonMatch) {
                const startVerse = parseInt(noColonMatch[1]);
                const endVerse = noColonMatch[2] ? parseInt(noColonMatch[2]) : startVerse;
                ranges.push({
                    startChapter: firstChapter,
                    startVerse: startVerse,
                    endChapter: firstChapter,
                    endVerse: endVerse,
                    crossChapter: false
                });
                return;
            }
        });
    });
    
    return {
        book: bookName,
        ranges: ranges
    };
}

// Map English book names to Tamil data variable names// Map English book names to Tamil data variable names
function getBookDataVariable(bookName) {
    const bookMap = {
        // Old Testament
        'genesis': 'genesis_data',
        'exodus': 'exodus_data',
        'leviticus': 'leviticus_data',
        'numbers': 'numbers_data',
        'deuteronomy': 'deuteronomy_data',
        'joshua': 'joshua_data',
        'judges': 'judges_data',
        'ruth': 'ruth_data',
        '1 samuel': 'i_samuel_data',
        '2 samuel': 'ii_samuel_data',
        '1 kings': 'i_kings_data',
        '2 kings': 'ii_kings_data',
        '1 chronicles': 'i_chronicles_data',
        '2 chronicles': 'ii_chronicles_data',
        'ezra': 'ezra_data',
        'nehemiah': 'nehemiah_data',
        'esther': 'esther_data',
        'job': 'job_data',
        'psalms': 'psalms_data',
        'proverbs': 'proverbs_data',
        'ecclesiastes': 'ecclesiastes_data',
        'song of solomon': 'song_of_solomon_data',
        'isaiah': 'isaiah_data',
        'jeremiah': 'jeremiah_data',
        'lamentations': 'lamentations_data',
        'ezekiel': 'ezekiel_data',
        'daniel': 'daniel_data',
        'hosea': 'hosea_data',
        'joel': 'joel_data',
        'amos': 'amos_data',
        'obadiah': 'obadiah_data',
        'jonah': 'jonah_data',
        'micah': 'micah_data',
        'nahum': 'nahum_data',
        'habakkuk': 'habakkuk_data',
        'zephaniah': 'zephaniah_data',
        'haggai': 'haggai_data',
        'zechariah': 'zechariah_data',
        'malachi': 'malachi_data',
        // New Testament
        'matthew': 'matthew_data',
        'mark': 'mark_data',
        'luke': 'luke_data',
        'john': 'john_data',
        'acts': 'acts_data',
        'romans': 'romans_data',
        '1 corinthians': 'i_corinthians_data',
        '2 corinthians': 'ii_corinthians_data',
        'galatians': 'galatians_data',
        'ephesians': 'ephesians_data',
        'philippians': 'philippians_data',
        'colossians': 'colossians_data',
        '1 thessalonians': 'i_thessalonians_data',
        '2 thessalonians': 'ii_thessalonians_data',
        '1 timothy': 'i_timothy_data',
        '2 timothy': 'ii_timothy_data',
        'titus': 'titus_data',
        'philemon': 'philemon_data',
        'hebrews': 'hebrews_data',
        'james': 'james_data',
        '1 peter': 'i_peter_data',
        '2 peter': 'ii_peter_data',
        '1 john': 'i_john_data',
        '2 john': 'ii_john_data',
        '3 john': 'iii_john_data',
        'jude': 'jude_data',
        'revelation': 'revelation_data'
    };
    
    return bookMap[bookName] || null;
}

// Load Tamil verses from the Bible data
function loadTamilVerses(verseReference) {
    const parsed = parseVerseReference(verseReference);
    
    if (!parsed || !parsed.ranges || parsed.ranges.length === 0) return null;
    
    const dataVarName = getBookDataVariable(parsed.book);
    
    if (!dataVarName) return null;
    
    // Check if the data variable exists in global scope
    if (typeof window[dataVarName] === 'undefined') {
        console.log(`Tamil data not loaded for: ${dataVarName}`);
        return null;
    }
    
    const bookData = window[dataVarName];
    let htmlContent = '';
    
    // Check if multiple chapters are involved
    const uniqueChapters = [...new Set(parsed.ranges.flatMap(r => {
        if (r.crossChapter || r.fullChapters) {
            // For cross-chapter ranges or full chapters, include all chapters
            const chapters = [];
            for (let ch = r.startChapter; ch <= r.endChapter; ch++) {
                chapters.push(ch);
            }
            return chapters;
        }
        return [r.startChapter];
    }))];
    
    const hasMultipleChapters = uniqueChapters.length > 1;
    let currentChapter = null;
    
    // Process each range
    parsed.ranges.forEach((range, rangeIndex) => {
        if (range.fullChapters) {
            // Handle full chapters (e.g., "1 Chr 23-26" or "1 Chr 24")
            for (let chapter = range.startChapter; chapter <= range.endChapter; chapter++) {
                const chapterKey = `chapter_${chapter}`;
                
                if (!bookData[chapterKey]) continue;
                
                const chapterData = bookData[chapterKey];
                
                // Add chapter heading
                if (hasMultipleChapters && currentChapter !== chapter) {
                    htmlContent += `<h3 class="chapter-heading">Chapter ${chapter}</h3>`;
                    currentChapter = chapter;
                }
                
                // Get all verses in the chapter
                const verses = Object.keys(chapterData)
                    .filter(k => k.startsWith('verse_'))
                    .map(k => parseInt(k.split('_')[1]))
                    .sort((a, b) => a - b);
                
                // Add all verses
                verses.forEach(verseNum => {
                    const verseKey = `verse_${verseNum}`;
                    if (chapterData[verseKey]) {
                        htmlContent += `<p class="tamil-verse">${verseNum}. ${chapterData[verseKey]}</p>`;
                    }
                });
            }
        } else if (range.crossChapter) {
            // Handle cross-chapter ranges (e.g., Mark 8:31-9:1, John 11:55-12:1)
            for (let chapter = range.startChapter; chapter <= range.endChapter; chapter++) {
                const chapterKey = `chapter_${chapter}`;
                
                if (!bookData[chapterKey]) continue;
                
                const chapterData = bookData[chapterKey];
                
                // Add chapter heading only when chapter changes and there are multiple chapters
                if (hasMultipleChapters && currentChapter !== chapter) {
                    htmlContent += `<h3 class="chapter-heading">Chapter ${chapter}</h3>`;
                    currentChapter = chapter;
                }
                
                // Determine verse range for this chapter
                let startVerse, endVerse;
                
                if (chapter === range.startChapter) {
                    startVerse = range.startVerse;
                    // Get last verse in chapter
                    endVerse = Math.max(...Object.keys(chapterData)
                        .filter(k => k.startsWith('verse_'))
                        .map(k => parseInt(k.split('_')[1])));
                } else if (chapter === range.endChapter) {
                    startVerse = 1;
                    endVerse = range.endVerse;
                } else {
                    // Middle chapters - all verses
                    startVerse = 1;
                    endVerse = Math.max(...Object.keys(chapterData)
                        .filter(k => k.startsWith('verse_'))
                        .map(k => parseInt(k.split('_')[1])));
                }
                
                // Add verses
                for (let v = startVerse; v <= endVerse; v++) {
                    const verseKey = `verse_${v}`;
                    if (chapterData[verseKey]) {
                        htmlContent += `<p class="tamil-verse">${v}. ${chapterData[verseKey]}</p>`;
                    }
                }
            }
        } else {
            // Handle same-chapter ranges and single verses
            const chapterKey = `chapter_${range.startChapter}`;
            
            if (!bookData[chapterKey]) return;
            
            const chapterData = bookData[chapterKey];
            
            // Add chapter heading only when chapter changes and there are multiple chapters
            if (hasMultipleChapters && currentChapter !== range.startChapter) {
                htmlContent += `<h3 class="chapter-heading">Chapter ${range.startChapter}</h3>`;
                currentChapter = range.startChapter;
            }
            
            // Add verses
            for (let v = range.startVerse; v <= range.endVerse; v++) {
                const verseKey = `verse_${v}`;
                if (chapterData[verseKey]) {
                    htmlContent += `<p class="tamil-verse">${v}. ${chapterData[verseKey]}</p>`;
                }
            }
        }
    });
    
    return htmlContent ? { html: htmlContent } : null;
}

// Load English verses from the Bible data
function loadEnglishVerses(verseReference) {
    const parsed = parseVerseReference(verseReference);
    
    if (!parsed || !parsed.ranges || parsed.ranges.length === 0) return null;
    
    const dataVarName = getBookDataVariable(parsed.book);
    
    if (!dataVarName) return null;
    
    // Check if the data variable exists in global scope
    if (typeof window[dataVarName] === 'undefined') {
        console.log(`English data not loaded for: ${dataVarName}`);
        return null;
    }
    
    const bookData = window[dataVarName];
    let htmlContent = '';
    
    // Check if multiple chapters are involved
    const uniqueChapters = [...new Set(parsed.ranges.flatMap(r => {
        if (r.crossChapter || r.fullChapters) {
            // For cross-chapter ranges or full chapters, include all chapters
            const chapters = [];
            for (let ch = r.startChapter; ch <= r.endChapter; ch++) {
                chapters.push(ch);
            }
            return chapters;
        }
        return [r.startChapter];
    }))];
    
    const hasMultipleChapters = uniqueChapters.length > 1;
    let currentChapter = null;
    
    // Process each range
    parsed.ranges.forEach((range, rangeIndex) => {
        if (range.fullChapters) {
            // Handle full chapters (e.g., "1 Chr 23-26" or "1 Chr 24")
            for (let chapter = range.startChapter; chapter <= range.endChapter; chapter++) {
                const chapterKey = `chapter_${chapter}`;
                
                if (!bookData[chapterKey]) continue;
                
                const chapterData = bookData[chapterKey];
                
                // Add chapter heading
                if (hasMultipleChapters && currentChapter !== chapter) {
                    htmlContent += `<h3 class="chapter-heading">Chapter ${chapter}</h3>`;
                    currentChapter = chapter;
                }
                
                // Get all verses in the chapter
                const verses = Object.keys(chapterData)
                    .filter(k => k.startsWith('verse_'))
                    .map(k => parseInt(k.split('_')[1]))
                    .sort((a, b) => a - b);
                
                // Add all verses
                verses.forEach(verseNum => {
                    const verseKey = `verse_${verseNum}`;
                    if (chapterData[verseKey]) {
                        htmlContent += `<p class="bible-verse">${verseNum}. ${chapterData[verseKey]}</p>`;
                    }
                });
            }
        } else if (range.crossChapter) {
            // Handle cross-chapter ranges (e.g., Mark 8:31-9:1, John 11:55-12:1)
            for (let chapter = range.startChapter; chapter <= range.endChapter; chapter++) {
                const chapterKey = `chapter_${chapter}`;
                
                if (!bookData[chapterKey]) continue;
                
                const chapterData = bookData[chapterKey];
                
                // Add chapter heading only when chapter changes and there are multiple chapters
                if (hasMultipleChapters && currentChapter !== chapter) {
                    htmlContent += `<h3 class="chapter-heading">Chapter ${chapter}</h3>`;
                    currentChapter = chapter;
                }
                
                // Determine verse range for this chapter
                let startVerse, endVerse;
                
                if (chapter === range.startChapter) {
                    startVerse = range.startVerse;
                    // Get last verse in chapter
                    endVerse = Math.max(...Object.keys(chapterData)
                        .filter(k => k.startsWith('verse_'))
                        .map(k => parseInt(k.split('_')[1])));
                } else if (chapter === range.endChapter) {
                    startVerse = 1;
                    endVerse = range.endVerse;
                } else {
                    // Middle chapters - all verses
                    startVerse = 1;
                    endVerse = Math.max(...Object.keys(chapterData)
                        .filter(k => k.startsWith('verse_'))
                        .map(k => parseInt(k.split('_')[1])));
                }
                
                // Add verses
                for (let v = startVerse; v <= endVerse; v++) {
                    const verseKey = `verse_${v}`;
                    if (chapterData[verseKey]) {
                        htmlContent += `<p class="bible-verse">${v}. ${chapterData[verseKey]}</p>`;
                    }
                }
            }
        } else {
            // Handle same-chapter ranges and single verses
            const chapterKey = `chapter_${range.startChapter}`;
            
            if (!bookData[chapterKey]) return;
            
            const chapterData = bookData[chapterKey];
            
            // Add chapter heading only when chapter changes and there are multiple chapters
            if (hasMultipleChapters && currentChapter !== range.startChapter) {
                htmlContent += `<h3 class="chapter-heading">Chapter ${range.startChapter}</h3>`;
                currentChapter = range.startChapter;
            }
            
            // Add verses
            for (let v = range.startVerse; v <= range.endVerse; v++) {
                const verseKey = `verse_${v}`;
                if (chapterData[verseKey]) {
                    htmlContent += `<p class="bible-verse">${v}. ${chapterData[verseKey]}</p>`;
                }
            }
        }
    });
    
    return htmlContent ? { html: htmlContent } : null;
}

// Toggle between English and Tamil translations
function toggleTranslation() {
    if (!currentVerseReference) return;
    
    // Get content element
    const content = document.getElementById('passageContent');
    if (!content) return;
    
    // Add fade-out animation
    content.style.opacity = '0';
    content.style.transform = 'translateY(10px)';
    
    // Wait for fade-out animation to complete
    setTimeout(() => {
        // Toggle language
        currentLifeOfChristLanguage = currentLifeOfChristLanguage === 'english' ? 'tamil' : 'english';
        
        // Update button text
        updateTranslateButton();
        
        // Show elegant loader
        content.innerHTML = '<div class="passage-loader"><div class="passage-loader-spinner"></div></div>';
        content.style.opacity = '1';
        content.style.transform = 'translateY(0)';
        
        // Parse verse reference to get book info
        const parsed = parseVerseReference(currentVerseReference);
        if (!parsed) return;
        
        const dataVarName = getBookDataVariable(parsed.book);
        if (!dataVarName) return;
        
        // Determine testament folder
        const testament = ['matthew', 'mark', 'luke', 'john', 'acts', 'romans', '1 corinthians', '2 corinthians', 
                           'galatians', 'ephesians', 'philippians', 'colossians', '1 thessalonians', '2 thessalonians',
                           '1 timothy', '2 timothy', 'titus', 'philemon', 'hebrews', 'james', '1 peter', '2 peter',
                           '1 john', '2 john', '3 john', 'jude', 'revelation'].includes(parsed.book) 
                           ? 'new-testament' : 'old-testament';
        
        // Determine file name from dataVarName
        const fileName = dataVarName.replace('_data', '');
        
        if (currentLifeOfChristLanguage === 'tamil') {
            // Load Tamil script dynamically
            const tamilScriptPath = `scripts/data/bible/tamil/${testament}/${fileName}.js`;
            
            // Remove existing script to force reload
            const existingScript = document.querySelector(`script[src*="${fileName}.js"]`);
            if (existingScript) {
                existingScript.remove();
            }
            
            // Load Tamil script
            const script = document.createElement('script');
            script.src = tamilScriptPath;
            script.onload = function() {
                const tamilContent = loadTamilVerses(currentVerseReference);
                if (tamilContent && tamilContent.html) {
                    content.innerHTML = tamilContent.html;
                    // Scroll content to top
                    content.scrollTop = 0;
                    // Fade in with animation
                    setTimeout(() => {
                        content.style.opacity = '1';
                        content.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    content.innerHTML = '<p class="passage-no-data">Tamil translation not available</p>';
                    content.style.opacity = '1';
                    content.style.transform = 'translateY(0)';
                }
            };
            script.onerror = function() {
                content.innerHTML = '<p class="passage-no-data">Failed to load Tamil translation</p>';
                content.style.opacity = '1';
                content.style.transform = 'translateY(0)';
            };
            document.head.appendChild(script);
        } else {
            // Load English script dynamically
            const englishScriptPath = `scripts/data/bible/english/${testament}/${fileName}.js`;
            
            // Remove existing script to force reload
            const existingScript = document.querySelector(`script[src*="${fileName}.js"]`);
            if (existingScript) {
                existingScript.remove();
            }
            
            // Load English script
            const script = document.createElement('script');
            script.src = englishScriptPath;
            script.onload = function() {
                const englishContent = loadEnglishVerses(currentVerseReference);
                if (englishContent && englishContent.html) {
                    content.innerHTML = englishContent.html;
                    // Scroll content to top
                    content.scrollTop = 0;
                    // Fade in with animation
                    setTimeout(() => {
                        content.style.opacity = '1';
                        content.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    content.innerHTML = '<p class="passage-no-data">English translation not available</p>';
                    content.style.opacity = '1';
                    content.style.transform = 'translateY(0)';
                }
            };
            script.onerror = function() {
                content.innerHTML = '<p class="passage-no-data">Failed to load English translation</p>';
                content.style.opacity = '1';
                content.style.transform = 'translateY(0)';
            };
            document.head.appendChild(script);
        }
    }, 300); // Wait for fade-out animation (300ms)
}

// Update translate button text
function updateTranslateButton() {
    const translateIcon = document.getElementById('translateIconBtn');
    if (translateIcon) {
        translateIcon.title = currentLifeOfChristLanguage === 'english' ? 'Translate to Tamil' : 'Translate to English';
    }
}

// Helper function to add gospel-specific class to badge
function addGospelClassToBadge(badge, verseReference) {
    // Remove any existing gospel classes
    badge.classList.remove('matthew', 'mark', 'luke', 'john', 'acts', 'corinthians');
    
    // Add gospel-specific class
    const verseLower = verseReference.toLowerCase();
    if (verseLower.includes('matthew')) {
        badge.classList.add('matthew');
    } else if (verseLower.includes('mark')) {
        badge.classList.add('mark');
    } else if (verseLower.includes('luke')) {
        badge.classList.add('luke');
    } else if (verseLower.includes('john')) {
        badge.classList.add('john');
    } else if (verseLower.includes('acts')) {
        badge.classList.add('acts');
    } else if (verseLower.includes('corinthians')) {
        badge.classList.add('corinthians');
    }
}

// Close passage popup
function closePassagePopup() {
    const modal = document.getElementById('passagePopup');
    if (modal) {
        modal.classList.remove('show');
        
        setTimeout(() => {
            document.body.classList.remove('modal-open');
        }, 300);
        
        document.removeEventListener('click', handlePassageOutsideClick);
    }
}

// Handle clicks outside the modal to close it
function handlePassageOutsideClick(event) {
    const modal = document.getElementById('passagePopup');
    if (!modal?.classList.contains('show')) return;
    
    const modalCard = modal.querySelector('.passage-modal-card');
    
    // Close if clicking outside the modal card
    if (!modalCard?.contains(event.target)) {
        closePassagePopup();
    }
}

// Initialize cards when Life of Christ page is shown
function initializeLifeOfChrist() {
    generateLifeOfJesusCards();
}

// ============================================
// SMART SEARCH WITH FUSE.JS
// ============================================

// Comprehensive synonyms mapping for better search results
const searchSynonyms = {
    // Birth & Preparation
    'birth': 'born',
    'born': 'birth',
    'nativity': 'birth',
    'christmas': 'birth',
    'baby': 'birth',
    'infant': 'birth',
    'manger': 'birth',
    'bethlehem': 'birth',
    'shepherds': 'angelic announcement',
    'angels': 'angelic',
    'magi': 'wise men',
    'wise men': 'magi',
    'star': 'magi',
    'egypt': 'flight',
    'herod': 'children killed',
    'nazareth': 'returns',
    'temple 12': 'age 12',
    'boy jesus': 'age 12',
    
    // John the Baptist
    'baptist': 'baptism',
    'baptized': 'baptism',
    'baptize': 'baptism',
    'john baptist': 'john the baptist',
    'forerunner': 'john the baptist',
    'prepares way': 'john the baptist',
    'zachariah': 'john birth',
    'elizabeth': 'mary visits',
    
    // Baptism & Temptation
    'jordan': 'baptism',
    'dove': 'baptism',
    'spirit descends': 'baptism',
    'temptation': 'wilderness',
    'tempted': 'wilderness',
    'desert': 'wilderness',
    'satan': 'temptation',
    'devil': 'temptation',
    'forty days': 'wilderness',
    
    // Early Ministry
    'nicodemus': 'born again',
    'born again': 'nicodemus',
    'samaritan woman': 'woman at well',
    'woman well': 'samaritan',
    'living water': 'samaritan woman',
    'water wine': 'cana',
    'wedding': 'cana',
    'cana': 'wedding',
    'marriage': 'wedding',
    'first miracle': 'water wine',
    
    // Disciples & Apostles
    'disciples': 'calling',
    'apostles': 'twelve',
    'twelve': 'apostles',
    'fishermen': 'calling disciples',
    'peter': 'simon',
    'simon': 'peter',
    'andrew': 'disciples',
    'james': 'disciples',
    'john': 'disciples',
    'matthew': 'levi',
    'levi': 'matthew',
    'tax collector': 'matthew',
    'publican': 'matthew',
    
    // Healings
    'heal': 'healing',
    'healed': 'healing',
    'cure': 'healing',
    'cured': 'healing',
    'blind': 'healing blind',
    'blindness': 'healing blind',
    'sight': 'blind',
    'bartimaeus': 'blind',
    'leper': 'leprosy',
    'leprosy': 'leper',
    'cleansing': 'leper',
    'paralytic': 'paralyzed',
    'paralyzed': 'paralytic',
    'crippled': 'paralytic',
    'lame': 'paralytic',
    'deaf': 'healing deaf',
    'mute': 'healing mute',
    'dumb': 'mute',
    'withered hand': 'healing hand',
    'dropsy': 'healing dropsy',
    'fever': 'peter mother',
    'bleeding': 'woman issue blood',
    'hemorrhage': 'woman issue blood',
    
    // Miracles
    'miracle': 'miracles',
    'sign': 'miracle',
    'wonder': 'miracle',
    'storm': 'stilling',
    'calms storm': 'stilling',
    'waves': 'storm',
    'sea': 'galilee',
    'walk water': 'walking water',
    'walks water': 'walking water',
    'feed 5000': 'feeding 5000',
    'feeding 5000': '5000',
    'loaves fishes': 'feeding',
    'feed 4000': 'feeding 4000',
    'feeding 4000': '4000',
    'multiply': 'feeding',
    
    // Raising the Dead
    'raise': 'raising',
    'raised': 'raising',
    'resurrect': 'raising',
    'jairus': 'daughter',
    'daughter': 'jairus',
    'widow son': 'nain',
    'nain': 'widow son',
    'lazarus': 'raising lazarus',
    'bethany': 'lazarus',
    'tomb': 'lazarus',
    'grave': 'lazarus',
    
    // Demons & Exorcism
    'demon': 'possessed',
    'demons': 'possessed',
    'possessed': 'demon',
    'exorcism': 'demon',
    'cast out': 'demon',
    'evil spirit': 'demon',
    'unclean spirit': 'demon',
    'gadarene': 'demoniacs',
    'legion': 'gadarene',
    'swine': 'gadarene',
    'pigs': 'gadarene',
    'beelzebub': 'blasphemy',
    
    // Teaching & Parables
    'teach': 'teaching',
    'taught': 'teaching',
    'sermon': 'sermon mount',
    'sermon mount': 'sermon on the mount',
    'beatitudes': 'sermon mount',
    'blessed': 'beatitudes',
    'parable': 'parables',
    'story': 'parable',
    'sower': 'parable',
    'seed': 'parable sower',
    'good samaritan': 'samaritan parable',
    'prodigal son': 'lost son',
    'lost son': 'prodigal',
    'lost sheep': 'parables lost',
    'lost coin': 'parables lost',
    'good shepherd': 'shepherd',
    'vineyard': 'workers',
    'talents': 'parable talents',
    'minas': 'parable minas',
    'rich man': 'lazarus parable',
    'wedding feast': 'parable feast',
    'ten virgins': 'parable virgins',
    
    // Locations
    'galilee': 'ministry',
    'capernaum': 'galilee',
    'jerusalem': 'judea',
    'judea': 'jerusalem',
    'bethesda': 'pool',
    'siloam': 'pool',
    'caesarea philippi': 'confession',
    
    // Key Events
    'transfiguration': 'transfigured',
    'transfigured': 'transfiguration',
    'mount transfiguration': 'transfiguration',
    'moses elijah': 'transfiguration',
    'glory': 'transfiguration',
    'triumphal entry': 'palm sunday',
    'palm sunday': 'triumphal entry',
    'hosanna': 'triumphal entry',
    'donkey': 'triumphal entry',
    'colt': 'triumphal entry',
    'cleanse temple': 'cleansing temple',
    'money changers': 'cleansing temple',
    'merchants': 'cleansing temple',
    'fig tree': 'cursing',
    
    // Passion Week
    'passion': 'passion week',
    'holy week': 'passion week',
    'last supper': 'supper',
    'passover': 'last supper',
    'bread wine': 'last supper',
    'communion': 'last supper',
    'eucharist': 'last supper',
    'upper room': 'last supper',
    'wash feet': 'feet washing',
    'footwashing': 'wash feet',
    'gethsemane': 'garden',
    'garden': 'gethsemane',
    'prayer': 'pray',
    'prayed': 'prayer',
    'agony': 'gethsemane',
    'betrayal': 'betray',
    'betray': 'betrayal',
    'judas': 'betrayal',
    'thirty pieces': 'judas',
    'kiss': 'betrayal',
    'arrest': 'betrayal',
    
    // Trials
    'trial': 'trials',
    'annas': 'trial',
    'caiaphas': 'trial',
    'sanhedrin': 'trial',
    'pilate': 'trial',
    'herod': 'trial',
    'barabbas': 'pilate',
    'peter denial': 'denies',
    'peter denies': 'denial',
    'rooster': 'peter denial',
    'cock crow': 'peter denial',
    
    // Crucifixion
    'crucify': 'crucifixion',
    'crucified': 'crucifixion',
    'cross': 'crucifixion',
    'golgotha': 'crucifixion',
    'calvary': 'crucifixion',
    'skull': 'golgotha',
    'nailed': 'crucifixion',
    'thorns': 'crown thorns',
    'crown': 'thorns',
    'soldiers': 'mockery',
    'scourge': 'mockery',
    'whip': 'scourge',
    'simon cyrene': 'road golgotha',
    'carry cross': 'simon cyrene',
    'thieves': 'crucifixion',
    'criminals': 'thieves',
    'robbers': 'thieves',
    'paradise': 'thief',
    'forgive them': 'crucifixion',
    'seven words': 'crucifixion',
    'finished': 'death',
    'died': 'death',
    'death': 'died',
    'darkness': 'death',
    'earthquake': 'death',
    'veil torn': 'death',
    'curtain': 'veil',
    'spear': 'side pierced',
    'pierce': 'spear',
    'blood water': 'spear',
    
    // Burial
    'burial': 'buried',
    'buried': 'burial',
    'joseph arimathea': 'burial',
    'nicodemus': 'burial',
    'tomb': 'burial',
    'linen': 'burial',
    'spices': 'burial',
    'guard': 'tomb guard',
    'seal': 'guard',
    
    // Resurrection
    'resurrect': 'resurrection',
    'resurrection': 'risen',
    'risen': 'resurrection',
    'rise': 'resurrection',
    'rose': 'resurrection',
    'easter': 'resurrection',
    'empty tomb': 'resurrection',
    'grave clothes': 'empty tomb',
    'mary magdalene': 'appearance mary',
    'women': 'visit tomb',
    'angels': 'empty tomb',
    'emmaus': 'road emmaus',
    'two disciples': 'emmaus',
    'breaking bread': 'emmaus',
    'thomas': 'doubting',
    'doubting thomas': 'thomas',
    'doubt': 'thomas',
    'wounds': 'thomas',
    'believe': 'thomas',
    'upper room': 'appearance',
    'locked door': 'appearance',
    'peace': 'appearance',
    'breakfast': 'sea galilee',
    'fish': 'sea galilee',
    'net': 'fish',
    'feed sheep': 'peter restore',
    'peter restore': 'feed sheep',
    'love me': 'peter',
    
    // Commission & Ascension
    'commission': 'great commission',
    'great commission': 'commission',
    'go make disciples': 'great commission',
    'baptize': 'great commission',
    'teach': 'great commission',
    'nations': 'great commission',
    'ascend': 'ascension',
    'ascension': 'ascended',
    'ascended': 'ascension',
    'heaven': 'ascension',
    'cloud': 'ascension',
    'mount olives': 'ascension',
    'olivet': 'ascension',
    'taken up': 'ascension',
    
    // General Terms
    'lord': 'jesus',
    'christ': 'jesus',
    'messiah': 'jesus',
    'son god': 'jesus',
    'son man': 'jesus',
    'savior': 'jesus',
    'rabbi': 'teacher',
    'teacher': 'teaching',
    'master': 'teacher',
    'kingdom': 'kingdom god',
    'kingdom heaven': 'kingdom god',
    'repent': 'repentance',
    'repentance': 'repent',
    'sin': 'forgiveness',
    'forgive': 'forgiveness',
    'forgiveness': 'forgive',
    'faith': 'believe',
    'believe': 'faith',
    'trust': 'faith'
};

// Normalize text for searching
function normalizeSearchText(text) {
    return text.toLowerCase().replace(/[^a-z0-9\s:]/g, '');
}

// Extract Bible reference from query (e.g., "Luke 24:50-53" or "Luke 24 : 34")
function extractBibleReference(query) {
    // Handle spaces around colon: "Luke 24 : 34" or "Luke 24:34"
    const match = query.match(/([1-3]?\s?[A-Za-z]+)\s*(\d+)\s*:\s*(\d+)(?:\s*-\s*(\d+))?/);
    if (!match) return null;
    return {
        book: match[1].trim(),
        chapter: parseInt(match[2]),
        startVerse: parseInt(match[3]),
        endVerse: match[4] ? parseInt(match[4]) : parseInt(match[3]),
        fullRef: match[0]
    };
}

// Apply synonyms to search query
function applySynonyms(query) {
    let normalizedQuery = normalizeSearchText(query);
    
    Object.keys(searchSynonyms).forEach(key => {
        if (normalizedQuery.includes(key)) {
            normalizedQuery = normalizedQuery.replace(key, searchSynonyms[key]);
        }
    });
    
    return normalizedQuery;
}

// Initialize Fuse.js instance
let fuseInstance = null;

function initializeFuseSearch() {
    const events = getAllLifeOfJesusEvents();
    
    // Prepare data for Fuse.js
    const searchData = events.map(event => ({
        title: event.title,
        category: event.category || '',
        verses: (event.verses || []).join(' '),
        searchableContent: `${event.title} ${event.category || ''} ${(event.verses || []).join(' ')}`.toLowerCase()
    }));
    
    // Configure Fuse.js for fuzzy search (handles spelling mistakes)
    fuseInstance = new Fuse(searchData, {
        keys: [
            { name: 'title', weight: 0.5 },
            { name: 'category', weight: 0.2 },
            { name: 'verses', weight: 0.2 },
            { name: 'searchableContent', weight: 0.1 }
        ],
        includeScore: true,
        threshold: 0.5,  // Higher threshold = more forgiving with typos (0-1 scale)
        distance: 100,   // How far to search for matches
        ignoreLocation: true,
        minMatchCharLength: 1,  // Allow single character searches
        findAllMatches: true,
        useExtendedSearch: false
    });
}

// Smart search function using Fuse.js
function smartSearch(query) {
    if (!query || !fuseInstance) return [];
    
    const events = getAllLifeOfJesusEvents();
    const queryLower = query.toLowerCase().trim();
    
    // First, check for Bible reference
    const bibleRef = extractBibleReference(query);
    if (bibleRef) {
        return events.filter((event, index) => {
            if (!event.verses || event.verses.length === 0) return false;
            
            const bookLower = bibleRef.book.toLowerCase();
            
            // Check each verse in the event
            return event.verses.some(verse => {
                const verseLower = verse.toLowerCase().replace(/\s+/g, ' ').trim();
                
                // Check if book name matches
                if (!verseLower.includes(bookLower)) return false;
                
                // Extract chapter and verse numbers from the verse string
                // Handles formats like "Luke 24:34" or "Luke 24:34-35"
                const verseMatch = verseLower.match(/(\d+):(\d+)(?:-(\d+))?/);
                if (!verseMatch) return false;
                
                const verseChapter = parseInt(verseMatch[1]);
                const verseStart = parseInt(verseMatch[2]);
                const verseEnd = verseMatch[3] ? parseInt(verseMatch[3]) : verseStart;
                
                // Check if chapter matches and verse is within range
                if (verseChapter !== bibleRef.chapter) return false;
                
                // Check if the searched verse falls within the verse range
                return (bibleRef.startVerse >= verseStart && bibleRef.startVerse <= verseEnd) ||
                       (bibleRef.endVerse >= verseStart && bibleRef.endVerse <= verseEnd) ||
                       (bibleRef.startVerse <= verseStart && bibleRef.endVerse >= verseEnd);
            });
        }).map((event, index) => {
            return { item: event, refIndex: events.indexOf(event), score: 0 };
        });
    }
    
    // Second, try exact matches (case-insensitive)
    const exactMatches = events.filter((event, index) => {
        const title = event.title.toLowerCase();
        const category = (event.category || '').toLowerCase();
        const verses = (event.verses || []).join(' ').toLowerCase();
        const searchableContent = `${title} ${category} ${verses}`;
        
        return title.includes(queryLower) || 
               category.includes(queryLower) || 
               verses.includes(queryLower) ||
               searchableContent.includes(queryLower);
    }).map((event, index) => {
        return { item: event, refIndex: events.indexOf(event), score: 0 };
    });
    
    // If we found exact matches, return them
    if (exactMatches.length > 0) {
        return exactMatches;
    }
    
    // Third, apply synonyms and try exact match again
    const enhancedQuery = applySynonyms(query);
    if (enhancedQuery !== queryLower) {
        const synonymMatches = events.filter((event, index) => {
            const title = event.title.toLowerCase();
            const category = (event.category || '').toLowerCase();
            const verses = (event.verses || []).join(' ').toLowerCase();
            const searchableContent = `${title} ${category} ${verses}`;
            
            return title.includes(enhancedQuery) || 
                   category.includes(enhancedQuery) || 
                   verses.includes(enhancedQuery) ||
                   searchableContent.includes(enhancedQuery);
        }).map((event, index) => {
            return { item: event, refIndex: events.indexOf(event), score: 0 };
        });
        
        if (synonymMatches.length > 0) {
            return synonymMatches;
        }
    }
    
    // Finally, perform fuzzy search with Fuse.js (handles typos)
    const results = fuseInstance.search(enhancedQuery);
    
    // Map results back to original events
    return results.map(result => {
        const index = fuseInstance._docs.indexOf(result.item);
        return {
            item: events[index],
            refIndex: index,
            score: result.score
        };
    });
}

// Initialize search functionality
function initializeLifeOfChristSearch() {
    const searchInput = document.getElementById('lifeOfChristSearch');
    const clearBtn = document.getElementById('searchClearBtn');
    const resultsInfo = document.getElementById('searchResultsInfo');
    
    if (!searchInput) return;
    
    // Initialize Fuse.js
    initializeFuseSearch();
    
    // Handle search input
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.trim();
        filterLifeOfChristCardsWithFuse(searchTerm);
        
        // Show/hide clear button
        if (searchTerm) {
            clearBtn.style.display = 'flex';
        } else {
            clearBtn.style.display = 'none';
        }
    });
    
    // Handle clear button
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            searchInput.value = '';
            clearBtn.style.display = 'none';
            filterLifeOfChristCardsWithFuse('');
            searchInput.focus();
        });
    }
    
    // Handle Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    });
}

// Filter cards using smart search
function filterLifeOfChristCardsWithFuse(searchTerm) {
    const cardsGrid = document.getElementById('lifeOfJesusCardsGrid');
    const cards = document.querySelectorAll('.life-of-jesus-card');
    const sectionHeaders = document.querySelectorAll('.chapter-section-heading');
    const resultsInfo = document.getElementById('searchResultsInfo');
    
    if (!searchTerm) {
        // Show all cards and section headers
        cards.forEach(card => {
            card.classList.remove('hidden-by-search');
        });
        
        sectionHeaders.forEach(header => {
            header.classList.remove('hidden-by-search');
        });
        
        // Remove no results message if it exists
        const noResultsMsg = document.querySelector('.life-of-christ-no-results');
        if (noResultsMsg) {
            noResultsMsg.remove();
        }
        
        if (resultsInfo) {
            resultsInfo.textContent = '';
            resultsInfo.classList.remove('visible', 'no-results');
        }
        return;
    }
    
    // Hide all section headers when filtering
    sectionHeaders.forEach(header => {
        header.classList.add('hidden-by-search');
    });
    
    // Get smart search results
    const searchResults = smartSearch(searchTerm);
    const matchingIndices = new Set(searchResults.map(r => r.refIndex));
    
    let visibleCount = 0;
    
    // Show/hide cards based on search results
    cards.forEach((card, index) => {
        if (matchingIndices.has(index)) {
            card.classList.remove('hidden-by-search');
            card.classList.add('search-result');
            visibleCount++;
            
            // Remove animation class after animation completes
            setTimeout(() => {
                card.classList.remove('search-result');
            }, 300);
        } else {
            card.classList.add('hidden-by-search');
        }
    });
    
    // Remove existing no results message
    const existingNoResults = document.querySelector('.life-of-christ-no-results');
    if (existingNoResults) {
        existingNoResults.remove();
    }
    
    // Update results info or show no results message
    if (resultsInfo) {
        if (visibleCount === 0) {
            // Hide results info text
            resultsInfo.textContent = '';
            resultsInfo.classList.remove('visible', 'no-results');
            
            // Show the styled no results message
            if (cardsGrid) {
                const noResultsDiv = document.createElement('div');
                noResultsDiv.className = 'life-of-christ-no-results';
                noResultsDiv.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <circle cx="12" cy="16" r="0.5" fill="currentColor"/>
                    </svg>
                    <h3>No events found</h3>
                    <p>Try adjusting your search terms</p>
                `;
                cardsGrid.appendChild(noResultsDiv);
            }
        } else {
            const plural = visibleCount === 1 ? 'event' : 'events';
            resultsInfo.textContent = `Found ${visibleCount} ${plural}`;
            resultsInfo.classList.add('visible');
            resultsInfo.classList.remove('no-results');
        }
    }
}

// Make functions globally available
window.openPassagePopup = openPassagePopup;
window.closePassagePopup = closePassagePopup;
window.initializeLifeOfChrist = initializeLifeOfChrist;
window.generateLifeOfJesusCards = generateLifeOfJesusCards;
window.initializeLifeOfChristSearch = initializeLifeOfChristSearch;
window.toggleTranslation = toggleTranslation;
