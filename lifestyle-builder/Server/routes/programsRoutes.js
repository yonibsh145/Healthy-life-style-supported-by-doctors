const express = require("express");
const router = express.Router();
const programController = require('../controllers/programsController');
//const { protected, specialist } = require('../middleware/authMiddleware');

router.route('/')
.post(programController.createProgram)
.get(programController.getAllPrograms);

router.route('/:id/reviews').post(programController.addReview);
router.route('/program-daily-activities/:id').get(programController.getDailyActivities);
router.route('/program-url/:id').get(programController.getProgramUrl);
router.route('/edit-program/:id').put(programController.editProgram);

router.route('/:id')
.get(programController.getProgramById);

//router.route('/specialist-programs/:id')
//.get(programController.getSpecialistPrograms);

router.route('/add-review/:id')
.put(programController.addReview);

router.route('program-url/:id')
.get(programController.getProgramUrl);

router.route('/delete-program')
.delete(programController.deleteProgram);


module.exports = router;
