"use client";

import { useEffect, useState } from "react";
import {
  shouldShowConsentBanner,
  acceptAllCookies,
  acceptEssentialOnly,
} from "@/lib/consentManager";
import { Button } from "@/components/ui/button";

export default function ConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if we should show the banner
    setShowBanner(shouldShowConsentBanner());
  }, []);

  const handleAcceptAll = () => {
    acceptAllCookies();
    setShowBanner(false);
  };

  const handleEssentialOnly = () => {
    acceptEssentialOnly();
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 z-50 w-[calc(100%-2rem)] sm:max-w-sm">
      <div className="bg-card/75 backdrop-blur-md border border-border/60 rounded-2xl shadow-lg p-6">
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">We use cookies</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This site uses cookies to improve your experience and analyze traffic. 
              Essential cookies keep the site running smoothly, while analytics cookies 
              help us understand what you find useful.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={handleEssentialOnly}
              variant="outline"
              size="sm"
              className="flex-1 sm:flex-initial"
            >
              Essential Only
            </Button>
            <Button
              onClick={handleAcceptAll}
              size="sm"
              className="flex-1 sm:flex-initial bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Accept All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
