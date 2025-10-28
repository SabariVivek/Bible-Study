const John3Data = {
    chapter_1: []
};

// Make available globally
if (typeof window !== 'undefined') {
    window.John3Data = John3Data;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = John3Data;
}
