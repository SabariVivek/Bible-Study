const PhilemonData = {
    chapter_1: []
};

// Make available globally
if (typeof window !== 'undefined') {
    window.PhilemonData = PhilemonData;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PhilemonData;
}
