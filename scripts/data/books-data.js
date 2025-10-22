/**
 * BOOKS-DATA.JS - Bible Books Data
 * Contains information about all 66 books of the Bible
 */

const allBooksData = {
    oldTestament: [
        // Law (Torah/Pentateuch)
        { name: "Genesis", testament: "Old", category: "Law", chapters: 50, author: "Moses", theme: "Beginnings" },
        { name: "Exodus", testament: "Old", category: "Law", chapters: 40, author: "Moses", theme: "Deliverance from Egypt" },
        { name: "Leviticus", testament: "Old", category: "Law", chapters: 27, author: "Moses", theme: "Holiness and worship" },
        { name: "Numbers", testament: "Old", category: "Law", chapters: 36, author: "Moses", theme: "Wilderness wandering" },
        { name: "Deuteronomy", testament: "Old", category: "Law", chapters: 34, author: "Moses", theme: "Second law" },
        
        // History
        { name: "Joshua", testament: "Old", category: "History", chapters: 24, author: "Joshua/Samuel", theme: "Conquest of Canaan" },
        { name: "Judges", testament: "Old", category: "History", chapters: 21, author: "Samuel", theme: "Cycle of apostasy" },
        { name: "Ruth", testament: "Old", category: "History", chapters: 4, author: "Samuel", theme: "Loyalty and redemption" },
        { name: "1 Samuel", testament: "Old", category: "History", chapters: 31, author: "Samuel/Nathan/Gad", theme: "Transition to monarchy" },
        { name: "2 Samuel", testament: "Old", category: "History", chapters: 24, author: "Nathan/Gad", theme: "David's reign" },
        { name: "1 Kings", testament: "Old", category: "History", chapters: 22, author: "Jeremiah", theme: "Solomon and divided kingdom" },
        { name: "2 Kings", testament: "Old", category: "History", chapters: 25, author: "Jeremiah", theme: "Decline and exile" },
        { name: "1 Chronicles", testament: "Old", category: "History", chapters: 29, author: "Ezra", theme: "David's lineage and reign" },
        { name: "2 Chronicles", testament: "Old", category: "History", chapters: 36, author: "Ezra", theme: "Kingdom of Judah" },
        { name: "Ezra", testament: "Old", category: "History", chapters: 10, author: "Ezra", theme: "Return from exile" },
        { name: "Nehemiah", testament: "Old", category: "History", chapters: 13, author: "Nehemiah", theme: "Rebuilding Jerusalem" },
        { name: "Esther", testament: "Old", category: "History", chapters: 10, author: "Mordecai", theme: "God's providence" },
        
        // Poetry/Wisdom
        { name: "Job", testament: "Old", category: "Poetry", chapters: 42, author: "Unknown", theme: "Suffering and faith" },
        { name: "Psalms", testament: "Old", category: "Poetry", chapters: 150, author: "David and others", theme: "Worship and praise" },
        { name: "Proverbs", testament: "Old", category: "Poetry", chapters: 31, author: "Solomon and others", theme: "Practical wisdom" },
        { name: "Ecclesiastes", testament: "Old", category: "Poetry", chapters: 12, author: "Solomon", theme: "Meaning of life" },
        { name: "Song of Songs", testament: "Old", category: "Poetry", chapters: 8, author: "Solomon", theme: "Love and marriage" },
        
        // Major Prophets
        { name: "Isaiah", testament: "Old", category: "Major Prophet", chapters: 66, author: "Isaiah", theme: "Salvation and Messiah" },
        { name: "Jeremiah", testament: "Old", category: "Major Prophet", chapters: 52, author: "Jeremiah", theme: "Judgment and new covenant" },
        { name: "Lamentations", testament: "Old", category: "Major Prophet", chapters: 5, author: "Jeremiah", theme: "Mourning for Jerusalem" },
        { name: "Ezekiel", testament: "Old", category: "Major Prophet", chapters: 48, author: "Ezekiel", theme: "Glory and restoration" },
        { name: "Daniel", testament: "Old", category: "Major Prophet", chapters: 12, author: "Daniel", theme: "God's sovereignty" },
        
        // Minor Prophets
        { name: "Hosea", testament: "Old", category: "Minor Prophet", chapters: 14, author: "Hosea", theme: "God's unfailing love" },
        { name: "Joel", testament: "Old", category: "Minor Prophet", chapters: 3, author: "Joel", theme: "Day of the Lord" },
        { name: "Amos", testament: "Old", category: "Minor Prophet", chapters: 9, author: "Amos", theme: "Justice and righteousness" },
        { name: "Obadiah", testament: "Old", category: "Minor Prophet", chapters: 1, author: "Obadiah", theme: "Judgment on Edom" },
        { name: "Jonah", testament: "Old", category: "Minor Prophet", chapters: 4, author: "Jonah", theme: "God's mercy to nations" },
        { name: "Micah", testament: "Old", category: "Minor Prophet", chapters: 7, author: "Micah", theme: "Justice and mercy" },
        { name: "Nahum", testament: "Old", category: "Minor Prophet", chapters: 3, author: "Nahum", theme: "Judgment on Nineveh" },
        { name: "Habakkuk", testament: "Old", category: "Minor Prophet", chapters: 3, author: "Habakkuk", theme: "Faith in God's plan" },
        { name: "Zephaniah", testament: "Old", category: "Minor Prophet", chapters: 3, author: "Zephaniah", theme: "Day of the Lord" },
        { name: "Haggai", testament: "Old", category: "Minor Prophet", chapters: 2, author: "Haggai", theme: "Rebuilding the temple" },
        { name: "Zechariah", testament: "Old", category: "Minor Prophet", chapters: 14, author: "Zechariah", theme: "Restoration and Messiah" },
        { name: "Malachi", testament: "Old", category: "Minor Prophet", chapters: 4, author: "Malachi", theme: "Preparation for Messiah" }
    ],
    
    newTestament: [
        // Gospels
        { name: "Matthew", testament: "New", category: "Gospel", chapters: 28, author: "Matthew", theme: "Jesus as King" },
        { name: "Mark", testament: "New", category: "Gospel", chapters: 16, author: "Mark", theme: "Jesus as Servant" },
        { name: "Luke", testament: "New", category: "Gospel", chapters: 24, author: "Luke", theme: "Jesus as Son of Man" },
        { name: "John", testament: "New", category: "Gospel", chapters: 21, author: "John", theme: "Jesus as Son of God" },
        
        // Acts
        { name: "Acts", testament: "New", category: "Acts", chapters: 28, author: "Luke", theme: "Early church growth" },
        
        // Paul's Letters
        { name: "Romans", testament: "New", category: "Letters", chapters: 16, author: "Paul", theme: "Righteousness by faith" },
        { name: "1 Corinthians", testament: "New", category: "Letters", chapters: 16, author: "Paul", theme: "Church unity and order" },
        { name: "2 Corinthians", testament: "New", category: "Letters", chapters: 13, author: "Paul", theme: "Ministry and suffering" },
        { name: "Galatians", testament: "New", category: "Letters", chapters: 6, author: "Paul", theme: "Freedom in Christ" },
        { name: "Ephesians", testament: "New", category: "Letters", chapters: 6, author: "Paul", theme: "Unity in Christ" },
        { name: "Philippians", testament: "New", category: "Letters", chapters: 4, author: "Paul", theme: "Joy in Christ" },
        { name: "Colossians", testament: "New", category: "Letters", chapters: 4, author: "Paul", theme: "Supremacy of Christ" },
        { name: "1 Thessalonians", testament: "New", category: "Letters", chapters: 5, author: "Paul", theme: "Second coming" },
        { name: "2 Thessalonians", testament: "New", category: "Letters", chapters: 3, author: "Paul", theme: "Patience and perseverance" },
        { name: "1 Timothy", testament: "New", category: "Letters", chapters: 6, author: "Paul", theme: "Church leadership" },
        { name: "2 Timothy", testament: "New", category: "Letters", chapters: 4, author: "Paul", theme: "Faithful ministry" },
        { name: "Titus", testament: "New", category: "Letters", chapters: 3, author: "Paul", theme: "Good works" },
        { name: "Philemon", testament: "New", category: "Letters", chapters: 1, author: "Paul", theme: "Forgiveness" },
        
        // General Letters
        { name: "Hebrews", testament: "New", category: "Letters", chapters: 13, author: "Unknown", theme: "Superiority of Christ" },
        { name: "James", testament: "New", category: "Letters", chapters: 5, author: "James", theme: "Faith in action" },
        { name: "1 Peter", testament: "New", category: "Letters", chapters: 5, author: "Peter", theme: "Hope in suffering" },
        { name: "2 Peter", testament: "New", category: "Letters", chapters: 3, author: "Peter", theme: "Growth in grace" },
        { name: "1 John", testament: "New", category: "Letters", chapters: 5, author: "John", theme: "Love and truth" },
        { name: "2 John", testament: "New", category: "Letters", chapters: 1, author: "John", theme: "Walking in truth" },
        { name: "3 John", testament: "New", category: "Letters", chapters: 1, author: "John", theme: "Hospitality" },
        { name: "Jude", testament: "New", category: "Letters", chapters: 1, author: "Jude", theme: "Contending for faith" },
        
        // Revelation
        { name: "Revelation", testament: "New", category: "Revelation", chapters: 22, author: "John", theme: "End times and victory" }
    ]
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = allBooksData;
}
