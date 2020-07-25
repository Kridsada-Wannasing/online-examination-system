const express = require("express");
const router = express.Router();

const examController = require("../controllers/Exam");

router.post("/create-exam", examController.createExam);
router.delete("/delete-exam/:examId", examController.deleteExam);

module.exports = router;
