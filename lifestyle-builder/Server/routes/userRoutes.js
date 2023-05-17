const express = require("express");
const router = express.Router();
const usersController = require('../controllers/usersController');


router.route('/register').post(usersController.registerUser);
router.route('/login').post(usersController.authUser);
router.route('/request-to-use/:id').put(usersController.requestToUse);
router.route('/activate-program/:id').put(usersController.activateProgram);
router.route('/deactivate-program/:id').put(usersController.deactivateProgram);
router.route('/profile')
    .put(usersController.updateUserProfile)
    .get(usersController.getUserProfile);
    
module.exports = router;

