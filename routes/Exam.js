const express = require("express");
const router = express.Router();

const examController = require("../controllers/Exam");

router.post("/", examController.createExamInSubject);
router.post("/:examId", examController.addQuestionInExam);
router.get("/", examController.getAllExam);
router.get("/:examId", examController.getExam);
router.patch("/:examId", examController.updateExam);
router.patch("/:examId/:questionId", examController.updateExam);
router.delete("/:examId", examController.deleteExam);

module.exports = router;
