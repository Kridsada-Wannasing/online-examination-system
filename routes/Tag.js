const express = require("express");
const router = express.Router();

const tagController = require("../controllers/Tag");

router.post("/create-tag", tagController.createTag);
router.get("/all", tagController.getAllTag);
router.get("/:tagId", tagController.getTag);
router.patch("/edit-tag/:tagId", tagController.updateTag);

module.exports = router;
