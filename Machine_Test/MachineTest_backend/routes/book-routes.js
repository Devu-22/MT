const express = require('express');
const router = express.Router();
const bookController = require('../controller/book-controller');

// Book Routes
router.post('/', bookController.createBook);
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.get('/title/:title', bookController.getBookByTitle);
router.patch('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);
router.patch('/rent/:id', bookController.rentBook);
router.patch('/return/:id', bookController.returnBook);
router.get('/title/:title', bookController.getBookByTitle);
module.exports = router;