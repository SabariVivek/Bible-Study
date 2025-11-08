// Bible Settings Menu Functionality

document.addEventListener('DOMContentLoaded', function() {
    initBibleSettingsMenu();
    // Apply saved text settings when page loads
    applyBibleTextSettings();
});

// Also apply settings when Bible section becomes visible
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
            const bibleSection = document.getElementById('bibleVerseDisplaySection');
            if (bibleSection && bibleSection.style.display !== 'none') {
                applyBibleTextSettings();
            }
        }
    });
});

// Start observing the Bible section if it exists
setTimeout(() => {
    const bibleSection = document.getElementById('bibleVerseDisplaySection');
    if (bibleSection) {
        observer.observe(bibleSection, { attributes: true });
        applyBibleTextSettings();
    }
}, 1000);

function initBibleSettingsMenu() {
    const trigger = document.getElementById('bibleSettingsTrigger');
    
    if (!trigger) return;

    // Toggle text settings dropdown directly on trigger click
    trigger.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Check if text settings dropdown is open and close it
        const textSettingsDropdown = document.getElementById('bibleTextSettingsDropdown');
        if (textSettingsDropdown) {
            textSettingsDropdown.remove();
            return;
        }
        
        // Open text settings panel directly
        openTextSettingsPanel();
    });
}

// Text Settings Dropdown
function openTextSettingsPanel() {
    // Close if already open
    const existingDropdown = document.getElementById('bibleTextSettingsDropdown');
    if (existingDropdown) {
        existingDropdown.remove();
        return;
    }
    
    // Get current settings
    const currentSize = localStorage.getItem('bible-font-size') || 'medium';
    const currentFont = localStorage.getItem('bible-font-family') || 'Sentinel';
    const currentLineSpacing = localStorage.getItem('bible-line-spacing') || 'normal';
    // Get current language from global state or localStorage, defaulting to 'tamil'
    const currentLanguage = (typeof currentBibleLanguage !== 'undefined' ? currentBibleLanguage : null) 
                          || localStorage.getItem('bible-language') 
                          || 'tamil';
    
    // Create dropdown
    const dropdown = document.createElement('div');
    dropdown.className = 'bible-text-settings-dropdown';
    dropdown.id = 'bibleTextSettingsDropdown';
    
    dropdown.innerHTML = `
        <!-- Language Selection -->
        <div class="text-settings-dropdown-section">
            <label class="text-settings-label">Language</label>
            <div class="bible-language-toggle-dropdown">
                <button class="language-btn-dropdown ${currentLanguage === 'tamil' ? 'active' : ''}" data-lang="tamil">
                    Tamil
                </button>
                <button class="language-btn-dropdown ${currentLanguage === 'english' ? 'active' : ''}" data-lang="english">
                    English
                </button>
                <button class="language-btn-dropdown ${currentLanguage === 'both' ? 'active' : ''}" data-lang="both">
                    Both
                </button>
            </div>
        </div>
        
        <!-- Font Size Controls -->
        <div class="text-settings-dropdown-section">
            <label class="text-settings-label">Font Size</label>
            <div class="font-size-controls-dropdown">
                <button class="font-size-btn ${currentSize === 'small' ? 'active' : ''}" data-size="small" title="Small">
                    <span class="size-icon">A</span>
                </button>
                <button class="font-size-btn ${currentSize === 'medium' ? 'active' : ''}" data-size="medium" title="Medium">
                    <span class="size-icon medium">A</span>
                </button>
                <button class="font-size-btn ${currentSize === 'large' ? 'active' : ''}" data-size="large" title="Large">
                    <span class="size-icon large">A</span>
                </button>
            </div>
        </div>
        
        <!-- Line Spacing -->
        <div class="text-settings-dropdown-section">
            <label class="text-settings-label">Line Spacing</label>
            <button class="line-spacing-btn-full" data-spacing="${currentLineSpacing}">
                <span class="spacing-icon">☰</span>
                <span class="spacing-label">${formatSpacingLabel(currentLineSpacing)}</span>
            </button>
        </div>
        
        <!-- Font Family Selection -->
        <div class="text-settings-dropdown-section">
            <label class="text-settings-label">Font Family</label>
            <select class="font-family-select-dropdown" id="bibleFontFamilySelectDropdown">
                <option value="Sentinel" ${currentFont === 'Sentinel' ? 'selected' : ''}>Sentinel</option>
                <option value="Georgia" ${currentFont === 'Georgia' ? 'selected' : ''}>Georgia</option>
                <option value="Times New Roman" ${currentFont === 'Times New Roman' ? 'selected' : ''}>Times New Roman</option>
                <option value="Arial" ${currentFont === 'Arial' ? 'selected' : ''}>Arial</option>
                <option value="Verdana" ${currentFont === 'Verdana' ? 'selected' : ''}>Verdana</option>
                <option value="Palatino" ${currentFont === 'Palatino' ? 'selected' : ''}>Palatino</option>
            </select>
        </div>
    `;
    
    // Append to settings trigger button
    const trigger = document.getElementById('bibleSettingsTrigger');
    if (trigger) {
        const wrapper = trigger.closest('.bible-settings-menu-wrapper');
        if (wrapper) {
            wrapper.appendChild(dropdown);
            
            // Show dropdown
            setTimeout(() => {
                dropdown.classList.add('active');
            }, 10);
            
            // Initialize event listeners
            initTextSettingsDropdownListeners();
            
            // Set initial line spacing icon state
            updateLineSpacingIcon(currentLineSpacing);
            
            // Close dropdown when clicking outside
            setTimeout(() => {
                document.addEventListener('click', handleTextSettingsClickOutside);
            }, 10);
        }
    }
}

function handleTextSettingsClickOutside(e) {
    const dropdown = document.getElementById('bibleTextSettingsDropdown');
    if (dropdown && !e.target.closest('.bible-text-settings-dropdown') && !e.target.closest('#bibleSettingsTrigger')) {
        dropdown.remove();
        document.removeEventListener('click', handleTextSettingsClickOutside);
    }
}

function formatSpacingLabel(spacing) {
    const labels = {
        'extra-compact': 'Extra Compact',
        'compact': 'Compact',
        'normal': 'Normal',
        'relaxed': 'Relaxed',
        'extra-relaxed': 'Extra Relaxed'
    };
    return labels[spacing] || 'Normal';
}

function closeTextSettingsPanel() {
    const dropdown = document.getElementById('bibleTextSettingsDropdown');
    if (dropdown) {
        dropdown.classList.remove('active');
        setTimeout(() => {
            dropdown.remove();
        }, 300);
    }
}

function updateLineSpacingIcon(spacing) {
    const btn = document.querySelector('.line-spacing-btn-full');
    if (btn) {
        const icon = btn.querySelector('.spacing-icon');
        if (icon) {
            if (spacing === 'extra-compact') {
                icon.style.letterSpacing = '-3px';
                icon.style.lineHeight = '0.8';
            } else if (spacing === 'compact') {
                icon.style.letterSpacing = '-1.5px';
                icon.style.lineHeight = '0.9';
            } else if (spacing === 'normal') {
                icon.style.letterSpacing = '0px';
                icon.style.lineHeight = '1';
            } else if (spacing === 'relaxed') {
                icon.style.letterSpacing = '2px';
                icon.style.lineHeight = '1.2';
            } else if (spacing === 'extra-relaxed') {
                icon.style.letterSpacing = '3px';
                icon.style.lineHeight = '1.4';
            }
        }
    }
}

function initTextSettingsDropdownListeners() {
    // Language buttons
    const languageBtns = document.querySelectorAll('.language-btn-dropdown');
    languageBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            
            // Update active state
            languageBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Save and switch language
            localStorage.setItem('bible-language', lang);
            
            // Call the existing language switch function if it exists
            if (typeof switchBibleLanguage === 'function') {
                switchBibleLanguage(lang);
            }
        });
    });
    
    // Font size buttons
    const fontSizeBtns = document.querySelectorAll('.font-size-btn');
    fontSizeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const size = this.getAttribute('data-size');
            
            // Update active state
            fontSizeBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Save and apply
            localStorage.setItem('bible-font-size', size);
            applyBibleTextSettings();
        });
    });
    
    // Line spacing button - cycles through 5 spacing options
    const lineSpacingBtn = document.querySelector('.line-spacing-btn-full');
    if (lineSpacingBtn) {
        lineSpacingBtn.addEventListener('click', function() {
            const currentSpacing = localStorage.getItem('bible-line-spacing') || 'normal';
            let newSpacing;
            
            // Cycle through 5 spacing options: extra-compact -> compact -> normal -> relaxed -> extra-relaxed -> extra-compact
            if (currentSpacing === 'extra-compact') {
                newSpacing = 'compact';
            } else if (currentSpacing === 'compact') {
                newSpacing = 'normal';
            } else if (currentSpacing === 'normal') {
                newSpacing = 'relaxed';
            } else if (currentSpacing === 'relaxed') {
                newSpacing = 'extra-relaxed';
            } else {
                newSpacing = 'extra-compact';
            }
            
            // Update data attribute and active state
            this.setAttribute('data-spacing', newSpacing);
            
            // Update icon or visual feedback
            const icon = this.querySelector('.spacing-icon');
            if (icon) {
                // Visual feedback for different spacing levels
                if (newSpacing === 'extra-compact') {
                    icon.style.letterSpacing = '-3px';
                    icon.style.lineHeight = '0.8';
                } else if (newSpacing === 'compact') {
                    icon.style.letterSpacing = '-1.5px';
                    icon.style.lineHeight = '0.9';
                } else if (newSpacing === 'normal') {
                    icon.style.letterSpacing = '0px';
                    icon.style.lineHeight = '1';
                } else if (newSpacing === 'relaxed') {
                    icon.style.letterSpacing = '2px';
                    icon.style.lineHeight = '1.2';
                } else if (newSpacing === 'extra-relaxed') {
                    icon.style.letterSpacing = '3px';
                    icon.style.lineHeight = '1.4';
                }
            }
            
            // Update label
            const label = this.querySelector('.spacing-label');
            if (label) {
                label.textContent = formatSpacingLabel(newSpacing);
            }
            
            // Save and apply
            localStorage.setItem('bible-line-spacing', newSpacing);
            applyBibleTextSettings();
        });
    }
    
    // Font family select
    const fontSelect = document.getElementById('bibleFontFamilySelectDropdown');
    if (fontSelect) {
        fontSelect.addEventListener('change', function() {
            localStorage.setItem('bible-font-family', this.value);
            applyBibleTextSettings();
        });
    }
    
    // Close on click outside
    document.addEventListener('click', function closeDropdown(e) {
        const dropdown = document.getElementById('bibleTextSettingsDropdown');
        const trigger = document.getElementById('bibleSettingsTrigger');
        
        if (dropdown && !dropdown.contains(e.target) && !trigger.contains(e.target)) {
            closeTextSettingsPanel();
            document.removeEventListener('click', closeDropdown);
        }
    });
}

function applyBibleTextSettings() {
    const size = localStorage.getItem('bible-font-size') || 'medium';
    const font = localStorage.getItem('bible-font-family') || 'Sentinel';
    const lineSpacing = localStorage.getItem('bible-line-spacing') || 'normal';
    
    const bibleSection = document.getElementById('bibleVerseDisplaySection');
    if (!bibleSection) return;
    
    // Remove existing classes
    bibleSection.classList.remove('bible-font-small', 'bible-font-medium', 'bible-font-large');
    bibleSection.classList.remove('bible-spacing-extra-compact', 'bible-spacing-compact', 'bible-spacing-normal', 'bible-spacing-relaxed', 'bible-spacing-extra-relaxed');
    
    // Apply font size
    bibleSection.classList.add(`bible-font-${size}`);
    
    // Apply line spacing
    bibleSection.classList.add(`bible-spacing-${lineSpacing}`);
    
    // Apply font family
    bibleSection.style.setProperty('--bible-font-family', font);
}
