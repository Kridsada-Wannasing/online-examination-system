const express = require("express");
const router = express.Router();

const scoreController = require("../controllers/Score");

router.post("/create-score", scoreController.createScore);
router.get("/all", scoreController.getAllScore);
router.get("/:scoreId", scoreController.getScore);
router.patch("/edit-score/:scoreId", scoreController.updateScore);
router.delete("/delete-score/:scoreId", scoreController.deleteScore);

module.exports = router;
