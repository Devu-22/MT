const express = require('express');
const router = express.Router();
const publicationController = require('../controller/publication-controller');

router.post('/', publicationController.createPublication);
router.get('/', publicationController.getAllPublications);
router.get('/:id', publicationController.getByPublicationId);
router.get('/name/:name', publicationController.getByPublicationByName);
router.put('/:id', publicationController.updatePublicationById);
router.put('/name/:name', publicationController.updateByPublicationName);
router.delete('/:id', publicationController.deleteByPublicationId);
router.delete('/name/:name', publicationController.deleteByPublicationName);

module.exports = router;