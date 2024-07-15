const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const tutorController = require("../controllers/tutorController");

// Routes for Tutor CRUD
router.post("/", authMiddleware("admin"), tutorController.createTutor);
router.get("/:id", authMiddleware(), tutorController.getTutorById);
router.get("/", authMiddleware(), tutorController.getAllTutors);
router.put("/:id", authMiddleware("admin"), tutorController.updateTutor);
router.delete("/:id", authMiddleware("admin"), tutorController.deleteTutor);

// Additional Tutor Functions
router.get(
  "/:tutorId/courses",
  authMiddleware(),
  tutorController.getTutorCourses
);
router.get(
  "/:tutorId/ratings",
  authMiddleware(),
  tutorController.getTutorRating
);

module.exports = router;
