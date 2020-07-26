const express = require("express");
const router = express.Router();

const subjectController = require("../controllers/Subject");

router.post("/create-subject", subjectController.createSubject);
router.delete("/delete-subject/:subjectId", subjectController.deleteSubject);

module.exports = router;
