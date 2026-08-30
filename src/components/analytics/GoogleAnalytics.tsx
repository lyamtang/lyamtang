"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { GA_MEASUREMENT_ID, shouldLoadAnalytics } from "@/lib/analytics";
import { hasAnalyticsConsent } from "@/lib/consentManager";

/**
 * Google Analytics component
 * Loads GA4 scripts only when:
 * 1. Running in production environment
 * 2. User has given analytics consent
 */
export default function GoogleAnalytics() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // Check initial consent status
    setHasConsent(hasAnalyticsConsent());

    // Listen for consent changes
    const handleConsentUpdate = () => {
      setHasConsent(hasAnalyticsConsent());
    };

    const handleConsentCleared = () => {
      setHasConsent(false);
    };

    window.addEventListener("consentUpdated", handleConsentUpdate);
    window.addEventListener("consentCleared", handleConsentCleared);

    return () => {
      window.removeEventListener("consentUpdated", handleConsentUpdate);
      window.removeEventListener("consentCleared", handleConsentCleared);
    };
  }, []);

  // Don't load analytics in development or without consent
  if (!shouldLoadAnalytics() || !hasConsent) {
    return null;
  }

  return (
    <>
      {/* Google Analytics gtag.js script */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />

      {/* Initialize gtag and configure GA4 */}
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
