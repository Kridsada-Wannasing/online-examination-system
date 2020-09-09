const express = require("express");
const router = express.Router();

const subjectControllers = require("../controllers/Subject");

router.post("/", subjectControllers.createSubject);
router.get("/", subjectControllers.getAllSubject);
router.get("/:subjectId", subjectControllers.getSubject);
router.patch("/:subjectId", subjectControllers.updateSubject);
router.delete("/:subjectId", subjectControllers.deleteSubject);

module.exports = router;
