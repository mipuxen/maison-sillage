import { useEffect, useState } from 'react';
import { imageUrl, products } from '../data/products.js';
import { useI18n } from '../i18n/I18nContext.jsx';

const MIN_MS = 900; // show the brand for at least this long
const MAX_MS = 5000; // never block the page longer than this

// Resolves true once the shoe images and fonts are ready (or the timeout hits).
export function usePreload() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    const loadImage = (src) =>
      new Promise((resolve) => {
        const img = new Image();
        img.onload = img.onerror = () => resolve();
        img.src = src;
      });

    const assets = Promise.all([
      ...products.map((p) => loadImage(imageUrl(p))),
      document.fonts?.ready ?? Promise.resolve(),
    ]);
    const minimum = new Promise((r) => setTimeout(r, MIN_MS));
    const maximum = new Promise((r) => setTimeout(r, MAX_MS));

    Promise.race([Promise.all([assets, minimum]), maximum]).then(() => alive && setReady(true));
    return () => { alive = false; };
  }, []);

  return ready;
}

export default function Preloader({ ready }) {
  const { t } = useI18n();
  const [gone, setGone] = useState(false);
  useEffect(() => {
    if (!ready) return undefined;
    const t = setTimeout(() => setGone(true), 700);
    return () => clearTimeout(t);
  }, [ready]);

  if (gone) return null;
  return (
    <div className={`preloader${ready ? ' is-done' : ''}`} role="status" aria-label={t('preloader.label')}>
      <span className="preloader__word">SILLAGE</span>
      <span className="preloader__line" />
    </div>
  );
}
