'use strict';
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { NoteStore } = require('../src/store');

const tmpFile = () => path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'notes-')), 'notes.json');

test('add and list notes', () => {
  const s = new NoteStore(tmpFile());
  s.add({ title: 'Buy milk' });
  s.add({ title: 'Study Docker', content: 'chapter 3' });
  assert.strictEqual(s.list().length, 2);
  assert.strictEqual(s.list()[1].content, 'chapter 3');
});

test('title is required', () => {
  const s = new NoteStore(tmpFile());
  assert.throws(() => s.add({ title: '   ' }), /title is required/);
});

test('edit a note', () => {
  const s = new NoteStore(tmpFile());
  const n = s.add({ title: 'Old' });
  const updated = s.update(n.id, { title: 'New', content: 'edited' });
  assert.strictEqual(updated.title, 'New');
  assert.strictEqual(updated.content, 'edited');
  assert.strictEqual(s.update(999, { title: 'x' }), null);
});

test('delete a note', () => {
  const s = new NoteStore(tmpFile());
  const n = s.add({ title: 'Temp' });
  assert.strictEqual(s.remove(n.id), true);
  assert.strictEqual(s.remove(n.id), false);
});

test('notes persist to the data file and reload', () => {
  const file = tmpFile();
  new NoteStore(file).add({ title: 'Persisted' });
  const reloaded = new NoteStore(file);
  assert.strictEqual(reloaded.list()[0].title, 'Persisted');
  assert.strictEqual(reloaded.add({ title: 'Next' }).id, 2);
});
