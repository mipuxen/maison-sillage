import { useEffect, useRef, useState } from 'react';
import { bySlug, fullName, products } from './data/products.js';
import { useHashRoute, go } from './lib/useHashRoute.js';
import { LEAVE_MS } from './lib/flip.js';
import { useBag } from './state/BagContext.jsx';
import { useI18n } from './i18n/I18nContext.jsx';
import { useInert } from './lib/useInert.js';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import MobileMenu from './components/MobileMenu.jsx';
import Preloader, { usePreload } from './components/Preloader.jsx';
import BagDrawer from './components/BagDrawer.jsx';
import CollectionView from './views/CollectionView.jsx';
import ProductView from './views/ProductView.jsx';
import AboutView from './views/AboutView.jsx';
import ContactView from './views/ContactView.jsx';

// Keeps the previous page mounted for a moment so the shoe can fly between them.
function useLeavingRoute(route) {
  const [state, setState] = useState({ current: route, leaving: null });
  if (route.key !== state.current.key) {
    setState({ current: route, leaving: state.current });
  }
  useEffect(() => {
    if (!state.leaving) return undefined;
    const t = setTimeout(() => setState((s) => ({ ...s, leaving: null })), LEAVE_MS + 500);
    return () => clearTimeout(t);
  }, [state.leaving]);
  return state;
}

function renderView(route) {
  switch (route.name) {
    case 'product':
      return <ProductView product={bySlug[route.slug]} index={route.index} />;
    case 'about':
      return <AboutView />;
    case 'contact':
      return <ContactView />;
    default:
      return <CollectionView />;
  }
}

function View({ route, leaving }) {
  const ref = useRef(null);
  useInert(ref, Boolean(leaving));
  return (
    <main
      ref={ref}
      className={`view${leaving ? ' view--leaving' : ''}`}
      id={leaving ? undefined : 'main'}
      tabIndex={-1}
      aria-hidden={leaving ? true : undefined}
    >
      {renderView(route)}
    </main>
  );
}

export default function App() {
  const route = useHashRoute();
  const ready = usePreload();
  const { current, leaving } = useLeavingRoute(route);
  const { isOpen: bagOpen } = useBag();
  const { t, lang } = useI18n();
  const menu = useRef(null);
  const shell = useRef(null);

  const openMenu = () => menu.current?.showModal();

  // Page title follows the route and the language.
  useEffect(() => {
    document.title =
      route.name === 'product'
        ? t('meta.product', { name: fullName(bySlug[route.slug]) })
        : t(`meta.${route.name}`);
  }, [route, lang, t]);

  // Moving to a new page starts it at the top (on phones .views is the scroll container).
  useEffect(() => {
    document.querySelector('.views')?.scrollTo?.(0, 0);
  }, [route.key]);

  // While the bag is open the page behind it cannot be focused or clicked.
  useInert(shell, bagOpen);

  // Keyboard: Esc goes back to the collection, ← → browse the silhouettes.
  useEffect(() => {
    const onKey = (e) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;
      if (bagOpen || document.querySelector('dialog[open]')) return;
      const tag = e.target.tagName;
      if (tag === 'SELECT' || tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (route.name === 'collection') return;
      if (e.key === 'Escape') go('#/');
      if (route.name !== 'product') return;
      const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (step) {
        const next = products[(route.index + step + products.length) % products.length];
        go(`#/${next.slug}`);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [route, bagOpen]);

  return (
    <>
      <div ref={shell} className="app" data-view={route.name}>
        <button type="button" className="skip-link" onClick={() => document.getElementById('main')?.focus()}>
          {t('skip')}
        </button>
        <div className="wall" aria-hidden="true" />
        <Header route={route} onOpenMenu={openMenu} />
        {ready && (
          <div className="views">
            {[
              leaving && <View key={leaving.key} route={leaving} leaving />,
              <View key={current.key} route={current} />,
            ]}
          </div>
        )}
        <Footer route={route} />
      </div>
      <BagDrawer />
      <MobileMenu ref={menu} route={route} />
      <Preloader ready={ready} />
    </>
  );
}
