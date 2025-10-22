/**
 * FILTER - Handle character filtering functionality
 */

/**
 * Open the filter card modal
 */
function openFilterCard() {
    document.getElementById('filterCardOverlay').classList.add('show');
    document.body.classList.add('modal-open');
    // Set current selection
    selectedFilterValue = currentCharacterFilter;
    updateFilterSelection();
    
    // Add click outside listener when filter opens
    setTimeout(() => {
        document.addEventListener('click', handleFilterOutsideClick);
    }, 100);
}

/**
 * Handle clicks outside the filter modal to close it
 */
function handleFilterOutsideClick(event) {
    const filterPopup = document.getElementById('filterCardOverlay');
    if (!filterPopup?.classList.contains('show')) return;
    
    const filterCard = filterPopup.querySelector('.filter-card');
    
    // Close if clicking outside the filter card
    if (!filterCard?.contains(event.target)) {
        closeFilterCard();
        document.removeEventListener('click', handleFilterOutsideClick);
    }
}

/**
 * Close the filter card modal
 */
function closeFilterCard() {
    const filterOverlay = document.getElementById('filterCardOverlay');
    
    // Add closing animation by removing show class
    filterOverlay.classList.remove('show');
    
    // Wait for animation to complete before removing modal-open class
    setTimeout(() => {
        document.body.classList.remove('modal-open');
    }, 300); // Match the CSS transition duration
    
    // Remove the outside click listener when filter closes
    document.removeEventListener('click', handleFilterOutsideClick);
}

/**
 * Update the visual selection state of filter options
 */
function updateFilterSelection() {
    document.querySelectorAll('.filter-option').forEach(option => {
        option.classList.remove('selected');
        if (option.dataset.value === selectedFilterValue) {
            option.classList.add('selected');
        }
    });
}

/**
 * Apply the selected character filter
 */
function applyFilter() {
    currentCharacterFilter = selectedFilterValue;
    currentPage = 1;
    applyFilters();
    closeFilterCard();
}

/**
 * Apply both kingdom and character filters to the data
 */
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
    updatePagination();
}

/**
 * Initialize filter event listeners
 */
function initializeFilter() {
    // Add click handlers for filter options
    document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('.filter-option').forEach(option => {
            option.addEventListener('click', function() {
                selectedFilterValue = this.dataset.value;
                updateFilterSelection();
            });
        });
    });
}

// Add click handlers for filter options (matches original behavior)
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.filter-option').forEach(option => {
        option.addEventListener('click', function() {
            selectedFilterValue = this.dataset.value;
            updateFilterSelection();
        });
    });
});
