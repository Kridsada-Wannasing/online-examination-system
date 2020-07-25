const express = require("express");
const router = express.Router();

const examController = require("../controllers/Exam");

router.post("/create-exam", examController.createExam);
router.get("/all", examController.getAllExam);
router.get(":examId", examController.getExam);

module.exports = router;
