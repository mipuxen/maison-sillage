import { fullName, products } from '../data/products.js';
import { pad } from '../lib/format.js';
import { useI18n } from '../i18n/I18nContext.jsx';

export default function Footer({ route }) {
  const { t } = useI18n();
  const total = products.length;
  let centre;

  if (route.name === 'product') {
    const prev = products[(route.index + total - 1) % total];
    const next = products[(route.index + 1) % total];
    centre = (
      <nav className="footer__pager" aria-label={t('footer.pager')}>
        <a href={`#/${prev.slug}`} aria-label={t('footer.prev', { name: fullName(prev) })}>←</a>
        <span aria-live="polite">{pad(route.index + 1)} / {pad(total)}</span>
        <a href={`#/${next.slug}`} aria-label={t('footer.next', { name: fullName(next) })}>→</a>
      </nav>
    );
  } else if (route.name === 'collection') {
    centre = <p role="status">{t('footer.hint')}</p>;
  } else {
    centre = <p>{t('footer.page')}</p>;
  }

  return (
    <footer className="footer">
      <span className="footer__edition">
        <i className="footer__dot" aria-hidden="true" /> {t('footer.edition')} <em>/</em>{' '}
        {t('footer.count', { count: total })}
      </span>
      <div className="footer__centre">{centre}</div>
      <a className="footer__about" href="#/about">
        {t('footer.about')} <span aria-hidden="true">↗</span>
      </a>
    </footer>
  );
}
