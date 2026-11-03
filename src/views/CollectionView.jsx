import { useLayoutEffect, useRef } from 'react';
import { fullName, products } from '../data/products.js';
import { pad } from '../lib/format.js';
import { enterShoe } from '../lib/flip.js';
import { useI18n } from '../i18n/I18nContext.jsx';
import ShoeImage from '../components/ShoeImage.jsx';

function Card({ product, index }) {
  const { t, loc } = useI18n();
  const shoe = useRef(null);
  useLayoutEffect(() => { enterShoe(shoe.current, product.slug); }, [product.slug]);

  return (
    <li className="card" style={{ '--i': index }}>
      <a
        className="card__link"
        href={`#/${product.slug}`}
        aria-label={t('card.aria', { name: fullName(product), color: loc(product.color) })}
      >
        <div className="card__lift">
          <div ref={shoe} className="card__shoe" data-shoe={product.slug}>
            <ShoeImage product={product} eager />
          </div>
        </div>
        <span className="card__shelf reveal" aria-hidden="true" />
        <span className="card__label reveal" aria-hidden="true">
          <span className="card__name">{product.name.toUpperCase()}</span>
          <span className="card__meta">{pad(index + 1)} / {product.brand}</span>
        </span>
      </a>
    </li>
  );
}

export default function CollectionView() {
  const { t } = useI18n();
  return (
    <div className="collection">
      <div className="collection__intro reveal">
        <p className="eyebrow">{t('collection.eyebrow')}</p>
        <h1 className="headline">{t('collection.headline')}</h1>
      </div>
      <ul className="grid" aria-label={t('collection.grid')} style={{ '--rows': Math.ceil(products.length / 5) }}>
        {products.map((p, i) => <Card key={p.slug} product={p} index={i} />)}
      </ul>
    </div>
  );
}
