// Cookie Consent Management
// Handles user consent for analytics cookies with localStorage persistence

export type CookieCategory = "essential" | "analytics";

export interface ConsentPreferences {
  essential: boolean; // Always true, required for site functionality
  analytics: boolean; // Google Analytics tracking
  timestamp: number; // When consent was given
}

const CONSENT_STORAGE_KEY = "cookie-consent-preferences";
const CONSENT_VERSION = "1.0"; // Increment when privacy policy changes

/**
 * Get current consent preferences from localStorage
 */
export const getConsentPreferences = (): ConsentPreferences | null => {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!stored) return null;

    const data = JSON.parse(stored);
    
    // Validate stored data
    if (data.version !== CONSENT_VERSION) {
      // Clear old consent if version changed
      localStorage.removeItem(CONSENT_STORAGE_KEY);
      return null;
    }

    return data.preferences;
  } catch (error) {
    console.error("Error reading consent preferences:", error);
    return null;
  }
};

/**
 * Save consent preferences to localStorage
 */
export const saveConsentPreferences = (
  preferences: ConsentPreferences
): void => {
  if (typeof window === "undefined") return;

  try {
    const data = {
      version: CONSENT_VERSION,
      preferences,
    };
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(data));

    // Dispatch custom event for components to react to consent changes
    window.dispatchEvent(new CustomEvent("consentUpdated", { detail: preferences }));
  } catch (error) {
    console.error("Error saving consent preferences:", error);
  }
};

/**
 * Clear all consent preferences
 */
export const clearConsentPreferences = (): void => {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(CONSENT_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent("consentCleared"));
  } catch (error) {
    console.error("Error clearing consent preferences:", error);
  }
};

/**
 * Check if user has given consent for analytics
 */
export const hasAnalyticsConsent = (): boolean => {
  const preferences = getConsentPreferences();
  return preferences?.analytics ?? false;
};

/**
 * Accept all cookies
 */
export const acceptAllCookies = (): void => {
  saveConsentPreferences({
    essential: true,
    analytics: true,
    timestamp: Date.now(),
  });
};

/**
 * Accept only essential cookies (reject analytics)
 */
export const acceptEssentialOnly = (): void => {
  saveConsentPreferences({
    essential: true,
    analytics: false,
    timestamp: Date.now(),
  });
};

/**
 * Check if consent banner should be shown
 */
export const shouldShowConsentBanner = (): boolean => {
  return getConsentPreferences() === null;
};
