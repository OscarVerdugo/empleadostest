const express = require('express');
const router = express.Router();

const personal = require('../controllers/personal-controller.js');

router.get('/', personal.getpersonal);
router.post('/', personal.createEmployee);
router.get('/:id', personal.getEmployee);
router.put('/:id', personal.editEmployee);
router.delete('/:id', personal.deleteEmployee);

module.exports = router;