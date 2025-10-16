/**
 * PAGINATION - Handle table pagination functionality
 */

/**
 * Update pagination controls and buttons
 */
function updatePagination() {
    const totalPages = Math.ceil(currentKingdoms.length / itemsPerPage);
    const paginationControls = document.getElementById('paginationControls');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Update prev/next buttons state
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
    
    // Generate page number buttons
    paginationControls.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.className = `pagination-btn ${i === currentPage ? 'active' : ''}`;
        button.textContent = i.toString().padStart(2, '0');
        button.onclick = () => {
            currentPage = i;
            updateTable();
            updatePagination();
        };
        paginationControls.appendChild(button);
    }
}

/**
 * Change page by direction (previous/next)
 * @param {number} direction - Direction to change page (-1 for previous, 1 for next)
 */
function changePage(direction) {
    const totalPages = Math.ceil(currentKingdoms.length / itemsPerPage);
    const newPage = currentPage + direction;
    
    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        updateTable();
        updatePagination();
    }
}

/**
 * Get ordinal suffix for numbers (1st, 2nd, 3rd, etc.)
 * @param {number} number - The number to get suffix for
 * @returns {string} The ordinal suffix
 */
function getOrdinalSuffix(number) {
    const j = number % 10;
    const k = number % 100;
    if (j == 1 && k != 11) return "st";
    if (j == 2 && k != 12) return "nd";
    if (j == 3 && k != 13) return "rd";
    return "th";
}