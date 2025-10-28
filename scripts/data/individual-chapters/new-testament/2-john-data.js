const John2Data = {
    chapter_1: []
};

// Make available globally
if (typeof window !== 'undefined') {
    window.John2Data = John2Data;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = John2Data;
}
