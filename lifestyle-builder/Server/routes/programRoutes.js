const express = require("express");
const router = express.Router();
const programController = require('../controllers/programController');

router.route('/')
.post(programController.createProgram)
.get(programController.getAllPrograms);

router.route('/:id')
.get(programController.getProgramById);

router.route('/update-activity/:id')
.put(programController.updateActivity);

router.route('/specialist-programs/:id')
.get(programController.getSpecialistPrograms);

router.route('/add-review/:id')
.put(programController.addReview);

router.route('program-url/:id')
.get(programController.getProgramUrl);

module.exports = router;

