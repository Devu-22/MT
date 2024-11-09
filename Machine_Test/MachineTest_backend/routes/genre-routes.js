const express = require('express');
const router = express.Router();
const genreController = require('../controller/genre-controller')


router.post('/', genreController.createGenre);
router.get('/', genreController.getAllGenre);
router.get('/:id', genreController.getByGenreId);
router.get('/name/:name', genreController.getByGenreName);
router.put('/:id', genreController.updateByGenreId);
router.put('/name/:name', genreController.updateByGenreName);
router.delete('/:id', genreController.deleteGenre);
router.delete('/name/:name', genreController.deleteByGenreName);

module.exports = router;