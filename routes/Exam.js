const express = require("express");
const router = express.Router();

const examControllers = require("../controllers/Exam");

router.post("/", examControllers.createExam);
router.get("/:subjectId", examControllers.getAllExam);
router.get("/:subjectId/:examId", examControllers.getExam);
router.patch("/:examId", examControllers.updateExam);
router.delete("/:examId", examControllers.deleteExam);

module.exports = router;
