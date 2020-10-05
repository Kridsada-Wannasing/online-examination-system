const express = require("express");
const router = express.Router();

const notificationControllers = require("../controllers/Notification");

router.get("/", notificationControllers.getExaminationDate);
router.get("/postpone", notificationControllers.getPostponeExaminationDate);
router.get("/score", notificationControllers.getScoreNotification);

module.exports = router;
