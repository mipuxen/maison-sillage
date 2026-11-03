import test from 'node:test';
import assert from 'node:assert/strict';
import { bagReducer, sanitize, summarize, lineKey } from './bagReducer.js';
import { MAX_QTY } from '../data/products.js';

test('add creates a line, then increments the same slug+size', () => {
  let s = bagReducer([], { type: 'add', slug: 'nike-cortez', size: '41' });
  assert.deepEqual(s, [{ slug: 'nike-cortez', size: '41', qty: 1 }]);
  s = bagReducer(s, { type: 'add', slug: 'nike-cortez', size: '41' });
  assert.equal(s.length, 1);
  assert.equal(s[0].qty, 2);
});

test('different size is a different line', () => {
  let s = bagReducer([], { type: 'add', slug: 'nike-cortez', size: '41' });
  s = bagReducer(s, { type: 'add', slug: 'nike-cortez', size: '42' });
  assert.equal(s.length, 2);
});

test('add ignores unknown products and sizes', () => {
  assert.deepEqual(bagReducer([], { type: 'add', slug: 'nope', size: '41' }), []);
  assert.deepEqual(bagReducer([], { type: 'add', slug: 'nike-cortez', size: '99' }), []);
});

test('quantity is capped at MAX_QTY and never drops below 1 via dec', () => {
  const key = lineKey('nb-204l', '40');
  let s = [{ slug: 'nb-204l', size: '40', qty: MAX_QTY }];
  s = bagReducer(s, { type: 'inc', key });
  assert.equal(s[0].qty, MAX_QTY);
  s = bagReducer([{ slug: 'nb-204l', size: '40', qty: 1 }], { type: 'dec', key });
  assert.equal(s[0].qty, 1);
});

test('remove and clear', () => {
  const s = [
    { slug: 'nb-204l', size: '40', qty: 2 },
    { slug: 'slazenger-resilient', size: '43', qty: 1 },
  ];
  assert.equal(bagReducer(s, { type: 'remove', key: lineKey('nb-204l', '40') }).length, 1);
  assert.deepEqual(bagReducer(s, { type: 'clear' }), []);
});

test('summarize totals count and price', () => {
  const s = [
    { slug: 'nike-cortez', size: '41', qty: 2 }, // 110 x 2
    { slug: 'slazenger-resilient', size: '43', qty: 1 }, // 75
  ];
  assert.deepEqual(summarize(s), { count: 3, subtotal: 295 });
});

test('sanitize drops invalid data and merges duplicates', () => {
  const dirty = [
    null,
    'x',
    { slug: 'nike-cortez', size: 41, qty: 1 },
    { slug: 'nike-cortez', size: '41', qty: 2 },
    { slug: 'ghost', size: '41', qty: 1 },
    { slug: 'nb-204l', size: '99', qty: 1 },
    { slug: 'nb-204l', size: '40', qty: 0 },
    { slug: 'nb-204l', size: '40', qty: 1.5 },
  ];
  assert.deepEqual(sanitize(dirty), [{ slug: 'nike-cortez', size: '41', qty: 3 }]);
  assert.deepEqual(sanitize('garbage'), []);
});
