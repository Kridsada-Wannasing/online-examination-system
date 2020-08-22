const express = require("express");
const router = express.Router();

const questionControllers = require("../controllers/Question");

router.get("/", questionControllers.getAllQuestion);
router.get("/:questionId", questionControllers.getQuestion);
router.post("/:examId", questionControllers.createQuestionInExam);
router.patch("/:examId/:questionId", questionControllers.updateQuestionInExam);
router.delete("/:questionId", questionControllers.deleteQuestion);

module.exports = router;
