/**
 * MATTHEW CROSS-REFERENCES
 * Cross-reference mapping for the Gospel of Matthew
 * Maps link icons in verses to their corresponding Bible references
 */

const MATTHEW_CROSS_REFERENCES = {
    // ============================================================
    // MATTHEW CHAPTER 1 - CROSS REFERENCES
    // ============================================================
    
    // Matthew 1:1
    'matthew_1_1_0': {
        title: 'The Genealogy of Jesus',
        references: [
            { verse: 'Luke 3:23-38', book: 'Luke', chapter: 3, verses: [23, 38] }
        ]
    },
    'matthew_1_1_1': {
        title: 'Son of David',
        references: [
            { verse: '2 Samuel 7:12-16', book: '2 Samuel', chapter: 7, verses: [12, 16] },
            { verse: 'Psalm 132:11', book: 'Psalms', chapter: 132, verses: [11, 11] },
            { verse: 'Isaiah 11:1', book: 'Isaiah', chapter: 11, verses: [1, 1] },
            { verse: 'Jeremiah 23:5', book: 'Jeremiah', chapter: 23, verses: [5, 5] },
            { verse: 'Luke 1:32', book: 'Luke', chapter: 1, verses: [32, 32] },
            { verse: 'Acts 2:30', book: 'Acts', chapter: 2, verses: [30, 30] },
            { verse: 'Romans 1:3', book: 'Romans', chapter: 1, verses: [3, 3] }
        ]
    },
    'matthew_1_1_2': {
        title: 'Son of Abraham',
        references: [
            { verse: 'Genesis 22:18', book: 'Genesis', chapter: 22, verses: [18, 18] },
            { verse: 'Galatians 3:16', book: 'Galatians', chapter: 3, verses: [16, 16] }
        ]
    },
    // Matthew 1:2
    'matthew_1_2_0': {
        title: 'Abraham, Isaac, Jacob',
        references: [
            { verse: 'Genesis 21:3', book: 'Genesis', chapter: 21, verses: [3, 3] }
        ]
    },
    'matthew_1_2_1': {
        title: 'Isaac and Jacob',
        references: [
            { verse: 'Genesis 25:26', book: 'Genesis', chapter: 25, verses: [26, 26] }
        ]
    },
    'matthew_1_2_2': {
        title: 'Jacob and Judah',
        references: [
            { verse: 'Genesis 29:35', book: 'Genesis', chapter: 29, verses: [35, 35] }
        ]
    },
    // Matthew 1:3
    'matthew_1_3_0': {
        title: 'Genealogy Records',
        references: [
            { verse: 'Ruth 4:18-22', book: 'Ruth', chapter: 4, verses: [18, 22] },
            { verse: '1 Chronicles 2:1-15', book: '1 Chronicles', chapter: 2, verses: [1, 15] }
        ]
    },
    // Matthew 1:5
    'matthew_1_5_0': {
        title: 'Rahab',
        references: [
            { verse: 'Joshua 6:25', book: 'Joshua', chapter: 6, verses: [25, 25] }
        ]
    },
    // Matthew 1:6
    'matthew_1_6_0': {
        title: 'Jesse and David',
        references: [
            { verse: '1 Samuel 16:1', book: '1 Samuel', chapter: 16, verses: [1, 1] }
        ]
    },
    'matthew_1_6_1': {
        title: 'David and Solomon',
        references: [
            { verse: '2 Samuel 12:24', book: '2 Samuel', chapter: 12, verses: [24, 24] }
        ]
    },
    'matthew_1_6_2': {
        title: 'Wife of Uriah',
        references: [
            { verse: '2 Samuel 12:10', book: '2 Samuel', chapter: 12, verses: [10, 10] }
        ]
    },
    // Matthew 1:7-10
    'matthew_1_7_0': {
        title: 'Kings of Judah',
        references: [
            { verse: 'Matthew 1:7-10', book: 'Matthew', chapter: 1, verses: [7, 10] },
            { verse: '1 Chronicles 3:10-14', book: '1 Chronicles', chapter: 3, verses: [10, 14] }
        ]
    },
    'matthew_1_8_0': {
        title: 'Joram to Uzziah',
        references: [
            { verse: '2 Kings 15:1', book: '2 Kings', chapter: 15, verses: [1, 1] },
            { verse: '1 Chronicles 3:11-12', book: '1 Chronicles', chapter: 3, verses: [11, 12] }
        ]
    },
    // Matthew 1:11
    'matthew_1_11_0': {
        title: 'Deportation to Babylon',
        references: [
            { verse: '2 Kings 24:14-15', book: '2 Kings', chapter: 24, verses: [14, 15] },
            { verse: '2 Chronicles 36:10', book: '2 Chronicles', chapter: 36, verses: [10, 10] }
        ]
    },
    // Matthew 1:12
    'matthew_1_12_0': {
        title: 'Post-Exile Genealogy',
        references: [
            { verse: '1 Chronicles 3:17-19', book: '1 Chronicles', chapter: 3, verses: [17, 19] }
        ]
    },
    'matthew_1_12_1': {
        title: 'Shealtiel',
        references: [
            { verse: 'Luke 3:27', book: 'Luke', chapter: 3, verses: [27, 27] }
        ]
    },
    'matthew_1_12_2': {
        title: 'Zerubbabel',
        references: [
            { verse: 'Ezra 3:2', book: 'Ezra', chapter: 3, verses: [2, 2] }
        ]
    },
    // Matthew 1:16
    'matthew_1_16_0': {
        title: 'Joseph, husband of Mary',
        references: [
            { verse: 'Luke 3:23', book: 'Luke', chapter: 3, verses: [23, 23] }
        ]
    },
    // Matthew 1:17
    'matthew_1_17_0': {
        title: 'The Christ',
        references: [
            { verse: 'Matthew 2:4', book: 'Matthew', chapter: 2, verses: [4, 4] },
            { verse: 'Matthew 11:2', book: 'Matthew', chapter: 11, verses: [2, 2] },
            { verse: 'Matthew 16:16', book: 'Matthew', chapter: 16, verses: [16, 16] },
            { verse: 'John 1:41', book: 'John', chapter: 1, verses: [41, 41] },
            { verse: 'John 4:25', book: 'John', chapter: 4, verses: [25, 25] }
        ]
    },
    // Matthew 1:18
    'matthew_1_18_0': {
        title: 'Birth of Jesus Christ',
        references: [
            { verse: 'Matthew 1:1', book: 'Matthew', chapter: 1, verses: [1, 1] },
            { verse: 'Mark 1:1', book: 'Mark', chapter: 1, verses: [1, 1] },
            { verse: 'John 1:17', book: 'John', chapter: 1, verses: [17, 17] }
        ]
    },
    'matthew_1_18_1': {
        title: 'Jesus Christ',
        references: [
            { verse: 'Matthew 1:16', book: 'Matthew', chapter: 1, verses: [16, 16] },
            { verse: 'John 17:3', book: 'John', chapter: 17, verses: [3, 3] }
        ]
    },
    'matthew_1_18_2': {
        title: 'Mary Betrothed',
        references: [
            { verse: 'Luke 1:27', book: 'Luke', chapter: 1, verses: [27, 27] }
        ]
    },
    'matthew_1_18_3': {
        title: 'From the Holy Spirit',
        references: [
            { verse: 'Luke 1:35', book: 'Luke', chapter: 1, verses: [35, 35] }
        ]
    },
    // Matthew 1:19
    'matthew_1_19_0': {
        title: 'Joseph, A Just Man',
        references: [
            { verse: 'Deuteronomy 24:1', book: 'Deuteronomy', chapter: 24, verses: [1, 4] }
        ]
    },
    'matthew_1_19_1': {
        title: 'Put Her to Shame',
        references: [
            { verse: 'Deuteronomy 24:1', book: 'Deuteronomy', chapter: 24, verses: [1, 1] }
        ]
    },
    // Matthew 1:20
    'matthew_1_20_0': {
        title: 'Angel in a Dream',
        references: [
            { verse: 'Matthew 2:13', book: 'Matthew', chapter: 2, verses: [13, 13] },
            { verse: 'Matthew 2:19', book: 'Matthew', chapter: 2, verses: [19, 19] },
            { verse: 'Matthew 2:22', book: 'Matthew', chapter: 2, verses: [22, 22] }
        ]
    },
    'matthew_1_20_1': {
        title: 'Son of David',
        references: [
            { verse: 'Matthew 1:1', book: 'Matthew', chapter: 1, verses: [1, 1] },
            { verse: 'Luke 1:27', book: 'Luke', chapter: 1, verses: [27, 27] }
        ]
    },
    'matthew_1_20_2': {
        title: 'From the Holy Spirit',
        references: [
            { verse: 'Matthew 1:18', book: 'Matthew', chapter: 1, verses: [18, 18] },
            { verse: 'Luke 1:35', book: 'Luke', chapter: 1, verses: [35, 35] }
        ]
    },
    // Matthew 1:21
    'matthew_1_21_0': {
        title: 'She Will Bear a Son',
        references: [
            { verse: 'Luke 1:31', book: 'Luke', chapter: 1, verses: [31, 31] }
        ]
    },
    'matthew_1_21_1': {
        title: 'Call His Name Jesus',
        references: [
            { verse: 'Luke 1:31', book: 'Luke', chapter: 1, verses: [31, 31] },
            { verse: 'Luke 2:21', book: 'Luke', chapter: 2, verses: [21, 21] }
        ]
    },
    'matthew_1_21_2': {
        title: 'Save His People',
        references: [
            { verse: 'Psalm 130:8', book: 'Psalms', chapter: 130, verses: [8, 8] },
            { verse: 'Acts 13:23', book: 'Acts', chapter: 13, verses: [23, 23] }
        ]
    },
    // Matthew 1:22
    'matthew_1_22_0': {
        title: 'To Fulfill Prophecy',
        references: [
            { verse: 'Matthew 1:22', book: 'Matthew', chapter: 1, verses: [22, 22] },
            { verse: 'Matthew 2:15', book: 'Matthew', chapter: 2, verses: [15, 15] },
            { verse: 'Matthew 2:23', book: 'Matthew', chapter: 2, verses: [23, 23] },
            { verse: 'Matthew 4:14', book: 'Matthew', chapter: 4, verses: [14, 14] }
        ]
    },
    // Matthew 1:23
    'matthew_1_23_0': {
        title: 'Isaiah\'s Prophecy',
        references: [
            { verse: 'Isaiah 7:14', book: 'Isaiah', chapter: 7, verses: [14, 14] }
        ]
    },
    'matthew_1_23_1': {
        title: 'Immanuel',
        references: [
            { verse: 'Isaiah 8:8', book: 'Isaiah', chapter: 8, verses: [8, 10] }
        ]
    },
    'matthew_1_23_2': {
        title: 'God With Us',
        references: [
            { verse: 'Matthew 28:20', book: 'Matthew', chapter: 28, verses: [20, 20] }
        ]
    },
    // Matthew 1:25
    'matthew_1_25_0': {
        title: 'Called His Name Jesus',
        references: [
            { verse: 'Matthew 1:21', book: 'Matthew', chapter: 1, verses: [21, 21] },
            { verse: 'Luke 2:21', book: 'Luke', chapter: 2, verses: [21, 21] }
        ]
    },
    
    // ============================================================
    // MATTHEW CHAPTER 2 - CROSS REFERENCES
    // ============================================================
    
    // Matthew 2:1
    'matthew_2_1_0': {
        title: 'After Jesus Was Born',
        references: [
            { verse: 'Luke 2:4-7', book: 'Luke', chapter: 2, verses: [4, 7] }
        ]
    },
    'matthew_2_1_1': {
        title: 'Born in Bethlehem',
        references: [
            { verse: 'Luke 2:4-7', book: 'Luke', chapter: 2, verses: [4, 7] }
        ]
    },
    'matthew_2_1_2': {
        title: 'Bethlehem of Judea',
        references: [
            { verse: 'Luke 2:15', book: 'Luke', chapter: 2, verses: [15, 15] },
            { verse: 'John 7:42', book: 'John', chapter: 7, verses: [42, 42] }
        ]
    },
    'matthew_2_1_3': {
        title: 'Days of Herod the King',
        references: [
            { verse: 'Luke 1:5', book: 'Luke', chapter: 1, verses: [5, 5] }
        ]
    },
    'matthew_2_1_4': {
        title: 'Wise Men from the East',
        references: [
            { verse: 'Genesis 25:6', book: 'Genesis', chapter: 25, verses: [6, 6] },
            { verse: '1 Kings 4:30', book: '1 Kings', chapter: 4, verses: [30, 30] }
        ]
    },
    // Matthew 2:2
    'matthew_2_2_0': {
        title: 'King of the Jews',
        references: [
            { verse: 'Matthew 27:11', book: 'Matthew', chapter: 27, verses: [11, 11] },
            { verse: 'Matthew 27:37', book: 'Matthew', chapter: 27, verses: [37, 37] },
            { verse: 'Jeremiah 23:5', book: 'Jeremiah', chapter: 23, verses: [5, 5] },
            { verse: 'Jeremiah 30:9', book: 'Jeremiah', chapter: 30, verses: [9, 9] },
            { verse: 'Zechariah 9:9', book: 'Zechariah', chapter: 9, verses: [9, 9] }
        ]
    },
    'matthew_2_2_1': {
        title: 'His Star',
        references: [
            { verse: 'Numbers 24:17', book: 'Numbers', chapter: 24, verses: [17, 17] },
            { verse: 'Revelation 22:16', book: 'Revelation', chapter: 22, verses: [16, 16] }
        ]
    },
    'matthew_2_2_2': {
        title: 'Come to Worship Him',
        references: [
            { verse: 'Matthew 2:11', book: 'Matthew', chapter: 2, verses: [11, 11] },
            { verse: 'John 9:38', book: 'John', chapter: 9, verses: [38, 38] }
        ]
    },
    // Matthew 2:4
    'matthew_2_4_0': {
        title: 'The Christ',
        references: [
            { verse: 'Matthew 1:17', book: 'Matthew', chapter: 1, verses: [17, 17] },
            { verse: 'Matthew 11:2', book: 'Matthew', chapter: 11, verses: [2, 2] },
            { verse: 'Matthew 16:16', book: 'Matthew', chapter: 16, verses: [16, 16] },
            { verse: 'John 1:41', book: 'John', chapter: 1, verses: [41, 41] },
            { verse: 'John 4:25', book: 'John', chapter: 4, verses: [25, 25] }
        ]
    },
    // Matthew 2:6
    'matthew_2_6_0': {
        title: 'Prophecy of Bethlehem',
        references: [
            { verse: 'Micah 5:2', book: 'Micah', chapter: 5, verses: [2, 2] }
        ]
    },
    'matthew_2_6_1': {
        title: 'Shepherd My People',
        references: [
            { verse: 'Ezekiel 34:23', book: 'Ezekiel', chapter: 34, verses: [23, 23] },
            { verse: 'John 21:15-17', book: 'John', chapter: 21, verses: [15, 17] },
            { verse: '2 Samuel 5:2', book: '2 Samuel', chapter: 5, verses: [2, 2] },
            { verse: 'Revelation 7:17', book: 'Revelation', chapter: 7, verses: [17, 17] }
        ]
    },
    // Matthew 2:11
    'matthew_2_11_0': {
        title: 'Offered Him Gifts',
        references: [
            { verse: '1 Samuel 9:7', book: '1 Samuel', chapter: 9, verses: [7, 7] },
            { verse: 'Psalm 72:10', book: 'Psalms', chapter: 72, verses: [10, 10] }
        ]
    },
    'matthew_2_11_1': {
        title: 'Gold',
        references: [
            { verse: 'Isaiah 60:6', book: 'Isaiah', chapter: 60, verses: [6, 6] }
        ]
    },
    'matthew_2_11_2': {
        title: 'Frankincense',
        references: [
            { verse: 'Revelation 18:13', book: 'Revelation', chapter: 18, verses: [13, 13] }
        ]
    },
    'matthew_2_11_3': {
        title: 'Myrrh',
        references: [
            { verse: 'Psalm 45:8', book: 'Psalms', chapter: 45, verses: [8, 8] }
        ]
    },
    // Matthew 2:12
    'matthew_2_12_0': {
        title: 'Being Warned',
        references: [
            { verse: 'Matthew 2:22', book: 'Matthew', chapter: 2, verses: [22, 22] },
            { verse: 'Hebrews 11:7', book: 'Hebrews', chapter: 11, verses: [7, 7] }
        ]
    },
    'matthew_2_12_1': {
        title: 'In a Dream',
        references: [
            { verse: 'Matthew 1:20', book: 'Matthew', chapter: 1, verses: [20, 20] },
            { verse: 'Matthew 2:13', book: 'Matthew', chapter: 2, verses: [13, 13] },
            { verse: 'Matthew 2:19', book: 'Matthew', chapter: 2, verses: [19, 19] },
            { verse: 'Matthew 2:22', book: 'Matthew', chapter: 2, verses: [22, 22] }
        ]
    },
    // Matthew 2:13
    'matthew_2_13_0': {
        title: 'Angel in a Dream',
        references: [
            { verse: 'Matthew 1:20', book: 'Matthew', chapter: 1, verses: [20, 20] },
            { verse: 'Matthew 2:19', book: 'Matthew', chapter: 2, verses: [19, 19] },
            { verse: 'Matthew 2:12', book: 'Matthew', chapter: 2, verses: [12, 12] },
            { verse: 'Matthew 2:22', book: 'Matthew', chapter: 2, verses: [22, 22] }
        ]
    },
    // Matthew 2:15
    'matthew_2_15_0': {
        title: 'To Fulfill Prophecy',
        references: [
            { verse: 'Matthew 1:22', book: 'Matthew', chapter: 1, verses: [22, 22] }
        ]
    },
    'matthew_2_15_1': {
        title: 'Out of Egypt',
        references: [
            { verse: 'Hosea 11:1', book: 'Hosea', chapter: 11, verses: [1, 1] }
        ]
    },
    // Matthew 2:17
    'matthew_2_17_0': {
        title: 'Fulfilled by Jeremiah',
        references: [
            { verse: 'Matthew 27:9', book: 'Matthew', chapter: 27, verses: [9, 9] },
            { verse: 'Matthew 1:22', book: 'Matthew', chapter: 1, verses: [22, 22] }
        ]
    },
    // Matthew 2:18
    'matthew_2_18_0': {
        title: 'Rachel Weeping',
        references: [
            { verse: 'Jeremiah 31:15', book: 'Jeremiah', chapter: 31, verses: [15, 15] }
        ]
    },
    'matthew_2_18_1': {
        title: 'They Are No More',
        references: [
            { verse: 'Genesis 42:13', book: 'Genesis', chapter: 42, verses: [13, 13] },
            { verse: 'Genesis 42:36', book: 'Genesis', chapter: 42, verses: [36, 36] },
            { verse: 'Lamentations 5:7', book: 'Lamentations', chapter: 5, verses: [7, 7] }
        ]
    },
    // Matthew 2:20
    'matthew_2_20_0': {
        title: 'Those Who Sought the Child\'s Life',
        references: [
            { verse: 'Exodus 4:19', book: 'Exodus', chapter: 4, verses: [19, 19] }
        ]
    },
    // Matthew 2:22
    'matthew_2_22_0': {
        title: 'Warned in a Dream',
        references: [
            { verse: 'Matthew 2:12', book: 'Matthew', chapter: 2, verses: [12, 12] }
        ]
    },
    // Matthew 2:23
    'matthew_2_23_0': {
        title: 'Nazareth',
        references: [
            { verse: 'Matthew 4:13', book: 'Matthew', chapter: 4, verses: [13, 13] },
            { verse: 'Mark 1:9', book: 'Mark', chapter: 1, verses: [9, 9] },
            { verse: 'Luke 1:26', book: 'Luke', chapter: 1, verses: [26, 26] },
            { verse: 'Luke 2:39', book: 'Luke', chapter: 2, verses: [39, 39] },
            { verse: 'Luke 4:16', book: 'Luke', chapter: 4, verses: [16, 16] },
            { verse: 'John 1:45', book: 'John', chapter: 1, verses: [45, 45] }
        ]
    },
    'matthew_2_23_1': {
        title: 'Fulfilled by Prophets',
        references: [
            { verse: 'Matthew 1:22', book: 'Matthew', chapter: 1, verses: [22, 22] },
            { verse: 'Matthew 26:71', book: 'Matthew', chapter: 26, verses: [71, 71] },
            { verse: 'Luke 18:37', book: 'Luke', chapter: 18, verses: [37, 37] },
            { verse: 'John 19:19', book: 'John', chapter: 19, verses: [19, 19] }
        ]
    },
    
    // ============================================================
    // MATTHEW CHAPTER 3 - CROSS REFERENCES
    // ============================================================
    
    // Matthew 3:1
    'matthew_3_1_0': {
        title: 'John the Baptist',
        references: [
            { verse: 'Matthew 3:1-12', book: 'Matthew', chapter: 3, verses: [1, 12] },
            { verse: 'Mark 1:2-8', book: 'Mark', chapter: 1, verses: [2, 8] },
            { verse: 'Luke 3:2-17', book: 'Luke', chapter: 3, verses: [2, 17] }
        ]
    },
    'matthew_3_1_1': {
        title: 'John the Baptist Came',
        references: [
            { verse: 'John 1:6-7', book: 'John', chapter: 1, verses: [6, 7] }
        ]
    },
    'matthew_3_1_2': {
        title: 'Wilderness of Judea',
        references: [
            { verse: 'Joshua 15:61', book: 'Joshua', chapter: 15, verses: [61, 61] },
            { verse: 'Judges 1:16', book: 'Judges', chapter: 1, verses: [16, 16] }
        ]
    },
    // Matthew 3:2
    'matthew_3_2_0': {
        title: 'Repent',
        references: [
            { verse: 'Matthew 4:17', book: 'Matthew', chapter: 4, verses: [17, 17] },
            { verse: 'Mark 1:15', book: 'Mark', chapter: 1, verses: [15, 15] }
        ]
    },
    'matthew_3_2_1': {
        title: 'Kingdom of Heaven',
        references: [
            { verse: 'Matthew 10:7', book: 'Matthew', chapter: 10, verses: [7, 7] },
            { verse: 'Daniel 2:44', book: 'Daniel', chapter: 2, verses: [44, 44] },
            { verse: 'Matthew 6:10', book: 'Matthew', chapter: 6, verses: [10, 10] }
        ]
    },
    // Matthew 3:3
    'matthew_3_3_0': {
        title: 'Voice in the Wilderness',
        references: [
            { verse: 'John 1:23', book: 'John', chapter: 1, verses: [23, 23] },
            { verse: 'Isaiah 40:3', book: 'Isaiah', chapter: 40, verses: [3, 3] }
        ]
    },
    'matthew_3_3_1': {
        title: 'Prepare the Way',
        references: [
            { verse: 'Luke 1:76', book: 'Luke', chapter: 1, verses: [76, 76] }
        ]
    },
    // Matthew 3:4
    'matthew_3_4_0': {
        title: 'Garment of Camel\'s Hair',
        references: [
            { verse: '2 Kings 1:8', book: '2 Kings', chapter: 1, verses: [8, 8] },
            { verse: 'Zechariah 13:4', book: 'Zechariah', chapter: 13, verses: [4, 4] },
            { verse: 'Hebrews 11:37', book: 'Hebrews', chapter: 11, verses: [37, 37] }
        ]
    },
    'matthew_3_4_1': {
        title: 'Locusts',
        references: [
            { verse: 'Leviticus 11:22', book: 'Leviticus', chapter: 11, verses: [22, 22] }
        ]
    },
    'matthew_3_4_2': {
        title: 'Wild Honey',
        references: [
            { verse: '1 Samuel 14:26', book: '1 Samuel', chapter: 14, verses: [26, 26] }
        ]
    },
    // Matthew 3:6
    'matthew_3_6_0': {
        title: 'Confessing Their Sins',
        references: [
            { verse: 'Acts 19:18', book: 'Acts', chapter: 19, verses: [18, 18] }
        ]
    },
    // Matthew 3:7
    'matthew_3_7_0': {
        title: 'Pharisees',
        references: [
            { verse: 'Matthew 23:13', book: 'Matthew', chapter: 23, verses: [13, 13] },
            { verse: 'Matthew 23:15', book: 'Matthew', chapter: 23, verses: [15, 15] }
        ]
    },
    'matthew_3_7_1': {
        title: 'Sadducees',
        references: [
            { verse: 'Matthew 22:23', book: 'Matthew', chapter: 22, verses: [23, 23] }
        ]
    },
    'matthew_3_7_2': {
        title: 'Brood of Vipers',
        references: [
            { verse: 'Matthew 12:34', book: 'Matthew', chapter: 12, verses: [34, 34] },
            { verse: 'Matthew 23:33', book: 'Matthew', chapter: 23, verses: [33, 33] }
        ]
    },
    'matthew_3_7_3': {
        title: 'Vipers',
        references: [
            { verse: 'Psalm 140:3', book: 'Psalms', chapter: 140, verses: [3, 3] }
        ]
    },
    'matthew_3_7_4': {
        title: 'Wrath to Come',
        references: [
            { verse: 'Romans 5:9', book: 'Romans', chapter: 5, verses: [9, 9] },
            { verse: 'Ephesians 5:6', book: 'Ephesians', chapter: 5, verses: [6, 6] },
            { verse: 'Colossians 3:6', book: 'Colossians', chapter: 3, verses: [6, 6] },
            { verse: '1 Thessalonians 1:10', book: '1 Thessalonians', chapter: 1, verses: [10, 10] }
        ]
    },
    // Matthew 3:8
    'matthew_3_8_0': {
        title: 'Fruit in Keeping with Repentance',
        references: [
            { verse: 'Acts 26:20', book: 'Acts', chapter: 26, verses: [20, 20] }
        ]
    },
    // Matthew 3:9
    'matthew_3_9_0': {
        title: 'Abraham as Our Father',
        references: [
            { verse: 'John 8:39', book: 'John', chapter: 8, verses: [39, 39] }
        ]
    },
    'matthew_3_9_1': {
        title: 'Raise Up Children for Abraham',
        references: [
            { verse: 'Luke 19:40', book: 'Luke', chapter: 19, verses: [40, 40] }
        ]
    },
    // Matthew 3:10
    'matthew_3_10_0': {
        title: 'Axe at the Root',
        references: [
            { verse: 'Luke 13:7', book: 'Luke', chapter: 13, verses: [7, 7] },
            { verse: 'Luke 13:9', book: 'Luke', chapter: 13, verses: [9, 9] }
        ]
    },
    'matthew_3_10_1': {
        title: 'Cut Down and Thrown into Fire',
        references: [
            { verse: 'Matthew 7:19', book: 'Matthew', chapter: 7, verses: [19, 19] },
            { verse: 'John 15:6', book: 'John', chapter: 15, verses: [6, 6] }
        ]
    },
    // Matthew 3:11
    'matthew_3_11_0': {
        title: 'I Baptize with Water',
        references: [
            { verse: 'John 1:26', book: 'John', chapter: 1, verses: [26, 26] },
            { verse: 'Acts 1:5', book: 'Acts', chapter: 1, verses: [5, 5] }
        ]
    },
    'matthew_3_11_1': {
        title: 'For Repentance',
        references: [
            { verse: 'Acts 13:24', book: 'Acts', chapter: 13, verses: [24, 24] },
            { verse: 'Acts 19:4', book: 'Acts', chapter: 19, verses: [4, 4] }
        ]
    },
    'matthew_3_11_2': {
        title: 'He Who Is Coming',
        references: [
            { verse: 'John 1:15', book: 'John', chapter: 1, verses: [15, 15] },
            { verse: 'John 1:27', book: 'John', chapter: 1, verses: [27, 27] },
            { verse: 'John 3:30-31', book: 'John', chapter: 3, verses: [30, 31] },
            { verse: 'Acts 13:25', book: 'Acts', chapter: 13, verses: [25, 25] }
        ]
    },
    'matthew_3_11_3': {
        title: 'With the Holy Spirit',
        references: [
            { verse: 'John 1:33', book: 'John', chapter: 1, verses: [33, 33] },
            { verse: 'Acts 11:16', book: 'Acts', chapter: 11, verses: [16, 16] }
        ]
    },
    'matthew_3_11_4': {
        title: 'Fire',
        references: [
            { verse: 'Isaiah 4:4', book: 'Isaiah', chapter: 4, verses: [4, 4] },
            { verse: 'Malachi 3:2-3', book: 'Malachi', chapter: 3, verses: [2, 3] },
            { verse: 'Acts 2:3', book: 'Acts', chapter: 2, verses: [3, 3] }
        ]
    },
    // Matthew 3:12
    'matthew_3_12_0': {
        title: 'Winnowing Fork',
        references: [
            { verse: 'Isaiah 30:24', book: 'Isaiah', chapter: 30, verses: [24, 24] }
        ]
    },
    'matthew_3_12_1': {
        title: 'Gather His Wheat',
        references: [
            { verse: 'Matthew 13:30', book: 'Matthew', chapter: 13, verses: [30, 30] }
        ]
    },
    'matthew_3_12_2': {
        title: 'Burn with Unquenchable Fire',
        references: [
            { verse: 'Matthew 25:41', book: 'Matthew', chapter: 25, verses: [41, 41] },
            { verse: 'Mark 9:43', book: 'Mark', chapter: 9, verses: [43, 43] },
            { verse: 'Mark 9:48', book: 'Mark', chapter: 9, verses: [48, 48] },
            { verse: 'Luke 3:17', book: 'Luke', chapter: 3, verses: [17, 17] }
        ]
    },
    // Matthew 3:13
    'matthew_3_13_0': {
        title: 'The Baptism of Jesus',
        references: [
            { verse: 'Matthew 3:13-17', book: 'Matthew', chapter: 3, verses: [13, 17] },
            { verse: 'Mark 1:9-11', book: 'Mark', chapter: 1, verses: [9, 11] },
            { verse: 'Luke 3:21-22', book: 'Luke', chapter: 3, verses: [21, 22] },
            { verse: 'John 1:32-34', book: 'John', chapter: 1, verses: [32, 34] }
        ]
    },
    'matthew_3_13_1': {
        title: 'From Galilee',
        references: [
            { verse: 'Matthew 2:22', book: 'Matthew', chapter: 2, verses: [22, 22] }
        ]
    },
    // Matthew 3:14
    'matthew_3_14_0': {
        title: 'John Would Have Prevented Him',
        references: [
            { verse: 'John 13:6', book: 'John', chapter: 13, verses: [6, 6] }
        ]
    },
    // Matthew 3:16
    'matthew_3_16_0': {
        title: 'Heavens Were Opened',
        references: [
            { verse: 'Acts 7:56', book: 'Acts', chapter: 7, verses: [56, 56] }
        ]
    },
    'matthew_3_16_1': {
        title: 'Spirit Descending Like a Dove',
        references: [
            { verse: 'John 1:32-33', book: 'John', chapter: 1, verses: [32, 33] },
            { verse: 'Luke 4:18', book: 'Luke', chapter: 4, verses: [18, 18] },
            { verse: 'Luke 4:1', book: 'Luke', chapter: 4, verses: [1, 1] },
            { verse: 'Acts 10:38', book: 'Acts', chapter: 10, verses: [38, 38] }
        ]
    },
    // Matthew 3:17
    'matthew_3_17_0': {
        title: 'Voice from Heaven',
        references: [
            { verse: 'Matthew 17:5', book: 'Matthew', chapter: 17, verses: [5, 5] },
            { verse: 'Mark 9:7', book: 'Mark', chapter: 9, verses: [7, 7] },
            { verse: 'Luke 9:35', book: 'Luke', chapter: 9, verses: [35, 35] },
            { verse: '2 Peter 1:17', book: '2 Peter', chapter: 1, verses: [17, 17] }
        ]
    },
    'matthew_3_17_1': {
        title: 'My Beloved Son',
        references: [
            { verse: 'Psalm 2:7', book: 'Psalms', chapter: 2, verses: [7, 7] },
            { verse: 'Isaiah 42:1', book: 'Isaiah', chapter: 42, verses: [1, 1] },
            { verse: 'Matthew 12:18', book: 'Matthew', chapter: 12, verses: [18, 18] },
            { verse: 'Mark 1:11', book: 'Mark', chapter: 1, verses: [11, 11] },
            { verse: 'Luke 3:22', book: 'Luke', chapter: 3, verses: [22, 22] },
            { verse: 'Ephesians 1:6', book: 'Ephesians', chapter: 1, verses: [6, 6] },
            { verse: 'Colossians 1:13', book: 'Colossians', chapter: 1, verses: [13, 13] }
        ]
    },
    
    // ============================================================
    // MATTHEW CHAPTER 7 - CROSS REFERENCES
    // ============================================================
    
    // Matthew 7:1
    'matthew_7_1_0': {
        title: 'Judge Not',
        references: [
            { verse: 'Matthew 7:1-5', book: 'Matthew', chapter: 7, verses: [1, 5] },
            { verse: 'Luke 6:37-38', book: 'Luke', chapter: 6, verses: [37, 38] },
            { verse: 'Luke 6:41-42', book: 'Luke', chapter: 6, verses: [41, 42] },
            { verse: 'Romans 14:13', book: 'Romans', chapter: 14, verses: [13, 13] },
            { verse: '1 Corinthians 4:5', book: '1 Corinthians', chapter: 4, verses: [5, 5] },
            { verse: 'James 5:9', book: 'James', chapter: 5, verses: [9, 9] }
        ]
    },
    // Matthew 7:2
    'matthew_7_2_0': {
        title: 'With the Judgment',
        references: [
            { verse: 'Romans 2:1', book: 'Romans', chapter: 2, verses: [1, 1] },
            { verse: 'Romans 2:3', book: 'Romans', chapter: 2, verses: [3, 3] },
            { verse: 'Romans 14:10', book: 'Romans', chapter: 14, verses: [10, 10] },
            { verse: 'James 2:13', book: 'James', chapter: 2, verses: [13, 13] },
            { verse: 'James 4:11-12', book: 'James', chapter: 4, verses: [11, 12] }
        ]
    },
    'matthew_7_2_1': {
        title: 'With the Measure',
        references: [
            { verse: 'Mark 4:24', book: 'Mark', chapter: 4, verses: [24, 24] },
            { verse: 'Judges 1:7', book: 'Judges', chapter: 1, verses: [7, 7] }
        ]
    },
    // Matthew 7:3
    'matthew_7_3_0': {
        title: 'The Log in Your Own Eye',
        references: [
            { verse: 'John 8:7-9', book: 'John', chapter: 8, verses: [7, 9] }
        ]
    },
    // Matthew 7:6
    'matthew_7_6_0': {
        title: 'Do Not Give Dogs',
        references: [
            { verse: 'Matthew 15:26', book: 'Matthew', chapter: 15, verses: [26, 26] },
            { verse: 'Proverbs 9:7-8', book: 'Proverbs', chapter: 9, verses: [7, 8] },
            { verse: 'Proverbs 23:9', book: 'Proverbs', chapter: 23, verses: [9, 9] }
        ]
    },
    'matthew_7_6_1': {
        title: 'Dogs',
        references: [
            { verse: 'Philippians 3:2', book: 'Philippians', chapter: 3, verses: [2, 2] },
            { verse: 'Revelation 22:15', book: 'Revelation', chapter: 22, verses: [15, 15] }
        ]
    },
    'matthew_7_6_2': {
        title: 'Pearls',
        references: [
            { verse: 'Matthew 13:46', book: 'Matthew', chapter: 13, verses: [46, 46] }
        ]
    },
    // Matthew 7:7
    'matthew_7_7_0': {
        title: 'Ask, Seek, Knock',
        references: [
            { verse: 'Matthew 7:7-11', book: 'Matthew', chapter: 7, verses: [7, 11] },
            { verse: 'Luke 11:9-13', book: 'Luke', chapter: 11, verses: [9, 13] }
        ]
    },
    'matthew_7_7_1': {
        title: 'Ask and It Will Be Given',
        references: [
            { verse: 'Matthew 18:19', book: 'Matthew', chapter: 18, verses: [19, 19] },
            { verse: 'Matthew 21:22', book: 'Matthew', chapter: 21, verses: [22, 22] },
            { verse: 'Mark 11:24', book: 'Mark', chapter: 11, verses: [24, 24] },
            { verse: 'John 14:13', book: 'John', chapter: 14, verses: [13, 13] },
            { verse: 'John 15:7', book: 'John', chapter: 15, verses: [7, 7] },
            { verse: 'John 15:16', book: 'John', chapter: 15, verses: [16, 16] },
            { verse: 'John 16:23-24', book: 'John', chapter: 16, verses: [23, 24] },
            { verse: 'James 1:5-6', book: 'James', chapter: 1, verses: [5, 6] },
            { verse: 'James 1:17', book: 'James', chapter: 1, verses: [17, 17] },
            { verse: '1 John 3:22', book: '1 John', chapter: 3, verses: [22, 22] },
            { verse: '1 John 5:14-15', book: '1 John', chapter: 5, verses: [14, 15] }
        ]
    },
    'matthew_7_7_2': {
        title: 'Seek and You Will Find',
        references: [
            { verse: '1 Chronicles 28:9', book: '1 Chronicles', chapter: 28, verses: [9, 9] },
            { verse: '2 Chronicles 15:2', book: '2 Chronicles', chapter: 15, verses: [2, 2] },
            { verse: 'Proverbs 8:17', book: 'Proverbs', chapter: 8, verses: [17, 17] },
            { verse: 'Jeremiah 29:13', book: 'Jeremiah', chapter: 29, verses: [13, 13] },
            { verse: 'Isaiah 55:6', book: 'Isaiah', chapter: 55, verses: [6, 6] }
        ]
    },
    'matthew_7_7_3': {
        title: 'Knock and It Will Be Opened',
        references: [
            { verse: 'Revelation 3:20', book: 'Revelation', chapter: 3, verses: [20, 20] }
        ]
    },
    // Matthew 7:9
    'matthew_7_9_0': {
        title: 'Bread',
        references: [
            { verse: 'Luke 11:11-12', book: 'Luke', chapter: 11, verses: [11, 12] }
        ]
    },
    'matthew_7_9_1': {
        title: 'A Stone',
        references: [
            { verse: 'Matthew 4:3', book: 'Matthew', chapter: 4, verses: [3, 3] }
        ]
    },
    // Matthew 7:11
    'matthew_7_11_0': {
        title: 'Who Are Evil',
        references: [
            { verse: 'Genesis 6:5', book: 'Genesis', chapter: 6, verses: [5, 5] },
            { verse: 'Genesis 8:21', book: 'Genesis', chapter: 8, verses: [21, 21] },
            { verse: 'Luke 11:13', book: 'Luke', chapter: 11, verses: [13, 13] }
        ]
    },
    'matthew_7_11_1': {
        title: 'How Much More',
        references: [
            { verse: 'Romans 8:32', book: 'Romans', chapter: 8, verses: [32, 32] }
        ]
    },
    // Matthew 7:12
    'matthew_7_12_0': {
        title: 'The Golden Rule',
        references: [
            { verse: 'Luke 6:31', book: 'Luke', chapter: 6, verses: [31, 31] }
        ]
    },
    'matthew_7_12_1': {
        title: 'Whatever You Wish',
        references: [
            { verse: 'Matthew 22:40', book: 'Matthew', chapter: 22, verses: [40, 40] },
            { verse: 'Romans 13:8-10', book: 'Romans', chapter: 13, verses: [8, 10] },
            { verse: 'Galatians 5:14', book: 'Galatians', chapter: 5, verses: [14, 14] }
        ]
    },
    'matthew_7_12_2': {
        title: 'The Law and the Prophets',
        references: [
            { verse: 'Matthew 22:40', book: 'Matthew', chapter: 22, verses: [40, 40] }
        ]
    },
    // Matthew 7:13
    'matthew_7_13_0': {
        title: 'Enter by the Narrow Gate',
        references: [
            { verse: 'Luke 13:24', book: 'Luke', chapter: 13, verses: [24, 24] }
        ]
    },
    // Matthew 7:14
    'matthew_7_14_0': {
        title: 'The Way is Hard',
        references: [
            { verse: 'Psalm 16:11', book: 'Psalms', chapter: 16, verses: [11, 11] },
            { verse: 'Matthew 18:8', book: 'Matthew', chapter: 18, verses: [8, 8] },
            { verse: 'John 14:6', book: 'John', chapter: 14, verses: [6, 6] }
        ]
    },
    'matthew_7_14_1': {
        title: 'Those Who Find It Are Few',
        references: [
            { verse: 'Luke 13:23', book: 'Luke', chapter: 13, verses: [23, 23] }
        ]
    },
    // Matthew 7:15
    'matthew_7_15_0': {
        title: 'Beware of False Prophets',
        references: [
            { verse: 'Matthew 24:11', book: 'Matthew', chapter: 24, verses: [11, 11] },
            { verse: 'Matthew 24:24', book: 'Matthew', chapter: 24, verses: [24, 24] },
            { verse: 'Deuteronomy 13:1-3', book: 'Deuteronomy', chapter: 13, verses: [1, 3] },
            { verse: 'Jeremiah 14:14', book: 'Jeremiah', chapter: 14, verses: [14, 14] },
            { verse: 'Jeremiah 23:16', book: 'Jeremiah', chapter: 23, verses: [16, 16] },
            { verse: 'Mark 13:22', book: 'Mark', chapter: 13, verses: [22, 22] },
            { verse: 'Luke 6:26', book: 'Luke', chapter: 6, verses: [26, 26] },
            { verse: 'Acts 13:6', book: 'Acts', chapter: 13, verses: [6, 6] },
            { verse: '2 Peter 2:1', book: '2 Peter', chapter: 2, verses: [1, 1] },
            { verse: '1 John 4:1', book: '1 John', chapter: 4, verses: [1, 1] }
        ]
    },
    'matthew_7_15_1': {
        title: 'Ravenous Wolves',
        references: [
            { verse: 'Ezekiel 22:27', book: 'Ezekiel', chapter: 22, verses: [27, 27] },
            { verse: 'Acts 20:29', book: 'Acts', chapter: 20, verses: [29, 29] },
            { verse: 'Micah 3:5', book: 'Micah', chapter: 3, verses: [5, 5] },
            { verse: 'John 10:12', book: 'John', chapter: 10, verses: [12, 12] }
        ]
    },
    // Matthew 7:16
    'matthew_7_16_0': {
        title: 'By Their Fruits',
        references: [
            { verse: 'Luke 6:43-44', book: 'Luke', chapter: 6, verses: [43, 44] },
            { verse: 'James 2:18', book: 'James', chapter: 2, verses: [18, 18] }
        ]
    },
    // Matthew 7:17
    'matthew_7_17_0': {
        title: 'Every Healthy Tree',
        references: [
            { verse: 'Matthew 12:33-35', book: 'Matthew', chapter: 12, verses: [33, 35] }
        ]
    },
    // Matthew 7:19
    'matthew_7_19_0': {
        title: 'Cut Down and Thrown into Fire',
        references: [
            { verse: 'Matthew 3:10', book: 'Matthew', chapter: 3, verses: [10, 10] },
            { verse: 'John 15:6', book: 'John', chapter: 15, verses: [6, 6] }
        ]
    },
    // Matthew 7:21
    'matthew_7_21_0': {
        title: 'Not Everyone Who Says Lord',
        references: [
            { verse: 'Luke 6:46', book: 'Luke', chapter: 6, verses: [46, 46] },
            { verse: 'Romans 2:13', book: 'Romans', chapter: 2, verses: [13, 13] },
            { verse: 'James 1:22', book: 'James', chapter: 1, verses: [22, 22] }
        ]
    },
    'matthew_7_21_1': {
        title: 'Says to Me Lord, Lord',
        references: [
            { verse: 'Hosea 8:2', book: 'Hosea', chapter: 8, verses: [2, 2] }
        ]
    },
    'matthew_7_21_2': {
        title: 'Will Enter the Kingdom',
        references: [
            { verse: 'John 3:3', book: 'John', chapter: 3, verses: [3, 3] },
            { verse: 'John 3:5', book: 'John', chapter: 3, verses: [5, 5] }
        ]
    },
    'matthew_7_21_3': {
        title: 'Does the Will of My Father',
        references: [
            { verse: 'Matthew 12:50', book: 'Matthew', chapter: 12, verses: [50, 50] }
        ]
    },
    // Matthew 7:22
    'matthew_7_22_0': {
        title: 'On That Day',
        references: [
            { verse: 'Matthew 25:11-12', book: 'Matthew', chapter: 25, verses: [11, 12] },
            { verse: 'Luke 13:25-27', book: 'Luke', chapter: 13, verses: [25, 27] }
        ]
    },
    'matthew_7_22_1': {
        title: 'Many Will Say',
        references: [
            { verse: 'Malachi 3:17-18', book: 'Malachi', chapter: 3, verses: [17, 18] }
        ]
    },
    'matthew_7_22_2': {
        title: 'Prophesy in Your Name',
        references: [
            { verse: 'Numbers 24:4', book: 'Numbers', chapter: 24, verses: [4, 4] },
            { verse: 'John 11:51', book: 'John', chapter: 11, verses: [51, 51] },
            { verse: '1 Corinthians 13:2', book: '1 Corinthians', chapter: 13, verses: [2, 2] }
        ]
    },
    'matthew_7_22_3': {
        title: 'In Your Name',
        references: [
            { verse: 'Matthew 7:21-23', book: 'Matthew', chapter: 7, verses: [21, 23] },
            { verse: 'Acts 19:13-16', book: 'Acts', chapter: 19, verses: [13, 16] }
        ]
    },
    // Matthew 7:23
    'matthew_7_23_0': {
        title: 'I Never Knew You',
        references: [
            { verse: 'Psalm 6:8', book: 'Psalms', chapter: 6, verses: [8, 8] },
            { verse: 'Luke 13:25', book: 'Luke', chapter: 13, verses: [25, 25] },
            { verse: 'Luke 13:27', book: 'Luke', chapter: 13, verses: [27, 27] }
        ]
    },
    'matthew_7_23_1': {
        title: 'Depart from Me',
        references: [
            { verse: 'Matthew 25:41', book: 'Matthew', chapter: 25, verses: [41, 41] }
        ]
    },
    'matthew_7_23_2': {
        title: 'You Workers of Lawlessness',
        references: [
            { verse: 'Psalm 5:5', book: 'Psalms', chapter: 5, verses: [5, 5] }
        ]
    },
    // Matthew 7:24
    'matthew_7_24_0': {
        title: 'Hears These Words',
        references: [
            { verse: 'Matthew 7:24-27', book: 'Matthew', chapter: 7, verses: [24, 27] },
            { verse: 'Luke 6:47-49', book: 'Luke', chapter: 6, verses: [47, 49] }
        ]
    },
    'matthew_7_24_1': {
        title: 'A Wise Man',
        references: [
            { verse: 'Matthew 25:2', book: 'Matthew', chapter: 25, verses: [2, 2] },
            { verse: 'Ezekiel 13:10-14', book: 'Ezekiel', chapter: 13, verses: [10, 14] }
        ]
    },
    // Matthew 7:26
    'matthew_7_26_0': {
        title: 'A Foolish Man',
        references: [
            { verse: 'Matthew 7:24', book: 'Matthew', chapter: 7, verses: [24, 24] }
        ]
    },
    // Matthew 7:28
    'matthew_7_28_0': {
        title: 'The Crowds Were Astonished',
        references: [
            { verse: 'Matthew 13:54', book: 'Matthew', chapter: 13, verses: [54, 54] },
            { verse: 'Matthew 22:33', book: 'Matthew', chapter: 22, verses: [33, 33] },
            { verse: 'Mark 1:22', book: 'Mark', chapter: 1, verses: [22, 22] },
            { verse: 'Mark 6:2', book: 'Mark', chapter: 6, verses: [2, 2] },
            { verse: 'Mark 11:18', book: 'Mark', chapter: 11, verses: [18, 18] },
            { verse: 'Luke 4:32', book: 'Luke', chapter: 4, verses: [32, 32] },
            { verse: 'Acts 13:12', book: 'Acts', chapter: 13, verses: [12, 12] }
        ]
    },
    // Matthew 7:29
    'matthew_7_29_0': {
        title: 'As One Who Had Authority',
        references: [
            { verse: 'John 7:46', book: 'John', chapter: 7, verses: [46, 46] }
        ]
    },
    // Matthew 8:1
    'matthew_8_1_0': {
        title: 'Down from the Mountain',
        references: [
            { verse: 'Matthew 5:1', book: 'Matthew', chapter: 5, verses: [1, 1] }
        ]
    },
    'matthew_8_1_1': {
        title: 'Great Crowds Followed',
        references: [
            { verse: 'Matthew 4:25', book: 'Matthew', chapter: 4, verses: [25, 25] },
            { verse: 'Matthew 12:15', book: 'Matthew', chapter: 12, verses: [15, 15] },
            { verse: 'Matthew 19:2', book: 'Matthew', chapter: 19, verses: [2, 2] }
        ]
    },
    // Matthew 8:2
    'matthew_8_2_0': {
        title: 'A Leper Came',
        references: [
            { verse: 'Mark 1:40-44', book: 'Mark', chapter: 1, verses: [40, 44] },
            { verse: 'Luke 5:12-14', book: 'Luke', chapter: 5, verses: [12, 14] }
        ]
    },
    'matthew_8_2_1': {
        title: 'Knelt Before Him',
        references: [
            { verse: 'Matthew 9:18', book: 'Matthew', chapter: 9, verses: [18, 18] },
            { verse: 'Matthew 15:25', book: 'Matthew', chapter: 15, verses: [25, 25] },
            { verse: 'Matthew 20:20', book: 'Matthew', chapter: 20, verses: [20, 20] }
        ]
    },
    // Matthew 8:4
    'matthew_8_4_0': {
        title: 'Say Nothing',
        references: [
            { verse: 'Matthew 9:30', book: 'Matthew', chapter: 9, verses: [30, 30] },
            { verse: 'Matthew 12:16', book: 'Matthew', chapter: 12, verses: [16, 16] },
            { verse: 'Matthew 16:20', book: 'Matthew', chapter: 16, verses: [20, 20] },
            { verse: 'Matthew 17:9', book: 'Matthew', chapter: 17, verses: [9, 9] }
        ]
    },
    'matthew_8_4_1': {
        title: 'Show Yourself to the Priest',
        references: [
            { verse: 'Leviticus 13:49', book: 'Leviticus', chapter: 13, verses: [49, 49] },
            { verse: 'Leviticus 14:2-32', book: 'Leviticus', chapter: 14, verses: [2, 32] },
            { verse: 'Luke 17:14', book: 'Luke', chapter: 17, verses: [14, 14] }
        ]
    },
    'matthew_8_4_2': {
        title: 'Offer the Gift',
        references: [
            { verse: 'Leviticus 14:4-32', book: 'Leviticus', chapter: 14, verses: [4, 32] }
        ]
    },
    'matthew_8_4_3': {
        title: 'Moses Commanded',
        references: [
            { verse: 'Mark 1:44', book: 'Mark', chapter: 1, verses: [44, 44] }
        ]
    },
    'matthew_8_4_4': {
        title: 'For a Proof',
        references: [
            { verse: 'Matthew 10:18', book: 'Matthew', chapter: 10, verses: [18, 18] },
            { verse: 'Mark 6:11', book: 'Mark', chapter: 6, verses: [11, 11] },
            { verse: 'Luke 5:14', book: 'Luke', chapter: 5, verses: [14, 14] }
        ]
    },
    // Matthew 8:5
    'matthew_8_5_0': {
        title: 'Centurion in Capernaum',
        references: [
            { verse: 'Luke 7:1-10', book: 'Luke', chapter: 7, verses: [1, 10] }
        ]
    },
    // Matthew 8:8
    'matthew_8_8_0': {
        title: 'Only Say the Word',
        references: [
            { verse: 'Psalm 107:20', book: 'Psalms', chapter: 107, verses: [20, 20] }
        ]
    },
    // Matthew 8:10
    'matthew_8_10_0': {
        title: 'Jesus Marveled',
        references: [
            { verse: 'Matthew 15:28', book: 'Matthew', chapter: 15, verses: [28, 28] },
            { verse: 'Luke 7:9', book: 'Luke', chapter: 7, verses: [9, 9] }
        ]
    },
    'matthew_8_10_1': {
        title: 'Truly, I Tell You',
        references: [
            { verse: 'Matthew 5:18', book: 'Matthew', chapter: 5, verses: [18, 18] }
        ]
    },
    'matthew_8_10_2': {
        title: 'Such Faith in Israel',
        references: [
            { verse: 'Luke 18:8', book: 'Luke', chapter: 18, verses: [8, 8] }
        ]
    },
    // Matthew 8:11
    'matthew_8_11_0': {
        title: 'I Tell You',
        references: [
            { verse: 'Matthew 5:18', book: 'Matthew', chapter: 5, verses: [18, 18] }
        ]
    },
    'matthew_8_11_1': {
        title: 'Many From East and West',
        references: [
            { verse: 'Genesis 22:18', book: 'Genesis', chapter: 22, verses: [18, 18] },
            { verse: 'Genesis 49:10', book: 'Genesis', chapter: 49, verses: [10, 10] },
            { verse: 'Malachi 1:11', book: 'Malachi', chapter: 1, verses: [11, 11] },
            { verse: 'Luke 13:29', book: 'Luke', chapter: 13, verses: [29, 29] },
            { verse: 'Acts 10:45', book: 'Acts', chapter: 10, verses: [45, 45] },
            { verse: 'Acts 11:18', book: 'Acts', chapter: 11, verses: [18, 18] },
            { verse: 'Acts 14:27', book: 'Acts', chapter: 14, verses: [27, 27] },
            { verse: 'Galatians 3:28-29', book: 'Galatians', chapter: 3, verses: [28, 29] },
            { verse: 'Ephesians 3:6', book: 'Ephesians', chapter: 3, verses: [6, 6] },
            { verse: 'Colossians 3:11', book: 'Colossians', chapter: 3, verses: [11, 11] }
        ]
    },
    // Matthew 8:12
    'matthew_8_12_0': {
        title: 'Sons of the Kingdom',
        references: [
            { verse: 'Matthew 21:43', book: 'Matthew', chapter: 21, verses: [43, 43] },
            { verse: 'Luke 13:28', book: 'Luke', chapter: 13, verses: [28, 28] },
            { verse: 'John 8:39', book: 'John', chapter: 8, verses: [39, 39] },
            { verse: 'Romans 9:4', book: 'Romans', chapter: 9, verses: [4, 4] }
        ]
    },
    'matthew_8_12_1': {
        title: 'Outer Darkness',
        references: [
            { verse: 'Matthew 22:13', book: 'Matthew', chapter: 22, verses: [13, 13] },
            { verse: 'Matthew 25:30', book: 'Matthew', chapter: 25, verses: [30, 30] }
        ]
    },
    'matthew_8_12_2': {
        title: 'Weeping and Gnashing',
        references: [
            { verse: 'Matthew 13:42', book: 'Matthew', chapter: 13, verses: [42, 42] },
            { verse: 'Matthew 13:50', book: 'Matthew', chapter: 13, verses: [50, 50] },
            { verse: 'Matthew 24:51', book: 'Matthew', chapter: 24, verses: [51, 51] },
            { verse: 'Luke 13:28', book: 'Luke', chapter: 13, verses: [28, 28] }
        ]
    },
    // Matthew 8:13
    'matthew_8_13_0': {
        title: 'Go, Let It Be Done',
        references: [
            { verse: 'Matthew 15:28', book: 'Matthew', chapter: 15, verses: [28, 28] }
        ]
    },
    'matthew_8_13_1': {
        title: 'As You Have Believed',
        references: [
            { verse: 'Matthew 9:29', book: 'Matthew', chapter: 9, verses: [29, 29] }
        ]
    },
    // Matthew 8:14
    'matthew_8_14_0': {
        title: 'Jesus Entered',
        references: [
            { verse: 'Mark 1:29-31', book: 'Mark', chapter: 1, verses: [29, 31] },
            { verse: 'Luke 4:38-39', book: 'Luke', chapter: 4, verses: [38, 39] }
        ]
    },
    'matthew_8_14_1': {
        title: 'Peter\'s House',
        references: [
            { verse: '1 Corinthians 9:5', book: '1 Corinthians', chapter: 9, verses: [5, 5] }
        ]
    },
    'matthew_8_14_2': {
        title: 'His Mother-in-Law',
        references: [
            { verse: 'Mark 1:30', book: 'Mark', chapter: 1, verses: [30, 30] }
        ]
    },
    // Matthew 8:15
    'matthew_8_15_0': {
        title: 'Touched Her Hand',
        references: [
            { verse: 'Matthew 9:25', book: 'Matthew', chapter: 9, verses: [25, 25] },
            { verse: 'Matthew 9:29', book: 'Matthew', chapter: 9, verses: [29, 29] }
        ]
    },
    // Matthew 8:16
    'matthew_8_16_0': {
        title: 'Oppressed by Demons',
        references: [
            { verse: 'Matthew 4:24', book: 'Matthew', chapter: 4, verses: [24, 24] },
            { verse: 'Mark 1:32-34', book: 'Mark', chapter: 1, verses: [32, 34] },
            { verse: 'Luke 4:40-41', book: 'Luke', chapter: 4, verses: [40, 41] }
        ]
    },
    'matthew_8_16_1': {
        title: 'With a Word',
        references: [
            { verse: 'Matthew 8:8', book: 'Matthew', chapter: 8, verses: [8, 8] }
        ]
    },
    // Matthew 8:17
    'matthew_8_17_0': {
        title: 'To Fulfill',
        references: [
            { verse: 'Matthew 1:22', book: 'Matthew', chapter: 1, verses: [22, 22] }
        ]
    },
    'matthew_8_17_1': {
        title: 'He Took Our Illnesses',
        references: [
            { verse: 'Isaiah 53:4', book: 'Isaiah', chapter: 53, verses: [4, 4] },
            { verse: '1 Peter 2:24', book: '1 Peter', chapter: 2, verses: [24, 24] }
        ]
    },
    // Matthew 8:18
    'matthew_8_18_0': {
        title: 'Saw a Crowd',
        references: [
            { verse: 'Mark 4:35', book: 'Mark', chapter: 4, verses: [35, 35] },
            { verse: 'Luke 8:22', book: 'Luke', chapter: 8, verses: [22, 22] }
        ]
    },
    'matthew_8_18_1': {
        title: 'Orders to Cross',
        references: [
            { verse: 'Matthew 14:22', book: 'Matthew', chapter: 14, verses: [22, 22] }
        ]
    },
    // Matthew 8:19
    'matthew_8_19_0': {
        title: 'A Scribe Came',
        references: [
            { verse: 'Luke 9:57-62', book: 'Luke', chapter: 9, verses: [57, 62] }
        ]
    },
    // Matthew 8:22
    'matthew_8_22_0': {
        title: 'Let the Dead Bury Their Dead',
        references: [
            { verse: 'Luke 9:60', book: 'Luke', chapter: 9, verses: [60, 60] },
            { verse: 'John 5:25', book: 'John', chapter: 5, verses: [25, 25] },
            { verse: 'Ephesians 2:1', book: 'Ephesians', chapter: 2, verses: [1, 1] },
            { verse: 'Ephesians 2:5', book: 'Ephesians', chapter: 2, verses: [5, 5] }
        ]
    },
    // Matthew 8:23
    'matthew_8_23_0': {
        title: 'Into the Boat',
        references: [
            { verse: 'Mark 4:36-41', book: 'Mark', chapter: 4, verses: [36, 41] },
            { verse: 'Luke 8:22-25', book: 'Luke', chapter: 8, verses: [22, 25] }
        ]
    },
    // Matthew 8:24
    'matthew_8_24_0': {
        title: 'He Was Asleep',
        references: [
            { verse: 'Mark 4:38', book: 'Mark', chapter: 4, verses: [38, 38] },
            { verse: 'Luke 8:23', book: 'Luke', chapter: 8, verses: [23, 23] }
        ]
    },
    // Matthew 8:25
    'matthew_8_25_0': {
        title: 'Save Us, Lord',
        references: [
            { verse: 'Psalm 107:28-29', book: 'Psalms', chapter: 107, verses: [28, 29] }
        ]
    },
    // Matthew 8:26
    'matthew_8_26_0': {
        title: 'Why Are You Afraid',
        references: [
            { verse: 'Matthew 6:30', book: 'Matthew', chapter: 6, verses: [30, 30] }
        ]
    },
    'matthew_8_26_1': {
        title: 'O You of Little Faith',
        references: [
            { verse: 'Matthew 14:31', book: 'Matthew', chapter: 14, verses: [31, 31] },
            { verse: 'Matthew 16:8', book: 'Matthew', chapter: 16, verses: [8, 8] }
        ]
    },
    'matthew_8_26_2': {
        title: 'Rebuked the Winds',
        references: [
            { verse: 'Psalm 65:7', book: 'Psalms', chapter: 65, verses: [7, 7] },
            { verse: 'Psalm 89:9', book: 'Psalms', chapter: 89, verses: [9, 9] },
            { verse: 'Psalm 107:29', book: 'Psalms', chapter: 107, verses: [29, 29] }
        ]
    },
    'matthew_8_26_3': {
        title: 'Great Calm',
        references: [
            { verse: 'Psalm 107:29', book: 'Psalms', chapter: 107, verses: [29, 29] }
        ]
    },
    // Matthew 8:27
    'matthew_8_27_0': {
        title: 'The Men Marveled',
        references: [
            { verse: 'Mark 1:27', book: 'Mark', chapter: 1, verses: [27, 27] }
        ]
    },
    // Matthew 8:28
    'matthew_8_28_0': {
        title: 'The Gadarenes',
        references: [
            { verse: 'Mark 5:1-20', book: 'Mark', chapter: 5, verses: [1, 20] },
            { verse: 'Luke 8:26-39', book: 'Luke', chapter: 8, verses: [26, 39] }
        ]
    },
    'matthew_8_28_1': {
        title: 'Demon-Possessed Men',
        references: [
            { verse: 'Matthew 4:24', book: 'Matthew', chapter: 4, verses: [24, 24] }
        ]
    },
    // Matthew 8:29
    'matthew_8_29_0': {
        title: 'They Cried Out',
        references: [
            { verse: 'Mark 1:24', book: 'Mark', chapter: 1, verses: [24, 24] },
            { verse: 'Luke 4:34', book: 'Luke', chapter: 4, verses: [34, 34] }
        ]
    },
    'matthew_8_29_1': {
        title: 'Son of God',
        references: [
            { verse: 'Matthew 4:3', book: 'Matthew', chapter: 4, verses: [3, 3] },
            { verse: 'Mark 3:11', book: 'Mark', chapter: 3, verses: [11, 11] },
            { verse: 'Luke 8:28', book: 'Luke', chapter: 8, verses: [28, 28] },
            { verse: 'James 2:19', book: 'James', chapter: 2, verses: [19, 19] }
        ]
    },
    'matthew_8_29_2': {
        title: 'Before the Time',
        references: [
            { verse: '2 Peter 2:4', book: '2 Peter', chapter: 2, verses: [4, 4] },
            { verse: 'Jude 1:6', book: 'Jude', chapter: 1, verses: [6, 6] }
        ]
    },
    // Matthew 8:34
    'matthew_8_34_0': {
        title: 'Begged Him to Leave',
        references: [
            { verse: 'Deuteronomy 5:25', book: 'Deuteronomy', chapter: 5, verses: [25, 25] },
            { verse: '1 Kings 17:18', book: '1 Kings', chapter: 17, verses: [18, 18] },
            { verse: 'Job 21:14', book: 'Job', chapter: 21, verses: [14, 14] },
            { verse: 'Luke 5:8', book: 'Luke', chapter: 5, verses: [8, 8] },
            { verse: 'Luke 8:37', book: 'Luke', chapter: 8, verses: [37, 37] },
            { verse: 'Acts 16:39', book: 'Acts', chapter: 16, verses: [39, 39] }
        ]
    },
    // Matthew 9:1
    'matthew_9_1_0': {
        title: 'Getting Into a Boat',
        references: [
            { verse: 'Mark 5:18-21', book: 'Mark', chapter: 5, verses: [18, 21] },
            { verse: 'Luke 8:37-40', book: 'Luke', chapter: 8, verses: [37, 40] }
        ]
    },
    'matthew_9_1_1': {
        title: 'His Own City',
        references: [
            { verse: 'Matthew 4:13', book: 'Matthew', chapter: 4, verses: [13, 13] },
            { verse: 'Mark 2:1', book: 'Mark', chapter: 2, verses: [1, 1] }
        ]
    },
    // Matthew 9:2
    'matthew_9_2_0': {
        title: 'Brought a Paralytic',
        references: [
            { verse: 'Matthew 9:2-8', book: 'Matthew', chapter: 9, verses: [2, 8] },
            { verse: 'Mark 2:3-12', book: 'Mark', chapter: 2, verses: [3, 12] },
            { verse: 'Luke 5:18-26', book: 'Luke', chapter: 5, verses: [18, 26] }
        ]
    },
    'matthew_9_2_1': {
        title: 'Saw Their Faith',
        references: [
            { verse: 'Matthew 8:10', book: 'Matthew', chapter: 8, verses: [10, 10] },
            { verse: 'Matthew 8:13', book: 'Matthew', chapter: 8, verses: [13, 13] },
            { verse: 'Matthew 15:28', book: 'Matthew', chapter: 15, verses: [28, 28] },
            { verse: 'Mark 10:52', book: 'Mark', chapter: 10, verses: [52, 52] },
            { verse: 'Luke 7:9', book: 'Luke', chapter: 7, verses: [9, 9] },
            { verse: 'Luke 7:50', book: 'Luke', chapter: 7, verses: [50, 50] },
            { verse: 'Luke 17:19', book: 'Luke', chapter: 17, verses: [19, 19] },
            { verse: 'Luke 18:42', book: 'Luke', chapter: 18, verses: [42, 42] },
            { verse: 'Acts 3:16', book: 'Acts', chapter: 3, verses: [16, 16] },
            { verse: 'Acts 14:9', book: 'Acts', chapter: 14, verses: [9, 9] },
            { verse: 'James 5:15', book: 'James', chapter: 5, verses: [15, 15] }
        ]
    },
    'matthew_9_2_2': {
        title: 'Take Heart, My Son',
        references: [
            { verse: 'Matthew 9:22', book: 'Matthew', chapter: 9, verses: [22, 22] },
            { verse: 'Matthew 14:27', book: 'Matthew', chapter: 14, verses: [27, 27] },
            { verse: 'Mark 6:50', book: 'Mark', chapter: 6, verses: [50, 50] },
            { verse: 'John 16:33', book: 'John', chapter: 16, verses: [33, 33] },
            { verse: 'Acts 23:11', book: 'Acts', chapter: 23, verses: [11, 11] }
        ]
    },
    'matthew_9_2_3': {
        title: 'Your Sins Are Forgiven',
        references: [
            { verse: 'Psalm 32:2', book: 'Psalms', chapter: 32, verses: [2, 2] },
            { verse: 'Psalm 103:3', book: 'Psalms', chapter: 103, verses: [3, 3] },
            { verse: 'Isaiah 53:11', book: 'Isaiah', chapter: 53, verses: [11, 11] },
            { verse: 'Micah 7:18-19', book: 'Micah', chapter: 7, verses: [18, 19] },
            { verse: 'Luke 5:20', book: 'Luke', chapter: 5, verses: [20, 20] },
            { verse: 'Luke 7:48', book: 'Luke', chapter: 7, verses: [48, 48] }
        ]
    },
    // Matthew 9:3
    'matthew_9_3_0': {
        title: 'This Man Is Blaspheming',
        references: [
            { verse: 'Matthew 26:65', book: 'Matthew', chapter: 26, verses: [65, 65] },
            { verse: 'Mark 2:7', book: 'Mark', chapter: 2, verses: [7, 7] },
            { verse: 'Luke 5:21', book: 'Luke', chapter: 5, verses: [21, 21] },
            { verse: 'John 10:33', book: 'John', chapter: 10, verses: [33, 33] }
        ]
    },
    // Matthew 9:4
    'matthew_9_4_0': {
        title: 'Knowing Their Thoughts',
        references: [
            { verse: 'Matthew 12:25', book: 'Matthew', chapter: 12, verses: [25, 25] },
            { verse: 'Mark 2:8', book: 'Mark', chapter: 2, verses: [8, 8] },
            { verse: 'Luke 5:22', book: 'Luke', chapter: 5, verses: [22, 22] },
            { verse: 'Luke 6:8', book: 'Luke', chapter: 6, verses: [8, 8] },
            { verse: 'Luke 7:40', book: 'Luke', chapter: 7, verses: [40, 40] },
            { verse: 'Luke 11:17', book: 'Luke', chapter: 11, verses: [17, 17] },
            { verse: 'John 2:25', book: 'John', chapter: 2, verses: [25, 25] },
            { verse: 'Hebrews 4:12', book: 'Hebrews', chapter: 4, verses: [12, 12] },
            { verse: 'Revelation 2:23', book: 'Revelation', chapter: 2, verses: [23, 23] }
        ]
    },
    // Matthew 9:6
    'matthew_9_6_0': {
        title: 'Son of Man Has Authority',
        references: [
            { verse: 'Matthew 16:13', book: 'Matthew', chapter: 16, verses: [13, 13] },
            { verse: 'Matthew 28:18', book: 'Matthew', chapter: 28, verses: [18, 18] },
            { verse: 'John 5:22-27', book: 'John', chapter: 5, verses: [22, 27] }
        ]
    },
    'matthew_9_6_1': {
        title: 'Rise, Pick Up Your Bed',
        references: [
            { verse: 'John 5:8-12', book: 'John', chapter: 5, verses: [8, 12] }
        ]
    },
    // Matthew 9:8
    'matthew_9_8_0': {
        title: 'Glorified God',
        references: [
            { verse: 'Matthew 15:31', book: 'Matthew', chapter: 15, verses: [31, 31] },
            { verse: 'Mark 2:12', book: 'Mark', chapter: 2, verses: [12, 12] },
            { verse: 'Luke 5:26', book: 'Luke', chapter: 5, verses: [26, 26] },
            { verse: 'Luke 7:16', book: 'Luke', chapter: 7, verses: [16, 16] },
            { verse: 'Luke 13:13', book: 'Luke', chapter: 13, verses: [13, 13] },
            { verse: 'Luke 17:15', book: 'Luke', chapter: 17, verses: [15, 15] },
            { verse: 'Luke 23:47', book: 'Luke', chapter: 23, verses: [47, 47] }
        ]
    },
    // Matthew 9:9
    'matthew_9_9_0': {
        title: 'Jesus Passed On',
        references: [
            { verse: 'Matthew 9:9-17', book: 'Matthew', chapter: 9, verses: [9, 17] },
            { verse: 'Mark 2:14-22', book: 'Mark', chapter: 2, verses: [14, 22] },
            { verse: 'Luke 5:27-38', book: 'Luke', chapter: 5, verses: [27, 38] }
        ]
    },
    'matthew_9_9_1': {
        title: 'Called Matthew',
        references: [
            { verse: 'Matthew 10:3', book: 'Matthew', chapter: 10, verses: [3, 3] },
            { verse: 'Mark 3:18', book: 'Mark', chapter: 3, verses: [18, 18] },
            { verse: 'Luke 6:15', book: 'Luke', chapter: 6, verses: [15, 15] },
            { verse: 'Acts 1:13', book: 'Acts', chapter: 1, verses: [13, 13] }
        ]
    },
    // Matthew 9:10
    'matthew_9_10_0': {
        title: 'Tax Collectors and Sinners',
        references: [
            { verse: 'Matthew 5:46', book: 'Matthew', chapter: 5, verses: [46, 46] },
            { verse: 'Matthew 11:19', book: 'Matthew', chapter: 11, verses: [19, 19] },
            { verse: 'Luke 15:1', book: 'Luke', chapter: 15, verses: [1, 1] }
        ]
    },
    // Matthew 9:11
    'matthew_9_11_0': {
        title: 'Why Does Your Teacher Eat',
        references: [
            { verse: 'Matthew 11:19', book: 'Matthew', chapter: 11, verses: [19, 19] },
            { verse: 'Luke 15:2', book: 'Luke', chapter: 15, verses: [2, 2] },
            { verse: 'Luke 19:7', book: 'Luke', chapter: 19, verses: [7, 7] }
        ]
    },
    'matthew_9_11_1': {
        title: 'Tax Collectors',
        references: [
            { verse: 'Matthew 9:10', book: 'Matthew', chapter: 9, verses: [10, 10] }
        ]
    },
    // Matthew 9:13
    'matthew_9_13_0': {
        title: 'What This Means',
        references: [
            { verse: 'Matthew 12:7', book: 'Matthew', chapter: 12, verses: [7, 7] }
        ]
    },
    'matthew_9_13_1': {
        title: 'I Desire Mercy',
        references: [
            { verse: 'Hosea 6:6', book: 'Hosea', chapter: 6, verses: [6, 6] },
            { verse: 'Matthew 23:23', book: 'Matthew', chapter: 23, verses: [23, 23] },
            { verse: 'Mark 12:33', book: 'Mark', chapter: 12, verses: [33, 33] }
        ]
    },
    'matthew_9_13_2': {
        title: 'I Came Not to Call the Righteous',
        references: [
            { verse: 'Luke 15:7', book: 'Luke', chapter: 15, verses: [7, 7] },
            { verse: 'Luke 15:32', book: 'Luke', chapter: 15, verses: [32, 32] },
            { verse: 'John 9:39', book: 'John', chapter: 9, verses: [39, 39] },
            { verse: '1 Timothy 1:15', book: '1 Timothy', chapter: 1, verses: [15, 15] }
        ]
    },
    'matthew_9_13_3': {
        title: 'But Sinners',
        references: [
            { verse: 'Mark 2:17', book: 'Mark', chapter: 2, verses: [17, 17] },
            { verse: 'Luke 5:32', book: 'Luke', chapter: 5, verses: [32, 32] }
        ]
    },
    // Matthew 9:14
    'matthew_9_14_0': {
        title: 'Disciples of John',
        references: [
            { verse: 'Matthew 11:2', book: 'Matthew', chapter: 11, verses: [2, 2] },
            { verse: 'Matthew 14:12', book: 'Matthew', chapter: 14, verses: [12, 12] },
            { verse: 'Luke 11:1', book: 'Luke', chapter: 11, verses: [1, 1] },
            { verse: 'John 1:35', book: 'John', chapter: 1, verses: [35, 35] },
            { verse: 'John 3:25', book: 'John', chapter: 3, verses: [25, 25] },
            { verse: 'John 4:1', book: 'John', chapter: 4, verses: [1, 1] },
            { verse: 'Acts 18:25', book: 'Acts', chapter: 18, verses: [25, 25] },
            { verse: 'Acts 19:3', book: 'Acts', chapter: 19, verses: [3, 3] }
        ]
    },
    'matthew_9_14_1': {
        title: 'Why Do We Fast',
        references: [
            { verse: 'Matthew 6:16', book: 'Matthew', chapter: 6, verses: [16, 16] },
            { verse: 'Matthew 15:2', book: 'Matthew', chapter: 15, verses: [2, 2] },
            { verse: 'Mark 2:18', book: 'Mark', chapter: 2, verses: [18, 18] },
            { verse: 'Luke 5:33', book: 'Luke', chapter: 5, verses: [33, 33] }
        ]
    },
    'matthew_9_14_2': {
        title: 'The Pharisees Fast',
        references: [
            { verse: 'Luke 18:12', book: 'Luke', chapter: 18, verses: [12, 12] }
        ]
    },
    // Matthew 9:15
    'matthew_9_15_0': {
        title: 'Wedding Guests',
        references: [
            { verse: 'John 3:29', book: 'John', chapter: 3, verses: [29, 29] }
        ]
    },
    'matthew_9_15_1': {
        title: 'Bridegroom Taken Away',
        references: [
            { verse: 'Luke 17:22', book: 'Luke', chapter: 17, verses: [22, 22] },
            { verse: 'John 16:20', book: 'John', chapter: 16, verses: [20, 20] },
            { verse: 'John 17:11-13', book: 'John', chapter: 17, verses: [11, 13] }
        ]
    },
    'matthew_9_15_2': {
        title: 'Then They Will Fast',
        references: [
            { verse: 'Acts 13:2-3', book: 'Acts', chapter: 13, verses: [2, 3] },
            { verse: 'Acts 14:23', book: 'Acts', chapter: 14, verses: [23, 23] },
            { verse: '2 Corinthians 11:27', book: '2 Corinthians', chapter: 11, verses: [27, 27] }
        ]
    },
    // Matthew 9:18
    'matthew_9_18_0': {
        title: 'A Ruler Came',
        references: [
            { verse: 'Matthew 9:18-26', book: 'Matthew', chapter: 9, verses: [18, 26] },
            { verse: 'Mark 5:22-43', book: 'Mark', chapter: 5, verses: [22, 43] },
            { verse: 'Luke 8:41-56', book: 'Luke', chapter: 8, verses: [41, 56] }
        ]
    },
    'matthew_9_18_1': {
        title: 'Knelt Before Him',
        references: [
            { verse: 'Matthew 8:2', book: 'Matthew', chapter: 8, verses: [2, 2] },
            { verse: 'Matthew 15:25', book: 'Matthew', chapter: 15, verses: [25, 25] },
            { verse: 'Matthew 17:14', book: 'Matthew', chapter: 17, verses: [14, 14] },
            { verse: 'Matthew 20:20', book: 'Matthew', chapter: 20, verses: [20, 20] }
        ]
    },
    // Matthew 9:20
    'matthew_9_20_0': {
        title: 'Discharge of Blood',
        references: [
            { verse: 'Leviticus 15:25', book: 'Leviticus', chapter: 15, verses: [25, 25] }
        ]
    },
    'matthew_9_20_1': {
        title: 'Fringe of His Garment',
        references: [
            { verse: 'Numbers 15:38-39', book: 'Numbers', chapter: 15, verses: [38, 39] },
            { verse: 'Deuteronomy 22:12', book: 'Deuteronomy', chapter: 22, verses: [12, 12] },
            { verse: 'Matthew 14:36', book: 'Matthew', chapter: 14, verses: [36, 36] },
            { verse: 'Matthew 23:5', book: 'Matthew', chapter: 23, verses: [5, 5] }
        ]
    },
    // Matthew 9:22
    'matthew_9_22_0': {
        title: 'Take Heart, Daughter',
        references: [
            { verse: 'Matthew 9:2', book: 'Matthew', chapter: 9, verses: [2, 2] }
        ]
    },
    'matthew_9_22_1': {
        title: 'Your Faith Has Made You Well',
        references: [
            { verse: 'Matthew 9:29', book: 'Matthew', chapter: 9, verses: [29, 29] },
            { verse: 'Mark 5:34', book: 'Mark', chapter: 5, verses: [34, 34] },
            { verse: 'Mark 10:52', book: 'Mark', chapter: 10, verses: [52, 52] },
            { verse: 'Luke 7:50', book: 'Luke', chapter: 7, verses: [50, 50] },
            { verse: 'Luke 8:48', book: 'Luke', chapter: 8, verses: [48, 48] },
            { verse: 'Luke 17:19', book: 'Luke', chapter: 17, verses: [19, 19] },
            { verse: 'Luke 18:42', book: 'Luke', chapter: 18, verses: [42, 42] }
        ]
    },
    'matthew_9_22_2': {
        title: 'Instantly Made Well',
        references: [
            { verse: 'Mark 5:29', book: 'Mark', chapter: 5, verses: [29, 29] }
        ]
    },
    // Matthew 9:23
    'matthew_9_23_0': {
        title: 'Flute Players',
        references: [
            { verse: 'Jeremiah 9:17', book: 'Jeremiah', chapter: 9, verses: [17, 17] },
            { verse: 'Mark 5:38', book: 'Mark', chapter: 5, verses: [38, 38] }
        ]
    },
    // Matthew 9:24
    'matthew_9_24_0': {
        title: 'Go Away',
        references: [
            { verse: 'Acts 9:40', book: 'Acts', chapter: 9, verses: [40, 40] }
        ]
    },
    'matthew_9_24_1': {
        title: 'Not Dead',
        references: [
            { verse: 'Mark 5:39', book: 'Mark', chapter: 5, verses: [39, 39] },
            { verse: 'Luke 8:52', book: 'Luke', chapter: 8, verses: [52, 52] },
            { verse: 'John 11:11', book: 'John', chapter: 11, verses: [11, 11] }
        ]
    },
    'matthew_9_24_2': {
        title: 'Sleeping',
        references: [
            { verse: 'Daniel 12:2', book: 'Daniel', chapter: 12, verses: [2, 2] },
            { verse: 'John 11:11-13', book: 'John', chapter: 11, verses: [11, 13] },
            { verse: 'Acts 7:60', book: 'Acts', chapter: 7, verses: [60, 60] },
            { verse: '1 Corinthians 15:18', book: '1 Corinthians', chapter: 15, verses: [18, 18] },
            { verse: '1 Thessalonians 4:14', book: '1 Thessalonians', chapter: 4, verses: [14, 14] }
        ]
    },
    // Matthew 9:25
    'matthew_9_25_0': {
        title: 'Crowd Put Outside',
        references: [
            { verse: 'Mark 5:40', book: 'Mark', chapter: 5, verses: [40, 40] },
            { verse: 'Luke 8:54', book: 'Luke', chapter: 8, verses: [54, 54] }
        ]
    },
    'matthew_9_25_1': {
        title: 'Took Her by the Hand',
        references: [
            { verse: 'Matthew 8:15', book: 'Matthew', chapter: 8, verses: [15, 15] },
            { verse: 'Acts 9:40-41', book: 'Acts', chapter: 9, verses: [40, 41] }
        ]
    },
    // Matthew 9:27
    'matthew_9_27_0': {
        title: 'Two Blind Men',
        references: [
            { verse: 'Matthew 20:30-34', book: 'Matthew', chapter: 20, verses: [30, 34] }
        ]
    },
    'matthew_9_27_1': {
        title: 'Son of David',
        references: [
            { verse: 'Matthew 1:1', book: 'Matthew', chapter: 1, verses: [1, 1] },
            { verse: 'Matthew 12:23', book: 'Matthew', chapter: 12, verses: [23, 23] },
            { verse: 'Matthew 15:22', book: 'Matthew', chapter: 15, verses: [22, 22] },
            { verse: 'Matthew 20:30-31', book: 'Matthew', chapter: 20, verses: [30, 31] },
            { verse: 'Matthew 21:9', book: 'Matthew', chapter: 21, verses: [9, 9] },
            { verse: 'Matthew 21:15', book: 'Matthew', chapter: 21, verses: [15, 15] },
            { verse: 'Matthew 22:42', book: 'Matthew', chapter: 22, verses: [42, 42] }
        ]
    },
    // Matthew 9:29
    'matthew_9_29_0': {
        title: 'Touched Their Eyes',
        references: [
            { verse: 'Matthew 20:34', book: 'Matthew', chapter: 20, verses: [34, 34] },
            { verse: 'Mark 8:25', book: 'Mark', chapter: 8, verses: [25, 25] },
            { verse: 'John 9:6', book: 'John', chapter: 9, verses: [6, 6] }
        ]
    },
    'matthew_9_29_1': {
        title: 'According to Your Faith',
        references: [
            { verse: 'Matthew 9:2', book: 'Matthew', chapter: 9, verses: [2, 2] },
            { verse: 'Matthew 9:22', book: 'Matthew', chapter: 9, verses: [22, 22] },
            { verse: 'Matthew 8:13', book: 'Matthew', chapter: 8, verses: [13, 13] },
            { verse: 'Matthew 15:28', book: 'Matthew', chapter: 15, verses: [28, 28] }
        ]
    },
    // Matthew 9:30
    'matthew_9_30_0': {
        title: 'Sternly Warned',
        references: [
            { verse: 'Matthew 12:16', book: 'Matthew', chapter: 12, verses: [16, 16] },
            { verse: 'Matthew 17:9', book: 'Matthew', chapter: 17, verses: [9, 9] },
            { verse: 'Mark 5:43', book: 'Mark', chapter: 5, verses: [43, 43] },
            { verse: 'Mark 7:36', book: 'Mark', chapter: 7, verses: [36, 36] }
        ]
    },
    'matthew_9_30_1': {
        title: 'See That No One Knows',
        references: [
            { verse: 'Matthew 8:4', book: 'Matthew', chapter: 8, verses: [4, 4] }
        ]
    },
    // Matthew 9:32
    'matthew_9_32_0': {
        title: 'Demon-Oppressed Mute',
        references: [
            { verse: 'Matthew 12:22-24', book: 'Matthew', chapter: 12, verses: [22, 24] },
            { verse: 'Luke 11:14-15', book: 'Luke', chapter: 11, verses: [14, 15] }
        ]
    },
    'matthew_9_32_1': {
        title: 'Was Brought to Him',
        references: [
            { verse: 'Matthew 4:24', book: 'Matthew', chapter: 4, verses: [24, 24] },
            { verse: 'Matthew 8:16', book: 'Matthew', chapter: 8, verses: [16, 16] },
            { verse: 'Matthew 12:22', book: 'Matthew', chapter: 12, verses: [22, 22] }
        ]
    },
    // Matthew 9:33
    'matthew_9_33_0': {
        title: 'Crowds Marveled',
        references: [
            { verse: 'Mark 1:27', book: 'Mark', chapter: 1, verses: [27, 27] },
            { verse: 'Mark 2:12', book: 'Mark', chapter: 2, verses: [12, 12] }
        ]
    },
    // Matthew 9:34
    'matthew_9_34_0': {
        title: 'By the Prince of Demons',
        references: [
            { verse: 'Matthew 10:25', book: 'Matthew', chapter: 10, verses: [25, 25] },
            { verse: 'Matthew 12:24', book: 'Matthew', chapter: 12, verses: [24, 24] },
            { verse: 'Mark 3:22', book: 'Mark', chapter: 3, verses: [22, 22] },
            { verse: 'Luke 11:15', book: 'Luke', chapter: 11, verses: [15, 15] },
            { verse: 'John 7:20', book: 'John', chapter: 7, verses: [20, 20] },
            { verse: 'John 8:48', book: 'John', chapter: 8, verses: [48, 48] },
            { verse: 'John 8:52', book: 'John', chapter: 8, verses: [52, 52] }
        ]
    },
    // Matthew 9:35
    'matthew_9_35_0': {
        title: 'Jesus Went Throughout',
        references: [
            { verse: 'Matthew 4:23-24', book: 'Matthew', chapter: 4, verses: [23, 24] },
            { verse: 'Matthew 11:1', book: 'Matthew', chapter: 11, verses: [1, 1] },
            { verse: 'Mark 1:39', book: 'Mark', chapter: 1, verses: [39, 39] },
            { verse: 'Mark 6:6', book: 'Mark', chapter: 6, verses: [6, 6] },
            { verse: 'Luke 4:44', book: 'Luke', chapter: 4, verses: [44, 44] },
            { verse: 'Luke 13:22', book: 'Luke', chapter: 13, verses: [22, 22] }
        ]
    },
    // Matthew 9:36
    'matthew_9_36_0': {
        title: 'When He Saw the Crowds',
        references: [
            { verse: 'Matthew 14:14', book: 'Matthew', chapter: 14, verses: [14, 14] },
            { verse: 'Matthew 15:32', book: 'Matthew', chapter: 15, verses: [32, 32] },
            { verse: 'Mark 6:34', book: 'Mark', chapter: 6, verses: [34, 34] },
            { verse: 'Luke 7:13', book: 'Luke', chapter: 7, verses: [13, 13] }
        ]
    },
    'matthew_9_36_1': {
        title: 'Had Compassion',
        references: [
            { verse: 'Mark 6:34', book: 'Mark', chapter: 6, verses: [34, 34] },
            { verse: 'Hebrews 4:15', book: 'Hebrews', chapter: 4, verses: [15, 15] },
            { verse: 'Hebrews 5:2', book: 'Hebrews', chapter: 5, verses: [2, 2] }
        ]
    },
    'matthew_9_36_2': {
        title: 'Like Sheep Without a Shepherd',
        references: [
            { verse: 'Numbers 27:17', book: 'Numbers', chapter: 27, verses: [17, 17] },
            { verse: '1 Kings 22:17', book: '1 Kings', chapter: 22, verses: [17, 17] },
            { verse: 'Ezekiel 34:5', book: 'Ezekiel', chapter: 34, verses: [5, 5] },
            { verse: 'Zechariah 10:2', book: 'Zechariah', chapter: 10, verses: [2, 2] }
        ]
    },
    // Matthew 9:37
    'matthew_9_37_0': {
        title: 'The Harvest Is Plentiful',
        references: [
            { verse: 'Luke 10:2', book: 'Luke', chapter: 10, verses: [2, 2] },
            { verse: 'John 4:35', book: 'John', chapter: 4, verses: [35, 35] }
        ]
    },
    // Matthew 9:38
    'matthew_9_38_0': {
        title: 'Pray Earnestly',
        references: [
            { verse: 'Luke 10:2', book: 'Luke', chapter: 10, verses: [2, 2] },
            { verse: '2 Thessalonians 3:1', book: '2 Thessalonians', chapter: 3, verses: [1, 1] }
        ]
    },
    'matthew_9_38_1': {
        title: 'Send Out Laborers',
        references: [
            { verse: 'Matthew 10:1-5', book: 'Matthew', chapter: 10, verses: [1, 5] },
            { verse: 'Matthew 28:18-20', book: 'Matthew', chapter: 28, verses: [18, 20] }
        ]
    }
};
