const express = require("express");
const router = express.Router();

const choiceControllers = require("../controllers/Choice");

router.get("/", choiceControllers.getAllChoice);
router.get("/:questionId", choiceControllers.getChoicesInQuestion);
router.post("/", choiceControllers.createChoice);
router.patch("/", choiceControllers.updateChoice);
router.delete("/", choiceControllers.deleteChoice);

module.exports = router;
