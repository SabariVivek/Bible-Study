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

// Generate cards from data
function generateLifeOfJesusCards() {
    const events = getAllLifeOfJesusEvents();
    const cardsGrid = document.getElementById('lifeOfJesusCardsGrid');
    
    if (!cardsGrid) return;
    
    cardsGrid.innerHTML = ''; // Clear existing cards
    
    events.forEach(event => {
        const card = document.createElement('div');
        card.className = 'life-of-jesus-card';
        
        // Add category data attribute for styling
        const categoryClass = getLifeOfJesusCategoryClass(event.category);
        card.setAttribute('data-category', categoryClass);
        
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

// Make functions globally available
window.openPassagePopup = openPassagePopup;
window.closePassagePopup = closePassagePopup;
window.initializeLifeOfChrist = initializeLifeOfChrist;
window.generateLifeOfJesusCards = generateLifeOfJesusCards;
