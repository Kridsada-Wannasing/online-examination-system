const express = require("express");
const router = express.Router();

const objectiveQuestionController = require("../controllers/ObjectiveQuestion");

router.post("/create-question", objectiveQuestionController.createQuestion);
router.patch(
  "/update-question/:questionId",
  objectiveQuestionController.updateQuestion
);

module.exports = router;
