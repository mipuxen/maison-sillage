import { useBag } from '../state/BagContext.jsx';
import { useI18n } from '../i18n/I18nContext.jsx';
import { pad } from '../lib/format.js';
import Brand from './Brand.jsx';
import NavLinks from './NavLinks.jsx';
import LangSwitch from './LangSwitch.jsx';

export default function Header({ route, onOpenMenu }) {
  const { count, open } = useBag();
  const { t } = useI18n();

  return (
    <header className="header">
      <Brand label={t('brand.aria')} />

      <nav className="nav" aria-label={t('nav.label')}>
        <NavLinks route={route} />
      </nav>

      <div className="header__end">
        <LangSwitch className="header__lang" />
        <button type="button" className="bag-btn" onClick={open} aria-label={t('bag.aria', { count })}>
          {t('bag.button', { count: pad(count) })}
        </button>
        <button
          type="button"
          className="menu-btn"
          onClick={onOpenMenu}
          aria-haspopup="dialog"
          aria-label={t('nav.menu')}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
