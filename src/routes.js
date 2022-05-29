const { addNoteHandler, getAllNotesHandler, getNoteByIdHandler  , editNoteByIdHandler , deleteNoteByIdHandler} = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/image',
        handler: addNoteHandler,

    },
    {
        method: 'GET',
        path: '/image',
        handler: getAllNotesHandler,
    },
    {
        method: 'GET',
        path: '/image/{id}',
        handler: getNoteByIdHandler,
    },
    {
        method: 'PUT',
        path: '/image/{id}',
        handler: editNoteByIdHandler
    },
    {
        method: 'DELETE',
        path: '/image/{id}',
        handler: deleteNoteByIdHandler,
      },
]
module.exports = routes;