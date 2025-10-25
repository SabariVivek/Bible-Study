/**
 * BOOKS-DATA.JS - Bible Books Data
 * Contains information about all 66 books of the Bible
 */

const allBooksData = {
    oldTestament: [
        // Law (Torah/Pentateuch)
        { name: "Genesis", testament: "Old", category: "Law", chapters: 50, verses: 1533, author: "Moses", theme: "Beginnings" },
        { name: "Exodus", testament: "Old", category: "Law", chapters: 40, verses: 1213, author: "Moses", theme: "Deliverance from Egypt" },
        { name: "Leviticus", testament: "Old", category: "Law", chapters: 27, verses: 859, author: "Moses", theme: "Holiness and worship" },
        { name: "Numbers", testament: "Old", category: "Law", chapters: 36, verses: 1288, author: "Moses", theme: "Wilderness wandering" },
        { name: "Deuteronomy", testament: "Old", category: "Law", chapters: 34, verses: 959, author: "Moses", theme: "Second law" },
        
        // History
        { name: "Joshua", testament: "Old", category: "History", chapters: 24, verses: 658, author: "Joshua/Samuel", theme: "Conquest of Canaan" },
        { name: "Judges", testament: "Old", category: "History", chapters: 21, verses: 618, author: "Samuel", theme: "Cycle of apostasy" },
        { name: "Ruth", testament: "Old", category: "History", chapters: 4, verses: 85, author: "Samuel", theme: "Loyalty and redemption" },
        { name: "1 Samuel", testament: "Old", category: "History", chapters: 31, verses: 810, author: "Samuel/Nathan/Gad", theme: "Transition to monarchy" },
        { name: "2 Samuel", testament: "Old", category: "History", chapters: 24, verses: 695, author: "Nathan/Gad", theme: "David's reign" },
        { name: "1 Kings", testament: "Old", category: "History", chapters: 22, verses: 816, author: "Jeremiah", theme: "Solomon and divided kingdom" },
        { name: "2 Kings", testament: "Old", category: "History", chapters: 25, verses: 719, author: "Jeremiah", theme: "Decline and exile" },
        { name: "1 Chronicles", testament: "Old", category: "History", chapters: 29, verses: 942, author: "Ezra", theme: "David's lineage and reign" },
        { name: "2 Chronicles", testament: "Old", category: "History", chapters: 36, verses: 822, author: "Ezra", theme: "Kingdom of Judah" },
        { name: "Ezra", testament: "Old", category: "History", chapters: 10, verses: 280, author: "Ezra", theme: "Return from exile" },
        { name: "Nehemiah", testament: "Old", category: "History", chapters: 13, verses: 406, author: "Nehemiah", theme: "Rebuilding Jerusalem" },
        { name: "Esther", testament: "Old", category: "History", chapters: 10, verses: 167, author: "Mordecai", theme: "God's providence" },
        
        // Poetry/Wisdom
        { name: "Job", testament: "Old", category: "Poetry", chapters: 42, verses: 1070, author: "Unknown", theme: "Suffering and faith" },
        { name: "Psalms", testament: "Old", category: "Poetry", chapters: 150, verses: 2461, author: "David and others", theme: "Worship and praise" },
        { name: "Proverbs", testament: "Old", category: "Poetry", chapters: 31, verses: 915, author: "Solomon and others", theme: "Practical wisdom" },
        { name: "Ecclesiastes", testament: "Old", category: "Poetry", chapters: 12, verses: 222, author: "Solomon", theme: "Meaning of life" },
        { name: "Song of Songs", testament: "Old", category: "Poetry", chapters: 8, verses: 117, author: "Solomon", theme: "Love and marriage" },
        
        // Major Prophets
        { name: "Isaiah", testament: "Old", category: "Major Prophet", chapters: 66, verses: 1292, author: "Isaiah", theme: "Salvation and Messiah" },
        { name: "Jeremiah", testament: "Old", category: "Major Prophet", chapters: 52, verses: 1364, author: "Jeremiah", theme: "Judgment and new covenant" },
        { name: "Lamentations", testament: "Old", category: "Major Prophet", chapters: 5, verses: 154, author: "Jeremiah", theme: "Mourning for Jerusalem" },
        { name: "Ezekiel", testament: "Old", category: "Major Prophet", chapters: 48, verses: 1273, author: "Ezekiel", theme: "Glory and restoration" },
        { name: "Daniel", testament: "Old", category: "Major Prophet", chapters: 12, verses: 357, author: "Daniel", theme: "God's sovereignty" },
        
        // Minor Prophets
        { name: "Hosea", testament: "Old", category: "Minor Prophet", chapters: 14, verses: 197, author: "Hosea", theme: "God's unfailing love" },
        { name: "Joel", testament: "Old", category: "Minor Prophet", chapters: 3, verses: 73, author: "Joel", theme: "Day of the Lord" },
        { name: "Amos", testament: "Old", category: "Minor Prophet", chapters: 9, verses: 146, author: "Amos", theme: "Justice and righteousness" },
        { name: "Obadiah", testament: "Old", category: "Minor Prophet", chapters: 1, verses: 21, author: "Obadiah", theme: "Judgment on Edom" },
        { name: "Jonah", testament: "Old", category: "Minor Prophet", chapters: 4, verses: 48, author: "Jonah", theme: "God's mercy to nations" },
        { name: "Micah", testament: "Old", category: "Minor Prophet", chapters: 7, verses: 105, author: "Micah", theme: "Justice and mercy" },
        { name: "Nahum", testament: "Old", category: "Minor Prophet", chapters: 3, verses: 47, author: "Nahum", theme: "Judgment on Nineveh" },
        { name: "Habakkuk", testament: "Old", category: "Minor Prophet", chapters: 3, verses: 56, author: "Habakkuk", theme: "Faith in God's plan" },
        { name: "Zephaniah", testament: "Old", category: "Minor Prophet", chapters: 3, verses: 53, author: "Zephaniah", theme: "Day of the Lord" },
        { name: "Haggai", testament: "Old", category: "Minor Prophet", chapters: 2, verses: 38, author: "Haggai", theme: "Rebuilding the temple" },
        { name: "Zechariah", testament: "Old", category: "Minor Prophet", chapters: 14, verses: 211, author: "Zechariah", theme: "Restoration and Messiah" },
        { name: "Malachi", testament: "Old", category: "Minor Prophet", chapters: 4, verses: 55, author: "Malachi", theme: "Preparation for Messiah" }
    ],
    
    newTestament: [
        // Gospels
        { name: "Matthew", testament: "New", category: "Gospel", chapters: 28, verses: 1071, author: "Matthew", theme: "Jesus as King" },
        { name: "Mark", testament: "New", category: "Gospel", chapters: 16, verses: 678, author: "Mark", theme: "Jesus as Servant" },
        { name: "Luke", testament: "New", category: "Gospel", chapters: 24, verses: 1151, author: "Luke", theme: "Jesus as Son of Man" },
        { name: "John", testament: "New", category: "Gospel", chapters: 21, verses: 879, author: "John", theme: "Jesus as Son of God" },
        
        // Acts
        { name: "Acts", testament: "New", category: "Acts", chapters: 28, verses: 1007, author: "Luke", theme: "Early church growth" },
        
        // Paul's Letters
        { name: "Romans", testament: "New", category: "Letters", chapters: 16, verses: 433, author: "Paul", theme: "Righteousness by faith" },
        { name: "1 Corinthians", testament: "New", category: "Letters", chapters: 16, verses: 437, author: "Paul", theme: "Church unity and order" },
        { name: "2 Corinthians", testament: "New", category: "Letters", chapters: 13, verses: 257, author: "Paul", theme: "Ministry and suffering" },
        { name: "Galatians", testament: "New", category: "Letters", chapters: 6, verses: 149, author: "Paul", theme: "Freedom in Christ" },
        { name: "Ephesians", testament: "New", category: "Letters", chapters: 6, verses: 155, author: "Paul", theme: "Unity in Christ" },
        { name: "Philippians", testament: "New", category: "Letters", chapters: 4, verses: 104, author: "Paul", theme: "Joy in Christ" },
        { name: "Colossians", testament: "New", category: "Letters", chapters: 4, verses: 95, author: "Paul", theme: "Supremacy of Christ" },
        { name: "1 Thessalonians", testament: "New", category: "Letters", chapters: 5, verses: 89, author: "Paul", theme: "Second coming" },
        { name: "2 Thessalonians", testament: "New", category: "Letters", chapters: 3, verses: 47, author: "Paul", theme: "Patience and perseverance" },
        { name: "1 Timothy", testament: "New", category: "Letters", chapters: 6, verses: 113, author: "Paul", theme: "Church leadership" },
        { name: "2 Timothy", testament: "New", category: "Letters", chapters: 4, verses: 83, author: "Paul", theme: "Faithful ministry" },
        { name: "Titus", testament: "New", category: "Letters", chapters: 3, verses: 46, author: "Paul", theme: "Good works" },
        { name: "Philemon", testament: "New", category: "Letters", chapters: 1, verses: 25, author: "Paul", theme: "Forgiveness" },
        
        // General Letters
        { name: "Hebrews", testament: "New", category: "Letters", chapters: 13, verses: 303, author: "Unknown", theme: "Superiority of Christ" },
        { name: "James", testament: "New", category: "Letters", chapters: 5, verses: 108, author: "James", theme: "Faith in action" },
        { name: "1 Peter", testament: "New", category: "Letters", chapters: 5, verses: 105, author: "Peter", theme: "Hope in suffering" },
        { name: "2 Peter", testament: "New", category: "Letters", chapters: 3, verses: 61, author: "Peter", theme: "Growth in grace" },
        { name: "1 John", testament: "New", category: "Letters", chapters: 5, verses: 105, author: "John", theme: "Love and truth" },
        { name: "2 John", testament: "New", category: "Letters", chapters: 1, verses: 13, author: "John", theme: "Walking in truth" },
        { name: "3 John", testament: "New", category: "Letters", chapters: 1, verses: 14, author: "John", theme: "Hospitality" },
        { name: "Jude", testament: "New", category: "Letters", chapters: 1, verses: 25, author: "Jude", theme: "Contending for faith" },
        
        // Revelation
        { name: "Revelation", testament: "New", category: "Revelation", chapters: 22, verses: 404, author: "John", theme: "End times and victory" }
    ]
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = allBooksData;
}
