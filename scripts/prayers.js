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
                <h1 class="page-title" id="prayerTitle">Prayers for Forgiveness</h1>
                <div class="chapter-navigation-header">
                    <button id="prevPrayerBtn" class="nav-chapter-btn" onclick="navigateToPreviousPrayer()" title="Previous Prayer">
                        <span class="nav-arrow">←</span>
                    </button>
                    <span id="prayerCounter" style="font-size: 14px; color: #6b7280; font-weight: 600; min-width: 60px; text-align: center;">1 / 5</span>
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
}

function loadPrayerContent() {
    const prayer = prayersData[currentPrayerIndex];
    const container = document.getElementById('prayerContentContainer');
    
    if (!container) return;
    
    let contentHTML = `
        <div class="prayer-card">
            <h2 class="prayer-title">${prayer.title}</h2>
    `;
    
    prayer.content.forEach(paragraph => {
        contentHTML += `<p class="prayer-text">${paragraph}</p>`;
    });
    
    contentHTML += `
            <p class="prayer-verse">
                <em>${prayer.verse}</em>
            </p>
            <p class="prayer-closing"> - In Jesus' name, Amen.</p>
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
}

function navigateToPreviousPrayer() {
    // Loop to last prayer when at the beginning
    if (currentPrayerIndex > 0) {
        currentPrayerIndex--;
    } else {
        currentPrayerIndex = prayersData.length - 1;
    }
    loadPrayerContent();
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
['showKings','showProphets','showBooks','showTimeline','showGenealogy','showMaps','showHelp'].forEach(fn => {
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
});
