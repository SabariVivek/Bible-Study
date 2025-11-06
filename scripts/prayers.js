// Prayer data is loaded from scripts/data/prayers-data.js

let currentPrayerIndex = 0;

// Show Prayers for Forgiveness content when card is clicked
function showPrayersForForgiveness() {
    var cardsWrapper = document.getElementById('dashboard-cards-wrapper');
    if (cardsWrapper) cardsWrapper.classList.add('hidden');
    let prayersSection = document.getElementById('prayers-forgiveness-section');
    if (!prayersSection) {
        prayersSection = document.createElement('div');
        prayersSection.id = 'prayers-forgiveness-section';
        prayersSection.innerHTML = `
            <div class="content-header content-header-centered" style="padding-top: 24px;">
                <button onclick="hidePrayersForForgiveness()" class="back-btn-circle" title="Back to Dashboard">
                    <span class="back-arrow">«</span>
                </button>
                <h1 class="page-title" id="prayerTitle">Prayers in Bible</h1>
                <div class="chapter-navigation-header">
                    <button id="prevPrayerBtn" class="nav-chapter-btn" onclick="navigateToPreviousPrayer()" title="Previous Prayer">
                        <span class="nav-arrow">←</span>
                    </button>
                    <span id="prayerCounter" style="font-size: 14px; font-weight: 600; min-width: 60px; text-align: center;">1 / 5</span>
                    <button id="nextPrayerBtn" class="nav-chapter-btn" onclick="navigateToNextPrayer()" title="Next Prayer">
                        <span class="nav-arrow">→</span>
                    </button>
                </div>
            </div>
            <div class="prayers-content-container" id="prayerContentContainer">
                <!-- Prayer content will be loaded here -->
            </div>
        `;
        document.getElementById('dashboard-content').appendChild(prayersSection);
    }
    currentPrayerIndex = 0;
    loadPrayerContent();
    prayersSection.style.display = 'block';
    prayersSection.classList.remove('hidden');
    // Hide dashboard title
    var dashTitle = document.getElementById('dashboard-title-header');
    if (dashTitle) dashTitle.style.display = 'none';
    
    // Update URL
    if (typeof updateRoute === 'function') {
        updateRoute('prayers');
    }
}

function loadPrayerContent() {
    const prayer = prayersData[currentPrayerIndex];
    const container = document.getElementById('prayerContentContainer');
    
    if (!container) return;
    
    let contentHTML = `
        <div class="prayer-card">
    `;
    
    // Add verse reference badge if exists
    if (prayer.verseRef) {
        contentHTML += `<div class="prayer-verse-ref">${prayer.verseRef}</div>`;
    }
    
    contentHTML += `<h2 class="prayer-title">${prayer.title}</h2>`;
    
    // Add "By" field if exists
    if (prayer.by) {
        contentHTML += `<p class="prayer-by"><strong>By:</strong> ${prayer.by}</p>`;
    }
    
    // Add Background if exists
    if (prayer.Background && Array.isArray(prayer.Background)) {
        contentHTML += `<div class="prayer-background">
            <h3 class="prayer-section-title">Background</h3>`;
        prayer.Background.forEach(paragraph => {
            contentHTML += `<p class="prayer-text">${paragraph}</p>`;
        });
        contentHTML += `</div>`;
    }
    
    // Add Purpose if exists
    if (prayer.purpose) {
        contentHTML += `<div class="prayer-purpose">
            <h3 class="prayer-section-title">Purpose</h3>
            <p class="prayer-text">${prayer.purpose}</p>
        </div>`;
    }
    
    // Add verse array (Tamil verses) at the end
    if (prayer.verse && Array.isArray(prayer.verse)) {
        contentHTML += `<div class="prayer-verse">`;
        prayer.verse.forEach(verseLine => {
            contentHTML += `<p class="prayer-verse-line">${verseLine}</p>`;
        });
        contentHTML += `</div>`;
    }
    
    contentHTML += `
            <p class="prayer-closing">In Jesus' name, Amen.</p>
        </div>
    `;
    
    container.innerHTML = contentHTML;
    
    // Update counter
    const counter = document.getElementById('prayerCounter');
    if (counter) {
        counter.textContent = `${currentPrayerIndex + 1} / ${prayersData.length}`;
    }
    
    // Update navigation buttons
    updatePrayerNavigationButtons();
}

function navigateToNextPrayer() {
    // Loop to first prayer when at the end
    if (currentPrayerIndex < prayersData.length - 1) {
        currentPrayerIndex++;
    } else {
        currentPrayerIndex = 0;
    }
    loadPrayerContent();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function navigateToPreviousPrayer() {
    // Loop to last prayer when at the beginning
    if (currentPrayerIndex > 0) {
        currentPrayerIndex--;
    } else {
        currentPrayerIndex = prayersData.length - 1;
    }
    loadPrayerContent();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updatePrayerNavigationButtons() {
    // No need to disable buttons since we're looping
    // Buttons are always enabled
}

function hidePrayersForForgiveness() {
    const prayersSection = document.getElementById('prayers-forgiveness-section');
    if (prayersSection) prayersSection.remove();
    var cardsWrapper = document.getElementById('dashboard-cards-wrapper');
    if (cardsWrapper) cardsWrapper.classList.remove('hidden');
    // Show dashboard title
    var dashTitle = document.getElementById('dashboard-title-header');
    if (dashTitle) dashTitle.style.display = '';
    
    // Update URL back to dashboard
    if (typeof updateRoute === 'function') {
        updateRoute('dashboard');
    }
}

// Hide prayers section when switching tabs
function hidePrayersSectionOnTabSwitch() {
    const prayersSection = document.getElementById('prayers-forgiveness-section');
    if (prayersSection) {
        prayersSection.remove();
    }
    // Ensure dashboard cards are visible
    var cardsWrapper = document.getElementById('dashboard-cards-wrapper');
    if (cardsWrapper) cardsWrapper.classList.remove('hidden');
    var dashTitle = document.getElementById('dashboard-title-header');
    if (dashTitle) dashTitle.style.display = '';
}

// Patch tab functions to hide prayers section
['showKings','showProphets','showBooks','showTimeline','showGenealogy','showBible','showHelp'].forEach(fn => {
    if (window[fn]) {
        const orig = window[fn];
        window[fn] = function() {
            hidePrayersSectionOnTabSwitch();
            orig();
        };
    }
});

function attachPrayersCardHandler() {
    const prayersCard = document.querySelector('.era-card.prayers-forgiveness');
    if (prayersCard && !prayersCard._prayersHandlerAttached) {
        prayersCard.addEventListener('click', showPrayersForForgiveness);
        prayersCard._prayersHandlerAttached = true;
    }
    // Always ensure prayers section is hidden when attaching handler
    hidePrayersSectionOnTabSwitch();
}

// Keyboard Navigation for Prayers
function initPrayersKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        const prayersSection = document.getElementById('prayers-forgiveness-section');
        
        // Only handle if prayers section is visible
        if (!prayersSection || prayersSection.classList.contains('hidden')) {
            return;
        }
        
        // Left arrow - previous prayer
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            navigateToPreviousPrayer();
        }
        // Right arrow - next prayer
        else if (e.key === 'ArrowRight') {
            e.preventDefault();
            navigateToNextPrayer();
        }
    });
}

// Swipe/Touch Navigation for Prayers
function initPrayersSwipeNavigation() {
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    let wheelTimeout = null;
    let isNavigating = false;
    const minSwipeDistance = 50;
    const maxVerticalDistance = 100;

    function handlePrayerSwipeGesture() {
        const horizontalDistance = touchEndX - touchStartX;
        const verticalDistance = Math.abs(touchEndY - touchStartY);
        
        // Check if it's a horizontal swipe (not vertical scroll)
        if (Math.abs(horizontalDistance) > minSwipeDistance && verticalDistance < maxVerticalDistance) {
            if (horizontalDistance > 0) {
                // Swipe right - go to previous prayer
                handlePrayerSwipeRight();
            } else {
                // Swipe left - go to next prayer
                handlePrayerSwipeLeft();
            }
        }
    }

    function handlePrayerSwipeLeft() {
        if (isNavigating) return;
        
        const prayersSection = document.getElementById('prayers-forgiveness-section');
        if (prayersSection && !prayersSection.classList.contains('hidden')) {
            isNavigating = true;
            navigateToNextPrayer();
            setTimeout(() => {
                isNavigating = false;
            }, 500);
        }
    }

    function handlePrayerSwipeRight() {
        if (isNavigating) return;
        
        const prayersSection = document.getElementById('prayers-forgiveness-section');
        if (prayersSection && !prayersSection.classList.contains('hidden')) {
            isNavigating = true;
            navigateToPreviousPrayer();
            setTimeout(() => {
                isNavigating = false;
            }, 500);
        }
    }

    // Touch events for mobile and tablet
    document.addEventListener('touchstart', function(e) {
        const prayersSection = document.getElementById('prayers-forgiveness-section');
        if (prayersSection && !prayersSection.classList.contains('hidden')) {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }
    }, { passive: true });

    document.addEventListener('touchend', function(e) {
        const prayersSection = document.getElementById('prayers-forgiveness-section');
        if (prayersSection && !prayersSection.classList.contains('hidden')) {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            handlePrayerSwipeGesture();
        }
    }, { passive: true });

    // Trackpad horizontal scroll (two-finger swipe)
    document.addEventListener('wheel', function(e) {
        const prayersSection = document.getElementById('prayers-forgiveness-section');
        
        if (prayersSection && !prayersSection.classList.contains('hidden') && !isNavigating) {
            
            // Detect horizontal scroll (two-finger swipe on trackpad)
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 10) {
                e.preventDefault();
                
                // Debounce to prevent multiple triggers
                clearTimeout(wheelTimeout);
                wheelTimeout = setTimeout(function() {
                    if (e.deltaX > 0 && !isNavigating) {
                        // Scrolling right - go to next prayer
                        handlePrayerSwipeLeft();
                    } else if (e.deltaX < 0 && !isNavigating) {
                        // Scrolling left - go to previous prayer
                        handlePrayerSwipeRight();
                    }
                }, 150);
            }
        }
    }, { passive: false });
}

// Attach handler on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    attachPrayersCardHandler();
    
    // Override showDashboard to ensure prayers are hidden
    const origShowDashboard = window.showDashboard;
    if (origShowDashboard) {
        window.showDashboard = function() {
            hidePrayersSectionOnTabSwitch();
            origShowDashboard();
            // Reattach handler after dashboard is shown
            setTimeout(attachPrayersCardHandler, 0);
        };
    }
    
    // Initialize keyboard navigation and swipe for prayers section
    initPrayersKeyboardNavigation();
    initPrayersSwipeNavigation();
});
