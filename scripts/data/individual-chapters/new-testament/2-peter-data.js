const Peter2Data = {
    chapter_1: [],
    chapter_2: [],
    chapter_3: []
};

// Make available globally
if (typeof window !== 'undefined') {
    window.Peter2Data = Peter2Data;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Peter2Data;
}
