const express = require("express");
const router = express.Router();

const questionExamControllers = require("../controllers/QuestionExam");

router.post("/", questionExamControllers.addQuestionToExam);
router.delete("/", questionExamControllers.deleteQuestionInExam);

module.exports = router;
