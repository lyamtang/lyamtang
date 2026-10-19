"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { pageview } from "@/lib/analytics";

/**
 * Page View Tracker
 * Tracks client-side navigation in Next.js App Router for Google Analytics
 */
function PageViewTrackerComponent() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      pageview(pathname);
    }
  }, [pathname]);

  return null;
}

export default function PageViewTracker() {
  return <PageViewTrackerComponent />;
}
