// Show Prayers for Forgiveness content when card is clicked
function showPrayersForForgiveness() {
    var cardsWrapper = document.getElementById('dashboard-cards-wrapper');
    if (cardsWrapper) cardsWrapper.classList.add('hidden');
    let prayersSection = document.getElementById('prayers-forgiveness-section');
    if (!prayersSection) {
        prayersSection = document.createElement('div');
        prayersSection.id = 'prayers-forgiveness-section';
        prayersSection.innerHTML = `
            <div class="content-header">
                <div style="display: flex; align-items: center;">
                    <button onclick="hidePrayersForForgiveness()" class="back-btn-circle" title="Back to Dashboard">
                        <span class="back-arrow">«</span>
                    </button>
                    <h1 class="page-title" style="margin: 0;">Prayers for Forgiveness</h1>
                </div>
            </div>
            <div class="prayers-content-container">
                <div class="prayer-card">
                    <h2 class="prayer-title">Prayer for Forgiveness</h2>
                    <p class="prayer-text">
                        Heavenly Father, I come before You with a humble heart, acknowledging my sins and shortcomings. 
                        I have fallen short of Your glory and have failed to live according to Your will. 
                        Lord, I ask for Your forgiveness and mercy.
                    </p>
                    <p class="prayer-text">
                        Wash me clean with the precious blood of Jesus Christ. Create in me a clean heart, O God, 
                        and renew a right spirit within me. Help me to turn away from sin and walk in Your ways.
                    </p>
                    <p class="prayer-text">
                        Thank You for Your unfailing love and Your promise of forgiveness to all who repent. 
                        I receive Your grace and commit to living a life that honors You.
                    </p>
                    <p class="prayer-verse">
                        <em>"If we confess our sins, he is faithful and just and will forgive us our sins 
                        and purify us from all unrighteousness." - 1 John 1:9</em>
                    </p>
                    <p class="prayer-closing">In Jesus' name, Amen.</p>
                </div>

                <div class="prayer-card">
                    <h2 class="prayer-title">Prayer for Cleansing</h2>
                    <p class="prayer-text">
                        Lord God, I come to You seeking cleansing from all unrighteousness. 
                        Search my heart and reveal to me any wickedness within. I confess my sins before You 
                        and ask that You wash me whiter than snow.
                    </p>
                    <p class="prayer-text">
                        Remove the guilt and shame that weighs upon my soul. Restore to me the joy of Your salvation 
                        and grant me a willing spirit to sustain me. Let Your Holy Spirit guide me in paths of righteousness.
                    </p>
                    <p class="prayer-verse">
                        <em>"Create in me a pure heart, O God, and renew a steadfast spirit within me." - Psalm 51:10</em>
                    </p>
                    <p class="prayer-closing">In Jesus' name, Amen.</p>
                </div>

                <div class="prayer-card">
                    <h2 class="prayer-title">Prayer for God's Mercy</h2>
                    <p class="prayer-text">
                        Merciful God, I appeal to Your compassion and loving-kindness. 
                        Though I am unworthy, I know Your mercy endures forever. 
                        Forgive me for the times I have grieved Your Holy Spirit and turned away from Your presence.
                    </p>
                    <p class="prayer-text">
                        Have mercy on me according to Your unfailing love. Let Your grace cover my transgressions 
                        and Your blood cleanse me from all sin. Help me to extend the same forgiveness to others 
                        that You have freely given to me.
                    </p>
                    <p class="prayer-verse">
                        <em>"The Lord is compassionate and gracious, slow to anger, abounding in love." - Psalm 103:8</em>
                    </p>
                    <p class="prayer-closing">In Jesus' name, Amen.</p>
                </div>

                <div class="prayer-card">
                    <h2 class="prayer-title">Prayer for Repentance</h2>
                    <p class="prayer-text">
                        Dear Lord, I come before You in true repentance. I acknowledge that I have sinned against You 
                        in thought, word, and deed. Forgive me for my pride, selfishness, and disobedience.
                    </p>
                    <p class="prayer-text">
                        I turn away from my sinful ways and choose to follow You. Give me the strength to resist temptation 
                        and the wisdom to make choices that honor You. Transform my heart and renew my mind.
                    </p>
                    <p class="prayer-verse">
                        <em>"Repent, then, and turn to God, so that your sins may be wiped out, 
                        that times of refreshing may come from the Lord." - Acts 3:19</em>
                    </p>
                    <p class="prayer-closing">In Jesus' name, Amen.</p>
                </div>

                <div class="prayer-card">
                    <h2 class="prayer-title">Prayer for Restoration</h2>
                    <p class="prayer-text">
                        Father God, I have strayed from Your path and need Your restoration. 
                        Heal the brokenness in my life caused by sin. Restore my relationship with You 
                        and renew my passion for Your word and Your presence.
                    </p>
                    <p class="prayer-text">
                        Rebuild the walls that sin has torn down. Mend what has been broken and make me whole again. 
                        Let Your light shine in the dark places of my heart and bring new life where there has been death.
                    </p>
                    <p class="prayer-verse">
                        <em>"Restore to me the joy of your salvation and grant me a willing spirit, to sustain me." - Psalm 51:12</em>
                    </p>
                    <p class="prayer-closing">In Jesus' name, Amen.</p>
                </div>
            </div>
        `;
        document.getElementById('dashboard-content').appendChild(prayersSection);
    }
    prayersSection.style.display = 'block';
    prayersSection.classList.remove('hidden');
    // Hide dashboard title
    var dashTitle = document.getElementById('dashboard-title-header');
    if (dashTitle) dashTitle.style.display = 'none';
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
    if (prayersSection) prayersSection.remove();
}

// Patch tab functions to hide prayers section
const origShowDashboardForPrayers = window.showDashboard;
window.showDashboard = function() {
    // Always hide Prayers section and show dashboard cards when navigating to dashboard
    hidePrayersSectionOnTabSwitch();
    var cardsWrapper = document.getElementById('dashboard-cards-wrapper');
    if (cardsWrapper) cardsWrapper.classList.remove('hidden');
    var dashTitle = document.getElementById('dashboard-title-header');
    if (dashTitle) dashTitle.style.display = '';
    if (origShowDashboardForPrayers) origShowDashboardForPrayers();
};

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
    // Ensure prayers section is hidden on page load
    const prayersSection = document.getElementById('prayers-forgiveness-section');
    if (prayersSection) {
        prayersSection.remove();
    }
}

// Attach handler on DOMContentLoaded and whenever dashboard is shown
document.addEventListener('DOMContentLoaded', attachPrayersCardHandler);
if (window.showDashboard) {
    const origShowDashboard = window.showDashboard;
    window.showDashboard = function() {
        hidePrayersSectionOnTabSwitch();
        if (origShowDashboard) origShowDashboard();
        attachPrayersCardHandler();
    };
}
