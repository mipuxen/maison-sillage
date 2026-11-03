import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { bySlug } from '../data/products.js';
import { bagReducer, sanitize, summarize, lineKey } from './bagReducer.js';

const STORAGE_KEY = 'maison-sillage.bag.v1';
const BagContext = createContext(null);

function readStorage() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? sanitize(JSON.parse(raw)) : [];
  } catch {
    return []; // storage blocked or corrupt JSON: start with an empty bag
  }
}

export function BagProvider({ children }) {
  const [items, dispatch] = useReducer(bagReducer, undefined, readStorage);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* private mode / quota: the bag simply will not persist */
    }
  }, [items]);

  const add = useCallback((slug, size) => dispatch({ type: 'add', slug, size }), []);
  // inc / dec / remove take a line from `lines` (the drawer passes the whole line).
  const inc = useCallback((line) => dispatch({ type: 'inc', key: line.id }), []);
  const dec = useCallback((line) => dispatch({ type: 'dec', key: line.id }), []);
  const remove = useCallback((line) => dispatch({ type: 'remove', key: line.id }), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => {
    const { count, subtotal } = summarize(items);
    const lines = items.map((i) => ({
      ...i,
      id: lineKey(i.slug, i.size),
      product: bySlug[i.slug],
    }));
    return { lines, count, subtotal, isOpen, add, inc, dec, remove, open, close };
  }, [items, isOpen, add, inc, dec, remove, open, close]);

  return <BagContext.Provider value={value}>{children}</BagContext.Provider>;
}

export function useBag() {
  const ctx = useContext(BagContext);
  if (!ctx) throw new Error('useBag must be used inside <BagProvider>');
  return ctx;
}
