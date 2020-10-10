const express = require("express");
const router = express.Router();

const examinationControllers = require("../controllers/Examination");

router.post("/:meetingId", examinationControllers.enterToExamination);

module.exports = router;
