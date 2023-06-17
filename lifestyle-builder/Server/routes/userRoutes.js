const express = require("express");
const router = express.Router();
const usersController = require('../controllers/usersController');
const {protect,patient} = require('../middleware/authMiddleware');


router.route('/register').post(usersController.registerUser);
router.route('/login').post(usersController.authUser);
router.route('/use-program').put(usersController.useProgram);
router.route('/activate-program/:id').put(usersController.activateProgram);
router.route('/pause-program/:id').put(usersController.pauseProgram);
router.route('/updateActivityResult').put(usersController.updateActivityResult);
router.route('/myPrograms//donePrograms').get(usersController.getDoneMyPrograms);
router.route('/myPrograms/activePrograms').get(usersController.getActiveMyPrograms);
router.route('/myPrograms/').get(usersController.getUserPrograms);
router.route('/sendMessage').post(usersController.sendMessage);
router.route('/messages').get(usersController.getMessages);
router.route('/profile')
    .put(usersController.updateUserProfile)
    .get(usersController.getUserProfile);
    
module.exports = router;
