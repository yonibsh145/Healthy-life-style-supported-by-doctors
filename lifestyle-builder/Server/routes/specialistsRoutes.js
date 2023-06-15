const express = require("express");
const router = express.Router();
const specialistController = require("../controllers/specialistsController");
const { protect, specialist } = require("../middleware/authMiddleware");

router.post("/register", specialistController.registerSpecialist);
router.post("/login", specialistController.authSpecialist);
router.put("/updaterequest", protect, specialist, specialistController.updateRequest);
router.get("/requests", protect, specialist, specialistController.getSpecialistRequests);
router.get("/patients", protect, specialist, specialistController.getSpecialistPatients);
router.get("/programs", protect, specialist, specialistController.getSpecialistPrograms);
router.post("/sendmessage", protect, specialist, specialistController.sendMessage);
router.get("/messages", protect, specialist, specialistController.getMessages);

router.route("/profile")
  .get(protect, specialist, specialistController.getSpecialistProfile)
  .put(protect, specialist, specialistController.updateSpecialistProfile);

module.exports = router;
