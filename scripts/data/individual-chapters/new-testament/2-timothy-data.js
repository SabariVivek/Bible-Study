const Timothy2Data = {
    chapter_1: [],
    chapter_2: [],
    chapter_3: [],
    chapter_4: []
};

// Make available globally
if (typeof window !== 'undefined') {
    window.Timothy2Data = Timothy2Data;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Timothy2Data;
}
