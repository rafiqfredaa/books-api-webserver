const { 
  addBooks, 
  getDetailBooks, 
  getAllBooks, 
  editBooks, 
  deleteBooks
} = require("./handler");

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBooks,
  },
  {
	  method: 'GET',
	  path: '/books',
	  handler: getAllBooks,
  },
  {
	  method: 'GET',
	  path: '/books',
	  handler: getDetailBooks,
  },
  {
	  method: 'PUT',
	  path: '/books/{bookid}',
	  handler: editBooks,
  },
  {
	  method: 'DELETE',
	  path: '/books/{bookid}',
	  handler: deleteBooks,
  },
];

module.exports = routes;