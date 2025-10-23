/**
 * LIFE OF CHRIST - Cards and Passage Popup Functionality
 * Handles dynamic card generation and passage display
 */

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
                
                // Add category data attribute for styling
                const categoryClass = getLifeOfJesusCategoryClass(event.category);
                card.setAttribute('data-category', categoryClass);
                
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

// Get category class for styling
function getLifeOfJesusCategoryClass(category) {
    if (!category) return 'default';
    
    const categoryUpper = category.toUpperCase();
    if (categoryUpper.includes('PREPARATION') || categoryUpper.includes('BIRTH')) return 'preparation';
    if (categoryUpper.includes('INTRODUCTION')) return 'introduction';
    if (categoryUpper.includes('GALILEAN')) return 'galilean';
    if (categoryUpper.includes('WITHDRAWAL')) return 'withdrawal';
    if (categoryUpper.includes('JUDEAN')) return 'judean';
    if (categoryUpper.includes('PEREAN')) return 'perean';
    if (categoryUpper.includes('PASSION')) return 'passion';
    if (categoryUpper.includes('RESURRECTION')) return 'resurrection';
    return 'default';
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

    // Check if passage data exists in passages.js
    const data = typeof passages !== 'undefined' ? passages[passageKey] : null;
    
    if (!data) {
        // Show "Data yet to be seeded" for missing passages
        badge.textContent = verseReference;
        content.innerHTML = '<p class="passage-no-data">Data yet to be seeded</p>';
        
        // Add gospel-specific class to badge
        addGospelClassToBadge(badge, verseReference);
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
    
    // Update results info
    if (resultsInfo) {
        if (visibleCount === 0) {
            resultsInfo.textContent = 'No events found matching your search';
            resultsInfo.classList.add('visible', 'no-results');
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
