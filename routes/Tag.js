const express = require("express");
const router = express.Router();

const tagController = require("../controllers/Tag");

router.post("/create-tag", tagController.createTag);
router.get("/all", tagController.getAllTag);
router.get("/:tagId", tagController.getTag);
router.delete("/delete-tag/:tagId", tagController.deleteTag);

module.exports = router;
