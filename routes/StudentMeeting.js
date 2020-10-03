const express = require("express");
const router = express.Router();

const studentMeetingControllers = require("../controllers/StudentMeeting");

router.post("/", studentMeetingControllers.createStudentInMeeting);
router.get("/:meetingId", studentMeetingControllers.getAllStudentInMeeting);
router.delete(
  "/:meetingId/:studentId",
  studentMeetingControllers.deleteStudentInMeeting
);

module.exports = router;
