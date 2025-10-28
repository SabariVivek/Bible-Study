const John1Data = {
    chapter_1: [],
    chapter_2: [],
    chapter_3: [],
    chapter_4: [],
    chapter_5: []
};

// Make available globally
if (typeof window !== 'undefined') {
    window.John1Data = John1Data;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = John1Data;
}
