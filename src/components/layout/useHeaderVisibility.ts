'use client';

import { useEffect, useState } from 'react';

const HIDE_AFTER_PX = 24;
const SHOW_AFTER_PX = 12;
const TOP_THRESHOLD_PX = 8;
const TOUCH_PULL_DOWN_PX = 12;
// Roughly the bottom edge of the floating nav; a pinned zone stays "in view" until it scrolls past it.
const PIN_ROOT_MARGIN_TOP_PX = 72;
const SCROLL_KEYS = new Set(['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ']);
const UP_KEYS = new Set(['ArrowUp', 'PageUp', 'Home']);

/**
 * Hides the header on scroll down and reveals it on scroll up.
 *
 * - Only user-driven scrolling changes visibility. After a route change the hook is
 *   disarmed, so the browser's scroll-to-top / scroll restoration can't flip the state;
 *   the next wheel, touch or scroll-key input re-arms it.
 * - Visibility is kept across route changes instead of being reset.
 * - While any `[data-header-pin]` element is in view the header stays visible and
 *   hiding only arms once that zone is scrolled past.
 * - At the very top, an upward gesture reveals the header even though no scroll event fires.
 */
export function useHeaderVisibility(pathname: string) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let armed = false;
    let lastY = window.scrollY;
    let accumulated = 0;
    let touchStartY = 0;
    let ticking = false;
    const pinnedZones = new Set<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) pinnedZones.add(entry.target);
          else pinnedZones.delete(entry.target);
        }

        if (pinnedZones.size > 0) {
          accumulated = 0;
          setVisible(true);
        }
      },
      { rootMargin: `-${PIN_ROOT_MARGIN_TOP_PX}px 0px 0px 0px` },
    );

    document.querySelectorAll('[data-header-pin]').forEach((zone) => observer.observe(zone));

    // A page that can't scroll would otherwise leave a hidden header with no way back.
    const frame = requestAnimationFrame(() => {
      if (document.documentElement.scrollHeight <= window.innerHeight + 1) setVisible(true);
    });

    const revealAtTop = () => {
      if (window.scrollY <= TOP_THRESHOLD_PX) {
        accumulated = 0;
        setVisible(true);
      }
    };

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;

      if (!armed) return;

      if (y <= TOP_THRESHOLD_PX || pinnedZones.size > 0) {
        accumulated = 0;
        setVisible(true);
        return;
      }

      // Accumulate in one direction so slow scrolls still register; reset on reversal.
      accumulated = Math.sign(delta) === Math.sign(accumulated) ? accumulated + delta : delta;

      if (accumulated >= HIDE_AFTER_PX) setVisible(false);
      else if (accumulated <= -SHOW_AFTER_PX) setVisible(true);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    const onWheel = (e: WheelEvent) => {
      armed = true;
      if (e.deltaY < 0) revealAtTop();
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      armed = true;
      const y = e.touches[0]?.clientY ?? touchStartY;
      if (y - touchStartY > TOUCH_PULL_DOWN_PX) revealAtTop();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (!SCROLL_KEYS.has(e.key)) return;
      armed = true;
      if (UP_KEYS.has(e.key)) revealAtTop();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('keydown', onKeyDown);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('keydown', onKeyDown);
      observer.disconnect();
    };
    // Re-runs on route change to re-query pinned zones and disarm until the next user input.
  }, [pathname]);

  return visible;
}
