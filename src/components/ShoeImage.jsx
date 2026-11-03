import { useState } from 'react';
import { fullName, imageUrl, placeholderUrl } from '../data/products.js';
import { useI18n } from '../i18n/I18nContext.jsx';

// Photo n of a product (public/shoes/<slug>/<n>.webp). A missing file falls back to a neutral placeholder.
export default function ShoeImage({ product, n = 1, eager = false }) {
  const { t, loc } = useI18n();
  const [failed, setFailed] = useState(false);
  return (
    <img
      className="shoe-img"
      src={failed ? placeholderUrl() : imageUrl(product, n)}
      alt={t('shoe.alt', { name: fullName(product), color: loc(product.color) })}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      draggable="false"
      onError={() => setFailed(true)}
    />
  );
}
