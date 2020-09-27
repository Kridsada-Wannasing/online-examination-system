const express = require("express");
const router = express.Router();

const registrationControllers = require("../controllers/Registration");

router.get("/", registrationControllers.getAllRegistrations);
router.get("/:registrationId", registrationControllers.getRegistration);
router.post("/", registrationControllers.createRegistrations);
router.patch("/:registrationId", registrationControllers.updateRegistration);
router.delete("/:registrationId", registrationControllers.deleteRegistration);

module.exports = router;
