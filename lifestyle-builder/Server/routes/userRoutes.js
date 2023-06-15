const express = require("express");
const router = express.Router();
const usersController = require('../controllers/usersController');
const {protect,patient} = require('../middleware/authMiddleware');


router.route('/register').post(usersController.registerUser);
router.route('/login').post(usersController.authUser);
router.route('/use-program').put(protect,patient,usersController.useProgram);
router.route('/activate-program/:id').put(protect,patient,usersController.activateProgram);
router.route('/pause-program/:id').put(protect,patient,usersController.pauseProgram);
router.route('/updateActivityResult').put(protect,patient,usersController.updateActivityResult);
router.route('/myPrograms//donePrograms').get(protect,patient,usersController.getDoneMyPrograms);
router.route('/myPrograms/activePrograms').get(protect,patient,usersController.getActiveMyPrograms);
router.route('/myPrograms/').get(protect,patient,usersController.getUserPrograms);
router.route('/sendMessage').post(protect,usersController.sendMessage);
router.route('/messages').get(protect,usersController.getMessages);
router.route('/profile')
    .put(protect,usersController.updateUserProfile)
    .get(protect,usersController.getUserProfile);
    
module.exports = router;
