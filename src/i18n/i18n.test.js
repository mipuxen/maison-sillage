import test from 'node:test';
import assert from 'node:assert/strict';
import { dictionaries, LANGS, translate, pickLang, localized } from './index.js';
import { products } from '../data/products.js';
import { existsSync } from 'node:fs';
import { validateContact } from '../lib/validateContact.js';

const placeholders = (s) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();
const enKeys = Object.keys(dictionaries.en).sort();

for (const lang of LANGS) {
  test(`${lang}: has exactly the English keys`, () => {
    assert.deepEqual(Object.keys(dictionaries[lang]).sort(), enKeys);
  });
  test(`${lang}: no empty strings and same placeholders as English`, () => {
    for (const key of enKeys) {
      const value = dictionaries[lang][key];
      assert.equal(typeof value, 'string', `${lang}.${key}`);
      assert.ok(value.trim().length > 0, `${lang}.${key} is empty`);
      assert.deepEqual(placeholders(value), placeholders(dictionaries.en[key]), `${lang}.${key} placeholders`);
    }
  });
  test(`${lang}: every product is fully translated`, () => {
    for (const p of products) {
      for (const field of ['color', 'description']) {
        assert.ok(p[field][lang] && p[field][lang].trim(), `${p.slug}.${field}.${lang}`);
      }
      assert.equal(p.materials[lang].length, p.materials.en.length, `${p.slug}.materials.${lang}`);
      p.materials[lang].forEach((m) => assert.ok(m.trim(), `${p.slug}.materials.${lang}`));
    }
  });
}

test('translate fills placeholders and falls back', () => {
  assert.equal(translate('en', 'bag.button', { count: '02' }), 'Bag (02)');
  assert.equal(translate('ko', 'bag.button', { count: '02' }), '장바구니 (02)');
  assert.equal(translate('xx', 'nav.about'), 'About');
  assert.equal(translate('en', 'no.such.key'), 'no.such.key');
});

test('pickLang reads browser language lists', () => {
  assert.equal(pickLang(['ko-KR', 'en-US']), 'ko');
  assert.equal(pickLang(['uz-Latn-UZ']), 'uz');
  assert.equal(pickLang(['ru-RU', 'de']), 'en');
  assert.equal(pickLang(undefined), 'en');
});

test('localized picks the language and passes plain values through', () => {
  assert.equal(localized({ en: 'a', uz: 'b', ko: 'c' }, 'uz'), 'b');
  assert.equal(localized({ en: 'a' }, 'ko'), 'a');
  assert.equal(localized('Ambre 01', 'ko'), 'Ambre 01');
});

test('contact validation', () => {
  assert.deepEqual(validateContact({ name: 'Shux', email: 'a@b.co', message: 'Hello there!' }), {});
  assert.deepEqual(Object.keys(validateContact({ name: ' ', email: 'nope', message: 'short' })).sort(), [
    'email',
    'message',
    'name',
  ]);
  assert.ok(validateContact({ name: 'Al', email: 'a@b', message: '0123456789' }).email);
});

test('every product has all its photos in public/shoes', () => {
  for (const p of products) {
    assert.ok(Number.isInteger(p.images) && p.images >= 1, p.slug);
    for (let n = 1; n <= p.images; n++) {
      const f = new URL(`../../public/shoes/${p.slug}/${n}.webp`, import.meta.url);
      assert.ok(existsSync(f), `missing ${p.slug}/${n}.webp`);
    }
    assert.ok(p.brand && p.name && p.price > 0, p.slug);
  }
});
