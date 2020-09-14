const express = require("express");
const router = express.Router();

const examinationControllers = require("../controllers/Examination");

router.get("/invited", examinationControllers.getExaminationsForInvitedStudent);
router.get("/", examinationControllers.getAllExaminations);
router.get("/:examinationId", examinationControllers.getExamination);
router.post("/", examinationControllers.createExamination);
router.post("/:examinationId", examinationControllers.enterToExamination);
router.patch("/:examinationId", examinationControllers.updateExamination);
router.delete("/:examinationId", examinationControllers.cancelExamination);

module.exports = router;
