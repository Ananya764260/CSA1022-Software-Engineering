'use strict';
// Requires `npm install` (express). Starts the real app on a random port and calls it over HTTP.
const test = require('node:test');
const assert = require('node:assert');
const { NoteStore } = require('../src/store');
const { createApp } = require('../src/app');

async function withServer(fn) {
  const server = createApp(new NoteStore(null)).listen(0);
  const base = `http://127.0.0.1:${server.address().port}`;
  try { await fn(base); } finally { server.close(); }
}
const json = (method, body) => ({ method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });

test('health endpoint', () => withServer(async (base) => {
  const r = await fetch(`${base}/health`);
  assert.strictEqual(r.status, 200);
  assert.deepStrictEqual(await r.json(), { status: 'ok' });
}));

test('add, list, edit and delete a note', () => withServer(async (base) => {
  let r = await fetch(`${base}/notes`, json('POST', { title: 'First', content: 'hello' }));
  assert.strictEqual(r.status, 201);
  const created = await r.json();

  r = await fetch(`${base}/notes`);
  assert.strictEqual((await r.json()).length, 1);

  r = await fetch(`${base}/notes/${created.id}`, json('PUT', { content: 'edited' }));
  assert.strictEqual((await r.json()).content, 'edited');

  r = await fetch(`${base}/notes/${created.id}`, { method: 'DELETE' });
  assert.strictEqual(r.status, 204);
  r = await fetch(`${base}/notes/${created.id}`);
  assert.strictEqual(r.status, 404);
}));

test('POST without title returns 400', () => withServer(async (base) => {
  const r = await fetch(`${base}/notes`, json('POST', { content: 'no title' }));
  assert.strictEqual(r.status, 400);
}));
