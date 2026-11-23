'use strict';
const fs = require('node:fs');
const path = require('node:path');

/** Notes are kept in memory and saved to a JSON file so they can survive restarts (when the file lives on a volume). */
class NoteStore {
  constructor(filePath) {
    this.filePath = filePath;
    this.notes = [];
    this.nextId = 1;
    this._load();
  }

  _load() {
    if (!this.filePath || !fs.existsSync(this.filePath)) return;
    const saved = JSON.parse(fs.readFileSync(this.filePath, 'utf8'));
    this.notes = saved.notes || [];
    this.nextId = saved.nextId || this.notes.reduce((m, n) => Math.max(m, n.id), 0) + 1;
  }

  _save() {
    if (!this.filePath) return;
    fs.mkdirSync(path.dirname(this.filePath), { recursive: true });
    fs.writeFileSync(this.filePath, JSON.stringify({ nextId: this.nextId, notes: this.notes }, null, 2));
  }

  list() {
    return this.notes;
  }

  get(id) {
    return this.notes.find((n) => n.id === id) || null;
  }

  add({ title, content = '' }) {
    if (typeof title !== 'string' || !title.trim()) {
      throw new Error('title is required');
    }
    const now = new Date().toISOString();
    const note = { id: this.nextId++, title: title.trim(), content: String(content), createdAt: now, updatedAt: now };
    this.notes.push(note);
    this._save();
    return note;
  }

  update(id, { title, content }) {
    const note = this.get(id);
    if (!note) return null;
    if (title !== undefined) {
      if (typeof title !== 'string' || !title.trim()) throw new Error('title cannot be empty');
      note.title = title.trim();
    }
    if (content !== undefined) note.content = String(content);
    note.updatedAt = new Date().toISOString();
    this._save();
    return note;
  }

  remove(id) {
    const before = this.notes.length;
    this.notes = this.notes.filter((n) => n.id !== id);
    if (this.notes.length === before) return false;
    this._save();
    return true;
  }
}

module.exports = { NoteStore };
