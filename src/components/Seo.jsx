import { useEffect } from 'react';

const siteUrl = 'https://qaassociates.in';

const setMeta = (selector, attribute, value) => {
  const element = document.head.querySelector(selector);
  if (element) element.setAttribute(attribute, value);
};

export default function Seo({ title, description, path = '/' }) {
  useEffect(() => {
    const canonicalUrl = `${siteUrl}${path === '/' ? '/' : path}`;
    document.title = title;
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', canonicalUrl);

    const canonical = document.head.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', canonicalUrl);
  }, [description, path, title]);

  return null;
}
