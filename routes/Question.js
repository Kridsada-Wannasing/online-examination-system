const express = require("express");
const router = express.Router();

const questionController = require("../controllers/Question");

router.get("/", questionController.getAllQuestion);
router.get("/:questionId", questionController.getQuestion);
router.post("/:examId", questionController.createQuestionInExam);
router.patch("/:examId/:questionId", questionController.updateQuestionInExam);
router.delete("/:questionId", questionController.deleteQuestion);

module.exports = router;
