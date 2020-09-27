const express = require("express");
const router = express.Router();

const questionTagControllers = require("../controllers/QuestionTag");

router.get("/:questionId", questionTagControllers.getTagsInQuestion);
router.post("/:questionId", questionTagControllers.addTagToQuestion);
router.patch("/:questionId", questionTagControllers.updateTagOfQuestion);
router.delete("/:questionId", questionTagControllers.deleteTagOfQuestion);

module.exports = router;
