/**
 * Theme Animation Module
 * Provides smooth circular animation when switching between dark and light modes
 * Using the View Transition API
 */

const ThemeAnimation = (function() {
    'use strict';

    /**
     * Check if animations should be enabled
     * @returns {boolean} - True if animations should run
     */
    function shouldAnimate() {
        // Check if View Transition API is supported
        if (!document.startViewTransition) {
            return false;
        }

        // Check if user prefers reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return false;
        }

        return true;
    }

    /**
     * Apply theme changes with animation
     * @param {HTMLElement} triggerElement - The element that triggered the theme change (for animation origin)
     * @param {Function} themeCallback - The function to apply theme changes
     * @returns {Promise<void>}
     */
    async function applyThemeWithAnimation(triggerElement, themeCallback) {
        // If animations are not supported, just apply the theme immediately
        if (!shouldAnimate() || !triggerElement) {
            themeCallback();
            return;
        }

        // Start the view transition
        const transition = document.startViewTransition(() => {
            themeCallback();
        });

        // Wait for the transition to be ready
        await transition.ready;

        // Get the position of the trigger element
        const rect = triggerElement.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        // Calculate the maximum radius needed to cover the entire viewport
        const right = window.innerWidth - rect.left;
        const bottom = window.innerHeight - rect.top;
        const maxRadius = Math.hypot(
            Math.max(rect.left, right),
            Math.max(rect.top, bottom)
        );

        // Animate the transition with a circular reveal effect
        document.documentElement.animate(
            {
                clipPath: [
                    `circle(0px at ${x}px ${y}px)`,
                    `circle(${maxRadius}px at ${x}px ${y}px)`
                ]
            },
            {
                duration: 500,
                easing: 'ease-in-out',
                pseudoElement: '::view-transition-new(root)'
            }
        );
    }

    // Public API
    return {
        applyThemeWithAnimation
    };
})();

// Export for use in other scripts
window.ThemeAnimation = ThemeAnimation;
