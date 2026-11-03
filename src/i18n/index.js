// Pure i18n helpers (no React), so they can be unit-tested with `node --test`.
import en from './en.js';
import uz from './uz.js';
import ko from './ko.js';

export const LANGS = ['en', 'uz', 'ko'];
export const DEFAULT_LANG = 'en';
export const dictionaries = { en, uz, ko };

export const LANG_LABELS = { en: 'EN', uz: 'UZ', ko: 'KO' };
export const LANG_NAMES = { en: 'English', uz: 'Oʻzbekcha', ko: '한국어' };

// Number/price formatting locale for each language.
export const INTL_LOCALE = { en: 'en-IE', uz: 'uz-Latn-UZ', ko: 'ko-KR' };

// t('bag.button', { count: '02' }) -> "Bag (02)". Falls back to English, then to the key.
export function translate(lang, key, vars) {
  const dict = dictionaries[lang] || en;
  const text = dict[key] ?? en[key] ?? key;
  if (!vars) return text;
  return text.replace(/\{(\w+)\}/g, (match, name) => (name in vars ? String(vars[name]) : match));
}

// Picks a supported language from a list like navigator.languages (["ko-KR", "en-US"]).
export function pickLang(candidates) {
  for (const candidate of candidates || []) {
    const base = String(candidate).toLowerCase().split('-')[0];
    if (LANGS.includes(base)) return base;
  }
  return DEFAULT_LANG;
}

// Product fields are stored as { en, uz, ko }; plain values pass through unchanged.
export function localized(field, lang) {
  if (field && typeof field === 'object' && !Array.isArray(field)) return field[lang] ?? field.en;
  return field;
}
