const express = require("express");
const router = express.Router();

const examControllers = require("../controllers/Exam");

router.post("/:subjectId", examControllers.createExam);
router.get("/", examControllers.getAllExam);
router.get("/:examId", examControllers.getExam);
router.patch("/:examId", examControllers.updateExam);
router.delete("/:examId", examControllers.deleteExam);

module.exports = router;
