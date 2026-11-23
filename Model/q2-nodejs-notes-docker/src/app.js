'use strict';
const path = require('node:path');
const express = require('express');

function createApp(store) {
  const app = express();
  app.use(express.json());
  app.use(express.static(path.join(__dirname, '..', 'public')));

  app.get('/health', (req, res) => res.json({ status: 'ok' }));

  // List all notes
  app.get('/notes', (req, res) => res.json(store.list()));

  // Get one note
  app.get('/notes/:id', (req, res) => {
    const note = store.get(Number(req.params.id));
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json(note);
  });

  // Add a note
  app.post('/notes', (req, res) => {
    try {
      res.status(201).json(store.add(req.body || {}));
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // Edit a note
  app.put('/notes/:id', (req, res) => {
    try {
      const note = store.update(Number(req.params.id), req.body || {});
      if (!note) return res.status(404).json({ error: 'Note not found' });
      res.json(note);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // Delete a note
  app.delete('/notes/:id', (req, res) => {
    if (!store.remove(Number(req.params.id))) return res.status(404).json({ error: 'Note not found' });
    res.status(204).end();
  });

  return app;
}

module.exports = { createApp };
