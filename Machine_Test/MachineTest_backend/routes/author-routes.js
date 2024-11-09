const express = require('express');
const router = express.Router();
const authorController = require('../controller/Author-controller');


router.post('/', authorController.createAuthor);
router.get('/', authorController.getAllAuthors);
router.get('/:id', authorController.getByAuthorId);
router.get('/name/:name', authorController.getByAuthorName);
router.put('/:id', authorController.updateByAuthorId);
router.put('/name/:name', authorController.updateByAuthorName);
router.delete('/:id', authorController.deleteByAuthorId);
router.delete('/name/:name', authorController.deleteByAuthorName);

module.exports = router;