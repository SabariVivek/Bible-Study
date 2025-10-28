const Thessalonians1Data = {
    chapter_1: [],
    chapter_2: [],
    chapter_3: [],
    chapter_4: [],
    chapter_5: []
};

// Make available globally
if (typeof window !== 'undefined') {
    window.Thessalonians1Data = Thessalonians1Data;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Thessalonians1Data;
}
