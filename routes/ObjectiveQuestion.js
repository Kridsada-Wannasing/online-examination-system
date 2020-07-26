const express = require("express");
const router = express.Router();

const objectiveQuestionController = require("../controllers/ObjectiveQuestion");

router.post("/create-question", objectiveQuestionController.createQuestion);
router.get("/all-question", objectiveQuestionController.getAllQuestion);
router.get(":questionId", objectiveQuestionController.getQuestion);

module.exports = router;
