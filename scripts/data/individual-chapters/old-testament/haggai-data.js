const HaggaiData = {
    chapter_1: [],
    chapter_2: []
};

// Make available globally
if (typeof window !== 'undefined') {
    window.HaggaiData = HaggaiData;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HaggaiData;
}
