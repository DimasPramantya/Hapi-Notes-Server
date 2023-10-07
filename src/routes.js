const {
  getNotes, postNote, getNoteById, deleteNote, editNote,
} = require('./handler');

const routes = [
  {
    method: 'GET',
    path: '/notes',
    handler: getNotes,
  },
  {
    method: ['GET', 'PUT', 'DELETE'],
    path: '/notes/{id}',
    handler: (req, h) => {
      const { method } = req;
      console.log("test", method);
      if (method === 'get') {
        return getNoteById(req, h);
      } if (method === 'put') {
        return editNote(req, h);
      } if (method === 'delete') {
        return deleteNote(req, h);
      }
      throw new Error('Method not allowed');
    },
  },
  {
    method: 'POST',
    path: '/notes',
    handler: postNote,
  },
];

module.exports = routes;
