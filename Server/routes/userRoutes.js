const express = require("express");
const router = express.Router();
const usersController = require('../controllers/usersController');
const {protect,patient} = require('../middleware/authMiddleware');


router.route('/register').post(usersController.registerUser);
router.route('/login').post(usersController.authUser);
router.route('/use-program').put(usersController.useProgram);
router.route('/pause-program').put(usersController.pauseProgram);
router.route('/updateActivityResult').put(usersController.updateActivityResult);
router.route('/myPrograms//donePrograms').get(usersController.getDoneMyPrograms);
router.route('/myPrograms/activePrograms').get(usersController.getActiveMyPrograms);
router.route('/myPrograms').get(usersController.getUserPrograms);
router.route('/myPrograms/program').get(usersController.getUserProgramById);
router.route('/sendMessage').post(usersController.sendMessage);
router.route('/messages').get(usersController.getMessages);
router.route('/reavtiviate-program').put(usersController.unPauseProgram);
router.route('/profile')
    .put(usersController.updateUserProfile)
    .get(usersController.getUserProfile);
    
module.exports = router;
