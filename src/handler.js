const { nanoid } = require('nanoid');
const { books } = require('./books');

const addBooks = (request, h) => {
  const data = request.payload;
  const id = nanoid(16);
  const finished = data.pageCount === data.readPage;
  const insertedAt = new Date().toString();
  const updatedAt = insertedAt;

  const book = {...data, id, insertAt, updatedAt, finished };

  if (data.name === undefined ) {
      const response = h.response({
          status: 'fail',
          message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }
    if (data.readPage > data.pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }
    
    books.push(book);
    const isSuccess = books.filter((book) => book.id === id).length > 0;
    
    if ( isSuccess ) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'error',
        message: 'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;
}

const getAllBooks = (request, h) => {
    const {reading, finished, name} = request.query;
    let filterBooks = books;

    if (reading !== undefined) {
        filterBooks = filterBooks.filter((book) => book.reading == reading);
    }
    if (finished !== undefined) {
        filterBooks = filterBooks.filter((book) => book.finished == finished);
    }
    if (name !== undefined) {
        filterBooks = filterBooks.filter((book) => 
        book.name.toLowerCase().include(name.toLowerCase()));
    }
    console.log(books);

    filterBooks = filterBooks.map((book) => {
        const {id, name, publisher} = book;
        return {id, name, publisher};
    });
    const response = h.response({
        status: "success",
        data: {
            books: filterBooks,
        },
    });
    response.code(200);
    return response;
};

const getDetailBooks = (request, h) => {
    const { bookid } = request.params;
    const book = books.filter((book) => book.id === bookid)[0];

    if (book !== undefined) {
        const response = h.response({
            status: "success",
            data: {
                book,
            },
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
};

const editBooks = (request, h) => {
    const data = request.payload;
    const { bookid } = request.params;
    const finished = data.pageCount === data.readPage;
    const updatedAt = new Date().toString();

    const book = {...data, updatedAt, finished};

    if (data.name === undefined) {
        const response = h.response ({
            status: "fail",
            message: "Gagal memperbarui buku. Mohon isi nama buku"
        });
        response.code(400);
        return response;
    }
    if (data.readPage > data.pageCount) {
        const response = h.response ({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }

    const index = books.findIndex((book) => book.id === bookid);
    
    if (index !== -1 ) {
        books[index] = {
            ...books[index],
            ...book,
        };

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });
        response.code(200);
        return response;
    } else {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
        });
        response.code(404);
        return response;
    }
};

const deleteBooks = (request, h) => {
    const { bookid } = request.params;
    const index = books.findIndex((book) => book.id === bookid);

    if (index === -1) {
        const response = h.response({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan'
        });
        response.code(404);
        return response;
    } else {
        books.slice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus'
        });
        response.code(200);
        return response;
    }
};

module.exports = { 
    addBooks, 
    getDetailBooks, 
    getAllBooks, 
    editBooks, 
    deleteBooks, 
};
