const express = require("express");
const router = express.Router();

const questionExamControllers = require("../controllers/QuestionExam");

router.get("/:examId", questionExamControllers.getQuestionInExam);
router.get("/search/:examId", questionExamControllers.searchQuestions);
router.post("/", questionExamControllers.addQuestionToExam);
router.post("/import", questionExamControllers.importQuestionsInExam);
router.delete("/", questionExamControllers.deleteQuestionInExam);

module.exports = router;
