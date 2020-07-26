const express = require("express");
const router = express.Router();

const subjectController = require("../controllers/Subject");

router.post("/create-subject", subjectController.createSubject);
router.get("/all-subject", subjectController.getAllSubject);
router.get("/:subjectId", subjectController.getSubject);
router.patch("/edit-subject/:subjectId", subjectController.updateSubject);
router.delete("/delete-subject/:subjectId", subjectController.deleteSubject);

module.exports = router;
