'use strict';
const path = require('node:path');
const { NoteStore } = require('./store');
const { createApp } = require('./app');

const PORT = process.env.PORT || 3000;
const DATA_FILE = process.env.DATA_FILE || path.join(__dirname, '..', 'data', 'notes.json');

const app = createApp(new NoteStore(DATA_FILE));
app.listen(PORT, () => console.log(`Notes app listening on port ${PORT} (data: ${DATA_FILE})`));
