// Pure bag logic: no React, no DOM. Easy to unit-test (see bagReducer.test.js).
import { bySlug, SIZES, MAX_QTY } from '../data/products.js';

export const lineKey = (slug, size) => `${slug}|${size}`;

// Drops anything that is not a valid { slug, size, qty } line and merges duplicates.
// Used on data coming from localStorage, which can be stale or hand-edited.
export function sanitize(raw) {
  if (!Array.isArray(raw)) return [];
  const merged = new Map();
  for (const entry of raw) {
    if (!entry || typeof entry !== 'object') continue;
    const slug = entry.slug;
    const size = String(entry.size);
    const qty = Number(entry.qty);
    if (!Object.hasOwn(bySlug, slug) || !SIZES.includes(size)) continue;
    if (!Number.isInteger(qty) || qty < 1) continue;
    const key = lineKey(slug, size);
    const prev = merged.get(key);
    merged.set(key, { slug, size, qty: Math.min(MAX_QTY, (prev ? prev.qty : 0) + qty) });
  }
  return [...merged.values()];
}

export function bagReducer(items, action) {
  switch (action.type) {
    case 'add': {
      const { slug, size } = action;
      if (!Object.hasOwn(bySlug, slug) || !SIZES.includes(size)) return items;
      const key = lineKey(slug, size);
      const exists = items.some((i) => lineKey(i.slug, i.size) === key);
      if (!exists) return [...items, { slug, size, qty: 1 }];
      return items.map((i) =>
        lineKey(i.slug, i.size) === key ? { ...i, qty: Math.min(MAX_QTY, i.qty + 1) } : i,
      );
    }
    case 'inc':
      return items.map((i) =>
        lineKey(i.slug, i.size) === action.key ? { ...i, qty: Math.min(MAX_QTY, i.qty + 1) } : i,
      );
    case 'dec':
      return items.map((i) =>
        lineKey(i.slug, i.size) === action.key ? { ...i, qty: Math.max(1, i.qty - 1) } : i,
      );
    case 'remove':
      return items.filter((i) => lineKey(i.slug, i.size) !== action.key);
    case 'clear':
      return [];
    default:
      return items;
  }
}

export function summarize(items) {
  let count = 0;
  let subtotal = 0;
  for (const i of items) {
    count += i.qty;
    subtotal += i.qty * bySlug[i.slug].price;
  }
  return { count, subtotal };
}
