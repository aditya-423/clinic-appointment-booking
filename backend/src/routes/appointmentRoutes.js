const express = require("express");
const router = express.Router();

const {
  getSlots,
  bookAppointment,
  getAppointments
} = require("../controllers/appointmentController");

router.get("/slots", getSlots);
router.post("/book", bookAppointment);
router.get("/appointments", getAppointments);

module.exports = router;