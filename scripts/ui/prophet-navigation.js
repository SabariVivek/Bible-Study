// Prophet Navigation functionality - Swipe, Scroll and Keyboard Navigation
(function() {
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    let wheelTimeout = null;
    let isNavigating = false; // Prevent multiple simultaneous navigations
    const minSwipeDistance = 50; // Minimum distance for a swipe to be registered
    const maxVerticalDistance = 100; // Maximum vertical movement allowed for horizontal swipe

    // Get all prophets in order (Major, Minor, Other)
    function getAllProphets() {
        if (typeof allProphetsData === 'undefined') {
            return [];
        }
        return [
            ...allProphetsData.majorProphets,
            ...allProphetsData.minorProphets,
            ...allProphetsData.otherProphets
        ];
    }

    // Get current prophet index
    function getCurrentProphetIndex() {
        const titleElement = document.getElementById('prophetDetailTitle');
        if (!titleElement) return -1;
        
        const currentProphetName = titleElement.textContent.replace('Prophet ', '').trim();
        const allProphets = getAllProphets();
        return allProphets.findIndex(p => p.name === currentProphetName);
    }

    // Navigate to next prophet
    function navigateToNextProphet() {
        if (isNavigating) return;
        
        const currentIndex = getCurrentProphetIndex();
        if (currentIndex === -1) return;
        
        const allProphets = getAllProphets();
        const nextIndex = currentIndex + 1;
        
        if (nextIndex < allProphets.length) {
            isNavigating = true;
            const nextProphet = allProphets[nextIndex];
            
            // Show next prophet
            if (typeof showProphetDetail === 'function') {
                showProphetDetail(nextProphet.name);
                
                // Update URL hash
                if (typeof updateRoute === 'function') {
                    updateRoute('prophetDetail', nextProphet.name);
                } else {
                    window.location.hash = `#/prophet/${encodeURIComponent(nextProphet.name)}`;
                }
            }
            
            // Reset navigation flag quickly to allow rapid navigation
            setTimeout(() => {
                isNavigating = false;
            }, 100);
        }
    }

    // Navigate to previous prophet
    function navigateToPreviousProphet() {
        if (isNavigating) return;
        
        const currentIndex = getCurrentProphetIndex();
        if (currentIndex === -1) return;
        
        const allProphets = getAllProphets();
        const prevIndex = currentIndex - 1;
        
        if (prevIndex >= 0) {
            isNavigating = true;
            const prevProphet = allProphets[prevIndex];
            
            // Show previous prophet
            if (typeof showProphetDetail === 'function') {
                showProphetDetail(prevProphet.name);
                
                // Update URL hash
                if (typeof updateRoute === 'function') {
                    updateRoute('prophetDetail', prevProphet.name);
                } else {
                    window.location.hash = `#/prophet/${encodeURIComponent(prevProphet.name)}`;
                }
            }
            
            // Reset navigation flag quickly to allow rapid navigation
            setTimeout(() => {
                isNavigating = false;
            }, 100);
        }
    }

    // Handle swipe gesture
    function handleSwipeGesture() {
        const horizontalDistance = touchEndX - touchStartX;
        const verticalDistance = Math.abs(touchEndY - touchStartY);
        
        // Check if it's a horizontal swipe (not vertical scroll)
        if (Math.abs(horizontalDistance) > minSwipeDistance && verticalDistance < maxVerticalDistance) {
            if (horizontalDistance > 0) {
                // Swipe right - go to previous prophet
                handleSwipeRight();
            } else {
                // Swipe left - go to next prophet
                handleSwipeLeft();
            }
        }
    }

    // Handle swipe left (next prophet)
    function handleSwipeLeft() {
        if (isNavigating) return;
        
        const prophetDetailContent = document.getElementById('prophet-detail-content');
        if (prophetDetailContent && !prophetDetailContent.classList.contains('hidden')) {
            navigateToNextProphet();
        }
    }

    // Handle swipe right (previous prophet)
    function handleSwipeRight() {
        if (isNavigating) return;
        
        const prophetDetailContent = document.getElementById('prophet-detail-content');
        if (prophetDetailContent && !prophetDetailContent.classList.contains('hidden')) {
            navigateToPreviousProphet();
        }
    }

    // Keyboard navigation
    function handleKeyboardNavigation(e) {
        const prophetDetailContent = document.getElementById('prophet-detail-content');
        
        // Only handle arrow keys when prophet detail page is visible
        if (prophetDetailContent && !prophetDetailContent.classList.contains('hidden')) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                navigateToPreviousProphet();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                navigateToNextProphet();
            }
        }
    }

    // Prevent browser back/forward navigation on horizontal swipes
    function preventBrowserNavigation() {
        const prophetDetailContent = document.getElementById('prophet-detail-content');
        
        if (prophetDetailContent) {
            // Prevent horizontal swipe navigation for browser
            let touchStartXNav = 0;
            let touchStartYNav = 0;
            
            document.addEventListener('touchstart', function(e) {
                if (!prophetDetailContent.classList.contains('hidden')) {
                    touchStartXNav = e.touches[0].clientX;
                    touchStartYNav = e.touches[0].clientY;
                }
            }, { passive: false });
            
            document.addEventListener('touchmove', function(e) {
                if (!prophetDetailContent.classList.contains('hidden')) {
                    const touchMoveX = e.touches[0].clientX;
                    const touchMoveY = e.touches[0].clientY;
                    const diffX = touchMoveX - touchStartXNav;
                    const diffY = touchMoveY - touchStartYNav;
                    
                    // If horizontal swipe is detected, prevent browser navigation
                    if (Math.abs(diffX) > Math.abs(diffY)) {
                        e.preventDefault();
                    }
                }
            }, { passive: false });

            // Prevent wheel/trackpad horizontal scroll navigation
            document.addEventListener('wheel', function(e) {
                if (!prophetDetailContent.classList.contains('hidden') && !isNavigating) {
                    // Detect horizontal scroll (two-finger swipe on trackpad)
                    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 10) {
                        e.preventDefault();
                        
                        // Debounce to prevent multiple triggers
                        clearTimeout(wheelTimeout);
                        wheelTimeout = setTimeout(function() {
                            // Trigger prophet navigation based on scroll direction
                            if (e.deltaX > 0 && !isNavigating) {
                                // Scrolling right - go to next prophet
                                handleSwipeLeft();
                            } else if (e.deltaX < 0 && !isNavigating) {
                                // Scrolling left - go to previous prophet
                                handleSwipeRight();
                            }
                        }, 150); // Debounce time
                    }
                }
            }, { passive: false });
        }
    }

    // Initialize swipe and keyboard navigation
    function initProphetNavigation() {
        const container = document.querySelector('.prophet-page-container');
        
        if (container) {
            // Touch events for mobile
            container.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
                touchStartY = e.changedTouches[0].screenY;
            }, { passive: true });

            container.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                touchEndY = e.changedTouches[0].screenY;
                handleSwipeGesture();
            }, { passive: true });

            // Reset cursor to default
            container.style.cursor = 'default';
        }

        // Add keyboard event listener
        document.addEventListener('keydown', handleKeyboardNavigation);

        // Prevent browser back/forward navigation
        preventBrowserNavigation();
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initProphetNavigation);
    } else {
        initProphetNavigation();
    }

    // Re-initialize when navigating to a new prophet (since content changes)
    const originalShowProphetDetail = window.showProphetDetail;
    if (originalShowProphetDetail) {
        window.showProphetDetail = function() {
            originalShowProphetDetail.apply(this, arguments);
            // Re-initialize navigation after a short delay to ensure content is loaded
            setTimeout(initProphetNavigation, 100);
        };
    }

    // Export navigation functions for external use
    window.navigateToNextProphet = navigateToNextProphet;
    window.navigateToPreviousProphet = navigateToPreviousProphet;
})();
