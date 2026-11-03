import { useLayoutEffect, useRef, useState } from 'react';
import { SIZES } from '../data/products.js';
import { pad } from '../lib/format.js';
import { enterShoe } from '../lib/flip.js';
import { useBag } from '../state/BagContext.jsx';
import { useI18n } from '../i18n/I18nContext.jsx';
import ShoeImage from '../components/ShoeImage.jsx';

export default function ProductView({ product, index }) {
  const { add, open } = useBag();
  const { t, loc, price } = useI18n();
  const shoe = useRef(null);
  const [view, setView] = useState(1); // which photo is shown (1 = the wall photo, so the zoom lines up)
  const [size, setSize] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  useLayoutEffect(() => { enterShoe(shoe.current, product.slug); }, [product.slug]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!size) {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 450);
      document.getElementById('size')?.focus();
      return;
    }
    add(product.slug, size);
    open();
  };

  const showError = error && !size;
  const views = Array.from({ length: product.images }, (_, i) => i + 1);

  return (
    <div className="product">
      <div className="product__intro reveal">
        <p className="eyebrow">{product.brand} / {pad(index + 1)}</p>
        <h1 className="product__title">{product.name.toUpperCase()}</h1>
        <p className="product__desc">{loc(product.description)}</p>
      </div>

      <div className="product__stage">
        <div ref={shoe} className="product__shoe" data-shoe={product.slug}>
          <ShoeImage key={view} product={product} n={view} eager />
        </div>
        <span className="product__shelf reveal" aria-hidden="true" />
        {views.length > 1 && (
          <div className="gallery reveal" role="group" aria-label={t('gallery.label')}>
            {views.map((n) => (
              <button
                key={n}
                type="button"
                className="gallery__thumb"
                aria-pressed={n === view}
                aria-label={t('gallery.view', { n, total: views.length })}
                onClick={() => setView(n)}
              >
                <ShoeImage product={product} n={n} />
              </button>
            ))}
          </div>
        )}
      </div>

      <aside className="panel reveal" aria-label={t('product.panel')}>
        <p className="eyebrow">{t('product.series')}</p>
        <div className="panel__row">
          <span>{loc(product.color)}</span>
          <span className="panel__price">{price(product.price)}</span>
        </div>

        <form onSubmit={onSubmit} noValidate>
          <label className="panel__label" htmlFor="size">
            <span>{t('product.size')}</span><span>{t('product.sizeUnit')}</span>
          </label>
          <div className={`select${shake ? ' is-shaking' : ''}`}>
            <select
              id="size"
              value={size}
              aria-invalid={showError}
              aria-describedby={showError ? 'size-error' : undefined}
              onChange={(e) => { setSize(e.target.value); setError(false); }}
            >
              <option value="">{t('product.selectSize')}</option>
              {SIZES.map((s) => <option key={s} value={s}>{t('product.sizeOption', { size: s })}</option>)}
            </select>
          </div>
          <p id="size-error" className="panel__error" role="alert">
            {showError ? t('product.sizeError') : ''}
          </p>
          <button type="submit" className="btn">{t('product.add')}</button>
        </form>

        <details className="details">
          <summary>{t('product.details')}</summary>
          <ul>
            {loc(product.materials).map((m) => <li key={m}>{m}</li>)}
            <li>{t('product.concept')}</li>
          </ul>
        </details>
      </aside>
    </div>
  );
}
