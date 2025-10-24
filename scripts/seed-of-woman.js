// Handler for "The Seed of the Woman" card
// Data is loaded from scripts/data/seed-of-the-woman.js

let currentSeedIndex = 0;

// Show Seed of the Woman content when card is clicked
function showSeedOfWoman() {
    var cardsWrapper = document.getElementById('dashboard-cards-wrapper');
    if (cardsWrapper) cardsWrapper.classList.add('hidden');
    let seedSection = document.getElementById('seed-of-woman-section');
    if (!seedSection) {
        seedSection = document.createElement('div');
        seedSection.id = 'seed-of-woman-section';
        seedSection.innerHTML = `
            <div class="content-header content-header-centered" style="padding-top: 24px;">
                <button onclick="hideSeedOfWoman()" class="back-btn-circle" title="Back to Dashboard">
                    <span class="back-arrow">«</span>
                </button>
                <h1 class="page-title">The Seed of the Woman</h1>
                <div class="chapter-navigation-header">
                    <button id="prevSeedBtn" class="nav-chapter-btn" onclick="navigateToPreviousSeed()" title="Previous">
                        <span class="nav-arrow">←</span>
                    </button>
                    <span id="seedCounter" style="font-size: 14px; color: #6b7280; font-weight: 600; min-width: 60px; text-align: center;">1 / ${seedOfWomanData.length}</span>
                    <button id="nextSeedBtn" class="nav-chapter-btn" onclick="navigateToNextSeed()" title="Next">
                        <span class="nav-arrow">→</span>
                    </button>
                </div>
            </div>
            <div class="seed-content-container" id="seedContentContainer">
                <!-- Seed content will be loaded here -->
            </div>
        `;
        document.getElementById('dashboard-content').appendChild(seedSection);
    }
    currentSeedIndex = 0;
    loadSeedContent();
    seedSection.style.display = 'block';
    seedSection.classList.remove('hidden');
    // Hide dashboard title
    var dashTitle = document.getElementById('dashboard-title-header');
    if (dashTitle) dashTitle.style.display = 'none';
}

function loadSeedContent() {
    const seedData = seedOfWomanData[currentSeedIndex];
    const container = document.getElementById('seedContentContainer');
    
    if (!container) return;
    
    let contentHTML = `
        <div class="seed-card">
            <div class="seed-section-header">
                ${seedData.section}
            </div>
    `;
    
    // Add image if available
    if (seedData.image) {
        contentHTML += `
            <div class="seed-image-container">
                <img src="${seedData.image}.jpg" 
                     onerror="this.onerror=null; this.src='${seedData.image}.png';" 
                     alt="Seed of Woman Illustration" 
                     class="seed-image"
                     onclick="openImageLightbox(this.src, this.alt)">
            </div>
        `;
    }
    
    contentHTML += `
            <div class="seed-text-content">
                ${seedData.text}
            </div>
        </div>
    `;
    
    container.innerHTML = contentHTML;
    
    // Update counter
    const counter = document.getElementById('seedCounter');
    if (counter) {
        counter.textContent = `${currentSeedIndex + 1} / ${seedOfWomanData.length}`;
    }
    
    // Update navigation buttons
    updateSeedNavigationButtons();
}

function navigateToNextSeed() {
    // Loop to first when at the end
    if (currentSeedIndex < seedOfWomanData.length - 1) {
        currentSeedIndex++;
    } else {
        currentSeedIndex = 0;
    }
    loadSeedContent();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function navigateToPreviousSeed() {
    // Loop to last when at the beginning
    if (currentSeedIndex > 0) {
        currentSeedIndex--;
    } else {
        currentSeedIndex = seedOfWomanData.length - 1;
    }
    loadSeedContent();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateSeedNavigationButtons() {
    // No need to disable buttons since we're looping
    // Buttons are always enabled
}

function hideSeedOfWoman() {
    const seedSection = document.getElementById('seed-of-woman-section');
    if (seedSection) seedSection.remove();
    var cardsWrapper = document.getElementById('dashboard-cards-wrapper');
    if (cardsWrapper) cardsWrapper.classList.remove('hidden');
    // Show dashboard title
    var dashTitle = document.getElementById('dashboard-title-header');
    if (dashTitle) dashTitle.style.display = '';
}

// Hide seed section when switching tabs
function hideSeedSectionOnTabSwitch() {
    const seedSection = document.getElementById('seed-of-woman-section');
    if (seedSection) {
        seedSection.remove();
    }
    // Ensure dashboard cards are visible
    var cardsWrapper = document.getElementById('dashboard-cards-wrapper');
    if (cardsWrapper) cardsWrapper.classList.remove('hidden');
    var dashTitle = document.getElementById('dashboard-title-header');
    if (dashTitle) dashTitle.style.display = '';
}

// Patch tab functions to hide seed section
['showKings','showProphets','showBooks','showTimeline','showGenealogy','showMaps','showHelp'].forEach(fn => {
    if (window[fn]) {
        const orig = window[fn];
        window[fn] = function() {
            hideSeedSectionOnTabSwitch();
            orig();
        };
    }
});

function attachSeedOfWomanCardHandler() {
    const seedOfWomanCard = document.querySelector('.era-card.seed-of-woman');
    if (seedOfWomanCard && !seedOfWomanCard._seedOfWomanHandlerAttached) {
        seedOfWomanCard.addEventListener('click', showSeedOfWoman);
        seedOfWomanCard._seedOfWomanHandlerAttached = true;
    }
    // Always ensure seed section is hidden when attaching handler
    hideSeedSectionOnTabSwitch();
}

// Attach handler on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    attachSeedOfWomanCardHandler();
    
    // Override showDashboard to ensure seed section is hidden
    const origShowDashboard = window.showDashboard;
    if (origShowDashboard) {
        window.showDashboard = function() {
            hideSeedSectionOnTabSwitch();
            origShowDashboard();
            // Reattach handler after dashboard is shown
            setTimeout(attachSeedOfWomanCardHandler, 0);
        };
    }
    
    // Create lightbox container on page load
    createImageLightbox();
    
    // Initialize keyboard navigation and swipe for seed section
    initSeedKeyboardNavigation();
    initSeedSwipeNavigation();
});

// Image Lightbox Functions (Similar to Jira screenshot functionality)
function createImageLightbox() {
    // Check if lightbox already exists
    if (document.getElementById('imageLightbox')) return;
    
    const lightbox = document.createElement('div');
    lightbox.id = 'imageLightbox';
    lightbox.className = 'image-lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-backdrop"></div>
        <div class="lightbox-content">
            <button class="close-btn lightbox-close-btn" onclick="closeImageLightbox()" title="Close (Esc)">
                <span>&times;</span>
            </button>
            <div class="lightbox-image-wrapper">
                <img id="lightboxImage" src="" alt="" class="lightbox-image">
            </div>
            <div class="lightbox-caption" id="lightboxCaption"></div>
        </div>
    `;
    document.body.appendChild(lightbox);
    
    // Add keyboard listener for ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' || e.key === 'Esc') {
            closeImageLightbox();
        }
    });
    
    // Add click listener for clicking outside the image
    lightbox.addEventListener('click', function(e) {
        const lightboxImage = document.getElementById('lightboxImage');
        const closeBtn = lightbox.querySelector('.lightbox-close-btn');
        
        // Close if not clicking on the image or close button
        if (e.target !== lightboxImage && !closeBtn.contains(e.target)) {
            closeImageLightbox();
        }
    });
}

function openImageLightbox(imageSrc, imageAlt) {
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    
    if (!lightbox || !lightboxImage) return;
    
    lightboxImage.src = imageSrc;
    lightboxImage.alt = imageAlt || '';
    lightboxCaption.textContent = imageAlt || '';
    
    lightbox.classList.add('show');
    document.body.classList.add('modal-open');
}

function closeImageLightbox() {
    const lightbox = document.getElementById('imageLightbox');
    if (!lightbox) return;
    
    lightbox.classList.remove('show');
    
    // Wait for animation to complete before removing modal-open class
    setTimeout(() => {
        document.body.classList.remove('modal-open');
    }, 300);
}

// Keyboard Navigation for Seed of Woman
function initSeedKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        const seedSection = document.getElementById('seed-of-woman-section');
        const lightbox = document.getElementById('imageLightbox');
        
        // Only handle if seed section is visible and lightbox is not open
        if (!seedSection || seedSection.classList.contains('hidden') || 
            (lightbox && lightbox.classList.contains('show'))) {
            return;
        }
        
        // Left arrow - previous seed
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            navigateToPreviousSeed();
        }
        // Right arrow - next seed
        else if (e.key === 'ArrowRight') {
            e.preventDefault();
            navigateToNextSeed();
        }
    });
}

// Swipe/Touch Navigation for Seed of Woman
function initSeedSwipeNavigation() {
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    let wheelTimeout = null;
    let isNavigating = false;
    const minSwipeDistance = 50;
    const maxVerticalDistance = 100;

    function handleSeedSwipeGesture() {
        const horizontalDistance = touchEndX - touchStartX;
        const verticalDistance = Math.abs(touchEndY - touchStartY);
        
        // Check if it's a horizontal swipe (not vertical scroll)
        if (Math.abs(horizontalDistance) > minSwipeDistance && verticalDistance < maxVerticalDistance) {
            if (horizontalDistance > 0) {
                // Swipe right - go to previous seed
                handleSeedSwipeRight();
            } else {
                // Swipe left - go to next seed
                handleSeedSwipeLeft();
            }
        }
    }

    function handleSeedSwipeLeft() {
        if (isNavigating) return;
        
        const seedSection = document.getElementById('seed-of-woman-section');
        if (seedSection && !seedSection.classList.contains('hidden')) {
            isNavigating = true;
            navigateToNextSeed();
            setTimeout(() => {
                isNavigating = false;
            }, 500);
        }
    }

    function handleSeedSwipeRight() {
        if (isNavigating) return;
        
        const seedSection = document.getElementById('seed-of-woman-section');
        if (seedSection && !seedSection.classList.contains('hidden')) {
            isNavigating = true;
            navigateToPreviousSeed();
            setTimeout(() => {
                isNavigating = false;
            }, 500);
        }
    }

    // Touch events for mobile and tablet
    document.addEventListener('touchstart', function(e) {
        const seedSection = document.getElementById('seed-of-woman-section');
        if (seedSection && !seedSection.classList.contains('hidden')) {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }
    }, { passive: true });

    document.addEventListener('touchend', function(e) {
        const seedSection = document.getElementById('seed-of-woman-section');
        if (seedSection && !seedSection.classList.contains('hidden')) {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            handleSeedSwipeGesture();
        }
    }, { passive: true });

    // Trackpad horizontal scroll (two-finger swipe)
    document.addEventListener('wheel', function(e) {
        const seedSection = document.getElementById('seed-of-woman-section');
        const lightbox = document.getElementById('imageLightbox');
        
        if (seedSection && !seedSection.classList.contains('hidden') && 
            (!lightbox || !lightbox.classList.contains('show')) && !isNavigating) {
            
            // Detect horizontal scroll (two-finger swipe on trackpad)
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 10) {
                e.preventDefault();
                
                // Debounce to prevent multiple triggers
                clearTimeout(wheelTimeout);
                wheelTimeout = setTimeout(function() {
                    if (e.deltaX > 0 && !isNavigating) {
                        // Scrolling right - go to next seed
                        handleSeedSwipeLeft();
                    } else if (e.deltaX < 0 && !isNavigating) {
                        // Scrolling left - go to previous seed
                        handleSeedSwipeRight();
                    }
                }, 150);
            }
        }
    }, { passive: false });
}
