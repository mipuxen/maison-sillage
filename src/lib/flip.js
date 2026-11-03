// The "camera zoom". The shoe of the page we are leaving stays in the DOM for
// a moment (inside .view--leaving). We measure it, then animate the new shoe
// from that rectangle to its own place (the FLIP technique) using the Web
// Animations API. The shoe is rendered at its final size, so it stays sharp.

export const FLY_MS = 950;
export const LEAVE_MS = 450;
const EASE = 'cubic-bezier(0.65, 0, 0.2, 1)';

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function enterShoe(target, slug) {
  if (!target || target.dataset.entered) return;
  target.dataset.entered = '1';

  const source = document.querySelector(
    `.view--leaving [data-shoe="${CSS.escape(slug)}"]`,
  );

  if (source && !prefersReducedMotion()) {
    const from = source.getBoundingClientRect();
    const to = target.getBoundingClientRect();
    if (from.width && to.width) {
      source.style.visibility = 'hidden';
      target.animate(
        [
          {
            transformOrigin: '0 0',
            transform: `translate(${from.left - to.left}px, ${from.top - to.top}px) scale(${from.width / to.width})`,
          },
          { transformOrigin: '0 0', transform: 'translate(0, 0) scale(1)' },
        ],
        { duration: FLY_MS, easing: EASE },
      );
      return;
    }
  }

  if (source) source.style.visibility = 'hidden';
  if (!prefersReducedMotion()) {
    target.animate(
      [
        { opacity: 0, transform: 'translateY(18px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ],
      { duration: 700, easing: EASE },
    );
  }
}
