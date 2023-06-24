const express = require("express");
const router = express.Router();
const specialistController = require("../controllers/specialistsController");
//const { protect, specialist } = require("../middleware/authMiddleware");

router.post("/register", specialistController.registerSpecialist);
router.post("/login", specialistController.authSpecialist);
router.put("/updaterequest", specialistController.updateRequest);
router.get("/requests", specialistController.getSpecialistRequests);
router.get("/patients", specialistController.getSpecialistPatients);
router.get("/programs", specialistController.getSpecialistPrograms);
router.post("/sendmessage", specialistController.sendMessage);
router.get("/messages", specialistController.getMessages);

router.route("/profile")
  .get(specialistController.getSpecialistProfile)
  .put(specialistController.updateSpecialistProfile);

module.exports = router;
