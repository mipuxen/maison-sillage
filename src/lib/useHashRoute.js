import { useEffect, useSyncExternalStore } from 'react';
import { products } from '../data/products.js';

// Tiny hash router: "#/" is the collection, "#/<slug>" is a product page,
// "#/about" and "#/contact" are pages.
// Hash routing needs no server config, so it works on GitHub Pages and the
// browser Back/Forward buttons work for free.

const subscribe = (callback) => {
  window.addEventListener('hashchange', callback);
  return () => window.removeEventListener('hashchange', callback);
};
const getSnapshot = () => window.location.hash;
const getServerSnapshot = () => '';

const COLLECTION = { name: 'collection', key: 'collection' };
// Static pages: "#/about", "#/contact".
export const PAGES = ['about', 'contact'];

export function parseHash(hash) {
  const slug = hash.replace(/^#\/?/, '').split(/[?/]/)[0];
  if (PAGES.includes(slug)) return { name: slug, key: slug };
  const index = products.findIndex((p) => p.slug === slug);
  if (index === -1) return COLLECTION;
  return { name: 'product', slug, index, key: `product:${slug}` };
}

export function useHashRoute() {
  const hash = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const route = parseHash(hash);

  // An unknown hash such as "#/nope" quietly falls back to the collection URL.
  useEffect(() => {
    const raw = hash.replace(/^#\/?/, '');
    if (route.name === 'collection' && raw !== '') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search + '#/');
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    }
  }, [hash, route.name]);

  return route;
}

export const go = (to) => {
  window.location.hash = to;
};
