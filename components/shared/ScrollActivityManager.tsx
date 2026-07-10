'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const autoHideScrollbarSelector = '[data-auto-hide-scrollbar]';
const scrollbarHideDelay = 700;

const getDocumentScrollElement = () => {
  const scrollElement = document.scrollingElement;

  return scrollElement instanceof HTMLElement && scrollElement.matches(autoHideScrollbarSelector)
    ? scrollElement
    : null;
};

export const ScrollActivityManager = () => {
  const pathname = usePathname();

  useEffect(() => {
    const hideTimers = new Map<HTMLElement, number>();

    const showScrollbar = (scrollElement: HTMLElement) => {
      const activeTimer = hideTimers.get(scrollElement);

      if (activeTimer !== undefined) {
        window.clearTimeout(activeTimer);
      }

      scrollElement.dataset.scrollActive = 'true';

      const hideTimer = window.setTimeout(() => {
        scrollElement.removeAttribute('data-scroll-active');
        hideTimers.delete(scrollElement);
      }, scrollbarHideDelay);

      hideTimers.set(scrollElement, hideTimer);
    };

    const handleElementScroll = (event: Event) => {
      if (event.target === document) {
        return;
      }

      if (event.target instanceof HTMLElement && event.target.matches(autoHideScrollbarSelector)) {
        showScrollbar(event.target);
      }
    };

    const handleDocumentScroll = () => {
      const scrollElement = getDocumentScrollElement();

      if (scrollElement) {
        showScrollbar(scrollElement);
      }
    };

    document.addEventListener('scroll', handleElementScroll, { capture: true, passive: true });
    window.addEventListener('scroll', handleDocumentScroll, { passive: true });

    return () => {
      document.removeEventListener('scroll', handleElementScroll, true);
      window.removeEventListener('scroll', handleDocumentScroll);

      hideTimers.forEach((timer, scrollElement) => {
        window.clearTimeout(timer);
        scrollElement.removeAttribute('data-scroll-active');
      });

      hideTimers.clear();
    };
  }, [pathname]);

  return null;
};
