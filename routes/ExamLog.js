const express = require("express");
const router = express.Router();

const examLogController = require("../controllers/ExamLog");

router.get("/", examLogController.getAllExamLog);

module.exports = router;
