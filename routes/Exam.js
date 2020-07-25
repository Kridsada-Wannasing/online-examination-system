const express = require("express");
const router = express.Router();

const examController = require("../controllers/Exam");

router.post("/create-exam", examController.createExam);

module.exports = router;
