const JudeData = {
    chapter_1: []
};

// Make available globally
if (typeof window !== 'undefined') {
    window.JudeData = JudeData;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = JudeData;
}
