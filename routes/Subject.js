const express = require("express");
const router = express.Router();

const subjectController = require("../controllers/Subject");

router.post("/create-subject", subjectController.createSubject);
router.patch("/edit-subject/:subjectId", subjectController.updateSubject);

module.exports = router;
