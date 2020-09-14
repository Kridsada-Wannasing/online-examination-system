const express = require("express");
const router = express.Router();

const meetingControllers = require("../controllers/Meeting");

router.get("/", meetingControllers.getAllMeeting);
router.get("/:meeting", meetingControllers.getMeeting);
router.post("/", meetingControllers.createMeeting);
router.patch("/:meeting", meetingControllers.updateMeeting);
router.delete("/:meeting", meetingControllers.deleteMeeting);

module.exports = router;
