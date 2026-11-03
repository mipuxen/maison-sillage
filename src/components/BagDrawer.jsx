import { useEffect, useRef } from 'react';
import { useBag } from '../state/BagContext.jsx';
import { useI18n } from '../i18n/I18nContext.jsx';
import { MAX_QTY, fullName } from '../data/products.js';
import ShoeImage from './ShoeImage.jsx';
import { go } from '../lib/useHashRoute.js';
import { useInert } from '../lib/useInert.js';

const FOCUSABLE = 'a[href], button:not([disabled]), select, input, [tabindex]:not([tabindex="-1"])';

export default function BagDrawer() {
  const { lines, subtotal, isOpen, close, inc, dec, remove } = useBag();
  const { t, loc, price } = useI18n();
  const panel = useRef(null);
  const closeBtn = useRef(null);
  useInert(panel, !isOpen);

  // Move focus into the drawer when it opens.
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => closeBtn.current?.focus({ preventScroll: true }), 60);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [isOpen]);

  // Esc closes and Tab stays inside the drawer. The listener is on the document
  // (not the drawer) so it still works when focus is lost, e.g. after Remove.
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); close(); return; }
      if (e.key !== 'Tab') return;
      const nodes = [...panel.current.querySelectorAll(FOCUSABLE)].filter((n) => n.offsetParent !== null);
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const inside = panel.current.contains(document.activeElement);
      if (!inside) { e.preventDefault(); first.focus(); }
      else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, close]);

  return (
    <>
      <div className={`scrim${isOpen ? ' is-open' : ''}`} onClick={close} aria-hidden="true" />
      <aside
        ref={panel}
        className={`drawer${isOpen ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="bag-title"
        aria-hidden={!isOpen}
      >
        <div className="drawer__head">
          <h2 id="bag-title">{t('bag.title')}</h2>
          <button ref={closeBtn} type="button" className="drawer__close" onClick={close} aria-label={t('bag.close')}>
            ×
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="drawer__empty">
            <p>{t('bag.empty')}</p>
            <a href="#/" onClick={() => { close(); go('#/'); }}>{t('bag.browse')}</a>
          </div>
        ) : (
          <ul className="drawer__list">
            {lines.map((l) => (
              <li key={l.id} className="line">
                <div className="line__thumb"><ShoeImage product={l.product} /></div>
                <div className="line__info">
                  <p className="line__name">{fullName(l.product).toUpperCase()}</p>
                  <p className="line__meta">{t('bag.meta', { size: l.size, color: loc(l.product.color) })}</p>
                  <p className="line__price">{price(l.product.price)}</p>
                  <div className="line__actions">
                    <div className="qty" role="group" aria-label={t('bag.qty', { name: fullName(l.product) })}>
                      <button type="button" onClick={() => dec(l)} disabled={l.qty <= 1} aria-label={t('bag.dec')}>−</button>
                      <span aria-live="polite">{l.qty}</span>
                      <button type="button" onClick={() => inc(l)} disabled={l.qty >= MAX_QTY} aria-label={t('bag.inc')}>+</button>
                    </div>
                    <button type="button" className="line__remove" onClick={() => { remove(l); closeBtn.current?.focus(); }}>{t('bag.remove')}</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="drawer__foot">
          <p className="drawer__subtotal"><span>{t('bag.subtotal')}</span><span>{price(subtotal)}</span></p>
          <p className="drawer__note">{t('bag.note')}</p>
          <button type="button" className="drawer__checkout" disabled>{t('bag.checkout')}</button>
        </div>
      </aside>
    </>
  );
}
