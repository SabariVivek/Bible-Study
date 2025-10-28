/**
 * ROUTER - Handle URL routing for the Bible Study application
 * Uses hash-based routing (#/books) for compatibility with local file:// protocol
 */

// Flag to prevent double route updates
let isNavigating = false;

// Define routes for each section
const routes = {
    '#/dashboard': 'dashboard',
    '#/kings': 'kings',
    '#/prophets': 'prophets',
    '#/prophet/': 'prophetDetail', // Dynamic route for prophet details
    '#/books': 'books',
    '#/timeline': 'timeline',
    '#/genealogy': 'genealogy',
    '#/bible': 'bible',
    '#/life-of-christ': 'help'
};

// Reverse mapping for easier lookup
const sectionToRoute = {
    'dashboard': '#/dashboard',
    'kings': '#/kings',
    'prophets': '#/prophets',
    'prophetDetail': '#/prophet/',
    'books': '#/books',
    'timeline': '#/timeline',
    'genealogy': '#/genealogy',
    'bible': '#/bible',
    'help': '#/life-of-christ'
};

/**
 * Navigate to a route and update the URL hash
 * @param {string} path - The hash path to navigate to (e.g., '#/books')
 * @param {boolean} addToHistory - Whether to add this navigation to browser history
 */
function navigateTo(path, addToHistory = true) {
    // Check for dynamic routes (prophet detail)
    let section = routes[path];
    let prophetName = null;
    
    if (!section && path.startsWith('#/prophet/')) {
        section = 'prophetDetail';
        prophetName = decodeURIComponent(path.substring(10)); // Extract prophet name
    }
    
    if (!section) {
        console.warn(`Route not found: ${path}`);
        return;
    }
    
    // Set navigating flag to prevent updateRoute from being called
    isNavigating = true;
    
    // Update the URL hash if needed
    if (window.location.hash !== path) {
        if (addToHistory) {
            window.location.hash = path;
        } else {
            // Replace hash without triggering hashchange event
            history.replaceState(null, '', window.location.pathname + path);
        }
    }
    
    // Call the appropriate show function based on section name
    switch(section) {
        case 'dashboard':
            if (typeof showDashboard === 'function') showDashboard();
            break;
        case 'kings':
            if (typeof showKings === 'function') showKings();
            break;
        case 'prophets':
            if (typeof showProphets === 'function') showProphets();
            break;
        case 'prophetDetail':
            if (typeof showProphetDetail === 'function' && prophetName) showProphetDetail(prophetName);
            break;
        case 'books':
            if (typeof showBooks === 'function') showBooks();
            break;
        case 'timeline':
            if (typeof showTimeline === 'function') showTimeline();
            break;
        case 'genealogy':
            if (typeof showGenealogy === 'function') showGenealogy();
            break;
        case 'bible':
            if (typeof showBible === 'function') showBible();
            break;
        case 'help':
            if (typeof showHelp === 'function') showHelp();
            break;
    }
    
    // Reset navigating flag after a short delay
    setTimeout(() => {
        isNavigating = false;
    }, 100);
}

/**
 * Update the URL hash when a section is shown (called from show functions)
 * @param {string} section - The section name (e.g., 'books', 'kings')
 */
function updateRoute(section) {
    // Don't update if we're already navigating (prevents double history entries)
    if (isNavigating) {
        return;
    }
    
    const path = sectionToRoute[section];
    
    if (path && window.location.hash !== path) {
        window.location.hash = path;
    }
}

/**
 * Handle hash change events (browser back/forward or direct hash change)
 */
function handleHashChange() {
    const hash = window.location.hash;
    
    // Check for dynamic routes
    if (hash.startsWith('#/prophet/')) {
        navigateTo(hash, false);
    } else if (hash && routes[hash]) {
        // If there's a hash and it's a valid route, navigate to it
        navigateTo(hash, false);
    } else if (!hash) {
        // If hash is empty (user went back to initial state), show dashboard
        if (typeof showDashboard === 'function') {
            isNavigating = true;
            showDashboard();
            setTimeout(() => {
                isNavigating = false;
            }, 100);
        }
    }
}

/**
 * Load the correct section based on the current URL hash
 */
function loadRouteFromURL() {
    const hash = window.location.hash;
    
    // Check for dynamic routes or standard routes
    if (hash && (routes[hash] || hash.startsWith('#/prophet/'))) {
        navigateTo(hash, false);
    }
    // Don't auto-navigate to dashboard - let the default HTML state show
}

/**
 * Initialize the router
 */
function initializeRouter() {
    // Handle hash changes (back/forward buttons, direct hash changes)
    window.addEventListener('hashchange', handleHashChange);
    
    // Load the route from URL on page load (only if hash exists)
    loadRouteFromURL();
}

// Export functions for global use
window.navigateTo = navigateTo;
window.updateRoute = updateRoute;
window.initializeRouter = initializeRouter;
