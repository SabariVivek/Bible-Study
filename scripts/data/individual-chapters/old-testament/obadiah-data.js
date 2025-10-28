const ObadiahData = {
    chapter_1: []
};

// Make available globally
if (typeof window !== 'undefined') {
    window.ObadiahData = ObadiahData;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ObadiahData;
}
