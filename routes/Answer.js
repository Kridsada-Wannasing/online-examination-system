const express = require("express");
const router = express.Router();

const answerControllers = require("../controllers/Answer");

router.get("/", answerControllers.getAllAnswer);
router.get("/:questionId", answerControllers.getAnswersInQuestion);
router.post("/", answerControllers.createAnswer);
router.patch("/", answerControllers.updateAnswer);
router.delete("/", answerControllers.deleteAnswer);

module.exports = router;
