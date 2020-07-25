const express = require("express");
const router = express.Router();

const examController = require("../controllers/Exam");

router.post("/create-exam", examController.createExam);
router.patch("/edit-exam/:examId", examController.updateExam);

module.exports = router;
