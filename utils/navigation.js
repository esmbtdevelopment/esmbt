/**
 * Utility function to handle smooth scrolling to sections
 * Checks if user is on landing page, if not navigates there first
 */

/**
 * Smooth scroll to a section on the landing page
 * @param {string} sectionId - The ID of the section to scroll to
 * @param {boolean} isCurrentlyOnLandingPage - Whether user is currently on landing page
 */
export const scrollToSection = (sectionId, isCurrentlyOnLandingPage = false) => {
    if (isCurrentlyOnLandingPage) {
        // User is on landing page, scroll directly
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
            });
        }
    } else {
        // User is not on landing page, navigate there with hash
        window.location.href = `/#${sectionId}`;
    }
};

/**
 * Check if user is currently on the landing page
 * @returns {boolean} - True if on landing page, false otherwise
 */
export const isOnLandingPage = () => {
    if (typeof window === 'undefined') return false;
    return window.location.pathname === '/';
};

/**
 * Navigate to contact section
 */
export const goToContact = () => {
    const onLandingPage = isOnLandingPage();
    scrollToSection('contact', onLandingPage);
};

/**
 * Navigate to customers/references section
 */
export const goToReferences = () => {
    const onLandingPage = isOnLandingPage();
    scrollToSection('customers', onLandingPage);
};

/**
 * Handle hash-based navigation on page load
 * Should be called when landing page loads to scroll to section if hash is present
 */
export const handleHashNavigation = () => {
    if (typeof window === 'undefined') return;

    const hash = window.location.hash;
    if (hash) {
        // Remove the # from hash
        const sectionId = hash.substring(1);

        // Wait for page to fully load before scrolling
        setTimeout(() => {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest'
                });
            }
        }, 100);
    }
};
