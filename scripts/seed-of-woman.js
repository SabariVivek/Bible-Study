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
                     class="seed-image">
            </div>
        `;
    }
    
    contentHTML += `
        <div class="seed-card">
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
});
