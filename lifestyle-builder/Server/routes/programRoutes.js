const express = require("express");
const router = express.Router();
const programController = require('../controllers/programController');
const { protected, specialist } = require('../middleware/authMiddleware');

router.route('/')
.post(protected,specialist,programController.createProgram)
.get(programController.getAllPrograms);

router.route('/:id/reviews').post(protected,programController.addReview);
router.route('/program-daily-activities/:id').get(programController.getDailyActivities);
router.route('/program-url/:id').get(programController.getProgramUrl);
router.route('edit-program/:id').put(protected,specialist,programController.editProgram);

/*router.route('/:id')
.get(programController.getProgramById);

router.route('/update-activity/:id')
.put(programController.updateActivity);

router.route('/specialist-programs/:id')
.get(programController.getSpecialistPrograms);

router.route('/add-review/:id')
.put(programController.addReview);

router.route('program-url/:id')
.get(programController.getProgramUrl);
*/


module.exports = router;

