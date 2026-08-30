// Google Analytics 4 Configuration and Utilities
// Measurement ID: G-GVQE06QT6X

export const GA_MEASUREMENT_ID = "G-GVQE06QT6X";

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag: (
      command: "config" | "event" | "consent",
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}

/**
 * Initialize Google Analytics page view tracking
 * @param url - The URL to track
 */
export const pageview = (url: string): void => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

/**
 * Track custom events in Google Analytics
 * @param action - The event action name (use lowercase_with_underscores)
 * @param params - Additional event parameters
 */
export const event = (
  action: string,
  params?: Record<string, unknown>
): void => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, params);
  }
};

/**
 * Track CTA (Call-to-Action) button clicks
 * @param buttonName - Name/label of the CTA button
 * @param location - Where the CTA is located (e.g., 'hero', 'nav')
 */
export const trackCTAClick = (buttonName: string, location: string): void => {
  event("cta_click", {
    button_name: buttonName,
    location,
  });
};

/**
 * Track project card clicks
 * @param projectName - Name of the project
 * @param projectSlug - URL slug of the project
 */
export const trackProjectView = (
  projectName: string,
  projectSlug: string
): void => {
  event("project_view", {
    project_name: projectName,
    project_slug: projectSlug,
  });
};

/**
 * Track contact interactions
 * @param interactionType - Type of interaction (e.g., 'email_click', 'form_submit')
 */
export const trackContactClick = (interactionType: string): void => {
  event("contact_click", {
    interaction_type: interactionType,
  });
};

/**
 * Track outbound link clicks
 * @param url - The destination URL
 * @param linkText - The text/label of the link
 */
export const trackOutboundLink = (url: string, linkText?: string): void => {
  try {
    const domain = new URL(url).hostname;
    event("outbound_link_click", {
      destination_url: url,
      destination_domain: domain,
      link_text: linkText,
    });
  } catch (error) {
    console.error("Error tracking outbound link:", error);
  }
};

/**
 * Check if analytics should be loaded
 * Only load in production environment
 */
export const shouldLoadAnalytics = (): boolean => {
  return process.env.NODE_ENV === "production";
};
