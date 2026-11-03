import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { INTL_LOCALE, LANGS, localized, pickLang, translate } from './index.js';
import { formatPrice } from '../lib/format.js';

const STORAGE_KEY = 'maison-sillage.lang.v1';
const I18nContext = createContext(null);

function initialLang() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (LANGS.includes(saved)) return saved;
  } catch {
    /* storage blocked: fall through to the browser language */
  }
  const nav = window.navigator || {};
  return pickLang(nav.languages && nav.languages.length ? nav.languages : [nav.language]);
}

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* the choice simply will not persist */
    }
  }, [lang]);

  const setLang = useCallback((next) => {
    if (LANGS.includes(next)) setLangState(next);
  }, []);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: (key, vars) => translate(lang, key, vars),
      loc: (field) => localized(field, lang),
      price: (amount) => formatPrice(amount, INTL_LOCALE[lang]),
    }),
    [lang, setLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>');
  return ctx;
}
