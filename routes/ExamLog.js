const express = require("express");
const router = express.Router();

const examLogController = require("../controllers/ExamLog");

router.post("/create-log", examLogController.createExamLog);
router.get("/all", examLogController.getAllExamLog);
router.get("/:examLogId", examLogController.getExamLog);
router.patch("/edit-log/:examLogId", examLogController.updateExamLog);
router.delete("/delete-log/:examLogId", examLogController.deleteExamLog);

module.exports = router;
