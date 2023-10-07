const { nanoid } = require('nanoid');
const notes = require('./notes');

const postNote = (req, h) => {
  const note = req.payload;

  const id = nanoid();
  note.id = id;

  const currentTimeStamp = Date.now();
  note.createdAt = currentTimeStamp;
  note.updatedAt = currentTimeStamp;

  notes.push(note);

  const res = h.response({
    status: 'success',
    message: 'catatan berhasil ditambahkan',
    data: {
      noteId: id,
    },
  });

  res.code(201);

  return res;
};

const getNotes = (req, h) => {
  const res = h.response({
    status: 'success',
    data: {
      notes,
    },
  });
  res.code(200);
  return res;
};

const getNoteById = (req, h) => {
  const { id } = req.params;

  const desiredNote = notes.find((note) => note.id === id);

  const res = h.response({
    status: 'success',
    data: {
      note: desiredNote,
    },
  });

  res.code(200);

  return res;
};

const editNote = (req, h) => {
  const { id } = req.params;
  const { title, tags, body } = req.payload;

  const matchedNoteIndex = notes.findIndex((note) => note.id === id);

  notes[matchedNoteIndex].title = title;
  notes[matchedNoteIndex].tags = tags;
  notes[matchedNoteIndex].body = body;

  const res = h.response({
    status: 'success',
    message: 'Catatan berhasil diperbaharui',
  });

  res.code(200);

  return res;
};

const deleteNote = (req, h) => {
  const { id } = req.params;

  const matchedNoteIndex = notes.findIndex((note) => note.id === id);

  notes.splice(matchedNoteIndex, 1);

  const res = h.response({
    status: 'success',
    message: 'Catatan berhasil dihapus',
  });

  res.code(200);

  return res;
};

module.exports = {
  postNote,
  getNotes,
  getNoteById,
  editNote,
  deleteNote,
};
