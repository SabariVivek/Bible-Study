const Timothy1Data = {
    chapter_1: [],
    chapter_2: [],
    chapter_3: [],
    chapter_4: [],
    chapter_5: [],
    chapter_6: []
};

// Make available globally
if (typeof window !== 'undefined') {
    window.Timothy1Data = Timothy1Data;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Timothy1Data;
}
