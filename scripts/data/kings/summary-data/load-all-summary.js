/**
 * Kings Summary Data Loader
 * Automatically loads all king summary data files
 * 
 * To add a new king summary:
 * 1. Create a file: scripts/data/kings/summary-data/{kingname}-summary-data.js
 * 2. Define variable: var {kingname}SummaryData = [{heading: "...", text: "..."}, ...]
 * 3. File will be automatically loaded
 */

// List of all kings to load summary data for
const kingsWithSummary = [
    'david',
    'saul',
    'solomon',
    'jeroboam-i',
    'nadab',
    'baasha',
    'elah',
    'zimri',
    'omri',
    'ahab',
    'ahaziah',
    'jehoram-joram',
    'jehu',
    'jehoahaz',
    'jehoash-joash',
    'jeroboam-ii',
    'zechariah',
    'shallum',
    'menahem',
    'pekahiah',
    'pekah',
    'hoshea',
    'rehoboam',
    'abijah',
    'asa',
    'jehoshaphat',
    'athaliah',
    'joash',
    'amaziah',
    'uzziah',
    'jotham',
    'ahaz',
    'hezekiah',
    'manasseh',
    'amon',
    'josiah',
    'jehoahaz-shallum',
    'jehoiakim',
    'jehoiachin',
    'zedekiah'
];

// Dynamically load all summary data files using document.write
document.write(kingsWithSummary.map(kingName => 
    `<script src="scripts/data/kings/summary-data/${kingName}-summary-data.js"></script>`
).join('\n'));
