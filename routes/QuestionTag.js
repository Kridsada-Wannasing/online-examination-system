const express = require("express");
const router = express.Router();

const questionTagControllers = require("../controllers/QuestionTag");

router.post("/", questionTagControllers.addTagToQuestion);
router.patch("/", questionTagControllers.updateTagOfQuestion);
router.delete("/", questionTagControllers.deleteTagOfQuestion);

module.exports = router;
