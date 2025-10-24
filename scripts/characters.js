// Character Study functionality
let currentCharactersFilter = 'all';

function initializeCharacterStudy() {
    renderCharacterCards();
}

function renderCharacterCards(searchTerm = '') {
    const container = document.getElementById('charactersCardsGrid');
    if (!container) {
        console.log('Container not found');
        return;
    }

    // Check if data is available
    if (typeof charactersData === 'undefined' || !charactersData || charactersData.length === 0) {
        console.error('charactersData is not available or empty');
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: #dc2626;">
                <h3 style="font-size: 1.25rem; margin-bottom: 10px;">Error loading character data</h3>
                <p>Please refresh the page</p>
            </div>
        `;
        return;
    }

    console.log('Loading characters...', charactersData.length, 'total characters');

    // Filter characters based on search
    let filteredCharacters = charactersData;
    if (searchTerm.trim()) {
        const searchLower = searchTerm.toLowerCase();
        filteredCharacters = charactersData.filter(char => 
            char.name.toLowerCase().includes(searchLower) ||
            char.description.toLowerCase().includes(searchLower) ||
            char.lesson.toLowerCase().includes(searchLower)
        );
    }

    // Sort alphabetically
    filteredCharacters.sort((a, b) => a.name.localeCompare(b.name));

    // Clear container
    container.innerHTML = '';

    // Update search info
    const searchInfo = document.getElementById('charactersSearchInfo');
    if (searchTerm.trim()) {
        if (searchInfo) {
            if (filteredCharacters.length === 0) {
                searchInfo.textContent = '';
                searchInfo.classList.remove('visible');
            } else {
                const plural = filteredCharacters.length === 1 ? 'character' : 'characters';
                searchInfo.textContent = `Found ${filteredCharacters.length} ${plural}`;
                searchInfo.classList.add('visible');
            }
        }
    } else {
        if (searchInfo) {
            searchInfo.textContent = '';
            searchInfo.classList.remove('visible');
        }
    }

    // Render all cards
    filteredCharacters.forEach((character, index) => {
        const card = createCharacterCard(character, index);
        container.appendChild(card);
    });

    // Show no results message if needed
    if (filteredCharacters.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: #6b7280;">
                <svg style="width: 80px; height: 80px; margin: 0 auto 20px; opacity: 0.3;" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" stroke-width="2"/>
                    <line x1="12" y1="8" x2="12" y2="12" stroke-width="2" stroke-linecap="round"/>
                    <circle cx="12" cy="16" r="0.5" fill="currentColor"/>
                </svg>
                <h3 style="font-size: 1.25rem; margin-bottom: 10px;">No characters found</h3>
                <p>Try adjusting your search terms</p>
            </div>
        `;
    }
}

function createCharacterCard(character, index) {
    const card = document.createElement('div');
    card.className = 'character-card';

    card.innerHTML = `
        <div class="character-card-content">
            <h3 class="character-card-name">${character.name}</h3>
            <p class="character-card-description">${character.description}</p>
            <div class="character-card-lesson">
                <div class="lesson-icon">💡</div>
                <p class="lesson-text">${character.lesson}</p>
            </div>
        </div>
        <div class="shine"></div>
    `;

    return card;
}

function setupCharactersSearch() {
    const searchInput = document.getElementById('charactersSearch');
    const clearBtn = document.getElementById('charactersClearBtn');
    
    if (!searchInput) return;

    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        
        // Show/hide clear button
        if (clearBtn) {
            clearBtn.style.display = this.value ? 'flex' : 'none';
        }
        
        searchTimeout = setTimeout(() => {
            renderCharacterCards(this.value);
        }, 300);
    });

    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            searchInput.value = '';
            this.style.display = 'none';
            renderCharacterCards('');
            searchInput.focus();
        });
    }
}
