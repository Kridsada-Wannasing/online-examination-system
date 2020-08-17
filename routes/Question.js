const express = require("express");
const router = express.Router();

const questionController = require("../controllers/Question");

router.get("/", questionController.getAllQuestion);
router.get("/:questionId", questionController.getQuestion);
router.post("/", questionController.createQuestion);
router.patch("/:questionId", questionController.updateQuestion);
router.delete("/:questionId", questionController.deleteQuestion);

module.exports = router;
