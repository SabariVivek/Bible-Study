/**
 * COMPREHENSIVE KINGS DATA LOADER
 * 
 * This file manages all king timeline data loading and retrieval.
 * All king data files are registered here.
 * 
 * TO ADD A NEW KING:
 * 1. Create: scripts/data/kings/{kingname}-data.js
 * 2. Define: var {kingname}LifeData = [...]
 * 3. Add script tag to index.html BEFORE this file:
 *    <script src="scripts/data/kings/{kingname}-data.js"></script>
 */

// Registry of all available king data files
// Maps normalized king names to their variable names
const kingsRegistry = {
    // United Kingdom
    'saul': 'saulLifeData',
    'david': 'davidLifeData',
    'solomon': 'solomonLifeData',
    
    // Northern Kingdom (Israel)
    'jeroboam i': 'jeroboamiLifeData',
    'jeroboam': 'jeroboamiLifeData',
    'nadab': 'nadabLifeData',
    'baasha': 'baashaLifeData',
    'elah': 'elahLifeData',
    'zimri': 'zimriLifeData',
    'omri': 'omriLifeData',
    'ahab': 'ahabLifeData',
    'ahaziah': 'ahaziahLifeData',
    'jehoram (joram)': 'jehoramjoramLifeData',
    'jehoram': 'jehoramjoramLifeData',
    'joram': 'jehoramjoramLifeData',
    'jehu': 'jehuLifeData',
    'jehoahaz': 'jehoahazLifeData',
    'jehoash (joash)': 'jehoashjoashLifeData',
    'jehoash': 'jehoashjoashLifeData',
    'jeroboam ii': 'jeroboamiiLifeData',
    'zechariah': 'zechariahLifeData',
    'shallum': 'shallumLifeData',
    'menahem': 'menahemLifeData',
    'pekahiah': 'pekahiahLifeData',
    'pekah': 'pekahLifeData',
    'hoshea': 'hosheaLifeData',
    
    // Southern Kingdom (Judah)
    'rehoboam': 'rehoboamLifeData',
    'abijah (abijam)': 'abijahLifeData',
    'abijah': 'abijahLifeData',
    'abijam': 'abijahLifeData',
    'asa': 'asaLifeData',
    'jehoshaphat': 'jehoshaphatLifeData',
    'athaliah (queen)': 'athaliahLifeData',
    'athaliah': 'athaliahLifeData',
    'joash (jehoash)': 'joashLifeData',
    'joash': 'joashLifeData',
    'amaziah': 'amaziahLifeData',
    'uzziah (azariah)': 'uzziahLifeData',
    'uzziah': 'uzziahLifeData',
    'azariah': 'uzziahLifeData',
    'jotham': 'jothamLifeData',
    'ahaz': 'ahazLifeData',
    'hezekiah': 'hezekiahLifeData',
    'manasseh': 'manassehLifeData',
    'amon': 'amonLifeData',
    'josiah': 'josiahLifeData',
    'jehoahaz (shallum)': 'jehoahazshallumLifeData',
    'jehoiakim': 'jehoiakimLifeData',
    'jehoiachin (jeconiah / coniah)': 'jehoiachinLifeData',
    'jehoiachin': 'jehoiachinLifeData',
    'jeconiah': 'jehoiachinLifeData',
    'coniah': 'jehoiachinLifeData',
    'zedekiah': 'zedekiahLifeData'
};

/**
 * Get king timeline data by king name
 * @param {string} kingName - The name of the king
 * @returns {Array|null} - The timeline data or null if not found
 */
window.getKingTimelineData = function(kingName) {
    // Normalize the king name (lowercase, trim)
    const normalizedName = kingName.toLowerCase().trim();
    
    // Check the registry first
    const variableName = kingsRegistry[normalizedName];
    
    if (variableName && typeof window[variableName] !== 'undefined') {
        return window[variableName];
    }
    
    // Fallback: try simple pattern matching
    const simpleVariableName = normalizedName.replace(/[^a-z]/g, '') + 'LifeData';
    if (typeof window[simpleVariableName] !== 'undefined') {
        return window[simpleVariableName];
    }
    
    console.warn(`No timeline data found for king: ${kingName}`);
    return null;
};

/**
 * Get king summary data by king name
 * @param {string} kingName - The name of the king
 * @returns {Array|null} - The summary data or null if not found
 */
window.getKingSummaryData = function(kingName) {
    // Normalize the king name (lowercase, trim)
    const normalizedName = kingName.toLowerCase().trim();
    
    // Remove any extra text in parentheses and special characters
    const simpleName = normalizedName.replace(/[^a-z]/g, '');
    
    // Try to find summary data variable: {kingname}SummaryData
    const summaryVariableName = simpleName + 'SummaryData';
    
    if (typeof window[summaryVariableName] !== 'undefined') {
        return window[summaryVariableName];
    }
    
    console.warn(`No summary data found for king: ${kingName}`);
    return null;
};
