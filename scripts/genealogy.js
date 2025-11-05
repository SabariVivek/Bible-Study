// Show Genealogy PDF section when Genealogy card is clicked (like Parables)
function showGenealogySection() {
    var cardsWrapper = document.getElementById('dashboard-cards-wrapper');
    if (cardsWrapper) cardsWrapper.classList.add('hidden');
    let genealogySection = document.getElementById('genealogy-pdf-section');
    if (!genealogySection) {
        genealogySection = document.createElement('div');
        genealogySection.id = 'genealogy-pdf-section';
        genealogySection.innerHTML = `
            <div class="content-header">
                <h1 class="page-title">Genealogy: Adam to Jesus Christ</h1>
                <button onclick="hideGenealogySection()" class="filter-btn" style="margin-left:auto; min-width:90px;">⟵ Back</button>
            </div>
            <div class="dashboard-cards-container">
                <div class="era-card genealogy-pdf" onclick="window.open('resources/pdf/adam-to-jesuschrist.pdf','_blank')">
                    <div class="era-card-content">
                        <h3 class="era-title">Genealogy PDF</h3>
                        <p class="era-subtitle">Download/View PDF</p>
                    </div>
                </div>
            </div>
        `;
        document.getElementById('dashboard-content').appendChild(genealogySection);
    }
    genealogySection.style.display = 'block';
    genealogySection.classList.remove('hidden');
    // Hide dashboard title
    var dashTitle = document.getElementById('dashboard-title-header');
    if (dashTitle) dashTitle.style.display = 'none';
    
    // Update URL
    if (typeof updateRoute === 'function') {
        updateRoute('genealogy-view');
    }
}

function hideGenealogySection() {
    const genealogySection = document.getElementById('genealogy-pdf-section');
    if (genealogySection) genealogySection.remove();
    var cardsWrapper = document.getElementById('dashboard-cards-wrapper');
    if (cardsWrapper) cardsWrapper.classList.remove('hidden');
    var dashTitle = document.getElementById('dashboard-title-header');
    if (dashTitle) dashTitle.style.display = '';
    
    // Update URL back to dashboard
    if (typeof updateRoute === 'function') {
        updateRoute('dashboard');
    }
}

// Hide genealogy section when switching tabs
function hideGenealogySectionOnTabSwitch() {
    const genealogySection = document.getElementById('genealogy-pdf-section');
    if (genealogySection) genealogySection.remove();
}

// Patch tab functions to hide genealogy section
if (window.showDashboard) {
    const origShowDashboard = window.showDashboard;
    window.showDashboard = function() {
        hideGenealogySectionOnTabSwitch();
        origShowDashboard();
        attachGenealogyCardHandler();
    };
}
['showKings','showProphets','showBooks','showTimeline','showGenealogy','showBible','showHelp'].forEach(fn => {
    if (window[fn]) {
        const orig = window[fn];
        window[fn] = function() {
            hideGenealogySectionOnTabSwitch();
            orig();
        };
    }
});

function attachGenealogyCardHandler() {
    const genealogyCard = document.querySelector('.era-card.genealogy-card');
    if (genealogyCard && !genealogyCard._genealogyHandlerAttached) {
        genealogyCard.addEventListener('click', function() {
            window.open('resources/pdf/adam-to-jesuschrist.pdf', '_blank');
        });
        genealogyCard._genealogyHandlerAttached = true;
        const title = genealogyCard.querySelector('.era-title');
        if (title) title.textContent = 'Adam to Jesus Christ';
        const subtitle = genealogyCard.querySelector('.era-subtitle');
        if (subtitle) subtitle.textContent = 'Family Lineage';
    }
}

document.addEventListener('DOMContentLoaded', attachGenealogyCardHandler);
