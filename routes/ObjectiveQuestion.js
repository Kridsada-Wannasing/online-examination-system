const express = require("express");
const router = express.Router();

const objectiveQuestionController = require("../controllers/ObjectiveQuestion");

router.post("/create-question", objectiveQuestionController.createQuestion);
router.get("/all-question", objectiveQuestionController.getAllQuestion);
router.get(":questionId", objectiveQuestionController.getQuestion);
router.patch(
  "/update-question/:questionId",
  objectiveQuestionController.updateQuestion
);
router.delete(
  "/delete-question/:questionId",
  objectiveQuestionController.deleteQuestion
);

module.exports = router;
