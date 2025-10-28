const HebrewsData = {
    chapter_1: [],
    chapter_2: [],
    chapter_3: [],
    chapter_4: [],
    chapter_5: [],
    chapter_6: [],
    chapter_7: [],
    chapter_8: [],
    chapter_9: [],
    chapter_10: [],
    chapter_11: [],
    chapter_12: [],
    chapter_13: []
};

// Make available globally
if (typeof window !== 'undefined') {
    window.HebrewsData = HebrewsData;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HebrewsData;
}
