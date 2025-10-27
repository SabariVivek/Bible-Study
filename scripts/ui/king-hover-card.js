/**
 * King Hover Card Module
 * Displays a hover card with king information when hovering over king names in the timeline
 */

(function() {
    'use strict';

    let hoverCard = null;
    let hoverTimeout = null;
    const HOVER_DELAY = 0; // ms delay before showing card - set to 0 for immediate display
    const HIDE_DELAY = 100; // ms delay before hiding card

    /**
     * Initialize the hover card element
     */
    function initializeHoverCard() {
        if (!hoverCard) {
            hoverCard = document.createElement('div');
            hoverCard.className = 'king-hover-card';
            hoverCard.id = 'kingHoverCard';
            document.body.appendChild(hoverCard);

            // Prevent card from hiding when mouse is over it
            hoverCard.addEventListener('mouseenter', () => {
                clearTimeout(hoverTimeout);
            });

            hoverCard.addEventListener('mouseleave', () => {
                hideHoverCard();
            });
        }
    }

    /**
     * Get king data by name from all kingdoms
     */
    function getKingData(kingName) {
        if (!window.allKingsData) return null;

        // Search in all categories - using correct property names
        const categories = ['united', 'israel', 'judah'];
        for (let category of categories) {
            const kings = window.allKingsData[category];
            if (kings) {
                const king = kings.find(k => k.name.toLowerCase() === kingName.toLowerCase());
                if (king) {
                    return {
                        ...king,
                        kingdom: category === 'united' ? 'United Kingdom' : 
                                category === 'israel' ? 'Northern Kingdom (Israel)' : 
                                'Southern Kingdom (Judah)'
                    };
                }
            }
        }
        return null;
    }

    /**
     * Format the hover card content
     */
    function formatHoverCardContent(kingData) {
        const characterBadge = getCharacterBadgeClass(kingData.character);
        const reignBadge = getReignBadgeInfo(kingData.reign);

        return `
            <div class="king-hover-card-header">
                <div class="king-hover-card-name">${kingData.name}</div>
                <div class="king-hover-card-description">${kingData.description}</div>
                <div class="king-hover-card-badges">
                    <span class="status-badge ${characterBadge}">${kingData.character}</span>
                    <span class="status-badge ${reignBadge.class}">${reignBadge.text}</span>
                </div>
            </div>
            <div class="king-hover-card-body">
                <div class="king-hover-card-row">
                    <span class="king-hover-card-label">Kingdom</span>
                    <span class="king-hover-card-value">${kingData.kingdom}</span>
                </div>
                ${kingData.order ? `
                <div class="king-hover-card-row">
                    <span class="king-hover-card-label">Order</span>
                    <span class="king-hover-card-value">${kingData.order}${getOrdinalSuffix(kingData.order)}</span>
                </div>
                ` : ''}
            </div>
        `;
    }

    /**
     * Get character badge class - matching the exact colors from main app
     */
    function getCharacterBadgeClass(character) {
        const badges = {
            'Righteous': 'status-judah',      // Green
            'Good': 'status-judah',            // Green
            'Wise': 'status-united',           // Yellow/Gold
            'Zealous': 'status-israel',        // Blue
            'Evil': 'status-evil',             // Red
            'Wicked': 'status-wicked',         // Red
            'Disobedient': 'status-evil',      // Red
            'Rebellious': 'status-evil',       // Red
            'Foolish': 'status-evil',          // Red
            'Good/Bad': 'status-israel',       // Blue
            'Evil/Repentant': 'status-israel'  // Blue
        };
        return badges[character] || 'status-badge';
    }

    /**
     * Get reign badge information
     */
    function getReignBadgeInfo(reign) {
        if (!reign || reign === 'N/A') {
            return { class: 'reign-unknown', text: 'N/A' };
        }

        const lowerReign = reign.toLowerCase();

        if (lowerReign.includes('year')) {
            return { class: 'reign-years', text: reign };
        } else if (lowerReign.includes('month')) {
            return { class: 'reign-months', text: reign };
        } else if (lowerReign.includes('day')) {
            return { class: 'reign-days', text: reign };
        }

        return { class: 'reign-unknown', text: reign };
    }

    /**
     * Get ordinal suffix for numbers (1st, 2nd, 3rd, etc.)
     */
    function getOrdinalSuffix(num) {
        const j = num % 10;
        const k = num % 100;
        if (j === 1 && k !== 11) return 'st';
        if (j === 2 && k !== 12) return 'nd';
        if (j === 3 && k !== 13) return 'rd';
        return 'th';
    }

    /**
     * Position the hover card near the target element
     */
    function positionHoverCard(targetElement) {
        const rect = targetElement.getBoundingClientRect();
        const cardRect = hoverCard.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

        const OFFSET = 12;
        
        // Position below the element
        let top = rect.bottom + scrollTop + OFFSET;
        let left = rect.left + scrollLeft;

        // Check if card would go off-screen to the right
        if (left + cardRect.width > window.innerWidth - 20) {
            left = window.innerWidth - cardRect.width - 20;
        }

        // Check if card would go off-screen to the left
        if (left < 20) {
            left = 20;
        }

        // Check if card would go off-screen to the bottom
        if (top + cardRect.height > window.innerHeight + scrollTop - 20) {
            // Position above the element instead
            top = rect.top + scrollTop - cardRect.height - OFFSET;
            
            // If still off-screen at top, adjust
            if (top < scrollTop + 20) {
                top = scrollTop + 20;
            }
        }

        hoverCard.style.top = `${top}px`;
        hoverCard.style.left = `${left}px`;
    }

    /**
     * Show the hover card for a king
     */
    function showHoverCard(kingName, targetElement) {
        clearTimeout(hoverTimeout);

        hoverTimeout = setTimeout(() => {
            const kingData = getKingData(kingName);
            if (!kingData) {
                console.warn('King data not found for:', kingName);
                return;
            }

            initializeHoverCard();

            hoverCard.innerHTML = formatHoverCardContent(kingData);
            
            // Remove any custom background - use CSS default
            hoverCard.style.background = '';
            
            positionHoverCard(targetElement);
            
            // Use requestAnimationFrame to ensure smooth transition
            requestAnimationFrame(() => {
                hoverCard.classList.add('show');
            });
        }, HOVER_DELAY);
    }

    /**
     * Hide the hover card
     */
    function hideHoverCard() {
        clearTimeout(hoverTimeout);
        
        hoverTimeout = setTimeout(() => {
            if (hoverCard) {
                hoverCard.classList.remove('show');
            }
        }, HIDE_DELAY);
    }

    /**
     * Extract king names from text (handles formats like "King Solomon", "Solomon", etc.)
     */
    function extractKingNames(text) {
        const kingNames = [];
        
        // Get all known king names
        const allKingNames = [];
        if (window.allKingsData) {
            ['united', 'israel', 'judah'].forEach(category => {
                if (window.allKingsData[category]) {
                    window.allKingsData[category].forEach(king => {
                        allKingNames.push(king.name);
                    });
                }
            });
        }

        // Check each king name to see if it appears in the text
        // Sort by length descending to match longer names first (e.g., "Jeroboam II" before "Jeroboam")
        allKingNames.sort((a, b) => b.length - a.length);
        
        allKingNames.forEach(name => {
            // Escape special regex characters in the name
            const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`\\b${escapedName}\\b`, 'gi');
            if (regex.test(text)) {
                // Only add if not already in the array
                if (!kingNames.some(k => k.toLowerCase() === name.toLowerCase())) {
                    kingNames.push(name);
                }
            }
        });

        return kingNames;
    }

    /**
     * Wrap king names in notes column with hoverable spans
     */
    function wrapKingNamesInNotes(notesCell) {
        if (!notesCell || !notesCell.textContent) return;

        const text = notesCell.textContent;
        const kingNames = extractKingNames(text);

        if (kingNames.length === 0) return;

        // Create a new HTML content with wrapped king names
        let newHTML = text;
        
        // Sort king names by length descending to avoid partial replacements
        kingNames.sort((a, b) => b.length - a.length);
        
        kingNames.forEach(kingName => {
            // Escape special regex characters
            const escapedName = kingName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`\\b(${escapedName})\\b`, 'g');
            newHTML = newHTML.replace(regex, `<span class="king-name-link" data-king-name="$1">$1</span>`);
        });

        notesCell.innerHTML = newHTML;

        // Add event listeners to the new king name links
        notesCell.querySelectorAll('.king-name-link').forEach(link => {
            link.addEventListener('mouseenter', function() {
                const kingName = this.getAttribute('data-king-name');
                showHoverCard(kingName, this);
            });

            link.addEventListener('mouseleave', function() {
                hideHoverCard();
            });
        });
    }

    /**
     * Initialize hover cards for king timeline table
     * Note: King name links in notes column are disabled
     */
    function initializeKingTimelineHoverCards() {
        const tbody = document.getElementById('king-timeline-tbody');
        if (!tbody) {
            // Don't log error - table might not be in view yet (could be in summary view)
            return;
        }

        console.log('King Hover Card: Timeline table hover cards disabled for notes column');

        // King name wrapping in notes column is disabled
        // If you want to re-enable it, uncomment the code below:
        /*
        const rows = tbody.querySelectorAll('tr');
        let processedCount = 0;
        
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length > 0) {
                const notesCell = cells[cells.length - 1]; // Last cell is notes
                wrapKingNamesInNotes(notesCell);
                processedCount++;
            }
        });
        
        console.log(`King Hover Card: Processed ${processedCount} rows`);
        */
    }

    /**
     * Initialize hover card for the king page title
     */
    function initializeKingPageTitleHoverCard() {
        const kingPageTitle = document.getElementById('kingPageTitle');
        if (!kingPageTitle) return;

        // Extract king name from title (e.g., "King David" -> "David")
        const titleText = kingPageTitle.textContent;
        const kingNameMatch = titleText.match(/King\s+(.+)/i);
        
        if (!kingNameMatch) return;

        const kingName = kingNameMatch[1].trim();
        
        // Check if this king exists in our data
        const kingData = getKingData(kingName);
        if (!kingData) return;

        console.log('King Hover Card: Adding hover to page title for', kingName);

        // Wrap the full "King [Name]" text in a span
        kingPageTitle.innerHTML = `<span class="king-full-name" data-king-name="${kingName}">King ${kingName}</span>`;

        // Add event listeners to the full name span
        const kingFullNameSpan = kingPageTitle.querySelector('.king-full-name');
        if (!kingFullNameSpan) return;

        kingFullNameSpan.addEventListener('mouseenter', function() {
            const name = this.getAttribute('data-king-name');
            showHoverCard(name, this);
        });

        kingFullNameSpan.addEventListener('mouseleave', function() {
            hideHoverCard();
        });

        // Add touch support for mobile/iPad
        let touchStartTime = 0;
        kingFullNameSpan.addEventListener('touchstart', function(e) {
            touchStartTime = Date.now();
        });

        kingFullNameSpan.addEventListener('touchend', function(e) {
            const touchDuration = Date.now() - touchStartTime;
            // If it's a tap (not a scroll), show the card briefly
            if (touchDuration < 200) {
                const name = this.getAttribute('data-king-name');
                showHoverCard(name, this);
                // Auto-hide after 3 seconds on mobile
                setTimeout(() => {
                    hideHoverCard();
                }, 3000);
            }
        });
    }

    /**
     * Get all kings in order for navigation
     */
    function getAllKingsInOrder() {
        // Use the same order as the "All Kings" table
        // This matches the chronological order: United Kingdom → Israel → Judah
        const allKings = [];
        if (window.allKingsData) {
            // Add united kingdom kings first (Saul, David, Solomon)
            if (window.allKingsData.united) {
                allKings.push(...window.allKingsData.united.map(king => ({
                    ...king, 
                    kingdom: 'United Kingdom'
                })));
            }
            // Then add Israel kingdom kings (Northern Kingdom)
            if (window.allKingsData.israel) {
                allKings.push(...window.allKingsData.israel.map(king => ({
                    ...king, 
                    kingdom: 'Israel'
                })));
            }
            // Finally add Judah kingdom kings (Southern Kingdom)
            if (window.allKingsData.judah) {
                allKings.push(...window.allKingsData.judah.map(king => ({
                    ...king, 
                    kingdom: 'Judah'
                })));
            }
        }
        return allKings;
    }

    /**
     * Navigate to next or previous king
     */
    function navigateToKing(direction) {
        const allKings = getAllKingsInOrder();
        
        // Get current index from stored data instead of searching by name
        // This handles duplicate names like "Jehoram (Joram)"
        let currentIndex = -1;
        
        if (window.currentKingData && typeof window.currentKingData.currentIndex !== 'undefined') {
            currentIndex = window.currentKingData.currentIndex;
        } else {
            // Fallback: try to find by name (may fail with duplicate names)
            const kingPageTitle = document.getElementById('kingPageTitle');
            if (kingPageTitle) {
                const currentTitleText = kingPageTitle.textContent;
                const kingNameMatch = currentTitleText.match(/King\s+(.+)/i);
                if (kingNameMatch) {
                    const currentKingName = kingNameMatch[1].trim();
                    currentIndex = allKings.findIndex(k => k.name === currentKingName);
                }
            }
        }
        
        if (currentIndex === -1) {
            return;
        }

        let newIndex;
        if (direction === 'next') {
            newIndex = (currentIndex + 1) % allKings.length; // Loop to start
        } else {
            newIndex = (currentIndex - 1 + allKings.length) % allKings.length; // Loop to end
        }

        const nextKing = allKings[newIndex];
        
        if (nextKing && window.showKingPage) {
            window.showKingPage(nextKing.name, newIndex);
        }
    }

    /**
     * Initialize keyboard navigation
     */
    function initializeKeyboardNavigation() {
        // Remove any existing listener first
        document.removeEventListener('keydown', handleKeyboardNavigation);
        
        // Add keyboard navigation
        document.addEventListener('keydown', handleKeyboardNavigation);
    }

    /**
     * Handle keyboard navigation
     */
    function handleKeyboardNavigation(e) {
        // Only handle arrow keys when on king page
        const kingPageContent = document.getElementById('king-page-content');
        if (!kingPageContent || kingPageContent.classList.contains('hidden')) {
            return;
        }

        // Don't intercept if user is typing in an input
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }

        if (e.key === 'ArrowRight') {
            e.preventDefault();
            navigateToKing('next');
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            navigateToKing('previous');
        }
    }

    /**
     * Observer to watch for changes in the king page container
     */
    function observeKingPageContainer() {
        const kingPageContainer = document.querySelector('.king-page-container');
        if (!kingPageContainer) return;

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    // Small delay to ensure DOM is fully rendered
                    setTimeout(() => {
                        initializeKingTimelineHoverCards();
                    }, 100);
                }
            });
        });

        observer.observe(kingPageContainer, {
            childList: true,
            subtree: true
        });
    }

    /**
     * Wait for allKingsData to be available
     */
    function waitForKingsData(callback, attempts = 0) {
        // Check both window.allKingsData and global allKingsData
        let dataAvailable = false;
        try {
            dataAvailable = (typeof allKingsData !== 'undefined' && allKingsData !== null) || 
                           (typeof window.allKingsData !== 'undefined' && window.allKingsData !== null);
        } catch (e) {
            dataAvailable = false;
        }
        
        if (dataAvailable) {
            // Make sure it's also on window for consistency
            if (typeof allKingsData !== 'undefined' && !window.allKingsData) {
                window.allKingsData = allKingsData;
            }
            console.log('King Hover Card: allKingsData is now available!');
            console.log('King Hover Card: Data structure:', {
                united: window.allKingsData.united?.length || 0,
                israel: window.allKingsData.israel?.length || 0,
                judah: window.allKingsData.judah?.length || 0
            });
            callback();
        } else if (attempts < 100) { // Try for up to 10 seconds (100 * 100ms)
            if (attempts % 10 === 0) {
                console.log(`King Hover Card: Still waiting for allKingsData... (attempt ${attempts + 1}/100)`);
            }
            setTimeout(() => waitForKingsData(callback, attempts + 1), 100);
        } else {
            console.error('King Hover Card: Timeout waiting for allKingsData');
            console.error('King Hover Card: Available globals:', Object.keys(window).filter(k => k.toLowerCase().includes('king')));
        }
    }

    /**
     * Initialize the module
     */
    function init() {
        console.log('King Hover Card Module: Initializing...');
        
        // Wait for kings data to be available before proceeding
        waitForKingsData(() => {
            console.log('King Hover Card: ✓ Ready! Hover over king names to see details.');
            console.log('King Hover Card: ✓ Use ← → arrow keys to navigate between kings');
            
            // Initialize keyboard navigation
            initializeKeyboardNavigation();
            
            // Wrap the existing functions after they're loaded
            setTimeout(() => {
                // Re-initialize when showing king page
                const originalShowKingPage = window.showKingPage;
                if (originalShowKingPage && !originalShowKingPage._wrapped) {
                    window.showKingPage = function(...args) {
                        originalShowKingPage.apply(this, args);
                        setTimeout(() => {
                            initializeKingPageTitleHoverCard();
                            initializeKingTimelineHoverCards();
                        }, 400);
                    };
                    window.showKingPage._wrapped = true;
                }

                // Re-initialize when opening king table view
                const originalOpenKingTableView = window.openKingTableView;
                if (originalOpenKingTableView && !originalOpenKingTableView._wrapped) {
                    window.openKingTableView = function(...args) {
                        originalOpenKingTableView.apply(this, args);
                        setTimeout(() => {
                            initializeKingTimelineHoverCards();
                        }, 400);
                    };
                    window.openKingTableView._wrapped = true;
                }
            }, 500);

            // Initialize observer and initial check
            setTimeout(() => {
                observeKingPageContainer();
                initializeKingPageTitleHoverCard();
                initializeKingTimelineHoverCards();
            }, 100);
        });
    }

    // Expose public methods
    window.KingHoverCard = {
        init: init,
        reinitialize: initializeKingTimelineHoverCards,
        reinitializeTitle: initializeKingPageTitleHoverCard,
        navigateNext: () => navigateToKing('next'),
        navigatePrevious: () => navigateToKing('previous')
    };

    // Auto-initialize
    init();

})();
