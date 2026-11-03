export const pad = (n) => String(n).padStart(2, '0');

const formatters = new Map();

// Prices stay in euro; only the number format follows the language (e.g. "€175" / "175 €").
export function formatPrice(amount, locale = 'en-IE') {
  if (!formatters.has(locale)) {
    formatters.set(
      locale,
      new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }),
    );
  }
  return formatters.get(locale).format(amount);
}
