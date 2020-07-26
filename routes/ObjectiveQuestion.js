const express = require("express");
const router = express.Router();

const objectiveQuestionController = require("../controllers/ObjectiveQuestion");

router.post("/create-question", objectiveQuestionController.createQuestion);

module.exports = router;
