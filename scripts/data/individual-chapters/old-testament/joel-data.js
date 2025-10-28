const JoelData = {
    chapter_1: [],
    chapter_2: [],
    chapter_3: []
};

// Make available globally
if (typeof window !== 'undefined') {
    window.JoelData = JoelData;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = JoelData;
}
