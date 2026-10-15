import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { metadataForPath } from '@/lib/page-metadata';

export function PageMetadata() {
  const [location] = useLocation();
  useEffect(() => {
    const { title, description } = metadataForPath(location);
    document.title = title;
    for (const selector of ['meta[name="description"]', 'meta[property="og:description"]', 'meta[name="twitter:description"]']) {
      document.querySelector(selector)?.setAttribute('content', description);
    }
    for (const selector of ['meta[property="og:title"]', 'meta[name="twitter:title"]']) {
      document.querySelector(selector)?.setAttribute('content', title);
    }
    document.querySelector('meta[name="robots"]')?.setAttribute('content', location === '/' || location.startsWith('/work') ? 'index, follow' : 'noindex, nofollow');
  }, [location]);
  return null;
}
