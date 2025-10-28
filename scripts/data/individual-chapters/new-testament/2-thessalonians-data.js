const Thessalonians2Data = {
    chapter_1: [],
    chapter_2: [],
    chapter_3: []
};

// Make available globally
if (typeof window !== 'undefined') {
    window.Thessalonians2Data = Thessalonians2Data;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Thessalonians2Data;
}
