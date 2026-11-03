import { useI18n } from '../i18n/I18nContext.jsx';

// Shared by the desktop header and the mobile menu.
export default function NavLinks({ route, onNavigate }) {
  const { t } = useI18n();
  const current = (name) => (route.name === name ? 'page' : undefined);
  return (
    <>
      <a className="nav__link" href="#/" aria-current={current('collection')} onClick={onNavigate}>
        {route.name === 'product' ? (
          <>
            <span aria-hidden="true">← </span>
            {t('nav.collection')}
          </>
        ) : (
          <>
            {t('nav.collection')}
            <sup aria-hidden="true">01</sup>
          </>
        )}
      </a>
      <a className="nav__link" href="#/about" aria-current={current('about')} onClick={onNavigate}>
        {t('nav.about')}
      </a>
      <a className="nav__link" href="#/contact" aria-current={current('contact')} onClick={onNavigate}>
        {t('nav.contact')}
      </a>
    </>
  );
}
