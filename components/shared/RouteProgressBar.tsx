'use client';

import NextTopLoader from 'nextjs-toploader';

export const RouteProgressBar = () => {
  return (
    <NextTopLoader
      color='var(--navigation-progress)'
      initialPosition={0.08}
      crawlSpeed={200}
      height={3}
      crawl
      showSpinner={false}
      easing='ease'
      speed={200}
      shadow={false}
      template='<div class="bar" role="bar" aria-hidden="true"><div class="peg"></div></div>'
      zIndex={2000}
      showAtBottom={false}
      showForHashAnchor={false}
    />
  );
};
