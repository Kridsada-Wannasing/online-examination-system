const express = require("express");
const router = express.Router();

const tagController = require("../controllers/Tag");

router.post("/create-tag", tagController.createTag);
