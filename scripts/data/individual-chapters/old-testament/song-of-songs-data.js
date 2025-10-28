const SongOfSongsData = {
    chapter_1: [],
    chapter_2: [],
    chapter_3: [],
    chapter_4: [],
    chapter_5: [],
    chapter_6: [],
    chapter_7: [],
    chapter_8: []
};

// Make available globally
if (typeof window !== 'undefined') {
    window.SongOfSongsData = SongOfSongsData;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SongOfSongsData;
}
