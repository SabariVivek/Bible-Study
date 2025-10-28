const Peter1Data = {
    chapter_1: [],
    chapter_2: [],
    chapter_3: [],
    chapter_4: [],
    chapter_5: []
};

// Make available globally
if (typeof window !== 'undefined') {
    window.Peter1Data = Peter1Data;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Peter1Data;
}
