const express = require("express");
const router = express.Router();

const objectiveQuestionController = require("../controllers/ObjectiveQuestion");

router.post("/", objectiveQuestionController.createQuestion);
router.get("/", objectiveQuestionController.getAllQuestion);
router.get("/:questionId", objectiveQuestionController.getQuestion);
router.patch("/:questionId", objectiveQuestionController.updateQuestion);
router.delete("/:questionId", objectiveQuestionController.deleteQuestion);

module.exports = router;
