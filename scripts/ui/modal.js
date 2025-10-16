/**
 * MODAL - Handle king details popup and modal functionality
 */

/**
 * Show detailed information about a king in a modal popup
 * @param {Object} king - King object containing all the king's information
 */
function showKingDetails(king) {
    console.log('showKingDetails called for:', king ? king.name : 'null');
    
    if (!king) {
        console.error('No king data provided to showKingDetails');
        return;
    }
    // Create the header with name only, apply character color to name
    const characterColor = getCharacterColor(king.character);
    const nameOnly = `<span style="color: ${characterColor};">${king.name}</span>`;
    document.getElementById('popupKingName').innerHTML = nameOnly;
    
    let content = '';
    
    // Add biographical information first if available
    if (king.biography) {
        content += `
            <div class="king-info-row biography-section">
                <span class="king-info-value biography-text">${king.biography}</span>
            </div>
        `;
    }
    
    // Add biblical references at the bottom
    if (king.biblicalRef) {
        const references = king.biblicalRef.split(';').map(ref => ref.trim());
        const biblicalRefBadges = references.map(ref => 
            `<span class="biblical-ref">${ref}</span>`
        ).join('');
        
        content += `
            <div class="king-info-row biblical-references-section">
                <span class="references-label">References:</span>
                <div class="biblical-refs-container">${biblicalRefBadges}</div>
            </div>
        `;
    }
    
    // Populate side cards with details
    const getOrdinalSuffixLocal = function(number) {
        const j = number % 10;
        const k = number % 100;
        if (j == 1 && k != 11) return "st";
        if (j == 2 && k != 12) return "nd";
        if (j == 3 && k != 13) return "rd";
        return "th";
    };
    
    document.getElementById('orderValue').textContent = `${king.order}${getOrdinalSuffixLocal(king.order)} ruler`;
    document.getElementById('kingdomValue').textContent = king.kingdom;
    document.getElementById('descriptionValue').textContent = king.reign || 'Unknown';
    document.getElementById('characterValue').textContent = king.character;
    
    document.getElementById('popupKingContent').innerHTML = content;
    document.getElementById('kingPopup').classList.add('show');
    document.body.classList.add('modal-open');
    
    // Add click outside listener when modal opens
    setTimeout(() => {
        document.addEventListener('click', handleOutsideClick);
    }, 100);
}

/**
 * Handle clicks outside the modal to close it
 */
function handleOutsideClick(event) {
    const kingPopup = document.getElementById('kingPopup');
    if (!kingPopup?.classList.contains('show')) return;
    
    const kingCard = kingPopup.querySelector('.king-card');
    const sideCards = kingPopup.querySelector('.side-cards-container');
    
    // Close if clicking outside both the main card and side cards
    if (!kingCard?.contains(event.target) && !sideCards?.contains(event.target)) {
        closeKingPopup();
        document.removeEventListener('click', handleOutsideClick);
    }
}

/**
 * Close the king details popup modal
 */
function closeKingPopup() {
    const kingPopup = document.getElementById('kingPopup');
    
    // Add closing animation by removing show class
    kingPopup.classList.remove('show');
    
    // Wait for animation to complete before removing modal-open class
    setTimeout(() => {
        document.body.classList.remove('modal-open');
    }, 300); // Match the CSS transition duration
    
    // Remove the outside click listener when modal closes
    document.removeEventListener('click', handleOutsideClick);
}

/**
 * Get character color for styling
 * @param {string} character - Character type of the king
 * @returns {string} CSS color value
 */
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

/**
 * Initialize modal event listeners
 */
function initializeModal() {
    console.log('Modal initializing...');
    
    // Close popup with ESC key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const kingPopup = document.getElementById('kingPopup');
            const filterPopup = document.getElementById('filterCardOverlay');
            
            if (kingPopup?.classList.contains('show')) {
                closeKingPopup();
            } else if (filterPopup?.classList.contains('show')) {
                closeFilterCard();
            }
        }
    });
    console.log('Modal initialized');
}

// Make functions globally accessible
window.showKingDetails = showKingDetails;
window.closeKingPopup = closeKingPopup;