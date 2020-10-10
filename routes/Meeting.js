const express = require("express");
const router = express.Router();

const meetingControllers = require("../controllers/Meeting");

router.get("/", meetingControllers.getAllMeeting);
router.get("/invited", meetingControllers.getAllMeetingInStudent);
router.get("/:meetingId", meetingControllers.getMeeting);
router.post("/", meetingControllers.createMeeting);
router.patch("/:meetingId", meetingControllers.updateMeeting);
router.delete("/:meetingId", meetingControllers.deleteMeeting);

module.exports = router;
