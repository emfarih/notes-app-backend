const {nanoid} = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) =>{
    const {title, tags, body} = request.payload;
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const note = {id, title, createdAt, updatedAt, tags, body};

    notes.push(note);
    const isSuccess = notes.filter((note) => note.id === id).length > 0;
    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
              noteId: id,
            },
          });
          response.code(201);
          return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
      });
      response.code(500);
      return response;
};

const getNotesHandler = (request, h) =>{
    if (notes.length > -1) {
        const response = h.response({
            status: 'success',
            data: {
              notes,
            },
          });
          return response;
    } else {
        const response = h.response({
            status: 'fail',
            message: 'Tidak Ada Catatan',
          });
          response.code(404);
          return response;
    }
};

const getNoteByIdHandler = (request, h) =>{
    const {id} = request.params;
    const note = notes.filter((n) => n.id === id)[0];

    const isSuccess = note!=undefined;
    if (isSuccess) {
        const response = h.response({
            status: 'success',
            data: {
              note,
            },
          });
          return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Tidak Ada Catatan',
      });
      response.code(404);
      return response;
};

const editNoteByIdHandler = (request, h) => {
    const {id} = request.params;

    const {title, tags, body} = request.payload;
    const updatedAt = new Date().toISOString();

    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
      notes[index] = {
        ...notes[index],
        title,
        tags,
        body,
        updatedAt,
      };

      const response = h.response({
        status: 'success',
        message: 'Catatan berhasil diperbarui',
      });
      response.code(200);
      return response;
    }

    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui catatan. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  };


const deleteNoteByIdHandler = (request, h) =>{
    const {id} = request.params;
    const index = notes.findIndex((note)=>note.id===id);

    const isSuccess = index!==-1;
    if (isSuccess) {
        notes.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil dihapus',
          });
          return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Tidak Ada Catatan',
      });
      response.code(404);
      return response;
};
module.exports = {addNoteHandler, getNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler};
