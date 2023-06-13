const express = require("express");
const router = express.Router();
const specialistController = require("../controllers/specialistsController");


router.route("/register").post(specialistController.registerSpecialist);
router.route("/login").post(specialistController.authSpecialist);
router.route("/acceptrequest").put(specialistController.acceptRequest);
router.route("/profile")
.get(specialistController.getSpecialistProfile)
.put(specialistController.updateSpecialistProfile);

module.exports = router;

