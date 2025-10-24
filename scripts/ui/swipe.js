// Swipe functionality for chapter navigation (Touch and Trackpad)
(function() {
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    let wheelTimeout = null;
    let isNavigating = false; // Prevent multiple simultaneous navigations
    const minSwipeDistance = 50; // Minimum distance for a swipe to be registered
    const maxVerticalDistance = 100; // Maximum vertical movement allowed for horizontal swipe

    function handleSwipeGesture() {
        const horizontalDistance = touchEndX - touchStartX;
        const verticalDistance = Math.abs(touchEndY - touchStartY);
        
        // Check if it's a horizontal swipe (not vertical scroll)
        if (Math.abs(horizontalDistance) > minSwipeDistance && verticalDistance < maxVerticalDistance) {
            if (horizontalDistance > 0) {
                // Swipe right - go to previous chapter
                handleSwipeRight();
            } else {
                // Swipe left - go to next chapter
                handleSwipeLeft();
            }
        }
    }

    function handleSwipeLeft() {
        // Prevent navigation if already navigating
        if (isNavigating) return;
        
        // Only trigger if we're on the chapter detail page
        const chapterContent = document.getElementById('book-chapter-content');
        if (chapterContent && !chapterContent.classList.contains('hidden')) {
            // Navigate to next chapter
            if (typeof navigateToNextChapter === 'function') {
                isNavigating = true;
                navigateToNextChapter();
                // Reset the flag after navigation completes
                setTimeout(() => {
                    isNavigating = false;
                }, 500); // Increased timeout to prevent rapid swipes
            }
        }
    }

    function handleSwipeRight() {
        // Prevent navigation if already navigating
        if (isNavigating) return;
        
        // Only trigger if we're on the chapter detail page
        const chapterContent = document.getElementById('book-chapter-content');
        if (chapterContent && !chapterContent.classList.contains('hidden')) {
            // Navigate to previous chapter
            if (typeof navigateToPreviousChapter === 'function') {
                isNavigating = true;
                navigateToPreviousChapter();
                // Reset the flag after navigation completes
                setTimeout(() => {
                    isNavigating = false;
                }, 500); // Increased timeout to prevent rapid swipes
            }
        }
    }

    // Prevent browser back/forward navigation on horizontal swipes
    function preventBrowserNavigation() {
        const chapterContent = document.getElementById('book-chapter-content');
        
        if (chapterContent && !chapterContent.classList.contains('hidden')) {
            // Prevent horizontal swipe navigation
            let touchStartXNav = 0;
            let touchStartYNav = 0;
            
            document.addEventListener('touchstart', function(e) {
                touchStartXNav = e.touches[0].clientX;
                touchStartYNav = e.touches[0].clientY;
            }, { passive: false });
            
            document.addEventListener('touchmove', function(e) {
                if (!chapterContent.classList.contains('hidden')) {
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
                if (!chapterContent.classList.contains('hidden') && !isNavigating) {
                    // Detect horizontal scroll (two-finger swipe on trackpad)
                    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 10) {
                        e.preventDefault();
                        
                        // Debounce to prevent multiple triggers
                        clearTimeout(wheelTimeout);
                        wheelTimeout = setTimeout(function() {
                            // Trigger chapter navigation based on scroll direction
                            if (e.deltaX > 0 && !isNavigating) {
                                // Scrolling right - go to next chapter
                                handleSwipeLeft();
                            } else if (e.deltaX < 0 && !isNavigating) {
                                // Scrolling left - go to previous chapter
                                handleSwipeRight();
                            }
                        }, 150); // Increased debounce time
                    }
                }
            }, { passive: false });
        }
    }

    // Add touch event listeners
    function initSwipe() {
        const container = document.querySelector('.book-chapter-container');
        
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

        // Prevent browser back/forward navigation
        preventBrowserNavigation();
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSwipe);
    } else {
        initSwipe();
    }

    // Re-initialize when navigating to a new chapter (since content changes)
    const originalShowBookChapter = window.showBookChapter;
    if (originalShowBookChapter) {
        window.showBookChapter = function() {
            originalShowBookChapter.apply(this, arguments);
            // Re-initialize swipe after a short delay to ensure content is loaded
            setTimeout(initSwipe, 100);
        };
    }
})();
