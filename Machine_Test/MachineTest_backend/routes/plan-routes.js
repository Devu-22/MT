const express = require('express');
const router = express.Router();
const membershipPlanController = require('../controller/plan-controller');


router.post('/', membershipPlanController.createPlan);
router.get('/', membershipPlanController.getAll);
router.get('/:id', membershipPlanController.getById);
router.get('/name/:name', membershipPlanController.getByName);
router.put('/:id', membershipPlanController.updatePlan);
router.put('/name/:name', membershipPlanController.updateByName);
router.delete('/:id', membershipPlanController.deletePlan);
router.delete('/name/:name', membershipPlanController.deleteByName);

module.exports = router;