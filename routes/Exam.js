const express = require("express");
const router = express.Router();

const examController = require("../controllers/Exam");

router.post("/:subjectId", examController.createExamInSubject);
router.get("/", examController.getAllExam);
router.get("/:examId", examController.getExam);
router.patch("/:examId", examController.updateExam);
router.delete("/:examId", examController.deleteExam);

module.exports = router;
