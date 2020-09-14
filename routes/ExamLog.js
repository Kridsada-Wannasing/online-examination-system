const express = require("express");
const router = express.Router();

const examLogControllers = require("../controllers/ExamLog");

router.post("/", examLogControllers.createExamLog);
router.get("/:examId", examLogControllers.getAllExamLog);
router.get("/:examId/:questionId", examLogControllers.getExamLog);

// มี 2 middleware คือลบอันเก่าทิ้งแล้วสร้างใหม่
router.patch(
  "/",
  examLogControllers.updateExamLog,
  examLogControllers.createExamLog
);

// ลบข้อมูลการสอบในครั้งนั้น
router.delete("/:examId", examLogControllers.deleteExamLog);

module.exports = router;
