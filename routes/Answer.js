const express = require("express");
const router = express.Router();

const answerControllers = require("../controllers/Answer");

router.get("/", answerControllers.getAllAnswer);
router.get("/:questionId", answerControllers.getAnswersInQuestion);
router.post("/", answerControllers.createAnswer);
router.patch("/:answerId", answerControllers.updateAnswer);
router.delete("/:answerId", answerControllers.deleteAnswer);

module.exports = router;
