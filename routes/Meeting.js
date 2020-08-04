const express = require("express");
const router = express.Router();

const meetingController = require("../controllers/Meeting");

router.post("/", meetingController.createMeeting);
router.get("/", meetingController.getAllMeeting);
router.get("/:meetingId", meetingController.getMeeting);
router.patch("/:meetingId", meetingController.updateMeeting);
router.delete("/:meetingId", meetingController.deleteMeeting);

module.exports = router;
