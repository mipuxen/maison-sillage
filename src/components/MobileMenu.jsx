import { forwardRef, useEffect } from 'react';
import { useI18n } from '../i18n/I18nContext.jsx';
import Brand from './Brand.jsx';
import NavLinks from './NavLinks.jsx';
import LangSwitch from './LangSwitch.jsx';

// Full-screen menu for small screens. A native <dialog> gives us the focus trap,
// Esc to close and focus restoration for free.
const MobileMenu = forwardRef(function MobileMenu({ route }, ref) {
  const { t } = useI18n();
  const close = () => ref.current?.close();

  // Close it if the screen grows past the mobile breakpoint, or the route changes.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 861px)');
    const onChange = () => mq.matches && ref.current?.open && ref.current.close();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [ref]);
  useEffect(() => {
    if (ref.current?.open) ref.current.close();
  }, [route.key, ref]);

  return (
    <dialog ref={ref} className="menu" aria-label={t('nav.label')}>
      <div className="menu__top">
        <Brand label={t('brand.aria')} onClick={close} />
        <button type="button" className="menu__close" onClick={close} aria-label={t('nav.close')}>
          ×
        </button>
      </div>
      <nav className="menu__nav" aria-label={t('nav.label')}>
        <NavLinks route={route} onNavigate={close} />
      </nav>
      <div className="menu__foot">
        <LangSwitch />
      </div>
    </dialog>
  );
});

export default MobileMenu;
