const express = require("express");
const router = express.Router();

const examLogControllers = require("../controllers/ExamLog");

router.post("/:examId/:questionId", examLogControllers.createExamLog);
router.get("/:examId", examLogControllers.getAllExamLog);
// router.get("/:examLogId", examLogControllers.getExamLog);

// มี 2 middleware คือลบอันเก่าทิ้งแล้วสร้างใหม่
router.patch(
  "/:examId/:questionId",
  examLogControllers.updateExamLog,
  examLogControllers.createExamLog
);

// ลบข้อมูลการสอบในครั้งนั้น
router.delete("/:examId", examLogControllers.deleteExamLog);

module.exports = router;
