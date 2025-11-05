// Show Parables PDF cards when Parables of Jesus card is clicked
function showParablesCards() {
    var cardsWrapper = document.getElementById('dashboard-cards-wrapper');
    if (cardsWrapper) cardsWrapper.classList.add('hidden');
    let parablesSection = document.getElementById('parables-pdf-section');
    if (!parablesSection) {
        parablesSection = document.createElement('div');
        parablesSection.id = 'parables-pdf-section';
        parablesSection.innerHTML = `
            <div class="content-header">
                <div style="display: flex; align-items: center;">
                    <button onclick="hideParablesCards()" class="back-btn-circle" title="Back to Dashboard">
                        <span class="back-arrow">«</span>
                    </button>
                    <h1 class="page-title" style="margin: 0;">Parables of Jesus</h1>
                </div>
            </div>
            <div class="dashboard-cards-container">
                <div class="era-card parables-english" onclick="window.open('resources/pdf/parables-english.pdf','_blank')">
                    <div class="era-card-content">
                        <h3 class="era-title">Parables (English)</h3>
                        <p class="era-subtitle">Download/View PDF</p>
                    </div>
                </div>
                <div class="era-card parables-tamil" onclick="window.open('resources/pdf/parables-tamil.pdf','_blank')">
                    <div class="era-card-content">
                        <h3 class="era-title">Parables (Tamil)</h3>
                        <p class="era-subtitle">Download/View PDF</p>
                    </div>
                </div>
            </div>
        `;
        document.getElementById('dashboard-content').appendChild(parablesSection);
    }
    parablesSection.style.display = 'block';
    parablesSection.classList.remove('hidden');
    // Hide dashboard title
    var dashTitle = document.getElementById('dashboard-title-header');
    if (dashTitle) dashTitle.style.display = 'none';
    
    // Update URL
    if (typeof updateRoute === 'function') {
        updateRoute('parables');
    }
}

function hideParablesCards() {
    const parablesSection = document.getElementById('parables-pdf-section');
    if (parablesSection) parablesSection.remove();
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
// Hide parables section when switching tabs
function hideParablesSectionOnTabSwitch() {
    const parablesSection = document.getElementById('parables-pdf-section');
    if (parablesSection) parablesSection.remove();
}

// Patch tab functions to hide parables section
const origShowDashboard = window.showDashboard;
window.showDashboard = function() {
    // Always hide Parables section and show dashboard cards when navigating to dashboard
    hideParablesSectionOnTabSwitch();
    var cardsWrapper = document.getElementById('dashboard-cards-wrapper');
    if (cardsWrapper) cardsWrapper.classList.remove('hidden');
    var dashTitle = document.getElementById('dashboard-title-header');
    if (dashTitle) dashTitle.style.display = '';
    origShowDashboard();
};
['showKings','showProphets','showBooks','showTimeline','showGenealogy','showBible','showHelp'].forEach(fn => {
    if (window[fn]) {
        const orig = window[fn];
        window[fn] = function() {
            hideParablesSectionOnTabSwitch();
            orig();
        };
    }
});

function attachParablesCardHandler() {
    const parablesCard = document.querySelector('.era-card.parables-jesus');
    if (parablesCard && !parablesCard._parablesHandlerAttached) {
        parablesCard.addEventListener('click', showParablesCards);
        parablesCard._parablesHandlerAttached = true;
    }
}

// Attach handler on DOMContentLoaded and whenever dashboard is shown
document.addEventListener('DOMContentLoaded', attachParablesCardHandler);
if (window.showDashboard) {
    const origShowDashboard = window.showDashboard;
    window.showDashboard = function() {
        hideParablesSectionOnTabSwitch();
        origShowDashboard();
        attachParablesCardHandler();
    };
}
