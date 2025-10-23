// Handler for "The Seed of the Woman" card

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
            </div>
            <div class="seed-content-container" id="seedContentContainer">
                <div class="seed-card">
                    <h2 class="seed-title">Satan's Attacks, God's Preservation</h2>
                    <p class="seed-text">Content will be added here...</p>
                </div>
            </div>
        `;
        document.getElementById('dashboard-content').appendChild(seedSection);
    }
    seedSection.style.display = 'block';
    seedSection.classList.remove('hidden');
    // Hide dashboard title
    var dashTitle = document.getElementById('dashboard-title-header');
    if (dashTitle) dashTitle.style.display = 'none';
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
