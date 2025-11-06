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
    }
};
