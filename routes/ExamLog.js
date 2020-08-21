const express = require("express");
const router = express.Router();

const examLogController = require("../controllers/ExamLog");

router.post("/:examId/:questionId", examLogController.createExamLog);
router.get("/", examLogController.getAllExamLog);
// router.get("/:examLogId", examLogController.getExamLog);

// มี 2 middleware คือลบอันเก่าทิ้งแล้วสร้างใหม่
router.patch(
  "/:examId/:questionId",
  examLogController.updateExamLog,
  examLogController.createExamLog
);

// ลบข้อมูลการสอบในครั้งนั้น
router.delete("/:examId", examLogController.deleteExamLog);

module.exports = router;
